class Chicken extends Animal{
    constructor(name:string){super("Chicken", name,"Cluck", ["Grains"], 50);}

SpecialAction():string {
    return`${this.name} the chicken can lay golden eggs`;
}}