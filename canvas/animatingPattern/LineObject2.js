class LineObject2 {

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
        this.setUpAnimate(1/2, 3/4, 50);
    }

    setUpAnimate(angle, distance){

        const sin = Math.sin(Math.PI * angle);
        const cos = Math.cos(Math.PI * angle);

        var vertices = [];
            vertices.push({
                x: this.position.x,
                y: this.position.y
            });
            vertices.push({
                x: this.position.x,
                y: this.position.y - 50 
            });
        this.vertices = vertices;
        this.points = this.calcWaypoints(vertices);
        this.animate();
    }


    // calc waypoints traveling along vertices
    calcWaypoints(vertices) {
        var waypoints = [];

        for (var i = 1; i < vertices.length; i++) {
            var pt0 = vertices[i - 1];
            var pt1 = vertices[i];
            var dx = pt1.x - pt0.x;
            var dy = pt1.y - pt0.y;
            for (var j = 0; j < 500; j++) {
                var x = pt0.x + dx * j / 500;
                var y = pt0.y + dy * j / 500;
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
            console.log(this.t);
            const self = this;
            console.log(points);
            animate();
            function animate(){
                if (t < points.length - 1) {
                    requestAnimationFrame(animate);
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