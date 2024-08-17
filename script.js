const player1 = {
    id: 'p1',
    minAtk: 99,
    maxAtk: 105,
    minDef: 99,
    maxDef: 105,
    energy: 50
};

// Array de oponentes
const opponents = [
    { id: 'p2', minAtk: 97, maxAtk: 103, minDef: 98, maxDef: 104, energy: 10 },
    { id: 'p3', minAtk: 95, maxAtk: 101, minDef: 96, maxDef: 102, energy: 10 },
    { id: 'p4', minAtk: 100, maxAtk: 107, minDef: 100, maxDef: 108, energy: 10 },
    { id: 'p5', minAtk: 102, maxAtk: 109, minDef: 101, maxDef: 110, energy: 10 }
];
 //Sorteia um valor entre o ataque mínimo e o máximo
function attackPlayer(player) {
    let attack = Math.floor(Math.random() * (player.maxAtk - player.minAtk + 1) + player.minAtk);
    console.log(`Ataque de ${player.id} = ${attack}`);
    return attack;
}

 //Sorteia um valor entre a defesa mínima e o máxima
function defensePlayer(player) {
    let defense = Math.floor(Math.random() * (player.maxDef - player.minDef + 1) + player.minDef);
    console.log(`Defesa de ${player.id} = ${defense}`);
    return defense;
}

// Recompensar o vencedor
function rewardWinner(winner) {
    const attributes = ['minAtk', 'maxAtk', 'minDef', 'maxDef', 'energy'];
    const randomAttributeIndex = Math.floor(Math.random() * attributes.length);
    const selectedAttribute = attributes[randomAttributeIndex];

    // Sorteia um valor a ser incrementado garantindo que seja pelo menos 1
    let increase = Math.floor(winner[selectedAttribute] * (Math.random() * 0.03));
    increase = Math.max(1, increase); 

    // Aplica o aumento ao atributo sorteado
    winner[selectedAttribute] += increase;

    // Verifica se é necessário ajustar para que o mínimo não seja igual ou maior que o máximo
    if (selectedAttribute === 'minAtk' && winner.minAtk > winner.maxAtk) {
        winner.maxAtk = winner.minAtk;
    } else if (selectedAttribute === 'minDef' && winner.minDef > winner.maxDef) {
        winner.maxDef = winner.minDef;
    }

    console.log(`${winner.id} foi recompensado! ${selectedAttribute} aumentou em ${increase}. Novo valor: ${winner[selectedAttribute]}`);
}

// Sorteia o oponente e o remove da lista para que ele não seja sorteado novamente
function getRandomOpponent() {
    const randomIndex = Math.floor(Math.random() * opponents.length);
    return opponents.splice(randomIndex, 1)[0]; 
}

//realiza toda a partida
function fight() {
    let opponent;

    while (player1.energy > 0 && opponents.length > 0) {
        opponent = getRandomOpponent();

        console.log(`\nIniciando luta entre ${player1.id} e ${opponent.id}`);

        let attacker = player1;
        let defender = opponent;

        while (player1.energy > 0 && opponent.energy > 0) {
            const attack = attackPlayer(attacker);
            const defense = defensePlayer(defender);

            if (attack > defense) {
                let damage = attack - defense;
                defender.energy -= damage;
                console.log(`${attacker.id} venceu a rodada! ${defender.id} perdeu ${damage} de energia. Energia de ${defender.id}: ${defender.energy}`);
            } else {
                console.log(`${defender.id} defendeu o ataque!`);
            }

            if (defender.energy <= 0) {
                console.log(`${attacker.id} venceu a luta!`);
                if (attacker.id === 'p1') {
                    rewardWinner(player1);
                }
                break;
            }

            [attacker, defender] = [defender, attacker];
        }

        if (player1.energy <= 0) {
            console.log(`${opponent.id} venceu a luta! Jogo encerrado.`);
            return;
        }

        console.log(`${player1.id} venceu e passará para o próximo oponente.`);
    }

    if (opponents.length === 0) {
        console.log("Parabéns! Você derrotou todos os oponentes!");
    }
}

fight();
