var canvas;
var ctx;
var canvasDiv;
var outerDiv;

var canvasW;
var canvasH;

//var canvasW     = 640;
//var canvasH     = 480;

var numMovers   = 550;
var movers      = [];
var friction    = .96;
var radCirc     = Math.PI * 2;

var mouseX, mouseY, mouseVX, mouseVY, prevMouseX = 0, prevMouseY = 0;   
var isMouseDown = true;

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
        setInterval( run , 33 );
    }
}

function setup()
{
    outerDiv = document.getElementById("outer");
    canvasDiv = document.getElementById("canvasContainer");
    ctx = canvas.getContext("2d");

    var i = numMovers;
    while( i-- )
    {
        var m = new Mover();
        m.x  = canvasW * .5;
        m.y  = canvasH * .5;
        m.vX = Math.cos(i) * Math.random() * 25;
        m.vY = Math.sin(i) * Math.random() * 25;
        m.size = 2;
        movers[i] = m;
    }

    document.onmousedown = onDocMouseDown;
    document.onmouseup   = onDocMouseUp;
    document.onmousemove = onDocMouseMove;
}

function run()
{
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(8,8,12,.65)";
    ctx.fillRect( 0 , 0 , canvasW , canvasH );
    ctx.globalCompositeOperation = "lighter";

    mouseVX    = mouseX - prevMouseX;
    mouseVY    = mouseY - prevMouseY;
    prevMouseX = mouseX;
    prevMouseY = mouseY;

    var toDist   = canvasW / 1.15;
    var stirDist = canvasW / 8;
    var blowDist = canvasW / 2;

    var Mrnd   = Math.random;
    var Mabs   = Math.abs;
    var Msqrt  = Math.sqrt;
    var Mcos   = Math.cos;
    var Msin   = Math.sin;
    var Matan2 = Math.atan2;
    var Mmax   = Math.max;
    var Mmin   = Math.min;

    var i = numMovers;
    while( i-- )
    {
        var m  = movers[i];
        var x  = m.x;
        var y  = m.y;
        var vX = m.vX;
        var vY = m.vY;

        var dX = x - mouseX;
        var dY = y - mouseY; 
        var d = Msqrt( dX * dX + dY * dY );
        var a = Matan2( dY , dX );
        var cosA = Mcos( a );
        var sinA = Msin( a );

        if( isMouseDown )
        {
            if( d < blowDist )
            {
                var blowAcc = ( 1 - ( d / blowDist ) ) * 2;
                vX += cosA * blowAcc + .5 - Mrnd();
                vY += sinA * blowAcc + .5 - Mrnd();
            }
        }

        if( d < toDist )
        {
            var toAcc = ( 1 - ( d / toDist ) ) * canvasW * .0014;
            vX -= cosA * toAcc;
            vY -= sinA * toAcc;
        }

        if( d < stirDist )
        {
            var mAcc = ( 1 - ( d / stirDist ) ) * canvasW * .00022;
            vX += mouseVX * mAcc;
            vY += mouseVY * mAcc;           
        }


        vX *= friction;
        vY *= friction;

        var avgVX = Mabs( vX );
        var avgVY = Mabs( vY );
        var avgV = ( avgVX + avgVY ) * .5;

        if( avgVX < .1 ) vX *= Mrnd() * 3;
        if( avgVY < .1 ) vY *= Mrnd() * 3;

        var sc = avgV * .45;
        sc = Mmax( Mmin( sc , 3.5 ) , .4 );


        var nextX = x + vX;
        var nextY = y + vY;

        if( nextX > canvasW )
        {
            nextX = canvasW;
            vX *= -1;
        }
        else if( nextX < 0 )
        {
            nextX = 0;
            vX *= -1;
        }

        if( nextY > canvasH )
        {
            nextY = canvasH;
            vY *= -1;
        }
        else if( nextY < 0 )
        {
            nextY = 0;
            vY *= -1;
        }


        m.vX = vX;
        m.vY = vY;
        m.x  = nextX;
        m.y  = nextY;

        ctx.fillStyle = m.color;
        ctx.beginPath();
        ctx.arc( nextX , nextY , sc , 0 , radCirc , true );
        ctx.closePath();
        ctx.fill();     
    }

    //rect( ctx , mouseX - 3 , mouseY - 3 , 6 , 6 );
}


function onDocMouseMove( e )
{
    var ev = e ? e : window.event;
    mouseX = ev.clientX - outerDiv.offsetLeft - canvasDiv.offsetLeft;
    mouseY = ev.clientY - outerDiv.offsetTop  - canvasDiv.offsetTop;
}

function onDocMouseDown( e )
{
    isMouseDown = true;
    return false;
}

function onDocMouseUp( e )
{
    isMouseDown = true;
    return false;
}



// ==========================================================================================


function Mover()
{
    this.color = "rgb(" + Math.floor( Math.random()*255 ) + "," + Math.floor( Math.random()*255 ) + "," + Math.floor( Math.random()*255 ) + ")";
    this.y     = 0;
    this.x     = 0;
    this.vX    = 0;
    this.vY    = 0;
    this.size  = 0; 
}


// ==========================================================================================


function rect( context , x , y , w , h ) 
{
    context.beginPath();
    context.rect( x , y , w , h );
    context.closePath();
    context.fill();
}


// ==========================================================================================