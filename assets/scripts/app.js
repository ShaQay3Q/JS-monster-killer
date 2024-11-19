const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 14;
const MONSTER_STRONG_ATTACK_VALUE = 19;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

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

function damageCalc(pAttackValue, mttackvalue) {
	const monsterDamage = dealMonsterDamage(pAttackValue);
	currentMonsterHealth -= monsterDamage;
	const palyerDamage = dealPlayerDamage(mttackvalue);
	currentPlayerHealth -= palyerDamage;

	return [currentMonsterHealth, currentPlayerHealth];
}

function attackHandler() {
	const attackResult = damageCalc(ATTACK_VALUE, STRONG_ATTACK_VALUE);
	endgameEvaluation(attackResult[0], attackResult[1]);

	console.log(`monsterDamage: ${attackResult[0]}`);
	console.log(`playerDamage: ${attackResult[1]}`);
}

function strongAttackHandler() {
	const attackResult = damageCalc(
		STRONG_ATTACK_VALUE,
		MONSTER_STRONG_ATTACK_VALUE
	);
	endgameEvaluation(attackResult[0], attackResult[1]);

	console.log(`monsterDamage: ${attackResult[0]}`);
	console.log(`playerDamage: ${attackResult[1]}`);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
