//SELECTORS
const todoInput = document.querySelector('.todo-app-input');
const todoButton = document.querySelector('.todo-app-button');
const todoList = document.querySelector('.todo-list');
const deleteButton = document.querySelector('.delete-bnt')



//FUNCTIONS

const generateTasksForDOM = (task, taskDone) => {
    //create div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");


    //create li
    const newTask = document.createElement("li");
    newTask.innerHTML = task;
    newTask.classList.add('todo-task');
    todoDiv.appendChild(newTask);


    //done button
    const doneButton = document.createElement('button');
    doneButton.innerHTML = `<span class="material-icons md-dark">
check
</span>`;
    doneButton.classList.add('done-btn');
    todoDiv.appendChild(doneButton);


    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<span class="material-icons md-dark">
delete
</span>`;
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);


    //append to list
    todoList.appendChild(todoDiv)


    if (taskDone === true) {
        newTask.parentElement.classList.add('done');

    }

}


//add a task to DOM and API

const addTask = (event) => {
    event.preventDefault();

    generateTasksForDOM(todoInput.value);

    //put a task in API
    doPOSTRequest(todoInput.value)

    //clear todoInput value
    todoInput.value = "";

    window.location = window.location;
}



//Delete a task or check as done in DOM

const deleteDone = (event) => {
    console.log(event.target.parentElement.firstChild.innerHTML)
    const task = event.target;
    const taskToDelete = task.parentElement;

    // delete a task

    if (task.classList[0] === 'delete-btn') {
        taskToDelete.remove();
    }

    // done line through

    if (task.classList[0] === 'done-btn') {
        const todo = task.parentElement;
        todo.classList.toggle('done');

    }

    window.location = window.location
}




//EVENT LISTENERS

todoButton.addEventListener('click', addTask);
todoList.addEventListener('click', deleteDone);