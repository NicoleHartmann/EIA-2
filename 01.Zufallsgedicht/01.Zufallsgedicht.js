"use strict";
/*
Aufgabe: < 1. Zufallsgedicht >
Name: < Nicole Hartmann >
Matrikel: < 277174 >
Datum: < 12.10.2024 >
*/
// Schritt 1: "namespace" anlegen:
var Zufallsgedicht;
(function (Zufallsgedicht) {
    // Schritt 2: 3 Arrays anlegen mit gleicher Länge und literalen Zeichenketten für Subjekte, Prädikate und Objekte:
    const subjekte = ["Mann", "Kuh", "Vogel", "Hut"];
    const praedikate = ["läuft", "springt", "fliegt", "sitzt"];
    const objekte = ["Zum Ziel", "ins Tal", "zum Baum", "auf dem Stuhl"];
    // Ausgabe der Arrays
    console.log(`(${subjekte.length})`, subjekte);
    console.log(`(${praedikate.length})`, praedikate);
    console.log(`(${objekte.length})`, objekte);
    // Schritt 3: Funktion soll immer "Alohomora" zurückgeben:
    function getVerse(_subjekte, _praedikate, _objekte) {
        return "Alohomora";
    }
    // Schritt 4: for-Schleife, die rückwärts zählt:
    for (let i = subjekte.length; i > 0; i--) {
        console.log(i);
        const verse = getVerse([], [], []);
        console.log(verse);
    }
    console.log("");
    // Schritt 5: Funktion um ein zufälliges Gedicht mit hilfe der Arrays zu erstellen:
    function gedicht(_subjekte, _praedikate, _objekte) {
        let vers = "";
        // Zufallszahl für Subjekt erstellen:
        const randomSubjectIndex = Math.floor(Math.random() * _subjekte.length);
        vers += _subjekte[randomSubjectIndex] + " "; // Zufälliges Subjekt aus Array lesen
        // Zufallszahl für Prädikat erstellen:
        const randomPredicateIndex = Math.floor(Math.random() * _praedikate.length);
        vers += _praedikate[randomPredicateIndex] + " "; // Zufälliges Prädikat aus Array lesen
        // Zufallszahl für Objekt erstellen:
        const randomObjectIndex = Math.floor(Math.random() * _objekte.length);
        vers += _objekte[randomObjectIndex]; // Zufälliges Objekt aus Array lesen
        return vers;
    }
    // Wiederholt das Gedicht in einer for-Schleife
    for (let i = subjekte.length; i >= 1; i--) {
        const vers = gedicht(subjekte, praedikate, objekte);
        console.log(vers);
    }
})(Zufallsgedicht || (Zufallsgedicht = {}));
//# sourceMappingURL=01.Zufallsgedicht.js.map