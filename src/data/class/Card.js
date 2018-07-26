const points = require('../../SCore/constants/points');
let id = 1;
/**
 * @description 卡牌
 */
class AbstractCard { 
    targetCheck() {
        throw new Error('Card Target must be checked.');
    }
    use() {
        throw new Error('Card must use.');
    }
    requestUse() {

    }
};
/**
 * @description 基本牌
 */
class BaseCard extends AbstractCard {
    constructor() {
        this.type = 'base';
    }
};

/**
 * @description 杀（杀、雷杀、火杀）
 */
class ShaBaseCard extends BaseCard {
    constructor() {
        super();
        this.group = 'sha';
        this.name = 'sha';
    }
    targetCheck(user, allplayers) {
        
    }
};

/**
 * @description 闪
*/


module.exports = {
    BaseCard,
    ShaBaseCard
}