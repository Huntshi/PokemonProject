// Fonction pour récupérer la valeur saisie dans le champ argument
function getArgument() {
    return document.getElementById("argument").value;
}

// Test getPokemonsByType()
function testGetPokemonsByType() {
    console.log("Test getPokemonsByType() avec argument : " + getArgument());
    console.table(Pokemon.getPokemonsByType(getArgument()));
}

// Test getPokemonsByAttack()
function testGetPokemonsByAttack() {
    console.log("Test getPokemonsByAttack() avec argument : " + getArgument());
    console.table(Pokemon.getPokemonsByAttack(getArgument()));
}

// Test getAttacksByType()
function testGetAttacksByType() {
    console.log("Test getAttacksByType() avec argument : " + getArgument());
    console.table(Pokemon.getAttacksByType(getArgument()));
}

// Test sortPokemonByName()
function testSortPokemonByName() {
    console.log("Test sortPokemonByName()");
    console.table(Pokemon.sortPokemonByName());
}

// Test sortPokemonByStamina()
function testSortPokemonByStamina() {
    console.log("Test sortPokemonByStamina()");
    console.table(Pokemon.sortPokemonByStamina());
}

// Test getWeakestEnemies()
function testGetWeakestEnemies() {
    console.log("Test getWeakestEnemies() avec argument : " + getArgument());
    console.table(Pokemon.getWeakestEnemies(getArgument()));
}

// Test getBestAttackTypesForEnemy()
function testGetBestAttackTypesForEnemy() {
    console.log("Test getBestAttackTypesForEnemy() avec argument : " + getArgument());
    console.table(Pokemon.getBestAttackTypesForEnemy(getArgument()));
}
