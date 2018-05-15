cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        timer: {
            default: null,
            type: cc.Node
        },
        bottlePrefab: {
            default: null,
            type: cc.Prefab
        },
        bombPrefab: {
            default: null,
            type: cc.Prefab
        },
        gainPrefab: {
            default: null,
            type: cc.Prefab
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        mask : {
            default: null,
            type: cc.Node
        },
        completeBox : {
            default: null,
            type: cc.Node
        },
        completeScore : {
            default: null,
            type: cc.Label
        },
        topScore : {
            default: null,
            type: cc.Label
        },
        bombRate : 0.5,
        end : false,//游戏是否结束
        score : 0,
        bonus : 0,
        combo : false,
        shoot : false
    },
    onShoot : function(){
        this.shoot = true;
    },
    onLoad: function () {
        this.player.getComponent('Player').game = this;
        this.playerY = this.player.y;
        this.score = 0;
        console.log(this.mask.active);
        this.mask.active = false;
        this.completeBox.active = false;
    },
    createBottle: function(_this) {
        var bottle = cc.instantiate(_this.bottlePrefab);
        _this.node.addChild(bottle);
        bottle.setPosition(_this.getNewBottlePosition());
        bottle.getComponent('Bottle').game = _this;
    },
    createBomb: function(_this) {
        var bomb = cc.instantiate(this.bombPrefab);
        _this.node.addChild(bomb);
        bomb.setPosition(_this.getNewBottlePosition());
        bomb.getComponent('Bomb').game = _this;
    },
    /**
     * 打中瓶子之后显示当前瓶子得分
     */
    createScore : function(position){
        if(this.combo){
            this.bonus++;
        }
        var score = 1 + this.bonus;
        var y = position.y;
        var x = position.x;
        var p1 = cc.p(x, y);
        var gain = cc.instantiate(this.gainPrefab);
        this.node.addChild(gain);
        gain.setPosition(p1);
        gain.getComponent(cc.Label).string = '+' + score;
        this.gainScore(score);
    },
    getNewBottlePosition: function () {
        var randX = 0;
        var randY = this.playerY + cc.random0To1() * 100 - 500;
        var maxX = this.node.width * 3 / 8;
        randX = cc.randomMinus1To1() * maxX;
        if(randY < -500){
            randY = -499;
        }
        return cc.p(randX, randY);
    },
    start: function () {
        var _this = this;
        this.createInterval = setInterval(function(){
            var seed = cc.random0To1();
            if(seed < 0.1){// ~30概率出现炸弹
                _this.createBomb(_this);    
            }else{
                _this.createBottle(_this);
            }
        }, 600);
    },
    restart : function(){
        this.score = 0;
        this.scoreDisplay.string = 0;
        this.end = false;
        clearInterval(this.createInterval);
        this.comboFail();
        this.start();
    },
    gainScore: function (score) {
        this.score += score;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = this.score.toString();
        this.resetTimer();

        if(score > 100){
            this.bombRate = 0.8;
        }
    },
    resetTimer : function(){
        this.combo = true;
        var _this = this;
        var bar = this.timer.getComponent(cc.ProgressBar);
        bar.progress = 1;
        this.timerInterval = setInterval(function(){
            if(bar.progress<=0){
                this.combo = false;
                clearInterval(_this.timerInterval);
            }
            bar.progress = bar.progress - 0.01;
        }, 30);
    },
    comboFail : function(){
        this.combo = false;
        this.bonus = 0;
        var bar = this.timer.getComponent(cc.ProgressBar);
        bar.progress = 0;
    },
    gameover : function(){
        this.end = true;
        clearInterval(this.createInterval);
        this.comboFail();
        this.updateScore();
        this.mask.active = true;
        this.completeBox.active = true;
    },
    updateScore: function() {
        var currentScore = this.scoreDisplay.string;
        this.completeScore.string = this.scoreDisplay.string;
        var scoreData = {
            'score':currentScore,
            'time': D.common.timeFmt(new Date(),'yyyy-MM-dd hh:mm:ss'),
        };
        
        var preData = cc.sys.localStorage.getItem('score');
        
        var preTopScore = cc.sys.localStorage.getItem('topScore');
        
        if (!preTopScore || parseInt(preTopScore) < parseInt(currentScore)){
            cc.sys.localStorage.setItem('topScore', currentScore);
        }
        
        if(!preData){
            preData = [];
            preData.unshift(scoreData);
        } else {
            preData = JSON.parse(preData);
            if (!(preData instanceof Array)){
                preData = []; 
            }
            preData.unshift(scoreData);
        }
        cc.sys.localStorage.setItem('currentScore', currentScore);
        cc.sys.localStorage.setItem('score', JSON.stringify(preData));


        this.topScore.string = cc.sys.localStorage.getItem('topScore');
    },
    // cc.sys.localStorage.setItem(“key”,”value”)
    // update (dt) {},
});
