// accept hot module reloading
if ( module.hot ) {
	module.hot.accept();
}

// Styles
import '../styles/main.scss';

// Scripts
// Require the polyfill before requiring any other modules.
require('intersection-observer');

import 'jquery';

import validator from 'validator';
import './tweenmax.min.js';

// app singleton
class App {

	constructor() {
		
		this.$window     = $(window);
		this.$document   = $(document);
		this.$html       = $('html');
		this.$body       = $('body');

		document.addEventListener('DOMContentLoaded', () => {
			this.$html[0].classList.add('has-loaded');
			this.init();
		});

	};

	init() {
		console.log('init');

		// 
		this.lazyload({
			// selector: '.lazyload',
			// offset: '0px 0px -200px 0px'
		});
		
		this.skrolly({
			// reverse: true,
			el: '[data-skrolly]', 
			// revealClass: 'revealed',
			// rootMargin: '0px 0px -200px 0px'
		});

	};

	throttle(fn, delay) {
		let lastCall = 0;
		return function (...args) {
			const now = (new Date).getTime();
			if (now - lastCall < delay) {
				return;
			}
			lastCall = now;
			return fn(...args);
		}
	};

	debounce(fn, delay) {
		let timerId;
		return function (...args) {
			if (timerId) {
				clearTimeout(timerId);
			}
			timerId = setTimeout(() => {
				fn(...args);
				timerId = null;
			}, delay);
		}
	};

	/////////////////////////////////////////////////////////////////

	lazyload(params = {}) {

		// height or padding required for img tags since they collapse;
		// in order for intersection observer to correctly fire
		// either wrap img in a .lazyload container with padding/height or set height on img
		// e.g. .lazyload img { height: 500px; } or .lazyload { padding-bottom: 60%; }
		
		// params = {
		// 	selector: '.lazyload',
		// 	offset: '0px 0px 0px 0px' // pos val triggers %/px before elem in view, neg val triggers after elem is %/px in view
		// }

		// let nested   = params.nested || false;
		let selector = params.selector || '.lazyload';
		let offset   = params.offset || '0px 0px 0px 0px';
		const images = document.querySelectorAll(selector);
		
		const config = {
			rootMargin: offset,
			threshold: 0
		}; 
		
		const handleIntersection = (entries, observer) => {
			entries.forEach(entry => {
				if (entry.intersectionRatio > 0) {
					observer.unobserve(entry.target);
					if ( entry.target.dataset.src ) {
						loadImage(entry.target)
					} else {
						loadImage(entry.target.querySelector('[data-src]'))
					}
				}
			})
		}
		
		const observer = new IntersectionObserver(handleIntersection, config);

		const loadImage = (image) => {
			const src = image.dataset.src;
			fetchImage(src).then(() => {
				image.tagName === 'IMG' ?
					image.src = src :
					image.style.backgroundImage = 'url('+ src +')';
				// image.src = src;
				image.classList.add('lazyloaded');
			})
		}

		const fetchImage = (url) => {
			return new Promise((resolve, reject) => {
				const image = new Image();
				image.src = url;
				image.onload = resolve;
				image.onerror = reject;
			});
		}

		// images.forEach(image => {
		// 	observer.observe(image)
		// });

		// older browsers
		for (let i = 0; i < images.length; ++i) {
			observer.observe(images[i]);
		}

	};

	skrolly( params = {} ) {

		// params = {
		// 	reverse: false,
		// 	el: '[data-skrolly]', 
		// 	revealClass: 'revealed', // css class animations
		// 	root: null, // defaults to document
		// 	threshold: 0, // 0-1; e.g. .5 would trigger when el is 50% in viewport based on what elem root is set to
		// 	rootMargin: '0% 0% 0% 0%' // trigger px/% from any direction
		// }

		let el          = params.el || '[data-skrolly]';
		let reverse     = params.reverse || false;
		let revealClass = params.revealClass || 'revealed';

		let root        = params.root || null;
		let threshold   = params.threshold || 0;
		let rootMargin  = params.rootMargin || '0% 0% 0% 0%';

		const config = {
			// root: root,
			threshold: threshold,
			rootMargin: rootMargin
		};

		const reveal = (el) => {
			el.classList.add(revealClass);
		};

		const dereveal = (el) => {
			el.classList.remove(revealClass);
		};

		const isRevealed = el => (
			el.classList.contains(revealClass)
		);

		const intersectionObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {

				if ( entry.intersectionRatio > 0 ) {

					// if ( !reverse ) {
					// 	// it's good to remove observer,
					// 	// if you don't need it any more (e.g. lazyloading)
					// 	observer.unobserve(entry.target);
					// }
					// // 

					// console.log(entry.target.classList + ' in view');

					// e.g. data-skrolly='fade-in' data-skrolly-delay='500ms'
					let delay  = entry.target.dataset.skrollyDelay || '0';

					let cb = entry.target.dataset.skrollyCb || '';
					// when elements are in viewport, do fancy
					// e.g. init();
					entry.target.style.transitionDelay = delay;
					
					reveal(entry.target);

					// run callback
					if ( cb ) {
						cb = cb.replace(/\s+/g, '').split(',');
						for (var i = 0, len = cb.length; i < len; i++) {
							var fn = this[cb[i]];
							// pass data-attributes of elem if needed
							if (typeof fn === 'function') fn(entry.target, entry.target.dataset);
						}
					}

				} else {

					if ( reverse ) {
						// console.log(entry.target.classList + ' out of view');
						dereveal(entry.target);
					}

				}

			});

		});

		// get only these elements,
		// which are not revealed yet
		const elements = [].filter.call(
			document.querySelectorAll(el),
			el => !isRevealed(el, revealClass)
		);

		// start observing your elements
		elements.forEach((el) => intersectionObserver.observe(el));

	};

}

new App();