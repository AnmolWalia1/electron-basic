const { ipcRenderer } = require("electron");

ipcRenderer.on("fetch-todos", (event, todos) => {
  const todoHtmlList = todos.reduce((prevVal, currentVal) => {
    prevVal += `
      <li class="list-group-item"> ${currentVal.title} 
        <input type="checkbox" id="${currentVal.id}" class="finish-todo"/>
      </li>`;
    return prevVal;
  }, "");

  document.getElementById("todoList").innerHTML = todoHtmlList;
  const finishTodo = e => {
    ipcRenderer.send("update-todo", e.target.id);
  };
  document.querySelectorAll(".finish-todo").forEach((element) => {
    element.addEventListener("click", finishTodo);
  });
});
