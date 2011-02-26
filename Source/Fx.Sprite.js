(function(){

var spriteKey = (function(){
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

spriteValue = (function(){
	if (spriteKey === 'webkitTransform' || spriteKey === 'transform') return 'translate3d(-{pos}px, 0, 0)';
	if (spriteKey === 'left') return '-{pos}px';
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
		this.options.frameStep = (this.options.frameStep) ? this.options.frameStep : this.options.width / this.options.frames;

		this.sprite.setStyles({
			width: this.options.width,
			height: this.options.height,
			position: 'absolute',
			top: 0,
			left: 0
		});

		this.subject = new Element('div', {
			styles: {
				position: 'relative',
				width: this.options.frameStep,
				height: this.options.height,
				overflow: 'hidden'
			}
		}).adopt(this.sprite);

		if (this.options.container) this.subject.inject(document.id(this.options.container));
	},

	step: function(){
		this.setFrame(this.frame + 1);
		if (this.isRunning()) this.fireEvent('step', [this.frame, this.subject]);
		return this;
	},

	setFrame: function(frameIndex){
		// Manage looping
		if (frameIndex >= this.options.frames) {
			if (!this.options.loop) return this.stop();
			frameIndex = 0;
			this.fireEvent('iterate', [frameIndex, this.subject]);
		}

		this.frame = frameIndex;
		var o = { pos: this.frame * this.options.frameStep };
		this.sprite.setStyle(spriteKey, spriteValue.substitute(o));

		return this;
	},

	stop: function(){
		this.parent();
		this.setFrame(0);
		return this;
	},

	toElement: function(){
		return this.subject;
	}
});

}).call(this);