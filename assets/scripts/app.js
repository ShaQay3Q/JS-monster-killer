const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
	const monsterDamage = dealMonsterDamage(ATTACK_VALUE);
	currentMonsterHealth -= monsterDamage;
	const palyerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
	currentPlayerHealth -= palyerDamage;
	if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
		alert("You Won!");
	}
	if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
		alert("Monster Won!");
	}
	if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
		alert("You have a Draw!");
	}
	console.log(`monsterDamage: ${monsterDamage}`);
	console.log(`playerDamage: ${palyerDamage}`);
}

attackBtn.addEventListener("click", attackHandler);
