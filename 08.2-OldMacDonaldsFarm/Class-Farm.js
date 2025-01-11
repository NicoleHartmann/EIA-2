"use strict";
// Farm-Klasse:
class Farm {
    animals = [];
    foodInventory = { "Grass": 600, "Grains": 600, "Meat": 600, "Junk": 600, "Hay": 600, };
    currentDay = 1;
    addAnimal(animal) {
        this.animals.push(animal);
    }
    feedAnimal(animal, foodType) {
        let availableFood = this.foodInventory[foodType] || 0;
        let result = animal.eat(foodType, availableFood);
        if (animal.hasEaten) {
            this.foodInventory[foodType] -= animal.foodAmount;
        }
        return result;
    }
    startNextDay() {
        this.animals.forEach(animal => {
            animal.hasSung = false;
            animal.hasEaten = false;
        });
        this.currentDay++;
    }
    allAnimalsReady() {
        return this.animals.every(animal => animal.hasSung && animal.hasEaten) ? "true" : "false";
    }
    // Futter Nachbestellen:
    restockFood(foodType, amount) {
        if (amount > 0) {
            this.foodInventory[foodType] += amount;
            return `Restocked ${amount}g of ${foodType}. New stock: ${this.foodInventory[foodType]} g.`;
        }
        return "Invalid amount.";
    }
    // Schauen ob genug Futter für den nächsten Tag da ist:
    hasEnoughFood() {
        return this.animals.every(animal => {
            let availableFood = this.foodInventory[animal.foodTypes[0]] || 0;
            return availableFood >= animal.foodAmount;
        });
    }
    // Schaut ob man Futter nachbestellen muss:
    needsRestocking() {
        return Object.keys(this.foodInventory).some(foodType => {
            let availableFood = this.foodInventory[foodType];
            return availableFood < 100;
        });
    }
}
//# sourceMappingURL=Class-Farm.js.map