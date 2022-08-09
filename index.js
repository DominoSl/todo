'use strict'

const { log: l } = console;

let currentTodos = [
  { id: 1, title: 'task 1', completed: true },
  { id: 4, title: 'task 4', completed: false },
  { id: 2, title: 'task 2', completed: true },
];

let filterType = 'all';
const root = document.querySelector('.todoapp');

render();

function render() {
  const activeTodos = currentTodos.filter(todo => !todo.completed);
  const completedTodos = currentTodos.filter(todo => todo.completed);

  const todos = {
    all: currentTodos,
    active: activeTodos,
    completed: completedTodos,
  }

  const visibleTodos = todos[filterType];

  const header = `
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autofocus=""
        onkeydown="addTodo(event)"
      >
    </header>
  `;

  const main = `
    <section
      class="main"
      onclick="deleteTodo(event)"
    >
      <span class="toggle-all-container">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          onchange=toggleAllTodos(event.target.checked)
          ${activeTodos.length ? '' : 'checked'}
        >
        <label
          for="toggle-all"
        >
          Mark all as complete
        </label>
      </span>
      <ul class="todo-list">
        ${visibleTodos.map(item => 
            `<li
              data-todo-id="${item.id}"
              class="todo-item ${item.completed ? 'completed' : ''}"
            >
            <div class="view">
              <input
                id="todo-${item.id}"
                class="toggle"
                type="checkbox"
                onchange="toggleTodo(${item.id}, event.target.checked)"
                ${item.completed ? 'checked' : ''}
              >
              <label for="todo-${item.id}">${item.title}</label>
              <button
                class="destroy"
                onclick="deleteTodo(${item.id})"
              ></button>
            </div>
          </li>
        `).join('\n')}
      </ul>
    </section>
  `;

  const footer = `
    <footer class="footer">
      <span class="todo-count">
        <strong>${activeTodos.length}</strong>
        items left
      </span>
      <ul class="filters">
        <li>
          <a href="#/"
            ${filterType === 'all' ? 'class="selected"': ''}
            onclick="setFilterType('all')"
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/active"
            ${filterType === 'active' ? 'class="selected"': ''}
            onclick="setFilterType('active')"
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            ${filterType === 'completed' ? 'class="selected"': ''}
            onclick="setFilterType('completed')"
          >
            Completed
            </a>
        </li>
      </ul>

      ${completedTodos.length ? `
        <button
          class="clear-completed"
          onclick="clearCompleted()"
        >
          Clear completed
        </button>
      ` : ''}
    </footer>
  `;

  root.innerHTML = `
    ${header}
    ${currentTodos ? `
      ${main}
      ${footer}
    ` : ''}
  `;
}

function setFilterType(type) {
  filterType = type;

  render();
}

function addTodo(keyEvent) {
  if (keyEvent.key === 'Enter' && keyEvent.target.value) {
    const id = +new Date();

    currentTodos.push({
      id: id,
      title: keyEvent.target.value,
      completed: false,
    });

    render();
  };
};

function clearCompleted() {
  currentTodos = currentTodos.filter(todo => !todo.completed);

  render();
};

function toggleAllTodos(checked) {
  currentTodos.forEach(todo => {
    todo.completed = checked;
  });

  render();
};

function deleteTodo(todoId) {
  currentTodos = currentTodos.filter(todo => todoId !== todo.id)

  render();
}

function toggleTodo(todoId, checked) {
  const currentTodo = currentTodos.find(todo => todoId === todo.id)
  currentTodo.completed = checked;

  render();
}
