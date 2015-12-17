'use strict';

$.fn.scrollEvent = function() {
    // set defaults
    var props = {
        elem: $(this),
        func: function() {},
        reset: function() {},
        triggered: false, 
        centered: false,
        offset: 0,
        waypoint: '',
        sections: false,
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
            $(window).scroll(function() {

                var fromTop = $(window).scrollTop(),
                    trigger = methods.setTrigger();

                // Check if scroll depth is more than trigger
                
                if (!props.sections) {
                    methods.standardScroll(fromTop, trigger);
                } else {
                    methods.sectionScroll(fromTop, trigger);
                }

            });
        },
        setTrigger: function() {

            var trigger,
                elemOffset = props.elem.offset().top,
                winHeight = $(window).height(),
                halfElemHeight = props.elem.height() / 2;

            trigger = elemOffset;

            // adds half of element height to center
            if(props.centered) {
                trigger = trigger - (winHeight / 2) + halfElemHeight;
            }

            // adjusts according to offset
            if(props.offset) {
                trigger = trigger + props.offset;
            }

            return trigger;

        },
        standardScroll: function (fromTop, trigger) {
            if(fromTop >= trigger) {
                if(!props.triggered) {
                    props.func(props.elem);
                    props.triggered = true;
                }
            } else {
                if(props.triggered) {
                    props.reset(props.elem);
                    props.triggered = false;
                }
            }
        },
        sectionScroll: function (fromTop, trigger) {
            var bottomTrigger = trigger + props.elem.height();
            if(fromTop >= trigger && fromTop < bottomTrigger) {
                if(!props.triggered) {
                    props.func(props.elem);
                    props.triggered = true;
                }
            } else {
                if(props.triggered) {
                    props.reset(props.elem);
                    props.triggered = false;
                }
            }
        }
    };

    // initiate ScrollEvents
    methods.init();
};


// ScrollTo Module 

var ScrollTo = (function() {

    var props = {
        speed: 1000,
        offset: 0,
        linkClass: '.scrollto'
    };

    var methods = {
        init: function() {
            // accepts object or single function
            if(typeof arguments[0] === 'object') {
                for(var key in arguments[0]) {
                    if(arguments[0].hasOwnProperty(key) && props.hasOwnProperty(key)) {
                        props[key] = arguments[0][key];
                    }
                }
            }

            methods.createEvent();
        },
        createEvent: function() {
            // Setup click event and prevent href
            $(props.linkClass).click(function(e) {
                e.preventDefault();
                methods.scroll($(this).attr('href'));
            });
        },
        scroll: function(target) {
            var scrollDistance = $(target).offset().top - props.offset;

            $('html,body').animate({
                scrollTop: scrollDistance
            }, props.speed);
        }
    };

    return methods;

})(ScrollTo || {});