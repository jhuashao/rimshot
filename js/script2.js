 var canvas = document.querySelector('canvas');
 var context = canvas.getContext('2d');

var words = project.importSVG(document.getElementById('svg'));

words.visible = true;
words.fillColor = null;


var baGroup = words.children.ba;
var dumGroup = words.children.dum;
var tssGroup = words.children.tss;

words.fitBounds(view.bounds);
words.scale(0.35);

baposition = new Point(view.size.width * 1.9 / 10, view.size.height / 2);
dumposition = new Point(view.size.width * 4.7 / 10, view.size.height / 1.99);
tssposition = new Point(view.size.width * 7.9 / 10, view.size.height / 2);

baGroup.position = baposition;
dumGroup.position = dumposition;
tssGroup.position = tssposition;

var keyData = {
    b: {
        color: "pink",
        sound: new Howl({
            src: ['sounds/snare.m4a']
        })
    },
    d: {
        color: "#f3bfa9",
        sound: new Howl({
            src: ['sounds/snare.m4a']
        })

    },
    t: {
        color: "#042d5b",
        sound: new Howl({
            src: ['sounds/hihat.wav']
        })
    }
}

var circles = [];

function onKeyDown(event) {
    if (keyData[event.key]) {
        var maxPoint = new Point(view.size.width, view.size.height);
        var randomPoint = Point.random();
        var point = maxPoint * randomPoint;
        var newCircle = new Path.Circle(point, 10000)
        newCircle.fillColor = keyData[event.key].color;
        words.strokeColor = keyData[event.key].color;
        newCircle.opacity = 0.5;
        keyData[event.key].sound.play();
        circles.push(newCircle);
    }
}

function onFrame(event) {
    for (var i = 0; i < circles.length; i++) {
        circles[i].fillColor.hue += 1;
        circles[i].scale(.9);
        if (circles[i].area < 1) {
            circles[i].remove();
            circles.splice(i, 1);
            console.log(circles);
        }
    }

    
}
