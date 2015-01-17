(function() {

	Object.prototype.scrollTrigger = function() {

		// set defaults
		var props = {
			elem: this,
			func: function() {},
			reset: function() {},
			status: 0, // 0 = not triggered, 1 = triggered
			offset: 0,
			delay: 0
		};

		// accepts object or single function
		if(typeof arguments[0] === 'object') {
			
			for(var key in arguments[0]) {
				if(arguments[0].hasOwnProperty(key) && props.hasOwnProperty(key)) {
					props[key] = arguments[0][key];
				}
			}

		} else {
			props.func = arguments[0];
		}

		var methods = {
			init: function() {
				window.onscroll = function() {

					var fromTop = window.pageYOffset,
						trigger = methods.setTrigger();

					// Check if scroll depth is more than trigger
					if(fromTop >= trigger) {
						if(status == 0) {
							props.func();
							status = 1;
						}
					} else {
						if(status == 1) {
							props.reset();
							status = 0;
						}
					}

				}
			},
			setTrigger: function() {

				var trigger,
					elemOffset = props.elem.offsetTop,
					winHeight = window.innerHeight;

				trigger = elemOffset - (winHeight / 2);

				return trigger;

			}
		};

		// initiate ScrollTrigger
		methods.init();
		
	}

})();