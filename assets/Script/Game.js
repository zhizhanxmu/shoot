cc.Class({
    extends: cc.Component,

    properties: {
        index: {
            default: null,
            type: cc.Node
        },
        loadingPanel: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: cc.Node
        },
        hp3: {
            default: null,
            type: cc.Node
        },
        hp2: {
            default: null,
            type: cc.Node
        },
        hp1: {
            default: null,
            type: cc.Node
        },
        timer: {
            default: null,
            type: cc.Node
        },
        hpBar: {
            default: null,
            type: cc.Node
        },
        wheel: {
            default: null,
            type: cc.Node
        },
        mask: {
            default: null,
            type: cc.Node
        },
        completeBox: {
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
        crackPrefab: {
            default: null,
            type: cc.Prefab
        },
        gainPrefab: {
            default: null,
            type: cc.Prefab
        },
        zhadanPrefab: {
            default: null,
            type: cc.Prefab
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        bottlePool : null,
        bombPool : null,
        backgroundAudio: {
         url: cc.AudioClip,
         default: null
        },
        bottleAudio: {
         url: cc.AudioClip,
         default: null
        },
        bombAudio: {
         url: cc.AudioClip,
         default: null
        },

        display: cc.Sprite,
        bombRate : 0.1,
        end : false,//游戏是否结束
        score : 0,
        bonus : 0,
        combo : false,
        shoot : false,
        ainm : cc.Animation,
        hp : 3,
        surplus : 0,
        topScore : 0,

    },
   
    
    onLoad: function () {
        this.player.getComponent('Player').game = this;
        this.wheel.getComponent('wheelCon').game = this;
        this.playerY = this.player.y;
        this.score = 0;
        this.mask.active = false;
        this.completeBox.active = false;
        this.loadingPanel.active = false;
        var anim = this.loadingPanel.getComponent('cc.Animation');
        anim.on('finished', this.play2, this); 
        this.currScore = this.completeBox.getChildByName('curr-score').getComponent('cc.Label');
        this.topScore = this.completeBox.getChildByName('top-score').getComponent('cc.Label');
        this.rate = 0.1;
        // this.index.active = false;
        // this.play2();
        this.overAudio = this.getComponent('cc.AudioSource');
        // cc.audioEngine.play(this.backgroundAudio, true);

        
        
    },
    onShoot : function(){
        this.shoot = true;
        
    },
    createBottle: function(_this) {
        var bottle = cc.instantiate(_this.bottlePrefab);
        _this.node.addChild(bottle);
        // bottle.setPosition(400, -200);
        bottle.setPosition(_this.getNewBottlePosition());
        bottle.getComponent('Bottle').game = _this;

        // var bottle = null;
        // if (_this.bottlePool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
        //     bottle = _this.bottlePool.get();
        // } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
        //     bottle = cc.instantiate(_this.bottlePrefab);
        //     bottle.getComponent('Bottle').game = _this;
        // }
        // _this.node.addChild(bottle);
        // bottle.setPosition(_this.getNewBottlePosition());
    },
    createBomb: function(_this) {
        var bomb = cc.instantiate(this.bombPrefab);
        _this.node.addChild(bomb);
        bomb.setPosition(_this.getNewBottlePosition());
        bomb.getComponent('Bomb').game = _this;
    },
    createCrack : function(position, rotation){
        var y = position.y;
        var x = position.x;
        var p1 = cc.p(x, y);
        var crack = cc.instantiate(this.crackPrefab);
        this.node.addChild(crack);
        crack.setPosition(p1);
        // crack.rotation = rotation;
        crack.getComponent('Crack').game = this;
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
    createAnimBoom : function(position){
        var y = position.y;
        var x = position.x;
        var p1 = cc.p(x, y);
        var zhadan = cc.instantiate(this.zhadanPrefab);
        this.node.addChild(zhadan);
        zhadan.setPosition(p1);
    },
    getNewBottlePosition: function () {
        var randX = 0;
        var randY = this.playerY + cc.random0To1() * 100 - 300;
        var maxX = this.node.width * 4 / 9;
        randX = cc.randomMinus1To1() * maxX;
        if(randY < -500){
            randY = -499;
        }
        return cc.p(randX, randY);
    },
    start: function () {
       
    },
    enter : function(){
        this.index.active = false;
        this.loadingPanel.active = true;
    },
    play : function(){
        // var _this = this;
        // this.createInterval = setInterval(function(){
        //     var seed = cc.random0To1();
        //     if(seed < 0.1){// ~30概率出现炸弹
        //         _this.createBomb(_this);    
        //     }else{
        //         _this.createBottle(_this);
        //     }
        // }, 600);
    },
    play2 : function(){
        // let openDataContext = wx.getOpenDataContext()
        
        
        // this.bottlePool = new cc.NodePool();
        // var initCount = 15;
        // for (var i = 0; i < initCount; ++i) {
        //     var bottle = cc.instantiate(this.bottlePrefab); // 创建节点
        //     bottle.getComponent('Bottle').game = this;
        //     this.bottlePool.put(bottle); // 通过 putInPool 接口放入对象池
        // }
        // var _this = this;
        // _this.createBottle(_this);
        // var _this = this;
        // this.createInterval = setInterval(function(){
        //     _this.createBottle(_this);
        // }, 2000);

        var _this = this;
        console.log(_this);
        this.createInterval = setInterval(function(){
            let seed = cc.random0To1();
            // console.log(seed );
            // console.log(_this.rate);
            if(seed < _this.rate){// ~30概率出现炸弹
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
        this.hp = 3;
        /*var realUrl = cc.url.raw('resources/hp1.png');
        var texture = cc.textureCache.addImage(realUrl);
        this.hp1.getComponent(cc.Sprite).spriteFrame.setTexture(texture); */  

        this.mask.active = false;
        this.completeBox.active = false;

        this.hp1.getComponent(cc.Animation).setCurrentTime(0, 'crack');
        this.hp2.getComponent(cc.Animation).setCurrentTime(0, 'crack');
        this.hp3.getComponent(cc.Animation).setCurrentTime(0, 'crack');

        this.play2();
    },
    gainScore: function (score) {
        this.score += score;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = this.score.toString();
        this.resetTimer();

        if(score > 100){
            this.rate = 0.15;
        }

        if(score > 300){
            this.rate = 0.3;
        }

        if(score > 500){
            this.rate = 0.5;
        }

        if(score > 800){
            this.rate = 0.8;
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
        this.mask.active = true;
        this.completeBox.active = true;
        this.updateScore();
        
        this.overAudio.play();
       
    },
    updateScore: function() {
        var currentScore = this.score;
        this.currScore.string = currentScore.toString();

        var scoreData = {
            score : currentScore
        };
        
        var preData = cc.sys.localStorage.getItem('score');
        var preTopScore = cc.sys.localStorage.getItem('topScore');
        
        if (!preTopScore || parseInt(preTopScore) < parseInt(currentScore)){//新纪录诞生
            cc.sys.localStorage.setItem('topScore', currentScore);
            this.completeBox.getChildByName('best-msg').active = true;
        }else{
            this.completeBox.getChildByName('best-msg').active = false;
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
        this.topScore.string = 'BEST：' + cc.sys.localStorage.getItem('topScore');

        wx.postMessage({
            messageType : 3,
            MAIN_MENU_NUM: 'score',
            score: cc.sys.localStorage.getItem('topScore')
        });
    },
    showRankList : function(){
        wx.postMessage({
            messageType : 1,
            MAIN_MENU_NUM: 'score'
        });
    }
});
