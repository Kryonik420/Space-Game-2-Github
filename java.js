let KEY_SPACE = false; // 32
let KEY_UP = false; // 38
let KEY_DOWN = false; // 40
let canvas;
let ctx;
let backgroundImage = new Image();

const restartButton = document.getElementById("restart-button");

restartButton.addEventListener("click", function() {
    location.reload();
});



let score = 0;

// ...

function checkForCollision() {
    // ...

    shots.forEach(function(shot) {
        // ...

        if (shot.x + shot.width > ufo.x &&
            shot.y + shot.height > ufo.y &&
            shot.x < ufo.x &&
            shot.y < ufo.y + ufo.height
        ) {
            // ...
            score++;
        }
    });
}


let rocket = {
    x: 50,
    y: 200,
    width: 100,
    height: 50,
    src: 'img/rocket.png'
};

let ufos = [];
let shots = [];

document.onkeydown = function(e) {
    if (e.keyCode == 32) { // Leertaste gedrückt
        KEY_SPACE = true;
    }

    if (e.keyCode == 38) { // Nach oben gedrückt
        KEY_UP = true;
    }

    if (e.keyCode == 40) { // Nach unten gedrückt
        KEY_DOWN = true;
    }
}


document.onkeyup = function(e) {
    if (e.keyCode == 32) { // Leertaste losgelassen
        KEY_SPACE = false;
    }


    if (e.keyCode == 38) { // Nach oben losgelassen
        KEY_UP = false;
    }

    if (e.keyCode == 40) { // Nach unten losgelassen
        KEY_DOWN = false;
    }
}

function startGame() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    loadImages();
    setInterval(update, 1000 / 65);
    setInterval(createUfos, 1000 / 2);
    setInterval(checkForCollion, 1000 / 205);
    setInterval(checkForShoot, 1000 / 100); // Deine Hausaufgabe
    draw();
}

function checkForCollion() {
    ufos.forEach(function(ufo) {

        // Kontrollieren, ob UFO mit Rakete kollidiert
        if (rocket.x + rocket.width > ufo.x &&
            rocket.y + rocket.height > ufo.y &&
            rocket.x < ufo.x &&
            rocket.y < ufo.y + ufo.height
        ) {
            rocket.img.src = 'img/boom.png';
            console.log('Collion!!!');
            ufos = ufos.filter(u => u != ufo);

        }

        // Deine Hausaufgabe
        shots.forEach(function(shot) {
            // Kontrollieren, ob Laser mit Rakete kollidiert
            if (shot.x + shot.width > ufo.x &&
                shot.y + shot.height > ufo.y &&
                shot.x < ufo.x &&
                shot.y < ufo.y + ufo.height
            ) {
                ufo.hit = true;
                ufo.img.src = 'img/boom.png';
                console.log('Collion!!!');

                setTimeout(() => {
                    ufos = ufos.filter(u => u != ufo);
                }, 1000);
            }

        });

    });
}

function createUfos() {
    let ufo = {
        x: 800,
        y: Math.random() * 500, // Wir platzieren unsere UFOs an einem zufälligen Ort
        width: 100,
        height: 40,
        src: 'img/ufo.png',
        img: new Image()
    };
    ufo.img.src = ufo.src; // Ufo-Bild wird geladen.
    ufos.push(ufo);
}

// Deine Hausaufgabe
function checkForShoot() {
    if (KEY_SPACE) {
        let shot = {
            x: rocket.x + 110,
            y: rocket.y + 22,
            width: 20,
            height: 10,
            src: 'img/shot.png',
            img: new Image()
        };
        shot.img.src = shot.src; // Laser-Bild wird geladen.

        shots.push(shot);
    }
}

function update() {
    if (KEY_UP) {
        rocket.y -= 10;
    }

    if (KEY_DOWN) {
        rocket.y += 10;
    }

    ufos.forEach(function(ufo) {
        if (!ufo.hit) {
            ufo.x -= 3;
        }
    });


    shots.forEach(function(shot) {
        shot.x += 35;
    });
}

function loadImages() {
    backgroundImage.src = 'img/background.png';
    rocket.img = new Image();
    rocket.img.src = rocket.src;
}

function draw() {
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);

    ufos.forEach(function(ufo) {
        ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);
    });


    shots.forEach(function(shot) {
        ctx.drawImage(shot.img, shot.x, shot.y, shot.width, shot.height);
    });


    requestAnimationFrame(draw);
}