"use strict";
var Vogelhaus;
(function (Vogelhaus) {
    class MovableObject {
        x;
        y;
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        move() {
            console.log("Bewege das Objekt.");
        }
        draw() {
            console.log("Zeichne das Objekt.");
        }
    }
    class Snowflakes extends MovableObject {
        size;
        constructor(x, y, size) {
            super(x, y);
            this.size = size;
        }
        move() {
            this.y += 0.1 + this.size / 5;
            if (this.y > crc2.canvas.height) {
                this.y = -this.size;
            }
        }
        draw() {
            crc2.save();
            crc2.translate(this.x, this.y);
            crc2.strokeStyle = "white";
            crc2.lineWidth = 1;
            for (let i = 0; i < 6; i++) {
                crc2.rotate(Math.PI / 3);
                crc2.beginPath();
                crc2.moveTo(0, 0);
                crc2.lineTo(0, -this.size);
                crc2.stroke();
            }
            crc2.restore();
        }
    }
    class Bird extends MovableObject {
        dx;
        dy;
        bodyColor;
        wingColor;
        isPicking;
        constructor(x, y, dx, dy, bodyColor, wingColor) {
            super(x, y);
            this.dx = dx;
            this.dy = dy;
            this.bodyColor = bodyColor;
            this.wingColor = wingColor;
            this.isPicking = false;
        }
        move() {
            this.x += this.dx;
            this.y += this.dy;
            if (this.x > crc2.canvas.width) {
                this.x = 0;
            }
            else if (this.x < 0) {
                this.x = crc2.canvas.width;
            }
            if (this.y > crc2.canvas.height) {
                this.y = 0;
            }
            else if (this.y < 0) {
                this.y = crc2.canvas.height;
            }
        }
        draw() {
            crc2.save();
            crc2.translate(this.x, this.y);
            // Körper Zeichnen:
            crc2.fillStyle = this.bodyColor;
            crc2.beginPath();
            crc2.arc(0, 0, 10, 0, Math.PI * 2);
            crc2.fill();
            // Flügel Zeichnen:
            crc2.fillStyle = this.wingColor;
            crc2.beginPath();
            crc2.moveTo(-5, -5);
            crc2.quadraticCurveTo(-20, -10, -15, 5);
            crc2.quadraticCurveTo(-10, 0, -5, -5);
            crc2.fill();
            crc2.beginPath();
            crc2.moveTo(5, -5);
            crc2.quadraticCurveTo(10, -10, 15, 5);
            crc2.quadraticCurveTo(-10, 0, 5, -5);
            crc2.fill();
            // Kopf Zeichnen:
            crc2.fillStyle = this.bodyColor;
            crc2.beginPath();
            crc2.arc(-8, -10, 7, 0, Math.PI * 2);
            crc2.fill();
            // Augen Zeichnen:
            crc2.fillStyle = "white";
            crc2.beginPath();
            crc2.arc(-10, -12, 2, 0, Math.PI * 2);
            crc2.fill();
            crc2.fillStyle = "black";
            crc2.beginPath();
            crc2.arc(-10, -12, 1, 0, Math.PI * 2);
            crc2.fill();
            crc2.fillStyle = "white";
            crc2.beginPath();
            crc2.arc(-6, -12, 2, 0, Math.PI * 2);
            crc2.fill();
            crc2.fillStyle = "black";
            crc2.beginPath();
            crc2.arc(-6, -12, 1, 0, Math.PI * 2);
            crc2.fill();
            // Schnabel Zeichnen:
            crc2.fillStyle = "orange";
            crc2.beginPath();
            crc2.moveTo(-8, -10);
            crc2.lineTo(-4, -6);
            crc2.lineTo(-8, -6);
            crc2.closePath();
            crc2.fill();
            // Beine Zeichnen:
            crc2.strokeStyle = "brown";
            crc2.lineWidth = 2;
            // Linkes Bein:
            crc2.beginPath();
            crc2.moveTo(0, 10);
            crc2.lineTo(-2, 20);
            crc2.stroke();
            // Rechtes Bein:
            crc2.beginPath();
            crc2.moveTo(5, 9);
            crc2.lineTo(3, 20);
            crc2.stroke();
            crc2.restore();
        }
    }
    class Bird1 extends MovableObject {
        dx;
        dy;
        bodyColor;
        wingColor;
        isAtBirdHouse;
        isWaiting;
        birdHouseX;
        birdHouseY;
        snowmanX;
        snowmanY;
        canvasWidth;
        canvasHeight;
        waitTime;
        startWaitTime;
        isFlyingToSnowman;
        isFlyingBack;
        constructor(x, y, dx, dy, bodyColor, wingColor, canvasWidth, canvasHeight) {
            super(x, y);
            this.dx = dx;
            this.dy = dy;
            this.bodyColor = bodyColor;
            this.wingColor = wingColor;
            this.isAtBirdHouse = false;
            this.isWaiting = false;
            this.isFlyingToSnowman = false;
            this.isFlyingBack = false;
            this.birdHouseX = 200;
            this.birdHouseY = 250;
            this.snowmanX = 800;
            this.snowmanY = 700;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.waitTime = 5000;
            this.startWaitTime = 0;
        }
        move() {
            if (!this.isAtBirdHouse) {
                let angleToBirdHouse = Math.atan2(this.birdHouseY - this.y, this.birdHouseX - this.x);
                let speed = 2;
                this.dx = Math.cos(angleToBirdHouse) * speed;
                this.dy = Math.sin(angleToBirdHouse) * speed;
                this.x += this.dx;
                this.y += this.dy;
                if (this.x >= this.birdHouseX - 5 && this.x <= this.birdHouseX + 5 && this.y >= this.birdHouseY - 5 && this.y <= this.birdHouseY + 5) {
                    this.isAtBirdHouse = true;
                    this.dx = 0;
                    this.dy = 0;
                    this.isWaiting = true;
                    this.startWaitTime = Date.now();
                }
            }
            else if (this.isWaiting) {
                let currentTime = Date.now();
                if (currentTime - this.startWaitTime >= this.waitTime) {
                    this.isWaiting = false;
                    this.startWaitTime = 0;
                    this.isFlyingToSnowman = true;
                }
            }
            else if (this.isFlyingToSnowman) {
                let angleToSnowman = Math.atan2(this.snowmanY - this.y, this.snowmanX - this.x);
                let speed = 2;
                this.dx = Math.cos(angleToSnowman) * speed;
                this.dy = Math.sin(angleToSnowman) * speed;
                this.x += this.dx;
                this.y += this.dy;
            }
        }
        draw() {
            crc2.save();
            crc2.translate(this.x, this.y);
            crc2.fillStyle = this.bodyColor;
            crc2.beginPath();
            crc2.arc(0, 0, 10, 0, Math.PI * 2);
            crc2.fill();
            crc2.fillStyle = this.wingColor;
            crc2.beginPath();
            crc2.moveTo(-5, -5);
            crc2.quadraticCurveTo(-20, -10, -15, 5);
            crc2.quadraticCurveTo(-10, 0, -5, -5);
            crc2.fill();
            crc2.beginPath();
            crc2.moveTo(5, -5);
            crc2.quadraticCurveTo(10, -10, 15, 5);
            crc2.quadraticCurveTo(-10, 0, 5, -5);
            crc2.fill();
            crc2.fillStyle = this.bodyColor;
            crc2.beginPath();
            crc2.arc(-8, -10, 7, 0, Math.PI * 2);
            crc2.fill();
            crc2.fillStyle = "white";
            crc2.beginPath();
            crc2.arc(-10, -12, 2, 0, Math.PI * 2);
            crc2.fill();
            crc2.fillStyle = "black";
            crc2.beginPath();
            crc2.arc(-10, -12, 1, 0, Math.PI * 2);
            crc2.fill();
            crc2.fillStyle = "white";
            crc2.beginPath();
            crc2.arc(-6, -12, 2, 0, Math.PI * 2);
            crc2.fill();
            crc2.fillStyle = "black";
            crc2.beginPath();
            crc2.arc(-6, -12, 1, 0, Math.PI * 2);
            crc2.fill();
            crc2.fillStyle = "orange";
            crc2.beginPath();
            crc2.moveTo(-8, -10);
            crc2.lineTo(-4, -6);
            crc2.lineTo(-8, -6);
            crc2.closePath();
            crc2.fill();
            crc2.strokeStyle = "brown";
            crc2.lineWidth = 2;
            crc2.beginPath();
            crc2.moveTo(0, 10);
            crc2.lineTo(-2, 20);
            crc2.stroke();
            crc2.beginPath();
            crc2.moveTo(5, 9);
            crc2.lineTo(3, 20);
            crc2.stroke();
            crc2.restore();
        }
    }
    class Cloud extends MovableObject {
        position;
        size;
        dx;
        particles;
        constructor(position, size, dx) {
            super(position.x, position.y);
            this.position = position;
            this.size = size;
            this.dx = dx;
            this.particles = [];
            let nParticles = 20;
            for (let i = 0; i < nParticles; i++) {
                let x = (Math.random() - 0.5) * this.size.x;
                let y = (Math.random() - 0.5) * this.size.y;
                this.particles.push({ x, y });
            }
        }
        move() {
            this.position.x += this.dx;
            if (this.position.x > crc2.canvas.width) {
                this.position.x = -this.size.x;
            }
            else if (this.position.x < -this.size.x) {
                this.position.x = crc2.canvas.width;
            }
        }
        draw() {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            let radiusParticle = 50;
            let particle = new Path2D();
            let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
            crc2.fillStyle = gradient;
            for (let particlePosition of this.particles) {
                crc2.save();
                crc2.translate(particlePosition.x, particlePosition.y);
                crc2.fill(particle);
                crc2.restore();
            }
            crc2.restore();
        }
    }
    window.addEventListener("load", handleLoad);
    let crc2;
    let golden = 0.62;
    let savedImageData = null;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        const horizon = crc2.canvas.height * golden;
        if (!savedImageData) {
            // Hintergrund einmalig zeichnen:
            drawBackground();
            // Einmalige Bergzeichnung:
            drawMountains({ x: 0, y: horizon }, 80, 200, "grey", "white");
            drawMountains({ x: 0, y: horizon }, 50, 150, "grey", "lightgrey");
            // Bild speichern, damit es nicht beim Animieren überschrieben wird
            savedImageData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
        }
        let movableObjects = [];
        // Schneeflocken erstellen und ins Array hinzufügen:
        for (let i = 0; i < 100; i++) {
            movableObjects.push(new Snowflakes(Math.random() * crc2.canvas.width, Math.random() * crc2.canvas.height, Math.random() * 5 + 2));
        }
        // Vögel erstellen und ins Array hinzufügen:
        const numberOfBirds = 10;
        for (let i = 0; i < numberOfBirds; i++) {
            let bodyColor = getRandomColor();
            let wingColor = getRandomColor();
            let dx = (Math.random() - 0.5) * 1;
            let dy = 0;
            let x = Math.random() * crc2.canvas.width;
            let y = crc2.canvas.height - 10 - Math.random() * 30;
            // Vögel zum movableObjects-Array hinzufügen:
            movableObjects.push(new Bird(x, y, dx, dy, bodyColor, wingColor));
        }
        // Weitere Vögel Erstellen:
        for (let i = 0; i < numberOfBirds; i++) {
            let bodyColor = getRandomColor();
            let wingColor = getRandomColor();
            let dx = (Math.random() - 0.5) * 1;
            let dy = (Math.random() - 0.5) * 1;
            let startSide = Math.floor(Math.random() * 4);
            let x, y;
            if (startSide === 0) {
                x = 0;
                y = Math.random() * crc2.canvas.height;
                dx = Math.random() * 1 + 0.5;
            }
            else if (startSide === 1) {
                x = crc2.canvas.width;
                y = Math.random() * crc2.canvas.height;
                dx = -(Math.random() * 1 + 0.5);
            }
            else if (startSide === 2) {
                x = Math.random() * crc2.canvas.width;
                y = 0;
                dy = Math.random() * 1 + 0.5;
            }
            else if (startSide === 3) {
                x = Math.random() * crc2.canvas.width;
                y = crc2.canvas.height;
                dy = -(Math.random() * 1 + 0.5);
            }
            // Vögel zum movableObjects-Array hinzufügen:
            movableObjects.push(new Bird(x, y, dx, dy, bodyColor, wingColor));
        }
        // Einen speziellen Vogel hinzufügen:
        movableObjects.push(new Bird1(50, 100, 1, 0, "red", "blue"));
        // Wolken erstellen:
        movableObjects.push(new Cloud({ x: 100, y: 100 }, { x: 200, y: 50 }, 0.2));
        movableObjects.push(new Cloud({ x: 300, y: 200 }, { x: 150, y: 75 }, 0.15));
        movableObjects.push(new Cloud({ x: 600, y: 150 }, { x: 250, y: 100 }, 0.3));
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        // Animation:
        function animate() {
            // Hintergrund erneut laden (nicht neu zeichnen)
            crc2.putImageData(savedImageData, 0, 0);
            // Sonne:
            drawSun({ x: 100, y: 75 });
            // Tannen:
            drawPineTree(700, 400, 50);
            //Scheemann:
            drawSnowman();
            //Baum:
            drawPineTree(810, 360, 50);
            drawPineTree(900, 450, 50);
            //Vogelhaus:
            drawBirdHouse(200, 250, 180);
            // Alle bewegten Objekte bewegen und zeichnen:
            for (let obj of movableObjects) {
                obj.move();
                obj.draw();
            }
            requestAnimationFrame(animate);
        }
        // Animation starten
        animate();
    }
    // Hintergrund Zeichnen:
    function drawBackground() {
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "HSL(220, 80%, 30%)");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "lightblue");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    // Sonne Zeichnen:
    function drawSun(_position) {
        let r1 = 30;
        let r2 = 150;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
    // Berg zeichnen:
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        console.log("Berge");
        let stepMin = 100;
        let stepMax = 150;
        let x = 0;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, 0);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);
        crc2.lineTo(x, 0);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    // Schneemann Zeichnen:
    let snowmanParts = [{ x: 600, y: 400, radius: 80 }, { x: 600, y: 290, radius: 60 }, { x: 600, y: 200, radius: 40 }];
    function drawSnowman() {
        snowmanParts.forEach(part => drawSnowCircle(part.x, part.y, part.radius));
        drawDetails();
    }
    function drawSnowCircle(x, y, radius) {
        let gradient = crc2.createRadialGradient(x, y, radius * 0.2, x, y, radius);
        gradient.addColorStop(0, "#FFFFFF");
        gradient.addColorStop(1, "#D9EAF5");
        crc2.fillStyle = gradient;
        crc2.beginPath();
        crc2.arc(x, y, radius, 0, Math.PI * 2);
        crc2.fill();
    }
    function drawDetails() {
        // Augen zeichnen:
        crc2.fillStyle = "black";
        crc2.beginPath();
        crc2.arc(585, 190, 5, 0, Math.PI * 2);
        crc2.arc(615, 190, 5, 0, Math.PI * 2);
        crc2.fill();
        // Mund Zeichnen:
        crc2.strokeStyle = "black";
        crc2.lineWidth = 2;
        crc2.beginPath();
        crc2.arc(600, 205, 15, 0.2 * Math.PI, 0.8 * Math.PI);
        crc2.stroke();
        // Knöpfe Zeichnen:
        crc2.fillStyle = "black";
        crc2.beginPath();
        crc2.arc(600, 270, 5, 0, Math.PI * 2);
        crc2.arc(600, 300, 5, 0, Math.PI * 2);
        crc2.arc(600, 330, 5, 0, Math.PI * 2);
        crc2.fill();
        //Schal zeichnen:
        crc2.fillStyle = "#FF0000";
        crc2.fillRect(570, 230, 60, 10);
        crc2.fillRect(610, 230, 10, 50);
        // Hut zeichnen:
        crc2.fillStyle = "#000000";
        crc2.fillRect(550, 170, 100, 5);
        crc2.fillRect(566, 110, 70, 60);
    }
    // Tanne zeichnen:
    function drawPineTree(x, y, size) {
        console.log("Tanne");
        // Tannen Äste:
        let treeHeight = size * 2.2;
        let branchWidth = size * 1.0;
        let branchHeight = size * 0.6;
        let overlap = -0.4;
        crc2.save();
        crc2.translate(x, y);
        // Stamm der Tanne:
        crc2.fillStyle = "#6B4226";
        crc2.fillRect(-size * 0.2, 0, size * 0.4, treeHeight * 0.3);
        for (let i = 0; i < 6; i++) {
            let branchY = -treeHeight + i * branchHeight + i * overlap * branchHeight;
            let branchX = branchWidth * (1 + i * 0.2);
            crc2.beginPath();
            crc2.moveTo(0, branchY);
            crc2.lineTo(-branchX, branchY + branchHeight);
            crc2.lineTo(branchX, branchY + branchHeight);
            crc2.closePath();
            crc2.fillStyle = "#0B6623";
            crc2.fill();
        }
        crc2.restore();
    }
    // Vogelhaus Zeichnen:
    function drawBirdHouse(x, y, size) {
        console.log("Vogelhaus");
        crc2.fillStyle = "#8B4513";
        crc2.fillRect(x - size / 2, y - size / 2, size, size);
        // Dach:
        let gradient = crc2.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(1, "brown");
        crc2.beginPath();
        crc2.moveTo(x - size / 2, y - size / 2);
        crc2.lineTo(x + size / 2, y - size / 2);
        crc2.lineTo(x, y - size);
        crc2.closePath();
        crc2.fillStyle = gradient;
        crc2.fill();
        // Loch im Vogelhaus:
        crc2.fillStyle = "#6B4226";
        crc2.beginPath();
        crc2.arc(x, y - size / 6, size / 6, 0, 2 * Math.PI);
        crc2.fill();
        // Stamm:
        crc2.fillStyle = "#6B4226";
        crc2.fillRect(x - size / 12, y + size / 2, size / 6, size / 1.1);
    }
})(Vogelhaus || (Vogelhaus = {}));
//# sourceMappingURL=MovingObject.js.map