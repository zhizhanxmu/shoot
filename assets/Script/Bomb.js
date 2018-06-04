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
        audio: {
            url: cc.AudioClip,
            default: null
        }
    },
    getPlayerDistance: function () {
        var height = -19;
        var dist = Math.abs(height - this.node.position.y);
        return dist;
    },
    onHited: function() {
        // this.current = cc.audioEngine.play(this.audio, false, 1);
    	this.node.game.createAnimBoom(this.node.position);
        // this.node.game.bombPool.put(this);
        this.node.destroy();
        this.node.game.gameover();
        cc.audioEngine.playMusic(this.node.game.bombAudio, false);
    },
    setJumpAction: function () {
        // var o_x = this.node.position.x;
        // var o_y = this.node.position.y;
        // var x = o_x - 150;
        // var y = this.node.position.y + 400;
        // var offset = 40;
        // if(o_x > 0){
        //     offset = -40;
        // }

        // var jumpUp = cc.moveBy(this.jumpDuration, cc.p(offset, 700)).easing(cc.easeSineOut());
        // var jumpDown = cc.moveBy(this.jumpDuration, cc.p(2*offset , -1200)).easing(cc.easeSineIn());
       
        // return cc.repeat(cc.sequence(jumpUp, jumpDown), 1);

        var s_x = this.node.position.x;
        var s_y = this.node.position.y;
        var m_x = 0;
        var m_y = s_y + 300 + cc.random0To1() * 300;
        var e_x = (0 - s_x) * 1.5;
        var e_y = (this.node.position.y - m_y) * 1.5 ;
        var time = 0.8 + 0.7 * cc.random0To1() ;
        var bezier1 = this.getBezier1Points({x:s_x,y:s_y}, {x:m_x,y:m_y});
        var jumpUp = cc.bezierTo(time, bezier1);
        // console.log({x:s_x,y:s_y});
        // console.log( {x:m_x,y:m_y});
        // console.log( {x:e_x,y:e_y});
        // console.log(bezier1);
        var bezier2 = this.getBezier2Points({x:m_x,y:m_y}, {x:e_x,y:e_y});
        // console.log(bezier2);
        var jumpDown = cc.bezierTo(time * 1.5, bezier2);

        // var jumpUp = cc.moveTo(2, cc.p(m_x, m_y));
        // var jumpDown = cc.moveTo(2, cc.p(e_x, e_y));
        // return cc.repeat(cc.sequence(jumpUp, jumpDown), 1);
        return cc.sequence(jumpUp, jumpDown);
    },
    getBezier1Points : function(pos1, pos2){
        var bezier = [];
        var x1 = pos1.x;
        var y1 = (pos2.y + pos1.y) / 2 + (pos2.y - pos1.y) / 8 ;
        var x2 = (pos1.x + pos2.x)/2;
        var y2 = pos2.y;
        bezier.push(cc.p(x1, y1));
        bezier.push(cc.p(x2, y2));
        bezier.push(cc.p(pos2.x, pos2.y));
        return bezier;
    },
    getBezier2Points : function(pos1, pos2){
        var bezier = [];
        var x1 = (pos1.x + pos2.x)/2;
        var y1 = pos1.y;
        var x2 = pos2.x;
        var y2 = (pos2.y + pos1.y) / 2 + (pos1.y - pos2.y) / 8 ;
        bezier.push(cc.p(x1, y1));
        bezier.push(cc.p(x2, y2));
        bezier.push(cc.p(pos2.x, pos2.y));
        return bezier;
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
        cc.audioEngine.stop(this.current);
    }
});
