// Définition de la taille des pages
const pageSize = 25;

// Récupérer la page actuelle depuis le stockage local
let currentPage = localStorage.getItem('currentPage') || 1;

// Récupérer l'état actuel du filtre de génération depuis le stockage local
let currentFilter = localStorage.getItem('currentFilter') || 'all';

// Récupérer l'état actuel du filtre de type depuis le stockage local
let currentTypeFilter = localStorage.getItem('currentTypeFilter') || 'all';

// Récupérer l'état actuel du filtre de nom depuis le stockage local
let currentNameFilter = localStorage.getItem('currentNameFilter') || '';

// Tableau de tri par colonne
const sortMethods = {
    'id': 'asc',
    'nom': 'asc',
    'generation': 'asc',
    'types': 'asc',
    'endurance': 'asc',
    'attaque': 'asc',
    'defense': 'asc'
};

function sortPokemon(column) {
    // Inversion de l'ordre de tri si le tri actuel est sur la même colonne
    if (sortMethods[column] === 'asc') {
        sortMethods[column] = 'desc';
    } else {
        sortMethods[column] = 'asc';
    }

    // Tri des Pokémon en fonction de la colonne spécifiée
    if (column === 'id') {
        // Tri des Pokémon uniquement par l'identifiant
        Pokemon.all_pokemons.sort((a, b) => {
            return sortMethods['id'] === 'asc' ? a['id'] - b['id'] : b['id'] - a['id'];
        });
    } else if (column === 'generation') {
        // Tri des Pokémon par génération
        Pokemon.all_pokemons.sort((a, b) => {
            return sortMethods['generation'] === 'asc' ? a['generation'] - b['generation'] : b['generation'] - a['generation'];
        });
    } else if (column === 'nom') {
        // Tri des Pokémon par nom
        Pokemon.all_pokemons.sort((a, b) => {
            return sortMethods['nom'] === 'asc' ? a['pokemon_name'].localeCompare(b['pokemon_name']) : b['pokemon_name'].localeCompare(a['pokemon_name']);
        });
    } else if (column === 'endurance') {
        // Tri des Pokémon par endurance
        Pokemon.all_pokemons.sort((a, b) => {
            return sortMethods['endurance'] === 'asc' ? a['base_stamina'] - b['base_stamina'] : b['base_stamina'] - a['base_stamina'];
        });
    } else if (column === 'attaque') {
        // Tri des Pokémon par attaque
        Pokemon.all_pokemons.sort((a, b) => {
            return sortMethods['attaque'] === 'asc' ? a['base_attack'] - b['base_attack'] : b['base_attack'] - a['base_attack'];
        });
    } else if (column === 'defense') {
        // Tri des Pokémon par défense
        Pokemon.all_pokemons.sort((a, b) => {
            return sortMethods['defense'] === 'asc' ? a['base_defense'] - b['base_defense'] : b['base_defense'] - a['base_defense'];
        });
    } else if (column === 'types') {
        // Tri des Pokémon par type
        Pokemon.all_pokemons.sort((a, b) => {
            const typeA = a['type'][0]; // Prend le premier type pour trier
            const typeB = b['type'][0];
            return sortMethods['types'] === 'asc' ? typeA.localeCompare(typeB) : typeB.localeCompare(typeA);
        });
    }

    // Rappel de la fonction de rendu pour mettre à jour l'affichage des Pokémon
    renderPokemonPage(currentPage);
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

function renderPokemonPage(pageNumber) {
    const tableBody = document.getElementById('tableBodyPokemon');
    tableBody.innerHTML = '';

    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;

    for (let i = start; i < end && i < Pokemon.all_pokemons.length; i++) {
        const pokemon = Pokemon.all_pokemons[i];
        if ((currentFilter === 'all' || pokemon.generation == currentFilter) && 
            (currentTypeFilter === 'all' || pokemon.type.includes(currentTypeFilter)) &&
            (currentNameFilter === '' || pokemon.pokemon_name.toLowerCase().includes(currentNameFilter))) {
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
        if (Object.hasOwnProperty.call(pokemon, prop) && (prop !== 'all_pokemons')) {
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

// Ajout de gestionnaires d'événements pour les clics sur les boutons "Suivant" et "Précédent" pour fermer le menu contextuel
const nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', closePokemonContextMenu);

const previousButton = document.getElementById('previousButton');
previousButton.addEventListener('click', closePokemonContextMenu);

// Fonction pour filtrer les Pokémon en fonction de la génération sélectionnée
function filterPokemonByGeneration() {
    const generationSelect = document.getElementById('generationSelect');
    const selectedGeneration = generationSelect.value;
    currentFilter = selectedGeneration;
    localStorage.setItem('currentFilter', currentFilter);

    // Rappel de la fonction de rendu pour mettre à jour l'affichage des Pokémon
    renderPokemonPage(currentPage);
}

// Ajout d'un gestionnaire d'événements pour le changement de sélection dans le filtre de génération
const generationSelect = document.getElementById('generationSelect');
generationSelect.addEventListener('change', filterPokemonByGeneration);

// Fonction pour filtrer les Pokémon en fonction du type sélectionné
function filterPokemonByType() {
    const typeSelect = document.getElementById('typeSelect');
    const selectedType = typeSelect.value;
    currentTypeFilter = selectedType;
    localStorage.setItem('currentTypeFilter', currentTypeFilter);

    // Rappel de la fonction de rendu pour mettre à jour l'affichage des Pokémon
    renderPokemonPage(currentPage);
}

// Ajout d'un gestionnaire d'événements pour le changement de sélection dans le filtre de type
const typeSelect = document.getElementById('typeSelect');
typeSelect.addEventListener('change', filterPokemonByType);

// Fonction pour filtrer les Pokémon en fonction du nom saisi
function filterPokemonByName() {
    const nameFilterInput = document.getElementById('nameFilter');
    currentNameFilter = nameFilterInput.value.trim().toLowerCase();
    localStorage.setItem('currentNameFilter', currentNameFilter);

    // Rappel de la fonction de rendu pour mettre à jour l'affichage des Pokémon
    renderPokemonPage(currentPage);
}

// Ajout d'un gestionnaire d'événements pour le changement dans le champ de filtre de nom
const nameFilterInput = document.getElementById('nameFilter');
nameFilterInput.addEventListener('input', filterPokemonByName);

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
