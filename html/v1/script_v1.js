function transformInt(id) {
    let stringId = id.toString();

    if (stringId.length == 1) {
        stringId = "00" + stringId;
    } else if (stringId.length == 2) {
        stringId = "0" + stringId;
    }

    return stringId;
}

const tableBody = document.getElementById('tableBodyPokemon');

for (let pokemon of Pokemon.all_pokemons) {
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
    generationCase.textContent = pokemon.generation;
    typesCase.textContent = pokemon.type;
    enduranceCase.textContent = pokemon.base_stamina;
    attaqueCase.textContent = pokemon.base_attack;
    defenseCase.textContent = pokemon.base_defense;

    const image = document.createElement('img');

    let imageId = transformInt(pokemon.id);
    image.src = "../webp/images/" + imageId + ".webp";
    image.height = "150";
    image.width = "150";
    image.alt = pokemon.pokemon_name;

    imageCase.appendChild(image);

    ligne.appendChild(idCase);
    ligne.appendChild(nameCase);
    ligne.appendChild(generationCase);
    ligne.appendChild(typesCase);
    ligne.appendChild(enduranceCase);
    ligne.appendChild(attaqueCase);
    ligne.appendChild(defenseCase);
    ligne.appendChild(imageCase);

    tableBody.appendChild(ligne);
}