const EventEmitter = require('../EventEmitter/EventEmitter');
/**
 * @description Game
 */
class Game{
    constructor(players = []) {
        this.hook = new EventEmitter();
        this.players = players;
    }
    init() {
        this.deadPlayers = [];
        this.round = 0;
        this.players.forEach((player, index) => {
            player.alive = true;
            player.offset = index;
            player.game = this;
            this.players[`_${index}`] = player;
        });
        this.roundStack = this.players.map((player,index)=> {
            return `_${index}`;
        });
        this.activePlayer = null;
        this.activeIndex = -1;
    }
    calcDistance(origin, target) {
        const originIndex = this.players.findIndex(this.players[`_${origin}`]);
        const targetIndex = this.players.findIndex(this.players[`_${target}`]);
        return Math.min(Math.abs(targetIndex - originIndex), Math.abs(originIndex + this.alivePlayers.length - targetIndex));
    }
    async processDamage(damage) {
        try {
            damage = await this.players[damage.origin].emitAsync('WillMakeDamage', damage);
            damage = await this.hook.emitAsync('WillMakeDamage', damage, );
            damage = await this.players[damage.target].emitAsync('WillGetDamage', damage);
            damage = await this.hook.emitAsync('WillGetDamage', damage);
            damage = await this.players[damage.target].emitAsync('processDamage', damage);
            damage = await this.players[damage.origin].emitAsync('DidMakeDamage', damage);
            damage = await this.players[damage.target].emitAsync('DidGetDamage', damage);
            await this.hook.emitAsync('DidGetDamage', damage);
        } catch (e) {
            console.log('damage process escaped.', e);
        }
    }
    async processRound() {
        if (!this.activePlayer) {
            this.activeIndex = 0;
            this.activePlayer = this.players[0];
        }
        while (this.roundStack.length) {
            this.activeIndex = this.roundStack.pop();
            this.activePlayer = this.players[`_${this.activeIndex}`];
            await this.activePlayer.startRound();
            if (this.checkResult()) {
                return ;
            }
        }
        this.round++;
        this.roundStack = [];
        this.players.forEach((player, index) => {
            if (player.alive) {
                this.roundStack.push(`_${index}`);
            }
        });
        this.processRound();
    }
}

module.exports = Game;
