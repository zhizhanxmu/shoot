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
        _controller: null,
        display: cc.Sprite
    },

    init(controller) {
        this._controller = controller;
        cc.log('init!');
    },

    start () {
      this._isShow = false;
      this.tex = new cc.Texture2D();

    },
    onClick() {
        this._isShow = !this._isShow;
        // 发消息给子域
        wx.postMessage({
            message: this._isShow ? 'Show' : 'Hide'
         })
    },
    _updaetSubDomainCanvas() {
        if (!this.tex) {
            return;
        }
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.display.spriteFrame = new cc.SpriteFrame(this.tex);
    },
    update() {
        this._updaetSubDomainCanvas();
    }
});
