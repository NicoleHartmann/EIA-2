document.addEventListener("DOMContentLoaded", () => {

    
    let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
    let context2D: CanvasRenderingContext2D = canvas.getContext("2d")!;
    
    // Random Funktion erstellt:
    function random(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    
    // Farbverlauf für den Kreis:
    function drawGradientCircle(centerX: number, centerY: number, radius: number) {

        let gradient = context2D.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, "rgba(0, 255, 0, 0.8)");  //Grüner Innenverlauf
        gradient.addColorStop(1, "rgba(0, 0, 255, 0.8)");  //Blauer ausßenverlauf

    // Soll den Kreis mit diesem Farbverlauf zeichnen:
        context2D.beginPath();
        context2D.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        context2D.fillStyle = gradient;
        context2D.fill();
        context2D.closePath();
    }
    
    // Viereck Zeichnen:
    function drawRandomsquare() {

        // zufällige Positionen und Größen bestimmen
        let x = random(0, canvas.width);
        let y = random(0, canvas.height);
        let width = random(20, 400);
        let height = random(20, 300);

        //eine zufällige Farbe erstellen
        let color = `hsl(${random(0, 360)}, 70%, 50%)`;  // Zufällige Farbe

         // Soll das Viereck  mit einer zufälligen farbe zeichnen:
        context2D.fillStyle = color;
        context2D.fillRect(x, y, width, height);
    }
    
    // Dreieck zeichnen:
    function drawRandomTriangle() {

        //zufällige Positionen für die Ecken des Dreiecks
        let x1 = random(0, canvas.width);
        let y1 = random(0, canvas.height);
        let x2 = random(0, canvas.width);
        let y2 = random(0, canvas.height);
        let x3 = random(0, canvas.width);
        let y3 = random(0, canvas.height);
    
        let color = `hsl(${random(0, 360)}, 70%, 50%)`;  // Zufällige Farbe

     // Soll das Dreieck mit einer zufälligen Farbe zeichnen:
        context2D.fillStyle = color;
        context2D.beginPath();
        context2D.moveTo(x1, y1);
        context2D.lineTo(x2, y2);
        context2D.lineTo(x3, y3);
        context2D.closePath();
        context2D.fill();
    }
    
 // Hintergrund Zeichnen:
function drawBackground() {
    context2D.fillStyle = "#FFFFFF";  // Die weiße Hintergrund farbe 
    context2D.fillRect(0, 0, canvas.width, canvas.height);  // Ganze Zeichenebene füllen
}

   // Funktion  für das Ganze GenerativeKunst Bild:
    function drawScene() {
        drawBackground();  // Hintergrund  wird gezeichnet
    
        // Zufällige Kreise mit Farbverläufe werden gezeichnet
        for (let i = 0; i < 5; i++) {
            let x = random(100, canvas.width - 100); //Suche zufällige x-Position
            let y = random(100, canvas.height - 100);//Suche zufällige y-Position
            let radius = random(30, 100); //Größe des Kreises
            drawGradientCircle(x, y, radius); 
        }
    
        // Zufällige Viereck gezeichnet
        for (let i = 0; i < 5; i++) {
            drawRandomsquare();
        }
    
        // Zufällige Dreieck gezeichnet
        for (let i = 0; i < 5; i++) {
            drawRandomTriangle();
        }
    }
    
    // Ganze GenerativeKunst Bild dargestellt werden:
    drawScene();
})