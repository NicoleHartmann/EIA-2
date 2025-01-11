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
