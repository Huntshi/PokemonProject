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

// Tableau des couleurs des types et des icones respective
const typeColorsAndIcons = {
    "Normal": { color: "#A8A77A", icon: "../webp/images/08072021-normal-removebg-preview.png" },
    "Fire": { color: "#EE8130", icon: "../webp/images/08072021-feu-removebg-preview.png" },
    "Water": { color: "#6390F0", icon: "../webp/images/08072021-eau-removebg-preview.png" },
    "Electric": { color: "#F7D02C", icon: "../webp/images/08072021-electrik-removebg-preview.png" },
    "Grass": { color: "#7AC74C", icon: "../webp/images/08072021-plante-removebg-preview.png" },
    "Ice": { color: "#96D9D6", icon: "../webp/images/08072021-glace-removebg-preview.png" },
    "Fighting": { color: "#C22E28", icon: "../webp/images/08072021-combat-removebg-preview.png" },
    "Poison": { color: "#A33EA1", icon: "../webp/images/08072021-poison-removebg-preview.png" },
    "Ground": { color: "#E2BF65", icon: "../webp/images/08072021-sol-removebg-preview.png" },
    "Flying": { color: "#A98FF3", icon: "../webp/images/08072021-vol-removebg-preview.png" },
    "Psychic": { color: "#F95587", icon: "../webp/images/08072021-psy-removebg-preview.png" },
    "Bug": { color: "#A6B91A", icon: "../webp/images/08072021-insecte-removebg-preview.png" },
    "Rock": { color: "#B6A136", icon: "../webp/images/08072021-roche-removebg-preview.png" },
    "Ghost": { color: "#735797", icon: "../webp/images/08072021-spectre-removebg-preview.png" },
    "Dragon": { color: "#6F35FC", icon: "../webp/images/08072021-dragon-removebg-preview.png" },
    "Dark": { color: "#705746", icon: "../webp/images/08072021-tnbre-removebg-preview.png" },
    "Steel": { color: "#B7B7CE", icon: "../webp/images/08072021-acier-removebg-preview.png" },
    "Fairy": { color: "#D685AD", icon: "../webp/images/08072021-fe-removebg-preview.png" },
  };

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

        // Ajout d'un gestionnaire d'événements pour chaque ligne
        ligne.addEventListener('click', function() {
            displayPokemonContextMenu(event, pokemon);
        });

        idCase.textContent = pokemon.id;
        nameCase.textContent = pokemon.pokemon_name;
        generationCase.textContent = pokemon.generation;
        //typesCase.textContent = pokemon.type;
        enduranceCase.textContent = pokemon.base_stamina;
        attaqueCase.textContent = pokemon.base_attack;
        defenseCase.textContent = pokemon.base_defense;

        const typesDiv = document.createElement("div");
        typesDiv.className = "pokemon-types";

        pokemon.type.forEach((type) => {
        const typeTrimmed = type.trim();
    
        // Vérifiez si l'objet correspondant au type de Pokémon existe dans le tableau typeColorsAndIcons
        if (typeColorsAndIcons.hasOwnProperty(typeTrimmed)) {
        const typeIcon = document.createElement("img");
        typeIcon.src = typeColorsAndIcons[typeTrimmed].icon;
        typeIcon.width = 20;
        typeIcon.height = 20;
        typeIcon.alt = typeTrimmed + " Icon";
    
        const typeName = document.createElement("span");
        typeName.textContent = typeTrimmed;
        typeName.style.color = typeColorsAndIcons[typeTrimmed].color;
    
        typesDiv.appendChild(typeIcon);
        typesDiv.appendChild(typeName);
        } else {
        console.error("Erreur: le type de Pokémon '" + typeTrimmed + "' n'est pas trouvé dans typeColorsAndIcons.");
        }
    });

        typesCase.appendChild(typesDiv);

        const enduranceIcon = document.createElement('img');
        enduranceIcon.src = '../webp/images/donut-chart-fill.svg'; // Remplacez par le chemin réel de l'icône d'endurance
        enduranceIcon.width = 20;
        enduranceIcon.height = 20;
        enduranceIcon.alt = 'Endurance Icon';
        enduranceCase.textContent = pokemon.base_stamina;
        enduranceCase.appendChild(enduranceIcon);

        const attackIcon = document.createElement('img');
        attackIcon.src = '../webp/images/sword-fill.svg'; // Remplacez par le chemin réel de l'icône d'attaque
        attackIcon.width = 20;
        attackIcon.height = 20;
        attackIcon.alt = 'Attack Icon';
        attaqueCase.textContent = pokemon.base_attack;
        attaqueCase.appendChild(attackIcon);

        const defenseIcon = document.createElement('img');
        defenseIcon.src = '../webp/images/shield-fill.svg'; // Remplacez par le chemin réel de l'icône de défense
        defenseIcon.width = 20;
        defenseIcon.height = 20;
        defenseIcon.alt = 'Defense Icon';
        defenseCase.textContent = pokemon.base_defense;
        defenseCase.appendChild(defenseIcon);

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

// Fonction qui affiche le menu contextuel avec les informations d'un Pokémon
function displayPokemonContextMenu(event, pokemon) {
    event.preventDefault();
    const popup = document.getElementById('pokemonPopup');
    const popupId = document.getElementById('popupId');
    const popupNom = document.getElementById('popupNom');
    const popupGeneration = document.getElementById('popupGeneration');
    const popupType = document.getElementById('popupType');
    const popupEndurance = document.getElementById('popupEndurance');
    const popupAttaque = document.getElementById('popupAttaque');
    const popupDefense = document.getElementById('popupDefense');
    const popupAttacks = document.getElementById('popupAttacks');
    const popupImage = document.getElementById('popupImage');
  
    popupId.textContent = "ID: " + pokemon.id;
    popupNom.textContent = "Nom: " + pokemon.pokemon_name;
    popupGeneration.textContent = "Génération: " + pokemon.generation;
    popupType.textContent = "Type: " + pokemon.type;
    popupEndurance.textContent = "Endurance: " + pokemon.base_stamina;
    popupAttaque.textContent = "Attaque: " + pokemon.base_attack;
    popupDefense.textContent = "Défense: " + pokemon.base_defense;
    popupAttacks.textContent = "Attaques: " + pokemon.getAttacks;
    popupImage.src = "../webp/images/" + transformInt(pokemon.id) + ".webp";
  
    if (!popup || !popupId || !popupNom || !popupGeneration || !popupType || !popupEndurance || !popupAttaque || !popupDefense || !popupImage) {
      console.error("Erreur: Un ou plusieurs éléments de la popup ne sont pas définis.");
      return;
    }
  
  
    popup.style.display = 'block';
}
  
// Fonction pour fermer le menu contextuel
function closePokemonContextMenu() {
    const contextMenu = document.getElementById('pokemonPopup');
    contextMenu.style.display = 'none';
}
  
// Ajout d'un gestionnaire d'événements pour fermer le menu contextuel lorsque la croix est cliquée
const closeContextMenuButton = document.getElementById('closeContextMenu');
closeContextMenuButton.addEventListener('click', function (event) {
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
