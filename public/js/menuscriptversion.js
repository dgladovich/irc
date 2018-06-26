
/*
class Menu {
	constructor( selector, url ){

		this.s = Snap( selector );
		this.s.addClass('svg-red-line');



		this.width = $(this.s.node).width();
		this.height = $(this.s.node).height();
		this.middleX = this.width / 2;
		this.middleY = this.height / 2;

		this.bHeight = this.height / 2 / 3;// 3 - buttons.length
		this.bWidth = this.width / 2;
		this.bX = 0;
		this.bY = this.height / 4;

		this.b1Width = this.bWidth;
		this.b1Height = this.height / 4;
		this.b1X = this.width / 4;
		this.b1Y = 0;
		this.b2Y = this.height;


		this.cR = this.width / 5;
		this.cX = this.middleX; 
		this.cY = this.middleY;



		this.buttons = [ 
			new Button( this.s, {
				x:	this.bX, 
				y: this.bY,
				width: this.bWidth,
				height: this.bHeight,
				direction: 'left'
			}, 'text1'),			
			new Button( this.s, {
				x:	this.bX, 
				y: this.bY + this.bHeight,
				width: this.bWidth,
				height: this.bHeight,
				direction: 'left'
			}, 'text2'),			
			new Button( this.s, {
				x:	this.bX, 
				y: this.bY + this.bHeight * 2,
				width: this.bWidth,
				height: this.bHeight,
				direction: 'left'
			}, 'text3'),			
			new Button( this.s, {
				x:	this.bX + this.bWidth, 
				y: this.bY,
				width: this.bWidth,
				height: this.bHeight,
				direction: 'right'
			}, 'text4'),			
			new Button( this.s, {
				x:	this.bX + this.bWidth, 
				y: this.bY + this.bHeight,
				width: this.bWidth,
				height: this.bHeight,
				direction: 'right'
			}, 'text5'),			
			new Button( this.s, {
				x:	this.bX + this.bWidth, 
				y: this.bY + this.bHeight * 2,
				width: this.bWidth,
				height: this.bHeight,
				direction: 'right'
			}, 'text6'),			

			new ButtonTrapezoid( this.s, {
				x:	this.b1X, 
				y: this.b1Y,
				width: this.b1Width,
				btWidth: this.b1Width,
				height: this.b1Height,
				direction: 'left'
			}, 'text7'),			
			new ButtonTrapezoid( this.s, {
				x:	this.b1X, 
				y: this.b2Y,
				width: this.b1Width,
				btWidth: this.b1Width,
				height: this.b1Height,
				direction: 'bottom'
			}, 'text8')			

		];
		this.circle =  new CenterCircle( this.s, {
			x: this.cX, 
			y: this.cY, 
		}, this.cR );
	}
}*/
/*
class Button {
	constructor( snap, path, text ){
		this.direction = path.direction === 'left' ? 1 : -1;
		this.x = path.x;
		this.y = path.y;
		this.width = path.width;
		this.height = path.height;
		this.middleX = this.width / 2;
		this.middleY = this.height / 2;
		
		this.tX = this.x + ( this.width / 2 ) - ( this.width / 4 * this.direction) ;
		this.tY = this.y + ( this.height / 2 );

		this.r = snap.rect( this.x, this.y, this.width, this.height, 25, 100 ).attr({
			fill: 'transparent',
			stroke: 'white',
		});
		this.text = this.r.paper.text(this.tX, this.tY, text).attr({
			fill: 'white',
			
		}).attr({
			fontSize: '20px'
		}).addClass('menu-button-text');

		this.group = snap.g( this.r, this.text ).addClass('menu-buttons');
		this._bindEvents();
	}
	_bindEvents() {
		this.group.hover(
			()=>{

				this.text.animate({
					fontSize: '30px',
				}, 150);

				this.r.attr({
					strokeWidth: 10,
				})
			}, 
			()=>{

				this.text.animate({
					fontSize: '20px',
				}, 150);
				this.r.attr({
					strokeWidth: 1
				})
			}
		);

		this.group.mousedown(()=>{
			this.text.animate({
				fontSize: '20px',
			}, 50);
			this.r.attr({
				strokeWidth: 1
			});
		})		

		this.group.mouseup(()=>{
			this.text.animate({
				fontSize: '30px',
			}, 50);
			this.r.attr({
				strokeWidth: 10 
			})
		})

	}
}*/
/*
class ButtonTrapezoid {
	constructor( snap, path, text ){
		this.direction = path.direction === 'left' ? 1 : -1;
		this.x = path.x;
		this.y = path.y;
		this.tWidth = path.btWidth;
		this.bWidth = path.btWidth + (path.btWidth / 2) ;
		this.bX = this.tWidth / 4;
		this.width = path.width;
		this.height = path.height;
		this.middleX = this.width / 2;
		this.middleY = this.height / 2;

		this.tX = this.x + ( this.width / 2 );
		this.tY = this.y + ( this.height / 2 ) * this.direction - (this.height / 4 * this.direction);

		this.p = snap.path( Snap.format('M {x} {y} h {tWidth} l {bX} {height} l -{bWidth} 0 Z', {
			x: this.x,
			y: this.y,
			tWidth: this.tWidth,
			height: this.height * this.direction,
			bX: this.bX,
			bWidth: this.bWidth
		}) ).attr({
			fill: 'transparent',
			stroke: 'white',
		});
		this.text = this.p.paper.text(this.tX, this.tY, text).attr({
			fill: 'white',
		}).attr({
			fontSize: '20px',
			fontWeight: '700'
		}).addClass('menu-button-text');

		this.group = snap.g( this.p, this.text ).addClass('menu-buttons');
		this._bindEvents();
	}
	_bindEvents() {
		this.group.hover(
			()=>{
				this.text.animate({
					fontSize: '30px',
				}, 150);
				this.p.attr({
					strokeWidth: 10 
				})
			}, 
			()=>{
				this.text.animate({
					fontSize: '20px',
				}, 150);
				this.p.attr({
					strokeWidth: 1
				})
			}
		);
		this.group.mousedown(()=>{
			this.text.animate({
				fontSize: '20px',
			}, 50);
			this.p.attr({
				strokeWidth: 1
			});
		})		

		this.group.mouseup(()=>{
			this.text.animate({
				fontSize: '30px',
			}, 50);
			this.p.attr({
				strokeWidth: 10 
			})
		})
	}
}*/

