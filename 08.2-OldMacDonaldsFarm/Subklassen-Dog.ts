class Dog extends Animal{
    constructor(name:string){super("Dog", name,"Woof", ["Meat"], 100);}

SpecialAction():string {
    return`${this.name} the dog can dig up buried treasures`;
}}