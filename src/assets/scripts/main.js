// accept hot module reloading
if ( module.hot ) {
	module.hot.accept();
}

import '../styles/main.scss';

// app singleton
class App {

	constructor() {
		this.init();
	}

	init() {
		console.log('init...');
	}

}

new App();