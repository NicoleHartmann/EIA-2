"use strict";
/*
Aufgabe: < 2. EventInspector >
Name: < Nicole Hartmann >
Matrikel: < 277174 >
Datum: < 12.10.2024 >
*/
function logEventInfo(_event) {
    console.log("Event Type:", _event.type);
    console.log("Event Target:", _event.target);
    console.log("Event CurrentTarget:", _event.currentTarget);
    console.log("Full Event Object:", _event);
}
function setInfoBox(_event) {
    const infoBox = document.getElementById("infoBox");
    if (infoBox) {
        const mouseX = _event.clientX;
        const mouseY = _event.clientY;
        const offset = 10;
        infoBox.textContent = `Mouse Position: (${mouseX}, ${mouseY})`;
        infoBox.style.left = `${mouseX + offset}px`;
        infoBox.style.top = `${mouseY + offset}px`;
        infoBox.style.display = "block";
    }
}
function handleLoad() {
    document.addEventListener("mousemove", setInfoBox);
    document.addEventListener("click", logEventInfo);
    document.addEventListener("keyup", function (_event) {
        console.log("Key Up Event:", _event.key);
    });
    const eventButton = document.getElementById("EventButton");
    if (eventButton) {
        eventButton.addEventListener("mouseleave", function () {
            const infoBox = document.getElementById("infoBox");
            if (infoBox) {
                infoBox.style.display = "none"; // Info-Box ausblenden
            }
        });
    }
    const customEventButton = document.getElementById("CustomEventButton");
    if (customEventButton) {
        customEventButton.addEventListener("click", function () {
            console.log("Button clicked - Custom Event being triggered");
            const customEvent = new CustomEvent("myCustomEvent", {
                detail: { message: "Custom event has been triggered!" },
                bubbles: true // Event soll den DOM-Graphen "aufsteigen"
            });
            customEventButton.dispatchEvent(customEvent);
        });
    }
    document.addEventListener("myCustomEvent", function (event) {
        console.log("Custom Event caught!", event.detail.message);
    });
}
window.addEventListener("load", handleLoad);
//# sourceMappingURL=EventInspector.js.map