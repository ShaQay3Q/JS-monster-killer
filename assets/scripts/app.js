const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 14;
const MONSTER_STRONG_ATTACK_VALUE = 19;
const HEAL_VALUE = 20;
const MODE_ATTACK = "ATTACK"; // or MODE_ATTACK = 0
const MODE_STRONG_ATTACK = "STRONG_ATTACK"; // or MODE_STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_STRONG_ATTACK = "MONSTER_STRONG_ATTACK";
const LOG_EVENT_HEAL = "HEAL";
const LOG_EVENT_GAMEOVER = "GAME_OVER";
const PLAYER = "PLAYER";
const MONSTER = "MONSTER";

// let chosenMaxLife = Number(prompt("Maximum life for the game: ", "100"));
// while (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
// 	chosenMaxLife = +prompt("Maximum life for the game: ", "100");
// }

function getMaxLifeValue() {
	const parsedValue = parseInt(prompt("Maximum life for the game: ", "100"));
	if (isNaN(parsedValue) || parsedValue <= 0) {
		// can throw anything as error, number, string, object....
		//! most errores are objects with message property
		//! it stops script execution - CRASH
		throw {
			message: "Invalid user input, not a number",
		};
	}
	return parsedValue;
}
let chosenMaxLife;

try {
	chosenMaxLife = getMaxLifeValue();
} catch (error) {
	console.log(error);
	//! Fallback logic
	chosenMaxLife = 100;
	alert("You entered something wrone, defaul value of 100 was used.");
} finally {
	//! This can be with or without CATCH.
	//! It always execute regardless whether there is an error or not!
	// Cna be used to do any clean-up work
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];
let lastLoggedEntry = 0;

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
	writeToLog02(
		LOG_EVENT_GAMEOVER,
		null,
		currentMonsterHealth,
		currentPlayerHealth
	);
}

function monsterAttack() {
	// Monster attacks
	const monsterDamage = dealMonsterDamage(MONSTER_ATTACK_VALUE);
	currentMonsterHealth -= monsterDamage;

	// Player counterattacks
	const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
	currentPlayerHealth -= playerDamage;

	// Bonus life handling
	if (currentPlayerHealth <= 0 && hasBonusLife) {
		hasBonusLife = false;
		removeBonusLife();
		currentPlayerHealth = chosenMaxLife;
		alert("You would be dead, but the bonus life saved you!");
		setPlayerHealth(currentPlayerHealth);
	}

	// Evaluate endgame
	endgameEvaluation(currentMonsterHealth, currentPlayerHealth);

	// Log attacks
	writeToLog02(
		LOG_EVENT_PLAYER_ATTACK,
		monsterDamage,
		currentMonsterHealth,
		currentPlayerHealth
	);
	writeToLog02(
		LOG_EVENT_MONSTER_ATTACK,
		playerDamage,
		currentMonsterHealth,
		currentPlayerHealth
	);
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
	writeToLog02(LOG_EVENT_GAMEOVER, playerDamage, monsterHealth, playerHealth);
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
// function generalAttackHandler(pAttack, mAttack) {
// 	const attackResult = damageCalc(pAttack, mAttack);
// 	endgameEvaluation(attackResult[0], attackResult[1]);

// 	console.log(`monsterDamage: ${attackResult[0]}`);
// 	console.log(`playerDamage: ${attackResult[1]}`);
// }

function generalAttackHandler(playerAttackValue, monsterAttackValue) {
	const monsterDamage = dealMonsterDamage(playerAttackValue);
	const playerDamage = dealPlayerDamage(monsterAttackValue);

	currentMonsterHealth -= monsterDamage;
	currentPlayerHealth -= playerDamage;

	// Evaluate the game state
	endgameEvaluation(currentMonsterHealth, currentPlayerHealth);

	// Log attacks
	writeToLog02(
		LOG_EVENT_PLAYER_ATTACK,
		monsterDamage,
		currentMonsterHealth,
		currentPlayerHealth
	);
	writeToLog02(
		LOG_EVENT_MONSTER_ATTACK,
		playerDamage,
		currentMonsterHealth,
		currentPlayerHealth
	);
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

// OR use in the condition
function writeToLog01(event, value, monsterHealth, playerHealth) {
	if (
		event ===
		(LOG_EVENT_PLAYER_ATTACK ||
			LOG_EVENT_MONSTER_ATTACK ||
			LOG_EVENT_PLAYER_STRONG_ATTACK ||
			LOG_EVENT_MONSTER_STRONG_ATTACK ||
			LOG_EVENT_HEAL ||
			LOG_EVENT_GAMEOVER)
	) {
		logEntry = {
			event: event,
			value: value,
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
		};
		battleLog.push(logEntry);
	}
}

// !Another implementation
function writeToLog03(event, value, monsterHealth, playerHealth) {
	if (
		[
			LOG_EVENT_PLAYER_ATTACK,
			LOG_EVENT_MONSTER_ATTACK,
			LOG_EVENT_PLAYER_STRONG_ATTACK,
			LOG_EVENT_MONSTER_STRONG_ATTACK,
			LOG_EVENT_HEAL,
			LOG_EVENT_GAMEOVER,
		].includes(event)
	) {
		const logEntry = {
			event,
			value,
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
		};
		battleLog.push(logEntry);
	}
}

function writeToLog02(event, value, monsterHealth, playerHealth) {
	logEntry = {
		event: event,
		value: value,
		finalMonsterHealth: monsterHealth,
		finalPlayerHealth: playerHealth,
		target: event.includes("MONSTER") ? PLAYER : MONSTER,
	};

	if (event === LOG_EVENT_HEAL || event === LOG_EVENT_GAMEOVER) {
		event = "";
	}

	battleLog.push(logEntry);
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
		writeToLog02(LOG_EVENT_HEAL, "HEAL_BTN", monsterHealth, playerHealth);
		writeToLog02("PLAYER_HEAL", MODE_ATTACK, monsterHealth, playerHealth);
		writeToLog02(
			LOG_EVENT_MONSTER_ATTACK,
			MODE_ATTACK,
			monsterHealth,
			playerHealth
		);
	}
}

function printLogHandler() {
	// for (let i = 0; i < battleLog.length; i++) {
	// 	console.log("--------- ");
	// }
	// for (let i = 10; i > 0; i--) {
	// 	console.log(i);
	// }
	// //! for-of itterates over an array and gets the elements one by one
	// let i = 0; //! becaus eif for of loop there is no access to index number, this will provide the index number
	// for (const e of battleLog) {
	// 	console.log(e);
	// 	//! for-in itterates over an objects and get the keys one by one
	// 	for (const k in logEntry) {
	// 		// console.log(k);
	// 		console.log(`${k}: ${logEntry[k]}`);
	// 	}
	// }
	console.log("-----");
	let i = 0;
	for (const logEntry of battleLog) {
		if ((!lastLoggedEntry && lastLoggedEntry !== 0) || lastLoggedEntry < i) {
			console.log(`${i}`);
			for (const key in logEntry) {
				console.log(`${key}: ${logEntry[key]}`);
			}
			lastLoggedEntry = i;
		}
		i++;
		break;

		// for (let a; a < l; a++) {
		// 	console.log(`log: ${battleLog[i]}`);
		// }
	}

	// console.log("battleLog:");
	// console.log(battleLog);
}

healBtn.addEventListener("click", healPlayerHander);

logBtn.addEventListener("click", printLogHandler);
