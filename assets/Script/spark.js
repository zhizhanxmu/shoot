// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    	game: {
            default: null,
            serializable: false
        },
        anim : cc.Animation
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    	var anim = this.getComponent(cc.Animation);
        anim.play();
        anim.on('finished', this.onFinished, this);

    },
	 onFinished : function(){
        this.node.destroy();
    }
    // update (dt) {},
});
