document.addEventListener('DOMContentLoaded', () => {
    initTodos();
    initIonicComponents();
});

function initTodos() {
    document.getElementById('input').addEventListener('keyup', ({ keyCode }) => {
        if (keyCode == 13) addClick();
    });
    const todos = JSON.parse(localStorage.getItem('today-todos')) || [];
    todos.forEach(text => addTodoItem(text));
}

function todoChange(type) {
    document.getElementById('todo-list').innerHTML = '';
    const todos = JSON.parse(localStorage.getItem(type)) || [];
    todos.forEach(text => addTodoItem(text));
}

function addClick() {
    const todo = document.getElementById('input').value.trim();
    document.getElementById('input').value = '';
    if (!todo) return;
    createTodo(todo);
}

function removeClick(event) {
    const todo = event.target.parentElement.firstChild.textContent;
    deleteTodo(todo);
    event.target.parentElement.remove();
}

function getTodoType() {
    const todoTypes = document.getElementsByClassName('todo-radio-input');
    for (let i = 0; i < todoTypes.length; i++) {
        if (todoTypes[i].checked) {
            return todoTypes[i].value;
        }
    }
}

function createTodo(todo) {
    const todoType = getTodoType();
    let todos = JSON.parse(localStorage.getItem(todoType)) || [];
    todos.unshift(todo);
    localStorage.setItem(todoType, JSON.stringify(todos));
    addTodoItem(todo, false);
}

function deleteTodo(todo) {
    const todoType = getTodoType();
    let todos = JSON.parse(localStorage.getItem(todoType)) || [];
    todos = todos.filter(t => t !== todo);
    localStorage.setItem(todoType, JSON.stringify(todos));
}

function addTodoItem(todo, append = true) {
    const list = document.getElementById('todo-list');
    const newItem = document.createElement('li');
    newItem.append(todo);
    const newButton = document.createElement('button');
    newButton.addEventListener('click', removeClick);
    newButton.append('X');
    newItem.appendChild(newButton);
    const res = append ? list.appendChild(newItem) : list.prepend(newItem);
    enableDragSort('drag-drop-reorder');
}

// Drag & Drop Re-ordering

function enableDragSort(listClass) {
    const sortableLists = document.getElementsByClassName(listClass);
    Array.prototype.map.call(sortableLists, enableDragList);
}

function enableDragList(list) {
    Array.prototype.map.call(list.children, enableDragItem);
}

function enableDragItem(item) {
    item.setAttribute('draggable', true)
    item.ondrag = handleDrag;
    item.ondragend = handleDrop;
}

function handleDrag(item) {
    const selectedItem = item.target,
            list = selectedItem.parentNode,
            x = event.clientX,
            y = event.clientY;

    selectedItem.classList.add('reorder-in-progress');
    let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);

    if (list === swapItem.parentNode) {
        swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
        list.insertBefore(selectedItem, swapItem);
    }
}

function handleDrop(item) {
    item.target.classList.remove('reorder-in-progress');
    const list = document.getElementById('todo-list');
    const todos = Array.prototype.map.call(list.children, li => li.firstChild.textContent);
    const todoType = getTodoType();
    localStorage.setItem(todoType, JSON.stringify(todos));
}

// Ionic Component Icons & Links

function initIonicComponents() {
    const ionicComponents = [
        '!icons!https://ionicons.com!https://ionicframework.com/docs/assets/icons/feature-component-icons-icon.png!',
        '!action-sheet!https://ionicframework.com/docs/api/action-sheet!https://ionicframework.com/docs/assets/icons/feature-component-actionsheet-icon.png!',
        'alert',
        'badge',
        'button',
        'card',
        'checkbox',
        'chip',
        '!date-time-picker!https://ionicframework.com/docs/api/datetime!https://ionicframework.com/docs/assets/icons/component-datetimepicker-icon.png!',
        'fab',
        'input',
        'item',
        '!list!https://ionicframework.com/docs/api/list!https://ionicframework.com/docs/assets/icons/component-lists-icon.png!',
        'menu',
        'modal',
        'popover',
        '!progress!https://ionicframework.com/docs/api/progress-bar!https://ionicframework.com/docs/assets/icons/component-progress-icon.png!',
        'radio',
        'refresher',
        'reorder',
        '!search!https://ionicframework.com/docs/api/searchbar!https://ionicframework.com/docs/assets/icons/feature-component-search-icon.png!',
        'segment',
        'select',
        'slides',
        'toast',
        'toggle',
        'toolbar'
    ];
    const list = document.getElementById('ionic-component-list');
    ionicComponents.forEach(str => {
        let title = str;
        let url = `https://ionicframework.com/docs/api/${str}`;
        let icon = `https://ionicframework.com/docs/assets/icons/component-${str}-icon.png`;
        if (str[0] === '!') {
            const arr = str.split('!');
            title = arr[1];
            url = arr[2];
            icon = arr[3];
        }
        appendImage(list, title, url, icon);
    });
}

function appendImage(parent, title, url, icon) {
    const img = document.createElement('img');
    img.title = title;
    img.src = icon;
    img.alt = `ion-${title}`;
    img.classList.add(['logo-image']);
    img.addEventListener('click', () => {
        window.open(url, '_self');
    });
    parent.appendChild(img);
}
