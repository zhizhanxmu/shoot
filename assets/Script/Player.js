cc.Class({
    extends: cc.Component,
    properties: {
        game: {
            default: null,
            serializable: false
        },
        gun : {
            default: null,
            type: cc.Node
        }
    },
    onLoad : function(){
        this.anim = this.node.getComponent(cc.Animation);
        console.log(this.game);
        this.anim.on('play', this.onPlay, this);
        this.anim.on('finished', this.onFinished, this);
        this.audio = this.node.getComponent(cc.AudioSource);
        this.addTouchEvent();
    },
    onPlay : function(){
        this.score = this.game.score;
        this.game.shoot = true;
        this.audio.play();
    },
    onFinished : function(){
        if(this.game.score == this.score){
            this.game.comboFail();
        }
        this.game.shoot = false;
    },
    play : function(){
        if(!this.game.end){//游戏未结束才可以射击
            this.anim.play();
            this.game.surplus++;
        }
    },
    addTouchEvent :function(){
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event){
             console.log(this.y);
        },this.node);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var delta = event.touch.getDelta();
            this.y += delta.y;
            if(this.y >= 100){
                this.y = 100
            };
            if(this.y <= -170){
                this.y = -170
            } 
            _this.game.playerY = this.y;
        }, this.node);
    },
});
