const { ipcRenderer } = require("electron");

const todoForm = document.getElementById("todoForm");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoTile = e.target[0].value;
  if(!todoTile){
      return;
  }
  const newTodo = {
    title: todoTile,
    id: Date.now().toString(),
    completed: false,
  };
  ipcRenderer.send("save-todo", newTodo);
  todoForm.reset();
});
