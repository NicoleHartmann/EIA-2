
var Boxes;
(function (Boxes) {
    let n = 5; 
    let color;
    let x = 0;
    let y = 0;

    // Erstellen von n Boxen
    for (let i = 0; i < n; i++) {
        y += (i == 2) ? 20 : 50; 
        x = (x + 170) % 400; 
        
        switch (i) {
            case 0:
                color = "#ff0000"; // i == 0 = Rot
                break;
            case 1:
            case 4:
                color = "#00ff00"; // i == 1 & i == 4 = Grün
                break;
            case 3:
                continue; // i == 3 wird  übersprungen
            default:
                color = "#0000ff"; // Blau für alle anderen
        }
        // Debugging: Prüfen der X- und Y-Koordinaten und der Farbe
        console.log(`Box ${i}: x = ${x}, y = ${y}, color = ${color}`);
        

        for (let size of ["big", "medium", "small"]) {
            createBox(color, x, y, size);
            if (i == 4)
                break; // Falls i == 4, nach der ersten Box die Schleife beenden
        }
    }
    // Funktion zur Erstellung einer Box:

    function createBox(_color, _x, _y, _size) {
        let div = document.createElement("div"); 
        document.body.appendChild(div); 
        div.classList.add(_size); 
        div.style.backgroundColor = _color; 
        div.style.position = "absolute"; 
        div.style.left = _x + "px"; 
        div.style.top = _y + "px"; 
        
        // Debugging: Ausgabe der Box-Details
        console.log(`Box mit Farbe ${_color}, Größe ${_size}, Position (${_x}, ${_y}) erstellt.`);
    }
})(Boxes || (Boxes = {}));

Boxes;
