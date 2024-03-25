
// On récupère la class Pokemon
//Pokemon.importPokemon();

const tableBody = document.getElementById('tableBodyPokemon');

for (let i = 0; i < Pokemon.length; i++) {

    const ligne = document.createElement('tr');
    const idCase = document.createElement('td');
    const nameCase = document.createElement('td');
    const generationCase = document.createElement('td');
    const typesCase = document.createElement('td');
    const enduranceCase = document.createElement('td');
    const attaqueCase = document.createElement('td');
    const defenseCase = document.createElement('td');
    const imageCase = document.createElement('td');

    idCase.textContent = Pokemon.id;
    nameCase.textContent = Pokemon.pokemon_name;
    generationCase.textContent = "Normal";
    typesCase.textContent = Pokemon.type;
    enduranceCase.textContent = Pokemon.base_stamina;
    attaqueCase.textContent = Pokemon.base_attack;
    defenseCase.textContent = Pokemon.base_defense;

    const image = document.createElement('img');
    //let nomImage = '../webp/images/' + Pokemon.all_pokemons[0].id + '.webp';

    let idNomImage = Pokemon.all_pokemons[0].id;
    idNomImage.toString();
    idNomImage = "00" + idNomImage;
    console.log(transformInt(100));

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