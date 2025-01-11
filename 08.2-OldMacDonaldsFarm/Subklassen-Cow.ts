class Cow extends Animal{
    constructor(name:string){super("Cow", name,"Moo", ["Grass"], 150);}

SpecialAction():string {
    return`${this.name} the Cow can give chocolate milk`;
}}