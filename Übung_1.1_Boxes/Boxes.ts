namespace Boxes {
    let n: number = 5;
    let color: string;
    let x: number = 0;
    let y: number = 0;

    for (let i: number = 0; i < n; i++) {
        y += (i == 2) ? 20 : 50;
        x = (x + 170) % 400;
        switch (i) {
            case 0:
                color = "#ff0000";  // Rot für i == 0
                break;
            case 1:
            case 4:
                color = "#00ff00";  // Grün für i == 1 und i == 4
                break;
            case 3:
                continue;  // i == 3 überspringen
            default:
                color = "#0000ff";  // Blau für alle anderen
        }

        // Schleife für die verschiedenen Größen der Boxen
        for (let size of ["big", "medium", "small"]) {
            createBox(color, x, y, size);
            if (i == 4)
                break;  // Falls i == 4, nach der ersten Box die Schleife beenden
        }
    }

    function createBox(_color: string, _x: number, _y: number, _size: string): void {
        let div: HTMLDivElement = document.createElement("div");
        document.body.appendChild(div);
        div.classList.add(_size);
        div.style.backgroundColor = _color;
        div.style.position = "absolute";  // Für die absolute Positionierung notwendig
        div.style.left = _x + "px";  // X-Position in Pixel
        div.style.top = _y + "px";   // Y-Position in Pixel
    }
}
