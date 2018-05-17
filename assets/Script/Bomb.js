cc.Class({
    extends: cc.Component,
    properties: {
        pickRadius: 0,
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
        maxMoveSpeed: 70,
        // 加速度
        accel: 70,
        
    },
    getPlayerDistance: function () {
        var height = -19;
        var dist = Math.abs(height - this.node.position.y);
        return dist;
    },
    onHited: function() {
        var boom = this.bombAudio = this.node.game.timer.getComponent(cc.AudioSource);
    	this.node.game.createAnimBoom(this.node.position);
        // this.node.game.bombPool.put(this);
        boom.play();
        this.node.destroy();
        this.node.game.gameover();
    },
    setJumpAction: function () {
        var o_x = this.node.position.x;
        var o_y = this.node.position.y;
        var x = o_x - 150;
        var y = this.node.position.y + 400;
        var offset = 40;
        if(o_x > 0){
            offset = -40;
        }

        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(offset, 700)).easing(cc.easeSineOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(2*offset , -1200)).easing(cc.easeSineIn());
       
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
        anim.play();
        this.node.runAction(this.setJumpAction());
        this.node.game = this.getComponent('Bomb').game;

    },
    update: function (dt) {
        if(this.node.game && this.node.game.shoot && !this.hited){
            if (this.getPlayerDistance() < this.pickRadius) {
                this.onHited();
                return;
            }
        }
        if(this.node.position.y < -500){
            this.node.destroy();
        }
    },
    onDestroy : function(){
    }
});
