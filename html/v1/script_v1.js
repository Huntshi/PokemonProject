
// On récupère la class Pokemon
//Pokemon.importPokemon();

const tableBody = document.getElementById('tableBodyPokemon');

for (let pokemon of Pokemon.all_pokemons) {

    console.log(pokemon);

    const ligne = document.createElement('tr');
    const idCase = document.createElement('td');
    const nameCase = document.createElement('td');
    const generationCase = document.createElement('td');
    const typesCase = document.createElement('td');
    const enduranceCase = document.createElement('td');
    const attaqueCase = document.createElement('td');
    const defenseCase = document.createElement('td');
    const imageCase = document.createElement('td');

    idCase.textContent = pokemon.id;
    nameCase.textContent = pokemon.pokemon_name;
    generationCase.textContent = "Normal";
    typesCase.textContent = pokemon.type;
    enduranceCase.textContent = pokemon.base_stamina;
    attaqueCase.textContent = pokemon.base_attack;
    defenseCase.textContent = pokemon.base_defense;

    const image = document.createElement('img');
    //let nomImage = '../webp/images/' + Pokemon.all_pokemons[0].id + '.webp';
   
    //image.src = '../webp/images/' + Pokemon.id + '.webp';

    imageCase.appendChild(image);


    ligne.appendChild(idCase);
    ligne.appendChild(generationCase);
    ligne.appendChild(nameCase);
    ligne.appendChild(typesCase);
    ligne.appendChild(enduranceCase);
    ligne.appendChild(attaqueCase);
    ligne.appendChild(defenseCase);
    ligne.appendChild(imageCase);

    tableBody.appendChild(ligne);
}


function transformInt(id) {
    let stringId = id.toString();

    if (stringId.length == 1) {
        stringId = "00" + stringId;
    } else if (stringId.length == 2) {
        stringId = "0" + stringId;
    }

    return stringId;
}