// Création de la class Type
class Type {

    constructor() {
        this.all_types = ["Grass", "Poison", "Fire", "Flying", "Water", "Bug", "Normal", "Drak", "Electric", "Psychic", "Ice", "Steel", "Ground", "Fairy", "Fighting", "Rock", "Ghost", "Dragon"];
        this.value_effectiveness = 0;
        this.type_name = [];
        this.type_effectiveness_name = [];
        this.pokemon_type = pokemon_types;
    }

    /*

    effectiveness(attack_type, defender_type) {
        if (!this.all_types.includes(attack_type) || !this.all_types.includes(defender_type)) {
            console.log("Les types d'attaque ou de défenseur ne sont pas valides !");
            return null;
        }
        for (let i = 0; i < pokemon_types.length; i++) {
            if (pokemon_types[i].form == "Normal") {

                for (let k = 0; k < this.all_types.length; k++) {
                    if (this.all_types[k] == defender_type) {

                        switch (defender_type) {
                            case 'Fire':
                            case 'Flying':
                            case 'Poison':
                            case 'Steel':
                            case 'Fighting':
                            case 'Ghost':
                            case 'Fairy':
                                return this.value_effectiveness = 0.625;
                                break;
                            case 'Bug':
                            case 'Dragon':
                            case 'Electric':
                            case 'Ground':
                            case 'Ice':
                            case 'Normal':
                            case 'Rock':
                            case 'Water':
                                return this.value_effectiveness = 1.0;
                                break;
                            case 'Dark':
                            case 'Psychic':
                            case 'Grass':
                                return this.value_effectiveness = 1.6;
                                break;
                            default:
                                return print(`Type ${this.type_effectiveness[j]} n'existe pas`);
                        }
                    } else {
                        console.log("Ce type n'existe pas");
                    }
                }
            } else {
                console.log("La forme de ce pokemon n'est pas normal");
            }

        }
    }

    */

    get getType_name() {
        return this.type_name;
    }

    get getType_effectiveness_name() {
        return this.type_effectiveness_name;
    }

    get getValue_effectiveness() {
        return this.value_effectiveness;
    }

    get getTypes() {
        return this.all_types;
    }

    toString() {
        return "Type : " + this.getType_name + ", Autre type: " + this.getType_effectiveness_name + ", Efficacité : " + this.getValue_effectiveness;
    }
}

/*let t1 = new Type("Poison", "Grass");
const t1 = new Type();
console.log(t1.getTypes);*/