"use strict";
var Aufgabe9;
(function (Aufgabe9) {
    const canvas = document.getElementById("winterScene");
    const ctx = canvas.getContext("2d");
    let backgroundImage;
    class Vogel {
        x;
        y;
        vx;
        vy;
        type;
        bodyAndHeadColor; //( hab ihr noch die Kopf und Körperfarbe reingemacht)
        wingColor; //(habe dem Flügel Farbe gegeben)
        legColor; // ( habe beine auch eine Farbe gegeben)
        size; // Größe des Vogels (hab ihr noch rein gemacht das du die Vogel größe ändern kannst)
        constructor(x, y, type) {
            this.x = x;
            this.y = y;
            this.type = type;
            this.vx = Math.random() * 2 + 1; // (Vögel Geschwindigkeit nach rechts)
            this.vy = Math.sin(Date.now() / 500) * 5; // (Vertikale Bewegung)
            this.size = Math.random() * 15 + 10; // (Größe der Vögel)
            // (Farben für die Vögel)
            this.bodyAndHeadColor = getRandomColor();
            this.wingColor = getRandomColor();
            this.legColor = getRandomColor();
        }
        move() {
            this.x += this.vx;
            this.vy = Math.sin(Date.now() / 500) * 5; //(hab ihr noch die Vertikale Bewegung reingemacht)
            if (this.x > canvas.width)
                this.x = -this.size; // Wiederholender Flug (hab dir die nur bissle abgeändert das es tut)
            // (horizontale Bewegung für pickende Vögel hab die bedingung angepasst)
            if (this.type === "pecking") {
                // Pecking Bewegung (leichtes Hüpfen)
                this.x += Math.random() * 0.5 - 0.25;
            }
        }
        draw() {
            // Körper (
            ctx.beginPath();
            ctx.ellipse(this.x, this.y + this.vy, this.size, this.size / 2, 0, 0, Math.PI * 2);
            ctx.fillStyle = this.bodyAndHeadColor; // (hab ihr die zufällige farbe reingeacht)
            ctx.fill();
            ctx.closePath();
            // Kopf 
            ctx.beginPath();
            ctx.arc(this.x + this.size * 0.75, this.y + this.vy, this.size / 2, 0, Math.PI * 2);
            ctx.fillStyle = this.bodyAndHeadColor; // (hab ihr die zufällige farbe reingeacht)
            ctx.fill();
            ctx.closePath();
            // Flügel (hab dir Flügel rein gemacht)
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.vy - 5);
            ctx.lineTo(this.x - this.size * 0.75, this.y + this.vy);
            ctx.lineTo(this.x, this.y + this.vy + 5);
            ctx.fillStyle = this.wingColor;
            ctx.fill();
            ctx.closePath();
            // Beine (Hab dir noch beine dran gemacht)
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.vy + this.size / 2);
            ctx.lineTo(this.x - 5, this.y + this.vy + this.size);
            ctx.moveTo(this.x + this.size * 0.5, this.y + this.vy + this.size / 2);
            ctx.lineTo(this.x + 5, this.y + this.vy + this.size);
            ctx.strokeStyle = this.legColor;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        }
    }
    // (Funktion für die zufällige Farbe für die Vögel)
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    class Schneeflocke {
        x;
        y;
        size;
        speed;
        constructor(x, y, size, speed) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speed = speed;
        }
        move() {
            this.y += this.speed;
            if (this.y > canvas.height)
                this.y = -this.size; // Wiederholendes Rutschen nach oben
        }
        draw() {
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
    }
    const movableObjects = [];
    function init() {
        resizeCanvas();
        // Hintergrund zeichnen und speichern
        zeichneHintergrund();
        backgroundImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // Vögel erzeugen und in `movableObjects`hinzufügen
        for (let i = 0; i < 20; i++) {
            const type = Math.random() > 0.5 ? "flying" : "pecking";
            const vogel = new Vogel(Math.random() * canvas.width, Math.random() * (canvas.height * 0.3) + (canvas.height * 0.3), type); // (hab ihr nur die zahl geändert)
            movableObjects.push(vogel);
        }
        // Schneeflocken erzeugen und in `movableObjects` hinzufügen
        for (let i = 0; i < 100; i++) {
            const flocke = new Schneeflocke(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3 + 2, Math.random() * 1 + 0.5);
            movableObjects.push(flocke);
        }
        animate();
    }
    function resizeCanvas() {
        const scale = window.devicePixelRatio || 1;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        canvas.width = window.innerWidth * scale;
        canvas.height = window.innerHeight * scale;
        ctx.scale(scale, scale);
    }
    function zeichneHintergrund() {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "skyblue");
        gradient.addColorStop(1, "white");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        zeichneBerge();
        zeichneBaum();
        zeichneVogelhaus();
        zeichneSonne();
        zeichneWolken();
    }
    function zeichneBerge() {
        // Berge zeichnen
    }
    function zeichneBaum() {
        // Baum zeichnen
    }
    function zeichneVogelhaus() {
        // Vogelhaus zeichnen
    }
    function zeichneSonne() {
        // Sonne zeichnen
    }
    function zeichneWolken() {
        // Wolken zeichnen
    }
    function animate() {
        ctx.putImageData(backgroundImage, 0, 0); // Hintergrund wiederherstellen
        // Alle beweglichen Objekte bewegen und zeichnen
        for (let obj of movableObjects) {
            obj.move();
            obj.draw();
        }
        requestAnimationFrame(animate);
    }
    // ("animate();"" muss raus sonst funktioniert es nicht)
    window.addEventListener("resize", () => {
        resizeCanvas();
        zeichneHintergrund();
        backgroundImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    });
    init();
})(Aufgabe9 || (Aufgabe9 = {}));
//# sourceMappingURL=jenny.js.map