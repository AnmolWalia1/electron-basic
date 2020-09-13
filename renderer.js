const { ipcRenderer } = require('electron');
const chooseBtn = document.getElementById('choose-btn');

chooseBtn.addEventListener('click', event => {
	ipcRenderer.send('open-dialog');
});

ipcRenderer.on('selected-items', (events, args) => {
	console.log(args);
});
