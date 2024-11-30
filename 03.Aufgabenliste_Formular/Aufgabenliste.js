"use strict";
// Erstellung zweier Variablen:
let tasks = loadTasks(); // Task objekt soll als Array als loadTaskas hinzugefügt werden
let nextTaskId = tasks.length + 1; // Aufgaben anzahl die um 1 der länge des arrays erhöht wird 
// HTML-Elemente zur Anzeige und Bearbeitung der Aufgaben:
const taskList = document.querySelector(".task-cards");
const taskForm = document.getElementById("taskForm");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
// Darstellung der Aufgaben:
function renderTasks() {
    taskList.innerHTML = ""; // bisherige Aufgaben array leeren
    const searchTerm = searchInput.value.toLowerCase(); // Suchbegriff in Kleinbuchstaben umwandeln
    const selectedFilter = filterSelect.value; // Aktueller Filterwert
    // Filterung der Aufgaben basierend auf Status und Suchbegriff:
    const filteredTasks = tasks.map(checkOverdueStatus).filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm); // Überprüfung des Suchbegriffs
        const matchesFilter = selectedFilter === "all" ||
            (selectedFilter === "completed" && task.status === "completed") ||
            (selectedFilter === "overdue" && task.status === "overdue");
        return matchesSearch && matchesFilter;
    });
    // For-schleife zur Darstellung der gefilterten Aufgabe:
    for (const task of filteredTasks) {
        const taskCard = document.createElement("div"); // jede Aufgabe soll ein neues div erstellt werden
        taskCard.className = "task-card"; // stylen so wie in css
        taskCard.dataset.status = task.status; // Aktueller status wird gesetzt 
        const dueDateTime = formatDueDate(task.dueTime);
        // HTML struktur für die Aufgabe:
        taskCard.innerHTML = `
            <h2>${task.title}</h2>
            <p class="task-details">Fällig am: <strong>${dueDateTime}</strong></p> <!-- Datum und Uhrzeit anzeigen -->
            <p class="task-assignee">Bearbeiter: <strong>${task.assignee}</strong></p>
            <p class="task-status">Status: <span class="status ${task.status}">
                ${task.status === "in-progress" ? "In Bearbeitung" : task.status === "completed" ? "Erledigt" : "Überfällig"}
            </span></p>
        `;
        // Erstellung der Erledigt Button für die Aufgabe die noch nicht abgeschlossen ist
        if (task.status !== "completed") {
            const completeButton = document.createElement("button");
            completeButton.className = "complete-button";
            completeButton.innerText = "Erledigt";
            completeButton.addEventListener("click", () => markTaskAsCompleted(task.id));
            taskCard.appendChild(completeButton);
        }
        //Erstellung der Lösch Button für die Aufgabe die gelöscht werden soll
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = "🗑️";
        deleteButton.addEventListener("click", () => deleteTask(task.id));
        taskCard.appendChild(deleteButton);
        taskList.appendChild(taskCard);
    }
}
// Datum zu erstellen und neben dran die Uhrzeit
function formatDueDate(dueTime) {
    const currentDate = new Date(); // Aktuelles Datum und Uhrzeit
    const [hours, minutes] = dueTime.split(":").map(Number);
    currentDate.setHours(hours, minutes, 0, 0); // aktuelle Uhrzeit soll auf das aktuelle Datum gesetzt werden
    // Datum anzeige als DD.MM.YYYY  und anzeige für die Uhrzeit als HH:mm
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}.${month}.${year} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    return formattedDate;
}
// Überprüfung ob die Aufgabe überfällig ist:
function checkOverdueStatus(task) {
    const currentDateTime = new Date();
    const [hours, minutes] = task.dueTime.split(":").map(Number); // datum wird erstellt mit der aktuellen Zeit in einem Array (map(number) = strings werden in Zahlen umgewandelt))
    // Erstellen eines Datums und Uhrzeit
    const taskDueDateTime = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate(), hours, minutes);
    // if-bedingung die sagt: Prüft ob die Aufgabe schon abgeschlossen ist und die Zeit überschritten ist, wenn es true ist wird überfällig dargestellt 
    if (task.status === "in-progress" && taskDueDateTime < currentDateTime) {
        task.status = "overdue";
        saveTasks(); // Funktion wird aufgerufen um es local zu speichern
    }
    return task;
}
// Markierung einer Aufgabe als erledigt:
function markTaskAsCompleted(taskId) {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
        task.status = "completed";
        saveTasks();
        renderTasks();
    }
}
// Löschen einer Aufgabe:
function deleteTask(taskId) {
    const confirmation = confirm("Willst du diese Aufgabe wirklich löschen?");
    if (confirmation) {
        tasks = tasks.filter((t) => t.id !== taskId);
        saveTasks();
        renderTasks();
    }
}
// Hinzufügen einer neuen Aufgabe:
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleInput = document.getElementById("taskTitle");
    const dueTimeInput = document.getElementById("taskDueTime");
    const assigneeInput = document.getElementById("taskAssignee");
    const commentInput = document.getElementById("taskComment");
    // Erstellen einer neuen Aufgabe
    const newTask = {
        id: nextTaskId++, // id wird um 1 erhöht 
        title: titleInput.value,
        dueTime: dueTimeInput.value,
        assignee: assigneeInput.value,
        comment: commentInput.value,
        status: "in-progress"
    };
    tasks.push(newTask);
    saveTasks();
    taskForm.reset();
    renderTasks();
});
// Speicherung der Aufgaben im localStorage:
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Aufgaben aus dem localStorage laden
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
}
// asynchrone Kommunikation mit einem Server:
async function loadTasksFromServer(_url) {
    try {
        const response = await fetch(_url);
        if (response.ok) {
            const serverTasks = await response.json();
            tasks = serverTasks;
            console.log(response);
            renderTasks();
        }
        else {
            console.error("Beim Laden der JSON-Datei wurde ein Fehler gefunden", response.statusText);
        }
    }
    catch (error) {
        console.error("Netzwerkfehler", error);
    }
}
const url = "https://nicolehartmann.github.io/EIA-2/03.Aufgabenliste_Formular/JSON-Datei.json";
loadTasksFromServer(url);
// Filter- und Suchleiste dynamisch aktualisieren:
searchInput.addEventListener("input", renderTasks);
filterSelect.addEventListener("change", renderTasks);
renderTasks();
//# sourceMappingURL=Aufgabenliste.js.map