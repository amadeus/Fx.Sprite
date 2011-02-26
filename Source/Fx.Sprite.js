(function(){

var key = (function(){
	var list = ['', 'webkit', 'Moz', 'O', 'ms'],
		element = document.html;

	for (var i = 0; i < list.length; i++){
	var prefix = list[i];
		if (element.style[prefix + 'Transform'] != null)
			return prefix + 'Transform';
		else if (element.style['transform'] != null)
			return 'transform';
	}
	return 'left';
})(),

value = (function(){
	if (key === 'webkitTransform' || key === 'transform') return 'translate3d(-{pos}px, 0, 0)';
	if (key === 'left') return '-{pos}px';
	else return 'translateX(-{pos}px)';
})();


var Sprite = Fx.Sprite = new Class({

	Extends: Fx,

	options: {
		fps: 10,
		width: 40,
		height: 40,
		frames: 4,
		initialFrame: 0,
		loop: true,
		link: 'cancel'
	},

	frame: 0,

	initialize: function(sprite, options){
		this.sprite = typeOf(sprite) === 'string' ? new Element('img', { src: sprite }) : document.id(sprite);
		this.setOptions(options);

		this.sprite.setStyles({
			width: this.options.width,
			height: this.options.height,
			position: 'absolute',
			top: 0,
			left: 0
		});

		this.frameStep = this.options.width / this.options.frames;

		this.spriteFrame = new Element('div', {
			styles: {
				position: 'relative',
				width: this.frameStep,
				height: this.options.height,
				overflow: 'hidden'
			}
		}).adopt(this.sprite);

		if (this.options.container) this.spriteFrame.inject(document.id(this.options.container));
	},

	setFrame: function(frameIndex){
		if (frameIndex >= this.options.frames) frameIndex = 0
		this.frame = frameIndex;
		var o = { pos: this.frame * this.frameStep };
		this.sprite.setStyle(key, value.substitute(o));
	},

	stop: function(){
		this.parent();
		this.setFrame(0);
	},

	step: function(){
		this.setFrame(this.frame + 1);
	},

	toElement: function(){
		return this.spriteFrame;
	}
});

}).call(this);