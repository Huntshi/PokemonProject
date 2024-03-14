
// Création de la class Pokemon

class Pokemon {

    constructor(base_attack, base_defense, base_stamina, form, pokemon_id, pokemon_name, type) {
        this.base_attack = base_attack;
        this.base_defense = base_defense;
        this.base_stamina = base_stamina;
        this.form = form;
        this.pokemon_id = pokemon_id;
        this.pokemon_name = pokemon_name;
        this.type = type;
    }

    get getBase_attack() {
        return this.base_attack;
    }

    get getBase_defense() {
        return this.base_defense;
    }

    get getBase_stamina() {
        return this.base_stamina;
    }

    get getForm() {
        return this.form;
    }

    get getPokemon_id() {
        return this.pokemon_id;
    }

    get getPokemon_name() {
        return this.pokemon_name;
    }

    get getType() {
        return this.type;
    }


    toString() {
        return "Nom : " + this.pokemon_name + " ID : " + this.pokemon_id + " Forme : " + this.form + " Attaque : " + this.base_attack + " Défense : " + this.base_defense + " Endurance : " + this.base_stamina + " Type : " + this.type;
    }

}

let p1 = new Pokemon(118, 111, 128, "Normal", 1, "Bulbizarre", "Plante");
console.log(p1.toString());
console.log(p1.getPokemon_id);