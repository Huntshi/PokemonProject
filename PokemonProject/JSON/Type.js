// Création de la class Type
class Type {
    constructor(type_name, type_effectiveness_name) {
        this.type_name = type_name;
        this.type_effectiveness_name = type_effectiveness_name;
    }

    get getType_name() {
        return this.type_name;
    }

    set setType_name(newTypeName) {
        this.type_name = newTypeName;
    }

    get getType_effectiveness_name() {
        return this.type_effectiveness_name;
    }

    set setType_effectiveness_name(newTypeEffectivenessName) {
        this.type_effectiveness_name = newTypeEffectivenessName;
    }

    toString() {
        let effectivenessString = "{";
        for (const [type, effectiveness] of Object.entries(this.type_effectiveness_name)) {
            effectivenessString += type + ": " + effectiveness + ", ";
        }
        // Suppression de la virgule et de l'espace en trop à la fin
        effectivenessString = effectivenessString.slice(0, -2) + "}";
        
        return "\n\nNom du type : " + this.type_name +
            "\nEfficacité du type : " + effectivenessString;
    }
    
}