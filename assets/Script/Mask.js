cc.Class({
    extends: cc.Component,
    properties: {

    },
   
    onLoad : function(){
        this.node.on('mousedown', function (event) {
            event.stopPropagation();
        }, this);
        this.node.on('touchstart', function (event) {
            event.stopPropagation();
        }, this);
        // cc.Event.stopPropagation();
    }
});
