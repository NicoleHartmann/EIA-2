class Horse extends Animal{
    constructor(name:string){super("Horse", name,"Neigh", ["Hay"], 200);}

SpecialAction():string {
    return`${this.name} the Horse can leave golden hoofprints`;
}}