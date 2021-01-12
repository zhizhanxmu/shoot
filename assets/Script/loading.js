
cc.Class({
    extends: cc.Component,
    properties: {
        game: {
            default: null,
            serializable: false
        },
        anim : cc.Animation
    },
    onload : function(){
        var anim = this.getComponent(cc.Animation);
        anim.on('finished', this.onFinished, this);
    },
    start () {
        
    },
    
    onFinished : function(){
        this.game.play2();
    }
});
