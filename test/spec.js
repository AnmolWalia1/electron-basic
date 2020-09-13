const electron = require('electron');
const Application = require('spectron').Application;
const expect = require('chai').expect;

describe('Spectorn example', function() {
	this.timeout(10000); //10 seconds
	global.app = null;

	//starts the application before all the test in this block
	before(() => {
		//create the electron app
		app = new Application({
			path: electron,
			args: ['.']
		});
		//start the electron app
		return app.start().then(() => {
			app.client.waitUntilWindowLoaded();
			app.browserWindow.show();
			return app;
		});
	});

	//stop th electron application after all the test
	after(() => {
		if (app && app.isRunning()) {
			return app.stop();
		}
	});

	it('should open the browserwindow', () => {
		return app.client
			.waitUntilWindowLoaded()
			.getWindowCount()
			.then(count => {
				expect(count).to.equal(1);
			});
	});
});
