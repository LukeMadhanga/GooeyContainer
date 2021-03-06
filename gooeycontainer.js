/**
 * A jQuery plugin to snap items onto a page when a user has scrolled past a critical point
 * @param {jQuery} $ The jQuery object
 * @param {int} count An instance count. This number will be incremented as gooeyContainer instances are created
 * @param {Window} window The Window object
 */
(function ($, count, window) {
    "use strict";
    /*global jQuery*/
    
    /**
     * Globals
     */
    $.gooeyContainer = {
        consts: {
            POSITION_TOP: 1,
            POSITION_BOTTOM: 2,
            SNAP_TOP: 1,
            SNAP_BOTTOM: 2
        }
    };
    var ef = function () {return;},
    methods = {
        init: function (opts) {
            var T = this,
            data = {};
            if (T.length > 1) {
                T.each(function () {
                    // Load the plugin on each of the items individually
                    return $(this).gooeyContainer(opts);
                });
                return T;
            }
            if (!T.length || T.data('gooeycontainerdata')) {
                // There is nothing to instantiate, or an isntance has already been created
                return T;
            }
            data.instanceid = ++count;
            data.containerid = 'gooeycontainer' + data.instanceid;
            data.state = 'normal';
            data.s = $.extend({
                onChange: ef,
                position: $.gooeyContainer.consts.POSITION_TOP,
                setParentHeight: !0,
                snapOn: $.gooeyContainer.consts.SNAP_TOP
            }, opts);
            T.data('gooeycontainerdata', data);
            
            // Start off by moving this item into a container
            $('<div class="gooeycontainerparent" id="' + data.containerid + '"></div>').insertAfter(T);
            $('#' + data.containerid).append(T);
            
            $(window).on('scroll', function () {
                var w = $(this),
                container = $('#' + data.containerid),
                containerpos = container.position(),
                scrollpos = w.scrollTop(),
                heightoffset = data.s.snapOn === $.gooeyContainer.consts.SNAP_TOP ? 0 : T[0].getBoundingClientRect().height,
                state,
                addorremoveclass,
                position;
                switch (data.s.position) {
                    case $.gooeyContainer.consts.POSITION_TOP:
                        // When the scroll position is above the snap point, allow the element to retain its original position. As soon
                        //  as the scroll position passes the snap point, snap
                        if (scrollpos >= containerpos.top + heightoffset) {
                            state = 'snapped';
                        } else {
                            // No longer snapped
                            state = 'normal';
                        }
                        break;
                    case $.gooeyContainer.consts.POSITION_BOTTOM:
                        // When the scroll position is above the snap point, position fixed. When the user has scrolled beyond the snap
                        //  point, return the element to its original position
                        scrollpos += w.height();
                        if (scrollpos >= containerpos.top + heightoffset) {
                            state = 'normal';
                        } else {
                            state = 'snapped';
                        }
                        break;
                }
                addorremoveclass = state === 'snapped' ? 'addClass' : 'removeClass';
                position = data.s.position === $.gooeyContainer.consts.POSITION_TOP ? 'top' : 'bottom';
                T[addorremoveclass]('gooeycontaineritem gooeycontainer-' + position);
                container[addorremoveclass]('gooeycontainerparent-active');
                if (data.state !== state) {
                    // The state has changed. Update the state and then call an onchange
                    data.state = state;
                    data.s.onChange.call(this, {state: state});
                    if (data.s.setParentHeight) {
                        container.height(T[0].getBoundingClientRect().height);
                    }
                }
            }).scroll();
            return T;
        }
    };
    
    /**
     * Add the gooeyContainer plugin to the jQuery object
     * @param {mixed} methodOrOpts The name of a method to call (optionally followed by arguments) or an object of options if only
     *  initialising
     * @returns {jQuery}
     */
    $.fn.gooeyContainer = function (methodOrOpts) {
        if (methods[methodOrOpts]) {
            // The first option passed is a method, therefore call this method
            return methods[methodOrOpts].apply(this, Array.prototype.slice.call(arguments, 1));
        } 
        if (Object.prototype.toString.call(methodOrOpts) === '[object Object]' || !methodOrOpts) {
            // The default action is to call the init function
            return methods.init.apply(this, arguments);
        }
        // The user has passed us something dodgy, throw an error
        $.error(['The method ', methodOrOpts, ' does not exist'].join(''));
    };
    
}(jQuery, 0, this));
