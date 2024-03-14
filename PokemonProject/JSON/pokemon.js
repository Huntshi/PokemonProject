// Création de la class Pokemon
class Pokemon {
    constructor(base_attack, base_defense, base_stamina, pokemon_name, type) {
        this.base_attack = base_attack;
        this.base_defense = base_defense;
        this.base_stamina = base_stamina;
        this.pokemon_name = pokemon_name;
        this.type = type;
        this.all_pokemons = [];
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
        return "Nom : " + this.pokemon_name +
            " ID : " + this.pokemon_id +
            " Forme : " + this.form +
            " Attaque : " + this.base_attack +
            " Défense : " + this.base_defense +
            " Endurance : " + this.base_stamina +
            " Type : " + this.type;
    }

    static importPokemon() {
        let lstPokemon = [];

        for (let i=0; i<pokemons.length; i++) {
            if (pokemons[i].form == "Normal") {
                // Partie pour récupérer le type du pokemon
                let types = [];
                for (let j=0; j<pokemon_types.length; j++) {
                    if (pokemon_types[j].form == "Normal" && pokemon_types[i].pokemon_name === pokemons[i].pokemon_name) {
                        types = pokemon_types[i].type;
                        break;
                    }
                }

                let poke = new Pokemon(pokemons[i].base_attack, pokemons[i].base_defense, pokemons[i].base_stamina, pokemons[i].pokemon_name, types);
                lstPokemon.push(poke);
            }
        }

        this.all_pokemons = lstPokemon;
    }

}

console.log(Pokemon.importPokemon());
console.log(Pokemon.all_pokemons[0]);