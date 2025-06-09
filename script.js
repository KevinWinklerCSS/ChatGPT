const playerStatsEl = document.getElementById('player-stats');
const ratStatsEl = document.getElementById('rat-stats');
const logEl = document.getElementById('log');
const attackBtn = document.getElementById('attack-btn');

const player = {
    level: 1,
    exp: 0,
    nextLevelExp: 5,
    hp: 10,
    maxHp: 10,
    attack: 2,
    inventory: []
};

const rat = {
    level: 1,
    hp: 5,
    maxHp: 5,
    attack: 1
};

function updateStats() {
    playerStatsEl.textContent = `Player - Lv ${player.level} HP ${player.hp}/${player.maxHp} ATK ${player.attack} XP ${player.exp}/${player.nextLevelExp}`;
    ratStatsEl.textContent = `Rat - Lv ${rat.level} HP ${rat.hp}/${rat.maxHp} ATK ${rat.attack}`;
}

function log(msg) {
    logEl.textContent = msg;
}

function spawnRat() {
    rat.level = player.level;
    rat.maxHp = 5 + rat.level * 2;
    rat.hp = rat.maxHp;
    rat.attack = 1 + rat.level;
}

function gainItem() {
    const itemAtk = 1;
    const item = {name: `Rat Tooth +${itemAtk}`, attack: itemAtk};
    player.inventory.push(item);
    player.attack += item.attack;
    log(`You found a ${item.name}! Attack increased by ${item.attack}.`);
}

function levelUp() {
    while (player.exp >= player.nextLevelExp) {
        player.exp -= player.nextLevelExp;
        player.level++;
        player.maxHp += 5;
        player.hp = player.maxHp;
        player.attack += 1;
        player.nextLevelExp += 5;
        log(`You leveled up! You are now level ${player.level}.`);
    }
}

function defeatRat() {
    log('The rat has been defeated!');
    player.exp += rat.level * 2;
    if (Math.random() < 0.5) {
        gainItem();
    }
    levelUp();
    spawnRat();
    updateStats();
}

function gameOver() {
    log('You were defeated! Refresh to play again.');
    attackBtn.disabled = true;
}

attackBtn.addEventListener('click', () => {
    const playerDamage = Math.floor(Math.random() * player.attack) + 1;
    rat.hp -= playerDamage;
    log(`You hit the rat for ${playerDamage} damage.`);
    if (rat.hp <= 0) {
        defeatRat();
        return;
    }

    const ratDamage = Math.floor(Math.random() * rat.attack) + 1;
    player.hp -= ratDamage;
    log(`The rat hits you for ${ratDamage} damage.`);
    if (player.hp <= 0) {
        gameOver();
        return;
    }

    updateStats();
});

spawnRat();
updateStats();
