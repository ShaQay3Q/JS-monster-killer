const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 14;
const MONSTER_STRONG_ATTACK_VALUE = 19;
const HEAL_VALUE = 20;
const MODE_ATTACK = "ATTACK"; // or MODE_ATTACK = 0
const MODE_STRONG_ATTACK = "STRONG_ATTACK"; // or MODE_STRONG_ATTACK = 1

let chosenMaxLife = Number(prompt("Maximum life for the game: ", "100"));
while (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
	chosenMaxLife = +prompt("Maximum life for the game: ", "100");
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

function reset() {
	currentMonsterHealth = chosenMaxLife;
	currentPlayerHealth = chosenMaxLife;
	resetGame(chosenMaxLife);
}

adjustHealthBars(chosenMaxLife);

// Determine the winner
function endgameEvaluation(mHealth, pHealth) {
	const initialPH = currentPlayerHealth;

	if (currentPlayerHealth <= 0 && bonusLifeEl) {
		hasBonusLife = false;
		removeBonusLife();
		currentPlayerHealth = initialPH;
	}
	if (mHealth <= 0 && pHealth > 0) {
		alert("Player Won!");
	}
	if (pHealth <= 0 && mHealth > 0) {
		alert("Monster Won!");
	}
	if (pHealth <= 0 && mHealth <= 0) {
		alert("We Have a Draw!");
	}
	if (pHealth <= 0 || mHealth <= 0) {
		reset();
	}
}

function monsterAttack() {
	// Deal damage to the monster
	const monsterDamage = dealMonsterDamage(MONSTER_ATTACK_VALUE);
	console.log(`Monster dealt damage: ${monsterDamage}`);
	currentMonsterHealth -= monsterDamage;

	// Deal damage to the player
	const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
	console.log(`Player received damage: ${playerDamage}`);
	currentPlayerHealth -= playerDamage;

	// Check if the player has bonus life and handle the scenario where the player might have bonus life
	if (currentPlayerHealth <= 0 && hasBonusLife) {
		hasBonusLife = false;
		removeBonusLife(); // Remove the bonus life element
		currentPlayerHealth = chosenMaxLife; // Reset player health after bonus life is used
		alert("You would be dead, but the bonus life saved you!");
	}

	// Call the function to evaluate the endgame
	endgameEvaluation(currentMonsterHealth, currentPlayerHealth);
}

function endRound() {
	// console.log(`monsterDamage: ${damage}`);
	// console.log(`monsterHealth: ${currentMonsterHealth}`);
	const playerDamae = dealPlayerDamage(ATTACK_VALUE);
	// console.log(`playerDamage: ${palyerDamage}`);
	currentPlayerHealth -= playerDamae;
	// console.log(`playerHealth01: ${currentPlayerHealth}`);
	if (currentPlayerHealth <= 0 && bonusLifeEl) {
		hasBonusLife = false;
		removeBonusLife();
		currentPlayerHealth = initialPH;
		alert("You would be dead, but the bonus life saved you!");
		setPlayerHealth(initialPH);
	}
	if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
		alert("Player Won!");
		reset();
	}
	if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
		alert("Monster Won!");
		reset();
	}
	if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
		alert("Have a Draw!");
		reset();
	}
}
// Calculate the damage on Monster and Player
function damageCalc(pAttackValue, mttackvalue) {
	const monsterDamage = dealMonsterDamage(pAttackValue);
	currentMonsterHealth -= monsterDamage;
	const palyerDamage = dealPlayerDamage(mttackvalue);
	currentPlayerHealth -= palyerDamage;

	return [currentMonsterHealth, currentPlayerHealth];
}

// Handler for normal attacks
function attackHandler() {
	const attackResult = damageCalc(ATTACK_VALUE, STRONG_ATTACK_VALUE);
	endgameEvaluation(attackResult[0], attackResult[1]);

	console.log(`monsterDamage: ${attackResult[0]}`);
	console.log(`playerDamage: ${attackResult[1]}`);
}

// Handler for strong attacks
function strongAttackHandler() {
	const attackResult = damageCalc(
		STRONG_ATTACK_VALUE,
		MONSTER_STRONG_ATTACK_VALUE
	);
	endgameEvaluation(attackResult[0], attackResult[1]);

	console.log(`monsterDamage: ${attackResult[0]}`);
	console.log(`playerDamage: ${attackResult[1]}`);
}

// Halder for both type of attacks
function generalAttackHandler(pAttack, mAttack) {
	const attackResult = damageCalc(pAttack, mAttack);
	endgameEvaluation(attackResult[0], attackResult[1]);

	console.log(`monsterDamage: ${attackResult[0]}`);
	console.log(`playerDamage: ${attackResult[1]}`);
}

// Get attack modes (normal, strong) and pass them to attack handler
function attack(mode) {
	let maxDamageOnMonster;
	let maxDamageOnPlayer;

	if (mode === MODE_ATTACK) {
		maxDamageOnMonster = ATTACK_VALUE;
		maxDamageOnPlayer = MONSTER_ATTACK_VALUE;
	}
	if (mode === MODE_STRONG_ATTACK) {
		maxDamageOnMonster = STRONG_ATTACK_VALUE;
		maxDamageOnPlayer = MONSTER_STRONG_ATTACK_VALUE;
	}
	console.log(`maxDamageOnMonster: ${maxDamageOnMonster}`);
	console.log(`maxDamageOnPlayer: ${maxDamageOnPlayer}`);

	generalAttackHandler(maxDamageOnMonster, maxDamageOnPlayer);
}

function onClickAttack() {
	attack(MODE_ATTACK);
}

function onClickStrongAttack() {
	attack(MODE_STRONG_ATTACK);
}

// attackBtn.addEventListener("click", attackHandler);
attackBtn.addEventListener("click", onClickAttack);
// strongAttackBtn.addEventListener("click", strongAttackHandler);
strongAttackBtn.addEventListener("click", onClickStrongAttack);

function healPlayerHander() {
	let healValue;

	if (bonusLifeEl.innerHTML) {
		if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
			alert("You can't heal more than your max initial health!");
			healValue = chosenMaxLife - currentPlayerHealth;
		} else {
			healValue = HEAL_VALUE;
		}
		// playerHealthBar.value = Number(playerHealthBar.value) + HEAL_VALUE;
		increasePlayerHealth(healValue);
		currentPlayerHealth += healValue;
		endRound();
		// attackMonster();
		monsterAttack();
		removeBonusLife();
	}
}

healBtn.addEventListener("click", healPlayerHander);
