/*
Aufgabe: < 2. EventInspector >
Name: < Nicole Hartmann >
Matrikel: < 277174 >
Datum: < 24.10.2024 >
*/
// Infos in der Konsole über ein Event, das ausgeführt wird:
function logEventInfo(_event) {
    console.log("Event Type:", _event.type);
    console.log("Event Target:", _event.target);
    console.log("Event CurrentTarget:", _event.currentTarget);
    console.log("Full Event Object:", _event);
}
// setInfoBox soll die aktuelle Mausposition anzeigen:
function setInfoBox(_event) {
    const infoBox = document.getElementById("infoBox");
    if (infoBox) {
        const mouseX = _event.clientX;
        const mouseY = _event.clientY;
        const offset = 10;
        // Text soll in der Info-Box neben der Mausposition anzeigen werden:
        infoBox.textContent = `Mouse Position: (${mouseX}, ${mouseY})`;
        infoBox.style.left = `${mouseX + offset}px`;
        infoBox.style.top = `${mouseY + offset}px`;
        infoBox.style.display = "block";
    }
}
function CustomEventHandlers() {
    const eventButton = document.getElementById("EventButton");
    if (eventButton) {
        eventButton.addEventListener("mouseleave", () => {
            const infoBox = document.getElementById("infoBox");
            if (infoBox) {
                infoBox.style.display = "none";
            }
        });
    }
    const customEventButton = document.getElementById("CustomEventButton");
    if (customEventButton) {
        customEventButton.addEventListener("click", () => {
            console.log("CustomEventButton clicked - Custom Event being triggered");
            const customEvent = new CustomEvent("myCustomEvent", {
                detail: { message: "Custom event has been triggered!" },
                bubbles: true
            });
            customEventButton.dispatchEvent(customEvent);
        });
    }
    document.addEventListener("myCustomEvent", (event) => {
        console.log("Custom Event caught!", event.detail.message);
    });
}
function handleLoad() {
    document.addEventListener("mousemove", setInfoBox);
    document.addEventListener("click", logEventInfo);
    document.addEventListener("keyup", (_event) => {
        console.log("Key Up Event:", _event.key);
    });
    CustomEventHandlers();
}
window.addEventListener("load", handleLoad);
//# sourceMappingURL=EventInspector.js.map