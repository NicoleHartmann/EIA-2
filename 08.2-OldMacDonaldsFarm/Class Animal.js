"use strict";
// Animal-Klasse:
class Animal {
    species;
    name;
    sound;
    foodTypes;
    foodAmount;
    hasSung;
    hasEaten;
    constructor(species, name, sound, foodTypes, foodAmount) {
        this.species = species;
        this.name = name;
        this.sound = sound;
        this.foodTypes = foodTypes;
        this.foodAmount = foodAmount;
        this.hasSung = false;
        this.hasEaten = false;
    }
    sing() {
        this.hasSung = true;
        return `${this.name} the ${this.species} sings: Old MacDonald had a farm, E-I-E-I-O, and on that farm he had a ${this.species}, E-I-E-I-O, with a ${this.sound} here, and a ${this.sound} there...`;
    }
    eat(foodType, availableFood) {
        if (!this.foodTypes.includes(foodType)) {
            return `${this.name} the ${this.species} doesn't eat ${foodType}.`;
        }
        if (availableFood < this.foodAmount) {
            return `Not enough ${foodType} for ${this.name}. Needs ${this.foodAmount}g but only ${availableFood}g available.`;
        }
        this.hasEaten = true;
        return `${this.name} the ${this.species} is eating ${this.foodAmount}g of ${foodType}.`;
    }
    SpecialAction() {
        return `${this.name} the ${this.species} does something special!.`;
    }
}
//# sourceMappingURL=Class%20Animal.js.map