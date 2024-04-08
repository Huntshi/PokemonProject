var compteur = 25;

function chargerPokemon(N) {

    const tableBody = document.getElementById('tableBodyPokemon');
    /*const tableRows = tableBody.getElementsByTagName('tr');

    while (tableRows.length > 0) {
        tableRows[0].parentNode.removeChild(tableRows[0]);
    }*/

    for (let i = N - 25; i < N; i++) {

        let pokemon = Pokemon.all_pokemons[i];

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

function supprimerLignes(N) {
    const tableBody = document.getElementById('tableBodyPokemon');

    if (!tableBody || N <= 0) {
        return;
    }



    for (let j = 0; j < N; j++) {
        tableBody.deleteRow(0);
    }
}

function PokemonsSuivant() {
    if (Pokemon.all_pokemons.length < compteur + 25) {
        compteur = Pokemon.all_pokemons.length;
        supprimerLignes(25);
        chargerPokemon(compteur);
    } else {
        compteur += 25;
        supprimerLignes(25);
        chargerPokemon(compteur);
    }


}

function PokemonPrecedent() {
    console.log(compteur);
    if (compteur - 25 > 0) {
        compteur -= 25;
        supprimerLignes(25);
        chargerPokemon(compteur);
    } else if (compteur - 50 < 25) {
        console.log(compteur);

        compteur = 25;
        supprimerLignes(25);
        chargerPokemon(compteur);
    }

}

chargerPokemon(compteur);