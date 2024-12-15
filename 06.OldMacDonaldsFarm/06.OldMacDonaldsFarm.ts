// Animal-Klasse:

class Animal {
    species: string;
    name: string;
    sound: string;
    foodTypes: string[];
    foodAmount: number;
    hasSung: boolean;
    hasEaten: boolean;

    constructor(species: string, name: string, sound: string, foodTypes: string[], foodAmount: number) {
        this.species = species;
        this.name = name;
        this.sound = sound;
        this.foodTypes = foodTypes;
        this.foodAmount = foodAmount;
        this.hasSung = false;
        this.hasEaten = false;
    }

    sing(): string {
        this.hasSung = true;
        return `${this.name} the ${this.species} sings: Old MacDonald had a farm, E-I-E-I-O, and on that farm he had a ${this.species}, E-I-E-I-O, with a ${this.sound} here, and a ${this.sound} there...`;
    }

    eat(foodType: string, availableFood: number): string {

        if (!this.foodTypes.includes(foodType)) {
            return `${this.name} the ${this.species} doesn't eat ${foodType}.`;
        }
        if (availableFood < this.foodAmount) {
            return `Not enough ${foodType} for ${this.name}. Needs ${this.foodAmount}g but only ${availableFood}g available.`;
        }
        this.hasEaten = true;
        return `${this.name} the ${this.species} is eating ${this.foodAmount}g of ${foodType}.`;
    }
}

// Farm-Klasse:

class Farm {
    animals: Animal[] = [];

    foodInventory: { [key: string]: number } = {"Grass": 600,"Grains": 600,"Meat": 600,"Junk": 600,"Hay": 600,};
    currentDay: number = 1;

    addAnimal(animal: Animal): void {
        this.animals.push(animal);
    }

    feedAnimal(animal: Animal, foodType: string): string {

        let availableFood = this.foodInventory[foodType] || 0;
        let result = animal.eat(foodType, availableFood);

        if (animal.hasEaten) {
            this.foodInventory[foodType] -= animal.foodAmount;
        }
        return result;
    }

    startNextDay(): void {
        this.animals.forEach(animal => {
            animal.hasSung = false;
            animal.hasEaten = false;
        });

        this.currentDay++;
    }

   allAnimalsReady(): "true" | "false" {
    return this.animals.every(animal => animal.hasSung && animal.hasEaten) ? "true" : "false";
}


    // Futter Nachbestellen:

    restockFood(foodType: string, amount: number): string {

        if (amount > 0) {
            this.foodInventory[foodType] += amount;

            return `Restocked ${amount}g of ${foodType}. New stock: ${this.foodInventory[foodType]} g.`;
        }
        return "Invalid amount.";
    }
    // Schauen ob genug Futter für den nächsten Tag da ist:

    hasEnoughFood(): boolean {
        return this.animals.every(animal => {
            let availableFood = this.foodInventory[animal.foodTypes[0]] || 0;
            return availableFood >= animal.foodAmount;
        });
    }

    // Schaut ob man Futter nachbestellen muss:
    needsRestocking(): boolean {
        return Object.keys(this.foodInventory).some(foodType => {
            let availableFood = this.foodInventory[foodType];
            return availableFood < 100;  
        });
    }
}


// Hauptprogramm:

