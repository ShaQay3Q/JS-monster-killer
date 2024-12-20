const monsterHealthBar = document.getElementById("monster-health");
const playerHealthBar = document.getElementById("player-health");
const bonusLifeEl = document.getElementById("bonus-life");

const attackBtn = document.getElementById("attack-btn");
const strongAttackBtn = document.getElementById("strong-attack-btn");
const healBtn = document.getElementById("heal-btn");
const logBtn = document.getElementById("log-btn");

function adjustHealthBars(maxLife) {
	monsterHealthBar.max = maxLife;
	monsterHealthBar.value = maxLife;
	playerHealthBar.max = maxLife;
	playerHealthBar.value = maxLife;
}

// // Function to deal damage to the player
// function dealPlayerDamage(damage) {
// 	// Calculate player damage (e.g., based on player's stats or random factor)
// 	const playerDamage = Math.max(0, damage); // Ensure no negative damage
// 	return playerDamage;
// }

// // Function to deal damage to the monster
// function dealMonsterDamage(damage) {
// 	// Calculate monster damage (e.g., based on monster's attack power)
// 	const monsterDamage = Math.max(0, damage); // Ensure no negative damage
// 	return monsterDamage;
// }

function dealMonsterDamage(damage) {
	const dealtDamage = Math.random() * damage;
	monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
	return dealtDamage;
}

function dealPlayerDamage(damage) {
	const dealtDamage = Math.random() * damage;
	playerHealthBar.value = +playerHealthBar.value - dealtDamage;
	return dealtDamage;
}

function increasePlayerHealth(healValue) {
	// the + before playerHealthBar function as if using parseNumber()
	playerHealthBar.value = +playerHealthBar.value + healValue;
	console.log(playerHealthBar.value);
}

function resetGame(value) {
	playerHealthBar.value = value;
	monsterHealthBar.value = value;
}

function removeBonusLife() {
	bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function setPlayerHealth(health) {
	playerHealthBar.value = health;
}
