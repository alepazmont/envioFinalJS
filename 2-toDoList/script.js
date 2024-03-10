const loadInfo = () => {
    const form$$ = document.querySelector("input#task");
    const taskList$$ = document.querySelector("div.taskList");
    const addTask$$ = document.querySelector("div#addTask");
    const completeTasks$$ = document.querySelector("div.completedTasks");

    let taskList = ["Cocinar", "Estudiar"];
    let completeTasks = [];

    const updateTaskListContent = () => {
        taskList$$.innerHTML = "";
        if (taskList.length === 0) {
            taskList$$.textContent = "No tienes tareas pendientes";
        } else {
            for (let task of taskList) {
                const newTask = document.createElement("p");
                newTask.textContent = task;
                newTask.className = "newTask";

                taskList$$.appendChild(newTask);

                const buttonToCompleteTask = document.createElement("button");
                buttonToCompleteTask.innerText = "✔";
                buttonToCompleteTask.className = "buttonToCompleteTask";

                buttonToCompleteTask.addEventListener("click", function () {
                    completeTasks.push(task);
                    taskList.splice(taskList.indexOf(task), 1);
                    updateTaskListContent();
                    updateCompleteTaskListContent();
                });

                newTask.appendChild(buttonToCompleteTask);
            }
        }
    };

    const updateCompleteTaskListContent = () => {
        completeTasks$$.innerHTML = "";
        if (completeTasks.length === 0) {
            completeTasks$$.textContent = "No tienes tareas completadas";
        } else {
            for (let task of completeTasks) {
                const newTask = document.createElement("p");
                newTask.textContent = task;
                newTask.className = "newTask";

                completeTasks$$.appendChild(newTask);
            }
        }
    };

    updateTaskListContent(); 
    updateCompleteTaskListContent();

    const addTask = () => {
        const newTaskValue = form$$.value.trim(); 
        if (newTaskValue !== "") { 
            taskList.push(newTaskValue); 
            updateTaskListContent();
            form$$.value = "";
        }
    };

    addTask$$.addEventListener("click", addTask);

    form$$.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

};

const init = async () => {
    await loadInfo();
};

document.addEventListener("DOMContentLoaded", function() {
    init();
});