document.addEventListener("DOMContentLoaded", () => {
    
    let farm = new Farm(); // erstellung der Farm mit den Tieren

    let animals = [
        new Animal("Cow", "Bessie", "Moo", ["Grass"], 150),
        new Animal("Chicken", "Clucky", "Cluck", ["Grains"], 50),
        new Animal("Dog", "Rex", "Woof", ["Meat"], 100),
        new Animal("Horse", "Spirit", "Neigh", ["Hay"], 200),
        new Animal("Pig", "Porky", "Oink", ["Junk"], 120)
    ];

    animals.forEach(animal => farm.addAnimal(animal));

    let animalsContainer = document.getElementById("animals")!;
    let foodContainer = document.getElementById("food")!;
    let controlsContainer = document.getElementById("controls")!;
    let dayDisplay = document.getElementById("dayDisplay")!;

    // Tier darstellen:
    let updateAnimals = () => {
        animalsContainer.innerHTML = ""; 

        farm.animals.forEach(animal => {
            let animalDiv = document.createElement("div");
            animalDiv.className = "animal";

            let name = document.createElement("strong");

            name.textContent = `${animal.name} the ${animal.species}`;
            animalDiv.appendChild(name);

            animalDiv.appendChild(document.createElement("br")); 

          
            let sungCheckbox = document.createElement("input");

            sungCheckbox.type = "checkbox";
            sungCheckbox.disabled = true;
            sungCheckbox.id = `${animal.name}-sung`;

            let sungLabel = document.createElement("label");

            sungLabel.textContent = " Sung";
            sungLabel.insertBefore(sungCheckbox, sungLabel.firstChild);
            animalDiv.appendChild(sungLabel);

            
            let fedCheckbox = document.createElement("input");

            fedCheckbox.type = "checkbox";
            fedCheckbox.disabled = true;
            fedCheckbox.id = `${animal.name}-fed`;

            let fedLabel = document.createElement("label");

            fedLabel.textContent = " Fed";
            fedLabel.insertBefore(fedCheckbox, fedLabel.firstChild);
            animalDiv.appendChild(fedLabel);

            let singButton = document.createElement("button");
            singButton.textContent = "Sing";
            singButton.addEventListener("click", () => { alert(animal.sing());
                sungCheckbox.checked = true; 
                checkDayProgress();
            });

            animalDiv.appendChild(singButton);

           
            let feedButton = document.createElement("button");

            feedButton.textContent = "Feed";
            feedButton.addEventListener("click", () => {

                let message = farm.feedAnimal(animal, animal.foodTypes[0]);
                alert(message);

                if (animal.hasEaten) fedCheckbox.checked = true; 
                updateFood();
                checkDayProgress();
            });

            animalDiv.appendChild(feedButton);

            animalsContainer.appendChild(animalDiv);
        });
    };

    // Futtervorräte anzuzeigen:
    let updateFood = () => {
        foodContainer.innerHTML = "";

        for (let foodType in farm.foodInventory) {
            let foodDiv = document.createElement("div");
            foodDiv.className = "food";
            foodDiv.textContent = `${foodType}: ${farm.foodInventory[foodType]} g`;
            foodContainer.appendChild(foodDiv);
        }
    };

    let checkDayProgress = () => {controlsContainer.innerHTML = ""; 

        dayDisplay.textContent = `Tag: ${farm.currentDay}`; // Tag anzeigen

        let nextDayButton = document.createElement("button");

        nextDayButton.textContent = "Start Next Day";
        nextDayButton.disabled = !farm.allAnimalsReady() || !farm.hasEnoughFood();

        nextDayButton.addEventListener("click", () => {
            farm.startNextDay();
            updateAnimals();
            updateFood();
            checkDayProgress();
        });

        controlsContainer.appendChild(nextDayButton);

        if (farm.needsRestocking()) {

            let restockButton = document.createElement("button");
            restockButton.textContent = "Order Food";

            restockButton.addEventListener("click", () => {

                let foodType = prompt("Enter the food type (Grass, Grains, Meat, Junk, Hay):");
                let amount = parseInt(prompt("Enter the amount in grams:") || "0", 10);

                if (foodType && amount > 0 && farm.foodInventory.hasOwnProperty(foodType)) {
                    alert(farm.restockFood(foodType, amount));
                    updateFood();
                    checkDayProgress();
                } else {
                    alert("Invalid input. Please try again.");
                }
            });

            controlsContainer.appendChild(restockButton);
        }
    };

   
    updateAnimals();
    updateFood();
    checkDayProgress();
});
