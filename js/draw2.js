
/*****************************************
	GLOBAL VARIABLES
*****************************************/

const $canvas = $('canvas');
const ctx = $canvas[0].getContext('2d');
let $penColor = $('.selected').css('background-color');
let mouseDown = false,
	colorSliding = false,
	prevEvent;

/*****************************************
	FUNCTIONS
*****************************************/

// update the new color span
function changeColor() {
	let rgb = 'rgb(';
	rgb += $('#red').val() + ',';
	rgb += $('#green').val() + ',';
	rgb += $('#blue').val() + ')';
	$('#newColor').css('background-color', rgb);
}

function randomNumber() {
	return Math.floor(Math.random() * 256) + 1;
}

/*****************************************
	MAIN
*****************************************/

// When clicking on control list items
$('.controls').on('click', 'li', function() {
	// Deselect sibling elements
	$(this).siblings().removeClass('selected');
	// Select clicked element
	$(this).addClass('selected');
	// cache current color
	$penColor = $(this).css('background-color');
});

// When "New Color" is clicked
$('#revealColorSelect').click(function() {
	// Changes button text
	if ($(this).text() === 'Close') $(this).text('New Color');
	else $(this).text('Close');
	// Show color select or hide the color select
	$(this).next().toggle();
	$(this).next().find('#randomColor').click();
});

// When color sliders change
$('input[type=range]').change(changeColor).mousedown(function() {
	changeColor();
	colorSliding = true;
}).mousemove(function() {
	if(colorSliding) {
		changeColor();
	}
}).mouseup(function() {
	colorSliding = false;
});

// When "Add Color" is clicked
$('#addNewColor').click(function() {
	// Append the color to the controls ul
	const $li = $('<li></li>');
	$li.css('background-color', $('#newColor').css('background-color'));
	$('.controls ul').append($li);
	// Select the new color
	$li.click();
});

// When "Random Color" is clicked
$('#randomColor').click(function() {
	$('#red').val(randomNumber());
	$('#green').val(randomNumber());
	$('#blue').val(randomNumber());
	changeColor();
});

// On mouse events on the canvas
$canvas.mousedown(function(e) {
	prevEvent = e;
	mouseDown = true;
}).mousemove(function(e) {
	// Draw lines
	if (mouseDown) {
		ctx.beginPath();
		ctx.moveTo(prevEvent.offsetX, prevEvent.offsetY);
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.strokeStyle = $penColor;
		ctx.stroke();
		prevEvent = e;
	}
}).mouseup(function() {
	mouseDown = false;
}).mouseleave(function() {
	$canvas.mouseup();
});
