cc.Class({
    extends: cc.Component,
    properties: {
        game: {
            default: null,
            serializable: false
        },
        anim : cc.Animation
    },
    start () {
        var anim = this.getComponent(cc.Animation);
        anim.play();
        anim.on('finished', this.onFinished, this);
    },
    
    onFinished : function(){
        this.game.createScore(this.node.position);
        this.node.destroy();
    }
});
