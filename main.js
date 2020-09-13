// Modules to control application life and create native browser window
const { app, Menu, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const Window = require("./window");
const { getTodos, addTodo, updateTodo } = require("./DataStore");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// require("electron-reload")(__dirname, {
//   electron: path.join(__dirname, "node_modules", ".bin", "electron"),
// });
let mainWindow = null;
function initializeMainWindow() {
  mainWindow = new Window({
    file: path.join(__dirname, "renderer", "index.html"),
    height: 800,
	width: 800,
	showDevTools: true
  });

  mainWindow.once("show", (event) => {
	mainWindow.webContents.send("fetch-todos", getTodos());
	require('devtron').install()
  });
}

function createMenu() {
  let menu = Menu.buildFromTemplate([
    {
      label: process.platform === "darwin" ? app.getName() : "Electron Todo",
      submenu: [
        {
          label: "Add Todo",
          click: () => {
            const addToWin = new Window({
              file: path.join(__dirname, "renderer", "todo_form.html"),
              height: 400,
			  width: 400,
			  parent: mainWindow
            });
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}

function main() {
  initializeMainWindow();
  createMenu();
}

app.on("ready", main);

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on('save-todo', (event, newTodo) => {
	addTodo(newTodo);
	mainWindow.send('fetch-todos', getTodos());
})


ipcMain.on('update-todo', (event, newTodoId) => {
	console.log('updating todo', newTodoId);
	updateTodo(newTodoId);
	mainWindow.send('fetch-todos', getTodos());
})