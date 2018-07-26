const c = Symbol('cards');
const { List } = require('immutable');

class CardStack{ 
    constructor(Cards, leftStack) {
        this[c] = Cards;
        this.leftStack = leftStack;
    }
    popCards(n = 1) {
        if (!n) {
            return List();
        }
        let ret = [];
        for (let i = 0; i < n; i++){
            if (!this[c].length) {
                this[c] = this.leftStack;
                this.washStack();
            }
            ret.push(this[c].pop());
        }
        return List(ret);
    }
    shiftCards(n = 1) {
        if (!n) {
            return List();
        }
        for (let i = 0; i < n; i++) {
            if (!this[c].length) {
                this[c] = this.leftStack;
                this.washStack();
            }
            ret.unshift(this[c].shift());
        }
    }
    pushCards(cards) {
        this[c].concat(cards);
    }
    unshiftCards(cards) {
        this[c] = cards.concat(this[c]);
    }
    /**
     * @desc 洗牌
     */
    washStack() {
        this[c] = this[c].concat().sort(function(a, b) {
            return Math.random() - 0.5;
        });
    }
};

module.exports = CardStack;