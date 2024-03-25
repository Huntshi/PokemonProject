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

    get getTypes() {
        let types = [];

        for (let i in this.type) {
            for (let j in Type.all_types) {
                if (this.type[i] == Type.all_types[j].type_name) {
                    types.push(Type.all_types[j]);
                }
            }
        }

        return types;
    }

    get getAttacks() {
        let attaques = [];

        for (let i in this.attack) {
            for (let j in Attack.all_attack) {
                if (this.attack[i] == Attack.all_attack[j].name) {
                    attaques.push(Attack.all_attack[j]);
                }
            }
        }

        return attaques;
    }

    toString() {
        /*let typesString = this.getTypes.map(type => type.toString()).join(", ");
        let attacksString = this.getAttacks.map(attack => attack.toString()).join(", ");*/
    
        return "Id : " + this.id +
            "\nNom : " + this.pokemon_name +
            "\nAttaque de base : " + this.base_attack +
            "\nDéfense de base : " + this.base_defense +
            "\nEndurance de base : " + this.base_stamina +
            "\nTypes : " + this.type.join(", ")/*typesString*/ +
            "\n\nAttaques : \n" + this.attack.join(", ")/*attacksString*/;
    }    

    static importPokemon() {
        let lstPokemon = [];

        Type.importType();
        Attack.importAttack();

        for (let i=0; i<pokemons.length; i++) {
            if (pokemons[i].form == "Normal") {
                // Partie pour récupérer les types du pokemon
                let types = [];
                for (let j=0; j<pokemon_types.length; j++) {
                    if (pokemon_types[j].form == "Normal" && pokemon_types[j].pokemon_name == pokemons[i].pokemon_name) {
                        let typesTmp = pokemon_types[j].type;
                        for (let g=0; g<typesTmp.length; g++) {
                            for (let k in Type.all_types) {
                                if (Type.all_types[k]["type_name"] == typesTmp[g]) {
                                    let type = Type.all_types[k];
                                    types.push(type.type_name);

                                    break;
                                }
                            }
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
                            for (let attack in Attack.all_attack) {
                                if (Attack.all_attack[attack].name == attackChargeTmp[f] && Attack.all_attack[attack].fast == false) {
                                    attaques.push(Attack.all_attack[attack].name);

                                    break;
                                }
                            }
                        }

                        let attackFastTmp = pokemon_moves[j].fast_moves;

                        for (let f=0; f<attackFastTmp.length; f++) {
                            for (let attack in Attack.all_attack) {
                                if (Attack.all_attack[attack].name == attackFastTmp[f] && Attack.all_attack[attack].fast == true) {
                                    attaques.push(Attack.all_attack[attack].name);

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

    static getPokemonsByType(typeName) {
        let lstPokemon = [];

        for (let elt in Pokemon.all_pokemons) {
            for (let i in Pokemon.all_pokemons[elt].type) {
                if (Pokemon.all_pokemons[elt].type[i] == typeName) {
                    lstPokemon.push(Pokemon.all_pokemons[elt]);
                }
            }
        }

        return lstPokemon;
    }

    static getPokemonsByAttack(attackName) {
        let lstPokemon = [];

        for (let elt in Pokemon.all_pokemons) {
            for (let i in Pokemon.all_pokemons[elt].attack) {
                if (Pokemon.all_pokemons[elt].attack[i] == attackName) {
                    lstPokemon.push(Pokemon.all_pokemons[elt]);
                }
            }
        }

        return lstPokemon;
    }

    static getAttacksByType(typeName) {
        let lstAttack = [];

        for (let elt in Attack.all_attack) {
            if (Attack.all_attack[elt].type == typeName) {
                lstAttack.push(Attack.all_attack[elt]);
            }
        }

        return lstAttack;
    }

    static sortPokemonByName() {
        return Pokemon.all_pokemons.sort((a, b) => {
            const nameA = a.pokemon_name.toUpperCase(); // Convertir en majuscules pour comparer
            const nameB = b.pokemon_name.toUpperCase();
    
            if (nameA < nameB) {
                return -1; // Le nom de a vient avant le nom de b dans l'ordre alphabétique
            }
            if (nameA > nameB) {
                return 1; // Le nom de a vient après le nom de b dans l'ordre alphabétique
            }
            return 0; // Les noms sont identiques
        });
    }

    static sortPokemonByStamina() {
        return this.all_pokemons.sort((a, b) => b.base_stamina - a.base_stamina);
    }

    static getWeakestEnemies(attack) {
        let lstFaiblesse = [];

        // Récupérer l'attaque à partir de son nom
        let attaqueType = Attack.all_attack.find(attaque => attaque.name === attack);

        // Vérifier si l'attaque existe
        if (!attaqueType) {
            console.error("L'attaque spécifiée n'existe pas.");
            return lstFaiblesse; // Renvoyer une liste vide si l'attaque n'existe pas
        }
        attaqueType = attaqueType.type;

        for (let pokemon of Pokemon.all_pokemons) {
            let efficace = 1;

            for (let typeDefense of pokemon.type) {
                for (let type of Type.all_types) {
                    if (type.type_name === attaqueType) {
                        efficace = efficace * type.type_effectiveness_name[typeDefense];
                    }
                }
            }

            if (efficace > 1) {
                lstFaiblesse.push(pokemon);
            }
        }

        return lstFaiblesse;
    }

    static getBestAttackTypesForEnemy(name) {
        let bestAttackTypes = [];
    
        // Récupérer le Pokémon à partir de son nom
        let pokemon = Pokemon.all_pokemons.find(pokemon => pokemon.pokemon_name === name);
    
        // Vérifier si le Pokémon existe
        if (!pokemon) {
            console.error("Le Pokémon spécifié n'existe pas.");
            return bestAttackTypes; // Renvoyer une liste vide si le Pokémon n'existe pas
        }
    
        // Parcourir tous les types d'attaque pour trouver les plus efficaces
        for (let attack of Attack.all_attack) {
            let weakestEnemies = this.getWeakestEnemies(attack.name); // Utiliser la fonction existante
    
            // Vérifier si le Pokémon est dans la liste des ennemis les plus faibles
            if (weakestEnemies.includes(pokemon)) {
                if (!bestAttackTypes.includes(attack.type)) {
                    bestAttackTypes.push(attack.type); // Ajouter le type d'attaque à la liste des meilleurs types
                }
            }
        }
    
        return bestAttackTypes;
    }
    
}

<<<<<<< HEAD:html/data/pokemon.js
Pokemon.importPokemon();
//console.log(Pokemon.all_pokemons[0].toString());
=======
Pokemon.importPokemon();
>>>>>>> 8651e757ac83bc000a7014ef9f52d498c141efbf:PokemonProject/JSON/pokemon.js
