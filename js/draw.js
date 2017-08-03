
/****************************************************
****************************************************
PERSONAL CHALLENGES:
	Add random color button to #colorSelect div
	Add change background option
	?Add color fill tool
****************************************************
****************************************************/

/*****************************************************************************
// Problem: No changes are being made from any type of user interaction
// Solution: When user interacts cause changes to happen appropriately
*****************************************************************************/

function resetRGBSliders() {
	$('#red').val(0);
	$('#green').val(0);
	$('#blue').val(0);
	setNewColorRGB();
}

var lastEvent;
var $penColor = $('.selected').css('background-color');
var $canvas = $('canvas');
var ctx = $canvas[0].getContext('2d');
var mouseDown = false;

function getNewColorRGB() {
	let rgb = 'rgb(';
	rgb += $('#red').val() + ',';
	rgb += $('#green').val() + ',';
	rgb += $('#blue').val() + ')';
	return rgb;
}

function setNewColorRGB() {
	$('#newColor').css('background-color', getNewColorRGB())
}

function selectColor() {
	// deselect sibling elements
	$(this).siblings().removeClass('selected');
	// select element that user clicked
	$(this).addClass('selected');
	// cache current color
	$penColor = $(this).css('background-color');
}

// when clicking on control list items
$('.controls ul').on('click', 'li', selectColor);

// when user clicks new color button with #revealColorSelect
$('#revealColorSelect').click(function() {
	// show or hide #colorSelect div
	$(this).next().toggle();
	// set #newColor span to current slider value
	resetRGBSliders();
});

// when color sliders change update #newColor span to sliders' RGB value
$('.sliders').click(setNewColorRGB).mousemove(setNewColorRGB);

// when add color button is clicked
$('#addNewColor').click(function() {
	// append the new color to the controls ul
	let $newRGB = $('<li></li>');
	$newRGB.css('background-color', $('#newColor').css('background-color'));
	$('.controls ul').append($newRGB);
	// select the new color
	$newRGB.click();
});

$canvas.mousedown(function(e) {
	lastEvent = e;
	mouseDown = true;
}).mousemove(function(e) {
	if (mouseDown) {
		ctx.beginPath();
		ctx.moveTo(lastEvent.offsetX, lastEvent.offsetY);
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.strokeStyle = $penColor;
		ctx.stroke();
		lastEvent = e;
	}
}).mouseup(function() {
	mouseDown = false;
});
