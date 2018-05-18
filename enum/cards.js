cardDeck = [
    suitDiamond = [],
    suitHeart = [],
    suitSpade = [],
    suitClubs = []
]

for(i = 1; i <= 13; i++) {
    cardDeck.forEach(suit => {
        suit.push(i);
    });
}

module.exports = {cardDeck};