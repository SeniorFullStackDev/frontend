

var canvas;
var ctx;
var canvasW;
var canvasH;
var frame = 30;

// window.addEventListener('resize', init, false);

///////////////////////////////////////////////////custom class////////////////////


///////////////////////////////////////////////////////////////////////////
init();

function init()
{
    canvas = document.getElementById("mainCanvas");
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete
    canvasW = canvas.width;
    canvasH = canvas.height;

    if( canvas.getContext )
    {
        setup();
    }
}

function setup()
{
    ctx = canvas.getContext("2d");
    initBackground();
    initElement();
}

function initBackground(){
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(255,255,255,.65)";
    ctx.fillRect( 0 , 0 , canvasW , canvasH );
    ctx.globalCompositeOperation = "lighter";
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function initElement(){//draw dot
    var dy = 50;
    var dx = 46;
    var angle = 5/6;
    const sin = Math.sin(Math.PI * angle);
    const cos = Math.cos(Math.PI * angle);


    // var line = new LineObject1(100, 100, canvas);

    //draw pattern
    for(var i = -canvasH/dy-50; i < canvasH/dy + 1; i ++){
        for(var k = - canvasW/dx; k< canvasW/dx+50 ; k ++){
            var x = (k) * dx + i * dx/2;
            var y = sin/cos * x + (canvasH - dy * i);
            if(x > -dx && y > -dy && x < canvasW + dx && y < canvasH + dy){
                var line = new LineObject1(x, y, canvas);    
            }

        }
    }





}


