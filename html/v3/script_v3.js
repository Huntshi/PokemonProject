// Définition de la taille des pages
const pageSize = 25;

// Récupérer la page actuelle depuis le stockage local
let currentPage = localStorage.getItem('currentPage') || 1;

function transformInt(id) {
    let stringId = id.toString();

    if (stringId.length == 1) {
        stringId = "00" + stringId;
    } else if (stringId.length == 2) {
        stringId = "0" + stringId;
    }

    return stringId;
}

function renderPokemonPage(pageNumber) {
    const tableBody = document.getElementById('tableBodyPokemon');
    tableBody.innerHTML = '';

    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;

    for (let i = start; i < end && i < Pokemon.all_pokemons.length; i++) {
        const pokemon = Pokemon.all_pokemons[i];
        const ligne = document.createElement('tr');
        const idCase = document.createElement('td');
        const nameCase = document.createElement('td');
        const generationCase = document.createElement('td');
        const typesCase = document.createElement('td');
        const enduranceCase = document.createElement('td');
        const attaqueCase = document.createElement('td');
        const defenseCase = document.createElement('td');
        const imageCase = document.createElement('td');

        // Ajoutez un gestionnaire d'événements pour chaque ligne
        ligne.addEventListener('click', function() {
            displayPokemonContextMenu(event, pokemon);
        });

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

    // Désactiver le bouton "Suivant" si nous sommes sur la dernière page
    const nextButton = document.getElementById('nextButton');
    if (end >= Pokemon.all_pokemons.length) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }

    // Désactiver le bouton "Précédent" si nous sommes sur la première page
    const previousButton = document.getElementById('previousButton');
    previousButton.disabled = pageNumber === 1;

    // Enregistrer la page actuelle dans le stockage local
    localStorage.setItem('currentPage', pageNumber);
}

// Fonction pour afficher le menu contextuel avec les informations du Pokémon
function displayPokemonContextMenu(event, pokemon) {
    event.preventDefault(); // Empêcher le comportement par défaut du clic
    const contextMenu = document.getElementById('pokemonContextMenu');
    const contextMenuText = document.getElementById('contextMenuText');

    // Réinitialiser le contenu du menu contextuel
    contextMenuText.innerHTML = '';

    // Parcourir les propriétés de l'objet pokemon et les ajouter au menu contextuel
    for (const prop in pokemon) {
        if (Object.hasOwnProperty.call(pokemon, prop)) {
            const propValue = pokemon[prop];
            const menuItem = document.createElement('p');
            menuItem.textContent = `${prop}: ${propValue}`;
            contextMenuText.appendChild(menuItem);
        }
    }

    // Positionner le menu contextuel par rapport à la position du clic
    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.style.top = `${event.pageY}px`;
    contextMenu.style.display = 'block';
}


// Fonction pour fermer le menu contextuel
function closePokemonContextMenu() {
    const contextMenu = document.getElementById('pokemonContextMenu');
    contextMenu.style.display = 'none';
}

// Ajout d'un gestionnaire d'événements pour fermer le menu contextuel lorsque la croix est cliquée
const closeContextMenuButton = document.getElementById('closeContextMenu');
closeContextMenuButton.addEventListener('click', function(event) {
    event.stopPropagation(); // Empêcher la propagation du clic pour éviter la fermeture du menu contextuel
    closePokemonContextMenu();
});

function nextPage() {
    currentPage++;
    renderPokemonPage(currentPage);
}

function previousPage() {
    currentPage--;
    if (currentPage < 1) {
        currentPage = 1;
    }
    renderPokemonPage(currentPage);
}

// Afficher la première page initialement
renderPokemonPage(currentPage);
