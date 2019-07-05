class LineObject1 {

    constructor(x, y, mcanvas) {
        
        this.position = {x, y};
        this.canvas = mcanvas;
        this.ctx = mcanvas.getContext("2d");

        this.init();

    }

    init(){

        // set some style
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "blue";
        this.t = 1;
        this.lines = 0;
        this.setUpAnimate1(5/6, 25, 0);
        this.setUpAnimate1(1/2, 25, 0);
        this.setUpAnimate2(5/6, 25, 25);
    }

    setUpAnimate1(angle, distance, offset){

        const sin = Math.sin(Math.PI * angle);
        const cos = Math.cos(Math.PI * angle);

        var startPos = {
            x:this.position.x,
            y:this.position.y + offset
        }

        var vertices = [];
            vertices.push({
                x: startPos.x,
                y: startPos.y
            });
            vertices.push({
                x: startPos.x + distance * cos,
                y: startPos.y + distance * sin 
            });
        this.vertices = vertices;
        this.points = this.calcWaypoints(vertices);
        this.animate();

    }


    setUpAnimate2(angle, distance, offset){

        const sin = Math.sin(Math.PI * angle);
        const cos = Math.cos(Math.PI * angle);

        var startPos = {
            x:this.position.x,
            y:this.position.y + offset
        }

        var vertices = [];
            vertices.push({
                x: startPos.x,
                y: startPos.y
            });

            vertices.push({
                x: startPos.x,
                y: startPos.y + distance
            });

            vertices.push({
                x: startPos.x            + distance * cos,
                y: startPos.y + distance + distance * sin 
            });

        this.vertices = vertices;
        this.points = this.calcWaypoints(vertices);
        this.animate();
    }


    callback1 = ()=>{
        
        this.setUpAnimate1(7/6, 25, 0);
        this.setUpAnimate1(7/6, 25, 25);
    }


    callback2 = ()=>{

        console.log("this is for test");
    }


    // calc waypoints traveling along vertices
    calcWaypoints(vertices) {
        var waypoints = [];

        for (var i = 1; i < vertices.length; i++) {
            var pt0 = vertices[i - 1];
            var pt1 = vertices[i];
            var dx = pt1.x - pt0.x;
            var dy = pt1.y - pt0.y;
            for (var j = 0; j < 50; j++) {
                var x = pt0.x + dx * j / 50;
                var y = pt0.y + dy * j / 50;
                waypoints.push({
                    x: x,
                    y: y
                });
            }
        }
        return (waypoints);
    }

    animate() {
            var t = this.t;
            var points = this.points;
            const self = this;
            this.lines += 1
            const lines = this.lines;
            const callback1 = this.callback1;
            const callback2 = this.callback2;
            animate();
            function animate(){
                if (t < points.length - 1) {
                    requestAnimationFrame(animate);
                }else{
                    if(lines == 3){
                        callback1();
                    }
                    if(lines == 5){
                        callback2();
                    }
                }
                // draw a line segment from the last waypoint
                // to the current waypoint
                ctx.beginPath();
                ctx.moveTo(points[t - 1].x, points[t - 1].y);
                ctx.lineTo(points[t].x, points[t].y);
                ctx.stroke();
                // increment "t" to get the next waypoint
                t++;
            }        
    }
}