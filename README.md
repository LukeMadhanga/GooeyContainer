# Gooey Container #
*Snap elements as you scroll in the page*


----------


The 'span-on-scroll' feature is present on the majority of modern websites these days. You can use the very lightweight `$.gooeyContainer` plugin to achieve this functionality.


----------

##Initialising##
####HTML####
    <script type="text/javascript" src="path/to/gooeycontainer.js"></script>

####JavaScript####
    $(function () {
        $(selector).gooeyContainer({...});
    });
*NB, `$(function () {})` is shorthand for `$(document).ready(function () {})`*

##Options##

| Option | Type | Description |
----------|-------|----------------|
position | int (`$.gooeyContainer.consts.POSITION_XXX`) | Where to position the snapped element: Top `$.gooeyContainer.consts.POSITION_TOP`, Bottom `$.gooeyContainer.consts.POSITION_BOTTOM`
snapon | int (`$.gooeyContainer.consts.SNAP_XXX`) | The element span position, e.g., snap when the top of the element has been scrolled past (`$.gooeyContainer.consts.SNAP_TOP`), or the bottom (`$.gooeyContainer.consts.SNAP_BOTTOM`)

