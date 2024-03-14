// Création de la class Type
class Type {
    all_types = ["Grass", "Poison", "Fire", "Flying", "Water", "Bug", "Normal", "Drak", "Electric", "Psychic", "Ice", "Steel", "Ground", "Fairy", "Fighting", "Rock", "Ghost", "Dragon"];

    constructor(type_name, type_effectiveness) {
        this.type_name = type_name;
        this.type_effectiveness = type_effectiveness;
    }

    get getType_name() {
        return this.type_name;
    }

    get getType_effectiveness() {
        return this.type_effectiveness;
    }

    toString() {
        return "Type : " + this.type_name + " Type d'efficacité : " + this.type_effectiveness;
    }
}

let t1 = new Type("Poison", "Grass");