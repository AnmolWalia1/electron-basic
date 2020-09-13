const DataStore = require("electron-store");

const store = new DataStore({ name: "custom data" });
const storeKey = "todos";
store.set(storeKey, [{ id: "1", title: "learn Electron", completed: false }]);

function getTodos() {
  return store.get(storeKey).filter((todo) => !todo.completed) || [];
}

function addTodo(newTodo) {
  const todos = [...store.get(storeKey), newTodo];
  store.set(storeKey, todos);
}

function updateTodo(newTodoId) {
  const todos = getTodos().filter((todo) => todo.id !== newTodoId);
  console.log('after updating todo', todos);
  store.set(storeKey, todos);
}

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
};
