const textInput = document.querySelector('.textInput');
const btn = document.querySelector('.btn');

const shouldDoList = document.querySelector('.shouldDo__list');
const haveDoneList = document.querySelector('.haveDone__list');




const model = {
    tasks: [],

    renderTasks: function() {
        const shouldDoTasks = this.tasks.filter(item => item.hasComplete === false);
        shouldDoTasks.forEach(function(item) {
            const newTask = document.createElement('li');
            newTask.textContent = item.text;
            shouldDoList.appendChild(newTask);
        });
        const haveDoneTasks = this.tasks.filter(item => item.hasComplete === true);
        haveDoneTasks.forEach(function(item) {
            const newTask = document.createElement('li');
            newTask.textContent = item.text;
            haveDoneList.appendChild(newTask);
        });
    },

    checkValue: function() {
        if (textInput.value === '') {
            return false;
        }
        return true; 
    },
    
    addTask: function() {
        if (!this.checkValue()) {
            return false;
        };

        const newTask = {
            id: new Date().getTime(),
            text: textInput.value,
            hasComplete: false
        };        
        model.tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(model.tasks));

        const task = document.createElement('li');
        task.textContent = newTask.text;
        shouldDoList.appendChild(task);

        textInput.value = '';
    },

    completeTask: function(event) {
        shouldDoList.removeChild(event.target);
        haveDoneList.appendChild(event.target);
        const ind = model.tasks.findIndex(elem => elem.text === event.target.textContent);
        model.tasks[ind].hasComplete = true;
        localStorage.setItem('tasks', JSON.stringify(model.tasks));     
    },

    removeTask: function(event) {
        haveDoneList.removeChild(event.target);
        const ind = this.tasks.findIndex(elem => elem.text === event.target.textContent);
        this.tasks.splice(ind, 1);
        localStorage.setItem('tasks', JSON.stringify(model.tasks));
    }
}



// --------------------------------Проверка LocalStorage и отрисовка задач--------------------------------



if (localStorage.getItem) {
    model.tasks = JSON.parse(localStorage.getItem('tasks'));
    model.renderTasks();
}











// ------------------------------------Слушатели и запуск работы по задачам-----------------------------------

btn.addEventListener('click', model.addTask.bind(model));

window.addEventListener('keydown', function(event) {
    if (event.key !== 'Enter') {
        return false;
    } else {
        model.addTask();
    }
});

shouldDoList.addEventListener('click', function(event) {
    if (event.target.nodeName !== 'LI') {
        return false;
    } else {
        model.completeTask(event);       
    }
})

haveDoneList.addEventListener('click', function(event) {
    model.removeTask(event);
})






