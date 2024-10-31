interface Task {
    id: number;
    title: string;
    dueTime: string;
    assignee: string;
    comment: string;
    status: "in-progress" | "completed" | "overdue";
}

let tasks: Task[] = loadTasks();
let nextTaskId = tasks.length + 1;

const taskList = document.querySelector(".task-cards") as HTMLElement;
const taskForm = document.getElementById("taskForm") as HTMLFormElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const filterSelect = document.getElementById("filter") as HTMLSelectElement;

// Aktualisierung der Aufgabenanzeige:
function renderTasks() {
    taskList.innerHTML = "";
    const searchTerm = searchInput.value.toLowerCase();
    const selectedFilter = filterSelect.value;

    const filteredTasks = tasks.map(checkOverdueStatus).filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm);
        const matchesFilter = selectedFilter === "all" ||
            (selectedFilter === "completed" && task.status === "completed") ||
            (selectedFilter === "overdue" && task.status === "overdue");

        return matchesSearch && matchesFilter;
    });

    for (const task of filteredTasks) {
        const taskCard = document.createElement("div");
        taskCard.className = "task-card";
        taskCard.dataset.status = task.status;

        taskCard.innerHTML = `
            <h2>${task.title}</h2>
            <p class="task-details">Fällig bis: <strong>${task.dueTime}</strong></p>
            <p class="task-assignee">Bearbeiter: <strong>${task.assignee}</strong></p>
            <p class="task-status">Status: <span class="status ${task.status}">${getStatusLabel(task.status)}</span></p>
        `;

        if (task.status !== "completed") {
            const completeButton = document.createElement("button");
            completeButton.className = "complete-button";
            completeButton.innerText = "Erledigt";
            completeButton.addEventListener("click", () => markTaskAsCompleted(task.id));
            taskCard.appendChild(completeButton);
        }

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = "🗑️";
        deleteButton.addEventListener("click", () => deleteTask(task.id));
        taskCard.appendChild(deleteButton);

        taskList.appendChild(taskCard);
    }
}

// Überprüfung, ob eine Aufgabe überfällig ist
function checkOverdueStatus(task: Task): Task {
    const currentDateTime = new Date();
    const taskDueDateTime = new Date(`1970-01-01T${task.dueTime}`);

    if (task.status === "in-progress" && taskDueDateTime < currentDateTime) {
        task.status = "overdue";
        saveTasks();
    }
    return task;
}

// Markierung einer Aufgabe als erledigt
function markTaskAsCompleted(taskId: number) {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
        task.status = "completed";
        saveTasks();
        renderTasks();
    }
}

// Löschen einer Aufgabe
function deleteTask(taskId: number) {
    const confirmation = confirm("Willst du diese Aufgabe wirklich löschen?");
    if (confirmation) {
        tasks = tasks.filter((t) => t.id !== taskId);
        saveTasks();
        renderTasks();
    }
}


function getStatusLabel(status: string): string {
    switch (status) {
        case "in-progress":
            return "In Bearbeitung";
        case "completed":
            return "Erledigt";
        case "overdue":
            return "Überfällig";
        default:
            return "";
    }
}

// Hinzufügen einer neuen Aufgabe
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const titleInput = document.getElementById("taskTitle") as HTMLInputElement;
    const dueTimeInput = document.getElementById("taskDueTime") as HTMLInputElement;
    const assigneeInput = document.getElementById("taskAssignee") as HTMLInputElement;
    const commentInput = document.getElementById("taskComment") as HTMLTextAreaElement;

    const newTask: Task = {
        id: nextTaskId++,
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

// Speicherung der Aufgaben im localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Laden der Aufgaben aus dem localStorage
function loadTasks(): Task[] {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
}

// Suche und den Filter
searchInput.addEventListener("input", renderTasks);
filterSelect.addEventListener("change", renderTasks);


renderTasks();
