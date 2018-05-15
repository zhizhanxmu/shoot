cc.Class({
    extends: cc.Component,
    properties: {
        // 星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 0,
        // 暂存 Game 对象的引用
        game: {
            default: null,
            serializable: false
        },
        anim : cc.Animation,
        gun : {
            default : null,
            type : cc.Node
        },
        jumpDuration: 2,
        // 最大移动速度
        maxMoveSpeed: 70,
        // 加速度
        accel: 70
    },
    getPlayerDistance: function () {
        // 根据 player 节点位置判断距离
        var height = -19;
        // 根据两点位置计算两点之间距离
        var dist = Math.abs(height - this.node.position.y);
        return dist;
    },
    onHited: function() {
        // this.hited = true;
        // this.node.game.createCrack(this.node.position,  this.node.game);
        this.node.game.createScore(this.node.position);
        this.node.destroy();
    },
    // LIFE-CYCLE CALLBACKS:
    setJumpAction: function () {
        // 跳跃上升
        var o_x = this.node.position.x;
        var o_y = this.node.position.y;
        var x = o_x - 150;
        var y = this.node.position.y + 400;
        var offset = 40;
        if(o_x > 0){
            offset = -40;
        }

        // var jumpUp = cc.moveBy(this.jumpDuration, cc.p(-200, 400)).easing(cc.easeCubicActionOut());
        // var jumpDown = cc.moveBy(this.jumpDuration, cc.p(-200 , -400)).easing(cc.easeCubicActionIn());
        // var jumpUp = cc.moveBy(this.jumpDuration, cc.p(-200, 400)).easing(cc.easeQuadraticActionOut());
        // var jumpDown = cc.moveBy(this.jumpDuration, cc.p(-200 , -400)).easing(cc.easeQuadraticActionIn());
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(offset, 700)).easing(cc.easeSineOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(2*offset , -1200)).easing(cc.easeSineIn());

        // var jumpUp = cc.moveTo(this.jumpDuration, cc.p(-150, y));
        // // 下落
        // var jumpDown = cc.moveTo(this.jumpDuration, cc.p(-300, 0));
        // 不断重复
        // console.log(x+ ' ' + y + ' ' +  o_x + ' ' + o_y);
        return cc.repeat(cc.sequence(jumpUp, jumpDown), 1);
    },
    getBezierPoints : function(position){
        var x = position.x;
        var y = position.y;
        // if(x < ){

        // }
    },
    onLoad () {
    },
    start () {
        var anim = this.getComponent(cc.Animation);

        // 如果没有指定播放哪个动画，并且有设置 defaultClip 的话，则会播放 defaultClip 动画
        anim.play();
        // this.jumpAction = this.setJumpAction();
        this.node.runAction(this.setJumpAction());
        this.node.game = this.getComponent('Bottle').game;
        // console.log(this.getComponent('Bottle'));
        // console.log(this.node.getComponent('Bottle'));
    },
    update: function (dt) {
        if(this.node.game && this.node.game.shoot && !this.hited){
            if (this.getPlayerDistance() < this.pickRadius) {
                this.onHited();
                return;
            }
        }
        if(this.node.position.y < -500){
        	this.node.game.hp--;
            if(this.node.game.hp===0){
                 var realUrl =cc.url.raw('resources/hp4.png');
                var texture =cc.textureCache.addImage(realUrl);
                this.node.game.hpBar.getComponent(cc.Sprite).spriteFrame.setTexture(texture);  
            	
            	this.node.game.gameover()
            }
            if(this.node.game.hp===2){
               var realUrl =cc.url.raw('resources/hp2.png');
                var texture =cc.textureCache.addImage(realUrl);
                this.node.game.hpBar.getComponent(cc.Sprite).spriteFrame.setTexture(texture);    
            }
            if(this.node.game.hp===1){
                 var realUrl =cc.url.raw('resources/hp3.png');
                var texture =cc.textureCache.addImage(realUrl);
                this.node.game.hpBar.getComponent(cc.Sprite).spriteFrame.setTexture(texture);  
            }
            this.node.destroy();
        }
    },
    onDestroy : function(){
        // console.log('onDestroy');
        // this.node.game.createCrack(this.node.position);
    }
    // update (dt) {},
});
