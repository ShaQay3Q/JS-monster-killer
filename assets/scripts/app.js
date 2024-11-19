const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 14;
const MONSTER_STRONG_ATTACK_VALUE = 19;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

// Determine the winner
function endgameEvaluation(mHealth, pHealth) {
	if (mHealth <= 0 && pHealth > 0) {
		alert("Player Won!");
	}
	if (pHealth <= 0 && mHealth > 0) {
		alert("Monster Won!");
	}
	if (pHealth <= 0 && mHealth <= 0) {
		alert("We Have a Draw!");
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
function generalAttackHandler(nAttack, sAttack) {
	const attackResult = damageCalc(nAttack, sAttack);
	endgameEvaluation(attackResult[0], attackResult[1]);

	console.log(`monsterDamage: ${attackResult[0]}`);
	console.log(`playerDamage: ${attackResult[1]}`);
}

// Get attack modes (normal, strong) and pass them to attack handler
function attack(mode) {
	let maxDamageOnMonster;
	let maxDamageOnPlayer;

	if (mode === "ATTACK") {
		maxDamageOnMonster = ATTACK_VALUE;
		maxDamageOnPlayer = MONSTER_ATTACK_VALUE;
	}
	if (mode === "STRON_ATTACK") {
		maxDamageOnMonster = STRONG_ATTACK_VALUE;
		maxDamageOnPlayer = MONSTER_STRONG_ATTACK_VALUE;
	}
	console.log(`maxDamageOnMonster: ${maxDamageOnMonster}`);
	console.log(`maxDamageOnPlayer: ${maxDamageOnPlayer}`);

	generalAttackHandler(maxDamageOnMonster, maxDamageOnPlayer);
}

function onClickAttack() {
	attack("ATTACK");
}

function onClickStrongAttack() {
	attack("STRON_ATTACK");
}

// attackBtn.addEventListener("click", attackHandler);
attackBtn.addEventListener("click", onClickAttack);
// strongAttackBtn.addEventListener("click", strongAttackHandler);
strongAttackBtn.addEventListener("click", onClickStrongAttack);

function healPlayerHander() {
	currentHealth = playerHealthBar.value;
	playerHealthBar.value = currentMonsterHealth + HEAL_VALUE;
}

healBtn.addEventListener("click", healPlayerHander);