/*
class CenterCircle {
	constructor( snap, center, radius ){
		this.r = radius;
		this.x = center.x;
		this.y = center.y;
		this.iX = this.x - this.r;
		this.iY = this.y - this.r;
		this.iWidth = this.r * 2;
		this.iHeight = this.r * 2;
		
		this.c = snap.circle( this.x, this.y, this.r ).attr({
			fill: "black",
			stroke: 'white',
			fontSize: 20
		});
		this.i = snap.image( 'images/10.png', this.iX, this.iY, this.iWidth, this.iHeight);

		this.group = snap.g( this.c, this.i, this.title )

		
		this._bindEvents();
	}
	_bindEvents(){
		this.group.hover( 
			()=>{


				this.c.attr({
					strokeWidth: 10
				})
				this.c.animate({
					strokeWidth: 10,
					r: this.r + 25
				}, 250);
				this.i.animate({
					x: this.iX - 25,
					y: this.iY - 25,
					width: this.iWidth + 50,
					height: this.iHeight + 50
				}, 50);
			}, 
			()=>{

				this.c.attr({
					strokeWidth: 1
				})

				this.c.animate({
					r: this.r,
					strokeWidth: 1
				}, 50);
				this.i.animate({
					x: this.iX,
					y: this.iY,
					width: this.iWidth,
					height: this.iHeight
				}, 50)
			} 
		);

		this.group.mousedown(()=>{
			this.c.attr({
				strokeWidth: 1
			})

			this.c.animate({
				r: this.r,
				strokeWidth: 1
			}, 50);
			this.i.animate({
				x: this.iX,
				y: this.iY,
				width: this.iWidth,
				height: this.iHeight
			}, 50)
		})		

		this.group.mouseup(()=>{
			this.c.attr({
				strokeWidth: 10
			});
			this.c.animate({
				strokeWidth: 10,
				r: this.r + 25
			}, 150);
			this.i.animate({
				x: this.iX - 25,
				y: this.iY - 25,
				width: this.iWidth + 50,
				height: this.iHeight + 50
			}, 50);
		});

		this.group.click(()=>{

		});
	}
}
*/

