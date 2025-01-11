class Pig extends Animal{
    constructor(name:string){super("Pig", name,"Oink", ["Junk"], 120);}

SpecialAction():string {
    return`${this.name} the Pig can find truffles in the soil`;
}}