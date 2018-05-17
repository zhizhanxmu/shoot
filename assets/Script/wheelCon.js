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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        // 
        game: {
            default: null,
            serializable: false
        },
        anim: cc.Animation

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.audio = this.getComponent(cc.AudioSource);
     },
	turn: function(){
         if (this.node.parent.getComponent('Game').end==false) {     
           var anim = this.getComponent(cc.Animation);
            anim.play('shootRun');
            setTimeout(function(){
                console.log("333")
                anim.pause('shootRun');
            },100)
        };
        if (this.node.parent.getComponent('Game').surplus % 7 ==0){
            this.audio.play();
        }
        
		
	},
    start () {
        this.node.game = this.getComponent('wheelCon').game;
        // console.log(this.getComponent('Bottle'));
        // console.log(this.node.getComponent('Bottle'));
    },

    // update (dt) {},
});
