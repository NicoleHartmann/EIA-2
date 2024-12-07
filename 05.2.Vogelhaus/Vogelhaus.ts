namespace Vogelhaus {
    interface Vector {
        x: number;
        y: number;
    }

    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;
    let golden: number = 0.62;

    
    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas) return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        const horizon: number = crc2.canvas.height * golden;

        // Hintergrund:
        drawBackground();

        //Berge:
        drawMountains({ x: 0, y: horizon }, 80, 200, "grey", "white");
        drawMountains({ x: 0, y: horizon }, 50, 150, "grey", "lightgrey");
        
        //Sonne:
        drawSun({ x: 100, y: 75 });

        //Wolken:
        drawCloud({ x: 500, y: 125 }, { x: 250, y: 75 });
        drawCloud({ x: 500, y: 125 }, { x: 250, y: 75 });
        drawCloud({ x: 800, y: 80 }, { x: 220, y: 70 });
        drawCloud({ x: 350, y: 200 }, { x: 180, y: 50 });

        //Tanne hinter dem Schneemann:
        drawPineTree(700, 400, 50);

        //Schneemann:
        drawSnowman();

        //Tanne neben dem Schneemann:
        drawPineTree(810, 360, 50);

         //Tanne:
        drawPineTree(900, 450, 50);

        //Vogelhaus:
        drawBirdHouse(200, 250, 180);
         
        //Schneeflocken:
        drawSnowflakes(100); 
        
        //Vögel:
        drawBirds(20); 

       
    }

    // Hintergrund Zeichnen:
    function drawBackground(): void {
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "HSL(220, 80%, 30%)");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "lightblue");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }


    // Sonne Zeichnen:
    function drawSun(_position: Vector): void {
        let r1: number = 30;
        let r2: number = 150;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

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
    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void {
        console.log("Berge");

        let stepMin: number = 100;
        let stepMax: number = 150;
        let x: number = 0;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, 0);

       do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = - _min - Math.random() * (_max -_min);

            crc2.lineTo(x,y);
        }

        while (x < crc2.canvas.width);
        crc2.lineTo(x, 0);
        crc2.closePath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, - _max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);

        crc2.fillStyle = gradient;
        crc2.fill();

        crc2.restore();
            
        }


    
    // WOlken Zeichnen:
    function drawCloud(_position: Vector, _size: Vector): void {
        let nParticles: number = 20;
        let radiusParticle: number = 50;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.fillStyle = gradient;

        for (let i = 0; i < nParticles; i++) {
            let x = (Math.random() - 0.5) * _size.x;
            let y = (Math.random() - 0.5) * _size.y;

            crc2.save();
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }

        crc2.restore();
    }



    // Schneemann Zeichnen:
    let snowmanParts = [{ x: 600, y: 400, radius: 80 },{ x: 600, y: 290, radius: 60 },{ x: 600, y: 200, radius: 40 }];
    
    function drawSnowman(): void {
        snowmanParts.forEach(part => drawSnowCircle(part.x, part.y, part.radius));
       
        drawDetails();
      
    }

    function drawSnowCircle(x: number, y: number, radius: number): void {
        let gradient = crc2.createRadialGradient(x, y, radius * 0.2, x, y, radius);
        gradient.addColorStop(0, "#FFFFFF");
        gradient.addColorStop(1, "#D9EAF5");

        crc2.fillStyle = gradient;
        crc2.beginPath();
        crc2.arc(x, y, radius, 0, Math.PI * 2);
        crc2.fill();
    }
    
    function drawDetails(): void {
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



    // Schneeflocken Zeichnen:
    function drawSnowflakes(numberOfSnowflakes: number): void {
        for (let i = 0; i < numberOfSnowflakes; i++) {
            let x = Math.random() * crc2.canvas.width;
            let y = Math.random() * crc2.canvas.height;
            let size = Math.random() * 5 + 2;
            drawSnowflake(x, y, size);
        }
    }

    function drawSnowflake(x: number, y: number, size: number): void {
        crc2.save();
        crc2.translate(x, y);
        crc2.strokeStyle = "white";
        crc2.lineWidth = 1;

        for (let i = 0; i < 6; i++) {
            crc2.rotate(Math.PI / 3);
            crc2.beginPath();
            crc2.moveTo(0, 0);
            crc2.lineTo(0, -size);
            crc2.stroke();
        }

        crc2.restore();
    }

    
    // Vogel zeichnen:
    function drawBirds(numberOfBirds: number): void {
        for (let i = 0; i < numberOfBirds; i++) {
            let x = Math.random() * crc2.canvas.width;
            let y = Math.random() * crc2.canvas.height;
            drawBird({ x, y });
        }
    }

    // Position vom Vogel:
    function drawBird(_position: Vector): void {
        crc2.save();
        crc2.translate(_position.x, _position.y);

        // Farben für Körper/Kopf und Flügel:
        let randomColor = getRandomColor();
        let wingColor = getRandomColor(); 
    
        // Körper Zeichnen:
        crc2.fillStyle = randomColor;
        crc2.beginPath();
        crc2.arc(0, 0, 10, 0, Math.PI * 2); 
        crc2.fill();
    
        // Linker Flügel:
        crc2.fillStyle = wingColor;
        crc2.beginPath();
        crc2.moveTo(-5, -5); 
        crc2.quadraticCurveTo(-20, -10, -15, 5); 
        crc2.quadraticCurveTo(-10, 0, -5, -5); 
        crc2.fill();
    
        // Rechter Flügel:
        crc2.beginPath();
        crc2.moveTo(5, -5); 
        crc2.quadraticCurveTo(10, -10, 15, 5); 
        crc2.quadraticCurveTo(-10, 0, 5, -5); 
        crc2.fill();
    
        // Kopf Zeichnen:
        crc2.fillStyle = randomColor;
        crc2.beginPath();
        crc2.arc(-8, -10, 7, 0, Math.PI * 2); 
        crc2.fill();
    
        // Linkes Augen Zeichnen:
        crc2.fillStyle = "white";
        crc2.beginPath();
        crc2.arc(-10, -12, 2, 0, Math.PI * 2); 
        crc2.fill();

        //Pupille:
        crc2.fillStyle = "black";
        crc2.beginPath();
        crc2.arc(-10, -12, 1, 0, Math.PI * 2); 
        crc2.fill();

        // Rechtes Auge Zeichnen:
        crc2.fillStyle = "white";
        crc2.beginPath();
        crc2.arc(-6, -12, 2, 0, Math.PI * 2);
        crc2.fill();

        //Pupille:
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
    
        // Beine Zeichnen
        crc2.strokeStyle = "brown";
        crc2.lineWidth = 2;
        
        //Linkes Bein:
        crc2.beginPath();
        crc2.moveTo(0, 10); 
        crc2.lineTo(-2, 20);
        crc2.stroke();
    
        //Rechtes Bein:
        crc2.beginPath();
        crc2.moveTo(5, 9); 
        crc2.lineTo(3, 20);
        crc2.stroke();
    
        crc2.restore();
    }
    
    // zufällige Farbe für Kopf/Körper und Flügel:
    function getRandomColor(): string {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Tanne zeichnen:
    function drawPineTree(x: number, y: number, size: number): void {
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
  function drawBirdHouse(x: number, y: number, size: number): void {
    console.log("Vogelhaus");

    crc2.fillStyle = "#8B4513";
    crc2.fillRect(x - size / 2, y - size / 2, size, size);

    // Dach:
    let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, size, size);
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
}
 
