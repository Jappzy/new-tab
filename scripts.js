document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('input').addEventListener('keyup', ({ keyCode }) => {
        if (keyCode == 13) addTodo();
    });

    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const list = document.getElementById('todo-list');

    todos.forEach(todo => {
        const item = document.createElement('li');
        item.append(todo);
        const newButton = document.createElement('button');
        newButton.addEventListener('click', removeTodo);
        newButton.appendChild(document.createTextNode('X'))
        item.appendChild(newButton);
        list.appendChild(item);
    });

    initIonicComponents();
});

function addTodo() {
    const todo = document.getElementById('input').value.trim();
    if (!todo) return;
    document.getElementById('input').value = '';
    const list = document.getElementById('todo-list');
    const newItem = document.createElement('li');
    newItem.append(todo);
    const newButton = document.createElement('button');
    newButton.addEventListener('click', removeTodo);
    newButton.appendChild(document.createTextNode('X'))
    newItem.appendChild(newButton);
    list.prepend(newItem);
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.unshift(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodo(event) {
    const text = event.target.parentElement.firstChild.textContent;
    event.target.parentElement.remove();
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(t => t !== text);
    localStorage.setItem('todos', JSON.stringify(todos));
}

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


