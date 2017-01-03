window.onload=function(){
	new Ball(10,100,100);
	new Wall(500,50,100,30,"rgb(100,100,100)");
}
var tool={
	getrgb:function(context,coord){
		return context.getImageData(coord[0],coord[1],1,1);
	}
}
function Ball(r,x,y){
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");

	this.r=r;
	this.v=5;
	this.x=x;
	this.y=y;
	this.render=function(){
		drawMath.circle(context,this.x,this.y,this.r);
	};
	this.moveForward=function(){
		var This=this;
		drawMath.clear(context,this.x,this.y,this.r);
		this.x=this.x+this.v;
		this.render();
		moveForward=window.requestAnimationFrame(function(){This.moveForward()});
	};
	this.stop=function(){
		window.cancelAnimationFrame(moveForward);
	};
	this.eventListener=function(){
		var This=this;
		canvas.addEventListener("click",function(event){
			This.moveForward();
		});
		window.setInterval(function(){
			var detectpoint=[This.x+This.r+1,This.y];
			var imgdata=tool.getrgb(context,detectpoint);
			var coordrgb=imgdata.data[0];
			console.log(coordrgb);
			if(coordrgb==100){
				This.stop();
			}
		},1);
	};
	this.init=(function(This){
		This.render();
		This.eventListener();
	})(this);
}
function Wall(x,y,length,width,color){
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");

	this.x=x;
	this.y=y;
	this.length=length;
	this.width=width;
	this.color=color;
	this.render=function(){
		drawMath.line(context,this.x,this.y,this.length,this.width,this.color);
	};
	this.init=(function(This){
		This.render();
	})(this);
}
var drawMath={
	clear:function(context,x,y,r){
		context.clearRect(x-r,y-r,2*r,2*r);
	},
	circle:function(context,x,y,r){
		context.beginPath();
		context.arc(x,y,r,0,2*Math.PI);
		context.fillStyle="rgb(100,200,200)";
		context.fill();
	},
	line:function(context,x,y,length,width,color){
		context.beginPath();
		context.moveTo(x,y);
		context.lineTo(x,y+length);
		context.lineWidth=width;
		context.strokeStyle=color;
		context.stroke();
	}
}
