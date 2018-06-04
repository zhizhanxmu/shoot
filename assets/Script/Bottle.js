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
        hpBar: {
            default: null,
            serializable: false
        },
        anim : cc.Animation,
        gun : {
            default : null,
            type : cc.Node
        },
        jumpDuration: 0.2,
        // 最大移动速度
        maxMoveSpeed: 2100,
        // 加速度
        accel: 2100
    },
    getPlayerDistance: function () {
        // 根据 player 节点位置判断距离
        var height = this.node.game.playerY;
        // 根据两点位置计算两点之间距离
        var dist = Math.abs(height - this.node.position.y);
        return dist;
    },
    onHited: function() {
        console.log(this.node);
        this.node.game.createCrack(this.node.position, this.node.position);
        this.node.destroy();
        cc.audioEngine.playMusic(this.node.game.bottleAudio, false);
    },
    // setJumpAction: function () {
    //     // 跳跃上升
    //     var o_x = this.node.position.x;
    //     var o_y = this.node.position.y;
    //     var x = o_x - 150;
    //     var y = this.node.position.y + 400;
    //     var offset = 140;
    //     if(o_x > 0){
    //         offset = -140;
    //     }

    //     var top = cc.random0To1() * 300 + 700;
    //     var bottom = -500 - top;
    //     offset = (1+cc.random0To1()) * offset;

    //     var jumpDuration = 1.5 +  cc.random0To1() * 0.5;

    //     // var jumpUp = cc.moveBy(this.jumpDuration, cc.p(-200, 400)).easing(cc.easeCubicActionOut());
    //     // var jumpDown = cc.moveBy(this.jumpDuration, cc.p(-200 , -400)).easing(cc.easeCubicActionIn());
    //     // var jumpUp = cc.moveBy(this.jumpDuration, cc.p(-200, 400)).easing(cc.easeQuadraticActionOut());
    //     // var jumpDown = cc.moveBy(this.jumpDuration, cc.p(-200 , -400)).easing(cc.easeQuadraticActionIn());
    //     var jumpUp = cc.moveBy(jumpDuration, cc.p(offset, top)).easing(cc.easeQuadraticActionOut());
    //     var jumpDown = cc.moveBy(jumpDuration , cc.p(2*offset , bottom)).easing(cc.easeQuadraticActionIn());

    //     // var jumpUp = cc.moveBy(this.jumpDuration, cc.p(offset, top)).easing(cc.easeCubicActionOut());
    //     // var jumpDown = cc.moveBy(this.jumpDuration, cc.p(2*offset , bottom)).easing(cc.easeCubicActionOut());

    //     // var jumpUp = cc.moveTo(this.jumpDuration, cc.p(-150, y));
    //     // // 下落
    //     // var jumpDown = cc.moveTo(this.jumpDuration, cc.p(-300, 0));
    //     // 不断重复
    //     // console.log(x+ ' ' + y + ' ' +  o_x + ' ' + o_y);
    //     return cc.repeat(cc.sequence(jumpUp, jumpDown), 1);
    // },

    setJumpAction: function () {
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

        // 如果没有指定播放哪个动画，并且有设置 defaultClip 的话，则会播放 defaultClip 动画
        anim.play();
        // this.jumpAction = this.setJumpAction();
        this.node.runAction(this.setJumpAction());
        this.node.game = this.getComponent('Bottle').game;
        // console.log(this.getComponent('Bottle'));
        // console.log(this.node.getComponent('Bottle'));
    },
    update: function (dt) {
        if(this.node.game.end){
            this.node.destroy();
            return;
        }
        if(this.node.game && this.node.game.shoot && !this.hited){
            if (this.getPlayerDistance() < this.pickRadius) {
                this.onHited();
                return;
            }
        }
        if(this.node.position.y < -500){
        	this.node.game.hp--;
            if(this.node.game.hp===0){
                this.node.game.hp1.getComponent(cc.Animation).play()
            	this.node.game.gameover()
            }
            if(this.node.game.hp===2){
                this.node.game.hp3.getComponent(cc.Animation).play()
            }
            if(this.node.game.hp===1){
                this.node.game.hp2.getComponent(cc.Animation).play()
                this.node.game.hp3.getComponent(cc.Animation).resume()
                this.node.game.hpBar  
            }
            this.node.destroy();
        }
    },
    onDestroy : function(){
    }
});
