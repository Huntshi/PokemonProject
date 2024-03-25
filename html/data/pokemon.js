// Création de la class Pokemon
class Pokemon {
    constructor(id, pokemon_name, base_attack, base_defense, base_stamina, type, attack) {
        this.id = id;
        this.pokemon_name = pokemon_name;
        this.base_attack = base_attack;
        this.base_defense = base_defense;
        this.base_stamina = base_stamina;
        this.type = type;
        this.attack = attack;
        this.all_pokemons = [];
    }

    get getId() {
        return this.id;
    }

    get getPokemon_name() {
        return this.pokemon_name;
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

    get getType() {
        return this.type;
    }

    get getAttack() {
        return this.attack;
    }

    toString() {
        let typesString = this.type.map(type => type.toString()).join(", ");
        let attacksString = this.attack.map(attack => attack.toString()).join(", ");
    
        return "Id : " + this.id +
            "\nNom : " + this.pokemon_name +
            "\nAttaque de base : " + this.base_attack +
            "\nDéfense de base : " + this.base_defense +
            "\nEndurance de base : " + this.base_stamina +
            "\nTypes : " + typesString +
            "\nAttaques : " + attacksString;
    }    

    static importPokemon() {
        let lstPokemon = [];

        for (let i=0; i<pokemons.length; i++) {
            if (pokemons[i].form == "Normal") {
                // Partie pour récupérer les types du pokemon
                let types = [];
                for (let j=0; j<pokemon_types.length; j++) {
                    if (pokemon_types[j].form == "Normal" && pokemon_types[j].pokemon_name == pokemons[i].pokemon_name) {
                        let typesTmp = pokemon_types[j].type;
                        for (let g=0; g<typesTmp.length; g++) {
                            let type = new Type(typesTmp[g], type_effectiveness[typesTmp[g]]);
                            types.push(type);
                        }

                        break;
                    }
                }

                // Partie pour récupérer les attaques du pokémons
                let attaques = [];
                for (let j=0; j<pokemon_moves.length; j++) {
                    if (pokemon_moves[j].form == "Normal" && pokemon_moves[j].pokemon_name == pokemons[i].pokemon_name) {
                        let attackChargeTmp = pokemon_moves[j].charged_moves;
                        
                        for (let f=0; f<attackChargeTmp.length; f++) {
                            for (let g=0; g<charged_moves.length; g++) {
                                if (charged_moves[g].name == attackChargeTmp[f]) {
                                    let attack = new Attack(charged_moves[g].type, charged_moves[g].name, charged_moves[g].duration, charged_moves[g].energy_delta, charged_moves[g].power, charged_moves[g].stamina_loss_scaler, charged_moves[g].critical_chance, false);
                                    attaques.push(attack);

                                    break;
                                }
                            }
                        }

                        let attackFastTmp = pokemon_moves[j].fast_moves;
                        
                        for (let f=0; f<attackFastTmp.length; f++) {
                            for (let g=0; g<fast_moves.length; g++) {
                                if (fast_moves[g].name == attackFastTmp[f]) {
                                    let attack = new Attack(fast_moves[g].type, fast_moves[g].name, fast_moves[g].duration, fast_moves[g].energy_delta, fast_moves[g].power, fast_moves[g].stamina_loss_scaler, 0, true);
                                    attaques.push(attack);

                                    break;
                                }
                            }
                        }
                    }
                }

                let poke = new Pokemon(pokemons[i].pokemon_id, pokemons[i].pokemon_name, pokemons[i].base_attack, pokemons[i].base_defense, pokemons[i].base_stamina, types, attaques);
                lstPokemon.push(poke);
            }
        }

        this.all_pokemons = lstPokemon;
    }
}

Pokemon.importPokemon();
//console.log(Pokemon.all_pokemons[0].toString());