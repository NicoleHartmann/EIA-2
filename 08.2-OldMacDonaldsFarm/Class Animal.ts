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
    SpecialAction():string {
        return`${this.name} the ${this.species} does something special!.`;
    }
}



