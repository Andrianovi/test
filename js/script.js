let wrapper = document.querySelector('.wrapper');
let bufferZone = document.querySelector('.bufferZone');
let bufferZoneCnt = document.querySelector('.bufferZone-cnt');
let bufferZoneCntMaxHeight = bufferZone.getBoundingClientRect().height - parseInt(window.getComputedStyle(bufferZone).paddingTop) * 2;
let bufferZoneCntWidth = bufferZoneCnt.getBoundingClientRect().width;
let bufferZoneCntGap = parseInt(window.getComputedStyle(bufferZoneCnt).gap);
var count;
let workZone = document.querySelector('.workZone');
let workZoneArea = document.querySelector('.workZone-area');
let workZoneAreaCnt = document.querySelector('.workZone-area-cnt');
let workZoneMarkupLeftCnt = document.querySelector('.workZone-markupLeft-cnt');
let workZoneMarkupBottomCnt = document.querySelector('.workZone-markupBottom-cnt');
let workZoneAreaDragDrop = document.querySelector('.workZone-area-dragDrop');
let zoomCoefficient = 1;

function generateP() {
	let workZoneAreaCnt = document.querySelector('.workZone-area-cnt');
	var pfrag = document.createDocumentFragment();
	for (var i = 0; i < 150; i++) {
		var gridP = document.createElement("p");
		pfrag.appendChild(gridP);
	}
	for (i = 0; i < pfrag.childNodes.length; i++) {
		gridP = pfrag.childNodes[i];
	}
	workZoneAreaCnt.appendChild(pfrag);
}
generateP();
let workZoneAreaCntP = document.querySelector('.workZone-area-cnt p');
function generateDiv() {
	var dfrag = document.createDocumentFragment();
	count = generateRandom(5, 20);
	var i = 0;
	for (var i = 0; i < count; i++) {
		var div = document.createElement("div");
		dfrag.appendChild(div);
	}
	for (i = 0; i < dfrag.childNodes.length; i++) {
		div = dfrag.childNodes[i];

		alterDivStyle(div);
	}
	bufferZoneCnt.appendChild(dfrag);
}

function generateRandom(min, max) {
	var number = Math.floor(Math.random() * (max - min)) + min;
	return number;
}
function alterDivStyle(div) {
	if (count <= 7) {
		var divMaxHeight = (bufferZoneCntMaxHeight);
		var divMaxWight = (bufferZoneCntWidth - (count - 1) * bufferZoneCntGap) / count;
	} else if (count > 7 && count <= 14) {
		var divMaxHeight = (bufferZoneCntMaxHeight - bufferZoneCntGap) / 2;
		var divMaxWight = (bufferZoneCntWidth - 6 * bufferZoneCntGap) / 7;
	} else {
		var divMaxHeight = (bufferZoneCntMaxHeight - 2 * bufferZoneCntGap) / 3;
		var divMaxWight = (bufferZoneCntWidth - 6 * bufferZoneCntGap) / 7;
	}
	div.style.width = generateRandom(divMaxWight / 1.5, divMaxWight) + "px";
	div.style.height = generateRandom(divMaxHeight / 2, divMaxHeight) + "px";
	let divHeight = parseInt(div.style.height);
	let divWidth = parseInt(div.style.width);
	var divCoordinates;



	function differentPolygons() {

		var numberAngles = generateRandom(4, 8);

		var pointsDivCoordinates1 = 0 + " " + generateRandom(0, 100) + "%";
		var pointsDivCoordinates2 = generateRandom(0, 100) + "%" + " " + 0;
		var pointsDivCoordinates3 = 100 + "%" + " " + generateRandom(0, 100) + "%";
		var pointsDivCoordinates4 = generateRandom(0, 100) + "%" + " " + 100 + "%";
		var pointsDivCoordinates5 = generateRandom(30, 50) + "%" + " " + generateRandom(50, 70) + "%";


		if (numberAngles === 4) {

			divCoordinates = `${pointsDivCoordinates1},${pointsDivCoordinates2},${pointsDivCoordinates3},${pointsDivCoordinates4}`;
		} else if (numberAngles === 5) {
			divCoordinates = `${0 + " " + generateRandom(0, 50) + "%"},${pointsDivCoordinates2},${pointsDivCoordinates3},${generateRandom(50, 100) + "%" + " " + 100 + "%"},${pointsDivCoordinates5}`;
		} else if (numberAngles === 6) {
			divCoordinates = `${0 + " " + generateRandom(50, 100) + "%"},${generateRandom(0, 20) + "%" + " " + generateRandom(0, 50) + "%"},${generateRandom(20, 100) + "%" + " " + 0},${pointsDivCoordinates3},${generateRandom(50, 100) + "%" + " " + 100 + "%"},${generateRandom(20, 50) + "%" + " " + generateRandom(50, 100) + "%"}`;
		} else if (numberAngles === 7) {
			divCoordinates = `${0 + " " + generateRandom(50, 100) + "%"},${generateRandom(0, 20) + "%" + " " + generateRandom(0, 50) + "%"},${generateRandom(20, 100) + "%" + " " + 0},${100 + "%" + " " + generateRandom(0, 40) + "%"},${generateRandom(80, 100) + "%" + " " + generateRandom(50, 90) + "%"},${generateRandom(50, 80) + "%" + " " + 100 + "%"},${generateRandom(20, 50) + "%" + " " + generateRandom(50, 100) + "%"}`;

		}
	}

	differentPolygons();
	const degNumbers = [0, 180, 360];
	const randomIndex = Math.floor(Math.random() * (degNumbers.length - 1));
	const degResult = degNumbers[randomIndex];

	div.innerHTML = `<div class="div-svg" style="width: ${divWidth}px; height: ${divHeight}px; clip-path:polygon(${divCoordinates}); transform: rotate(${degResult}deg);"></div>`;

}


let cursorXstart;
let cursorYstart;
let cursorXmove;
let cursorYmove;
let cursorXfinal;
let cursorYfinal;
let cursorXdifference;
let cursorYdifference;
let workZoneAreaCntLeft = 0;
let workZoneAreaCntBottom = 0;
let workZoneMarkupLeftCntBottom = 0;
let workZoneMarkupBottomCntLeft = 0;
let getEvent = function () {
	return (event.type.search('touch') !== -1) ? event.touches[0] : event;
};

var swipeStart = function () {
	zoomArea();
	let evt = getEvent();
	// cursorXstart = event.clientX;
	// cursorYstart = event.clientY;
	cursorXstart = evt.clientX;
	cursorYstart = evt.clientY;

	workZoneAreaCnt.addEventListener('touchmove', swipeAction);
	workZoneAreaCnt.addEventListener('mousemove', swipeAction);
	document.addEventListener('touchend', swipeEnd);
	document.addEventListener('mouseup', swipeEnd);
};

var swipeAction = function () {
	let evt = getEvent();
	// cursorXmove = event.clientX;
	// cursorYmove = event.clientY;
	cursorXmove = evt.clientX;
	cursorYmove = evt.clientY;
	cursorXdifference = cursorXmove - cursorXstart;
	cursorYdifference = cursorYmove - cursorYstart;

	workZoneAreaCnt.style.left = workZoneAreaCntLeft + cursorXdifference + "px";
	workZoneAreaCnt.style.bottom = workZoneAreaCntBottom - cursorYdifference + "px";


	if (parseInt(window.getComputedStyle(workZoneAreaCnt).left) >= 0) {
		workZoneAreaCnt.style.left = 0 + "px";
	}
	else if (parseInt(window.getComputedStyle(workZoneAreaCnt).left) <= (workZoneArea.offsetWidth - parseInt(window.getComputedStyle(workZoneAreaCnt).width))) {
		workZoneAreaCnt.style.left = (workZoneArea.offsetWidth - parseInt(window.getComputedStyle(workZoneAreaCnt).width)) + "px";
	}
	if (parseInt(window.getComputedStyle(workZoneAreaCnt).bottom) >= 0) {
		workZoneAreaCnt.style.bottom = 0 + "px";
	} else if (parseInt(window.getComputedStyle(workZoneAreaCnt).bottom) <= (workZoneArea.offsetHeight - parseInt(window.getComputedStyle(workZoneAreaCnt).height))) {
		workZoneAreaCnt.style.bottom = (workZoneArea.offsetHeight - parseInt(window.getComputedStyle(workZoneAreaCnt).height)) + "px";
	}
	workZoneMarkupLeftCnt.style.bottom = parseInt(window.getComputedStyle(workZoneAreaCnt).bottom) + "px";
	workZoneMarkupBottomCnt.style.left = parseInt(window.getComputedStyle(workZoneAreaCnt).left) + "px";
};

var swipeEnd = function () {
	workZoneAreaCntLeft = parseInt(window.getComputedStyle(workZoneAreaCnt).left);
	workZoneAreaCntBottom = parseInt(window.getComputedStyle(workZoneAreaCnt).bottom);

	workZoneAreaCnt.removeEventListener('touchmove', swipeAction);
	workZoneAreaCnt.removeEventListener('mousemove', swipeAction);
	document.removeEventListener('touchend', swipeEnd);
	document.removeEventListener('mouseup', swipeEnd);
};

document.addEventListener('mousedown', function (event) {
	event.preventDefault();
});
document.addEventListener('touchstart', function (event) {
	event.preventDefault();
});
workZoneArea.addEventListener('touchstart', function (event) {
	swipeStart();
});
workZoneArea.addEventListener('mousedown', function (event) {
	swipeStart();
});



var workZoneAreaCnt_WidthStart =
	parseInt(window.getComputedStyle(workZoneAreaCnt).width);
var workZoneAreaCnt_HeightStart =
	parseInt(window.getComputedStyle(workZoneAreaCnt).height);

var workZoneAreaCntP_All = document.querySelectorAll('.workZone-area-cnt p');
var workZoneAreaCntP_WidthStart =
	parseInt(window.getComputedStyle(workZoneAreaCntP_All[0]).width);
var workZoneAreaCntP_HeightStart =
	parseInt(window.getComputedStyle(workZoneAreaCntP_All[0]).height);

var workZoneMarkupLeftCnt_HeightStart =
	parseInt(window.getComputedStyle(workZoneMarkupLeftCnt).height);
var workZoneMarkupBottomCnt_WidthStart =
	parseInt(window.getComputedStyle(workZoneMarkupBottomCnt).width);

var workZoneMarkupNumberLeftAll = document.querySelectorAll('.workZone-markupLeft-cnt .workZone-markup-number');
var workZoneMarkupNumberBottomAll = document.querySelectorAll('.workZone-markupBottom-cnt .workZone-markup-number');
var workZoneMarkupNumberLeft_HeightStart = parseInt(window.getComputedStyle(workZoneMarkupNumberLeftAll[0]).height);
var workZoneMarkupNumberBottom_WidthStart = parseInt(window.getComputedStyle(workZoneMarkupNumberBottomAll[0]).width);
var workZoneDivSvgAll = document.querySelectorAll('.workZone-area-dragDrop .div-svg');
var workZoneSvgAll = document.querySelectorAll('.workZone-area-dragDrop svg');
var number = 1000;
var numberStart = 1000;
var numberFactor;

function zoomArea() {
	workZone.addEventListener('wheel', function (event) {
		event.preventDefault();
		const delta = event.deltaY;
		if (delta > 0) {
			if (parseInt(window.getComputedStyle(workZoneAreaCnt).width) * (zoomCoefficient - 0.1) < parseInt(window.getComputedStyle(workZoneArea).width) || parseInt(window.getComputedStyle(workZoneAreaCnt).height) * (zoomCoefficient - 0.1) < parseInt(window.getComputedStyle(workZoneArea).height)) {

			} else {
				zoomCoefficient = zoomCoefficient - 0.1;
			}
		} else {
			if (zoomCoefficient + 0.1 >= 10) {
				zoomCoefficient = 10;
			} else {
				zoomCoefficient = zoomCoefficient + 0.1;
			}
		}

		let numberWidthCoeff = numberStart * zoomCoefficient;
		numberFactor = numberWidthCoeff / number;
		number = numberWidthCoeff;

		zoomSizes();
	});
}

function zoomSizes() {
	var cursorXworkZone = event.clientX - parseInt(workZoneArea.getBoundingClientRect().left);
	var workZoneAreaCntZoomLeft = parseInt(window.getComputedStyle(workZoneAreaCnt).left) * -1;

	var cursorYworkZone = parseInt(workZoneArea.getBoundingClientRect().top) + workZoneArea.offsetHeight - event.clientY;
	var workZoneAreaCntZoomBottom = parseInt(window.getComputedStyle(workZoneAreaCnt).bottom) * -1;
	workZoneAreaCnt.style.width = workZoneAreaCnt_WidthStart * zoomCoefficient + "px";
	workZoneAreaCnt.style.height = workZoneAreaCnt_HeightStart * zoomCoefficient + "px";

	workZoneAreaCnt.style.left = ((workZoneAreaCntZoomLeft + cursorXworkZone) * numberFactor - cursorXworkZone) * -1 + "px";
	workZoneAreaCnt.style.bottom = ((workZoneAreaCntZoomBottom + cursorYworkZone) * numberFactor - cursorYworkZone) * -1 + "px";

	if (parseInt(window.getComputedStyle(workZoneAreaCnt).left) >= 0) {
		workZoneAreaCnt.style.left = 0 + "px";
	}
	else if (parseInt(window.getComputedStyle(workZoneAreaCnt).left) <= (workZoneArea.offsetWidth - parseInt(window.getComputedStyle(workZoneAreaCnt).width))) {
		workZoneAreaCnt.style.left = (workZoneArea.offsetWidth - parseInt(window.getComputedStyle(workZoneAreaCnt).width)) + "px";
	}
	if (parseInt(window.getComputedStyle(workZoneAreaCnt).bottom) >= 0) {
		workZoneAreaCnt.style.bottom = 0 + "px";
	} else if (parseInt(window.getComputedStyle(workZoneAreaCnt).bottom) <= (workZoneArea.offsetHeight - parseInt(window.getComputedStyle(workZoneAreaCnt).height))) {
		workZoneAreaCnt.style.bottom = (workZoneArea.offsetHeight - parseInt(window.getComputedStyle(workZoneAreaCnt).height)) + "px";
	}

	workZoneAreaCntLeft = parseInt(window.getComputedStyle(workZoneAreaCnt).left);
	workZoneAreaCntBottom = parseInt(window.getComputedStyle(workZoneAreaCnt).bottom);

	workZoneMarkupLeftCnt.style.bottom = parseInt(window.getComputedStyle(workZoneAreaCnt).bottom) + "px";
	workZoneMarkupBottomCnt.style.left = parseInt(window.getComputedStyle(workZoneAreaCnt).left) + "px";

	workZoneAreaCntP_All.forEach(i => {
		i.style.width = workZoneAreaCntP_WidthStart * zoomCoefficient + "px";
		i.style.height = workZoneAreaCntP_HeightStart * zoomCoefficient + "px";
	});

	workZoneMarkupLeftCnt.style.height = workZoneMarkupLeftCnt_HeightStart * zoomCoefficient + "px";
	workZoneMarkupBottomCnt.style.width = workZoneMarkupBottomCnt_WidthStart * zoomCoefficient + "px";


	workZoneMarkupNumberLeftAll.forEach(i => {
		i.style.height = workZoneMarkupNumberLeft_HeightStart * zoomCoefficient + "px";
	});
	workZoneMarkupNumberBottomAll.forEach(i => {
		i.style.width = workZoneMarkupNumberBottom_WidthStart * zoomCoefficient + "px";
	});

	workZoneDivSvgAll = document.querySelectorAll('.workZone-area-dragDrop .div-svg');
	workZoneDivSvgAll.forEach(i => {
		i.style.height = parseInt(window.getComputedStyle(i).height) * numberFactor + "px";
		i.style.width = parseInt(window.getComputedStyle(i).width) * numberFactor + "px";
		i.style.top = ((parseInt(window.getComputedStyle(i).top) * 1000 * numberFactor) / 1000) + 0.5 + "px";
		i.style.left = ((parseInt(window.getComputedStyle(i).left) * 1000 * numberFactor) / 1000) + 0.5 + "px";
	});
}
zoomArea();

// function touchHandlerDummy(e) {
// 	e.preventDefault();
// 	return false;
// }
// document.addEventListener("touchstart", touchHandlerDummy, false);
// document.addEventListener("touchmove", touchHandlerDummy, false);
// document.addEventListener("touchend", touchHandlerDummy, false);


var dragStart = function () {
	let evt = getEvent();
	event.preventDefault();
	// if (event.target.closest('.workZone-area-dragDrop')) {
	// 	return;
	// }
	if (evt.target.closest('.workZone-area-dragDrop')) {
		return;
	}
	// let gragItem = event.target.closest('.div-svg');
	let gragItem = evt.target.closest('.div-svg');
	if (!gragItem) {
		return;
	}

	let gragFieldBuff = document.querySelector('.bufferZone');
	// let coordsItemX = event.clientX - gragItem.getBoundingClientRect().left;
	// let coordsItemY = event.clientY - gragItem.getBoundingClientRect().top;
	let coordsItemX = evt.clientX - gragItem.getBoundingClientRect().left;
	let coordsItemY = evt.clientY - gragItem.getBoundingClientRect().top;

	let gragItemSizes = {
		width: gragItem.offsetWidth + scrollX,
		height: gragItem.offsetHeight + scrollY
	}

	let coordsGragItemCenterX = coordsItemX + gragItemSizes.width / 2;
	let coordsGragItemCenterY = coordsItemY + gragItemSizes.height / 2;
	let wrapperSizes = {
		left: wrapper.getBoundingClientRect().left + scrollX,
		top: wrapper.getBoundingClientRect().top + scrollY,
		right: wrapper.getBoundingClientRect().left + scrollX + wrapper.offsetWidth,
		bottom: wrapper.getBoundingClientRect().top + scrollY + wrapper.offsetHeight
	}
	let gragFieldBuffSizes = {
		left: gragFieldBuff.getBoundingClientRect().left + scrollX,
		top: gragFieldBuff.getBoundingClientRect().top + scrollY,
		right: gragFieldBuff.getBoundingClientRect().left + scrollX + gragFieldBuff.offsetWidth,
		bottom: gragFieldBuff.getBoundingClientRect().top + scrollY + gragFieldBuff.offsetHeight
	}
	let workZoneSizes = {
		left: workZone.getBoundingClientRect().left + scrollX,
		top: workZone.getBoundingClientRect().top + scrollY,
		right: workZone.getBoundingClientRect().left + scrollX + workZone.offsetWidth,
		bottom: workZone.getBoundingClientRect().top + scrollY + workZone.offsetHeight
	}
	let workZoneAreaDragDropSizes = {
		left: workZoneAreaDragDrop.getBoundingClientRect().left + scrollX,
		top: workZoneAreaDragDrop.getBoundingClientRect().top + scrollY,
		right: workZoneAreaDragDrop.getBoundingClientRect().left + scrollX + workZoneAreaDragDrop.offsetWidth,
		bottom: workZoneAreaDragDrop.getBoundingClientRect().top + scrollY + workZoneAreaDragDrop.offsetHeight
	}

	gragItem.style.position = 'absolute';
	gragItem.style.zIndex = 1000;
	document.body.append(gragItem);

	let currentX;
	let currentY;

	moveGragItem(evt.pageX, evt.pageY);
	// evt = getEvent();

	function moveGragItem(pageX, pageY) {
		let evt = getEvent();
		currentX = pageX - coordsItemX;
		currentY = pageY - coordsItemY;

		if (
			currentX + gragItemSizes.width <= wrapperSizes.right &&
			currentX >= wrapperSizes.left
		) {
			gragItem.style.left = `${currentX}px`;
		} else {
			if (currentX + gragItemSizes.width > wrapperSizes.right) {
				gragItem.style.left = `${wrapperSizes.right - gragItemSizes.width}px`;
			}
			if (currentX < wrapperSizes.left) {
				gragItem.style.left = `${wrapperSizes.left}px`;
			}
		}
		if (
			currentY + gragItemSizes.height <=
			wrapperSizes.bottom &&
			currentY >= wrapperSizes.top
		) {
			gragItem.style.top = `${currentY}px`;
		} else {
			if (currentY + gragItemSizes.height > wrapperSizes.bottom) {
				gragItem.style.top = `${wrapperSizes.bottom - gragItemSizes.height}px`;
			}

			if (currentY < wrapperSizes.top) {
				gragItem.style.top = `${wrapperSizes.top}px`;
			}
		}
		coordsGragItemCenterX = currentX + gragItemSizes.width / 2;
		coordsGragItemCenterY = currentY + gragItemSizes.height / 2;
	}

	function other(evt) {
		evt = getEvent();
		moveGragItem(evt.pageX, evt.pageY);
	}

	document.addEventListener('touchmove', other);
	document.addEventListener('mousemove', other);


	let dragEnd = function () {
		// let evt = getEvent();
		if (
			coordsGragItemCenterX > gragFieldBuffSizes.left && coordsGragItemCenterX < gragFieldBuffSizes.right && coordsGragItemCenterY > gragFieldBuffSizes.top && coordsGragItemCenterY < gragFieldBuffSizes.bottom
		) {
			gragFieldBuff.append(gragItem);
			gragItem.style.left = currentX - gragFieldBuffSizes.left + "px";
			gragItem.style.top = currentY - gragFieldBuffSizes.top + "px";
		}
		if (
			coordsGragItemCenterX > workZoneSizes.left && coordsGragItemCenterX < workZoneSizes.right && coordsGragItemCenterY > workZoneSizes.top && coordsGragItemCenterY < workZoneSizes.bottom
		) {
			workZoneAreaDragDrop.append(gragItem);
			gragItem.style.left = currentX - workZoneAreaDragDropSizes.left + scrollX + "px";
			gragItem.style.top = currentY - workZoneAreaDragDropSizes.top + scrollY + "px";
		}

		document.removeEventListener('touchmove', other);
		document.removeEventListener('mousemove', other);
	};
	document.addEventListener("touchend", dragEnd, { "once": true });
	document.addEventListener("mouseup", dragEnd, { "once": true });
};
// var dragAction = function () {

// };
function dragDrop(event) {
	document.addEventListener('touchstart', dragStart);
	document.addEventListener('mousedown', dragStart);


	document.body.addEventListener("dragstart", function (event) {
		let evt = getEvent();
		evt.preventDefault();
	});
};


let create = document.querySelector('.create');
create.addEventListener('click', function () {
	let evt = getEvent();
	bufferZone.innerHTML = `<div class="bufferZone-cnt"></div>`;
	bufferZoneCnt = document.querySelector('.bufferZone-cnt');
	generateDiv();
	dragDrop(evt);
});

let save = document.querySelector('.save');
save.addEventListener('click', function () {

});

let reset = document.querySelector('.reset');
reset.addEventListener('click', function () {
	bufferZoneCnt.innerHTML = ``;
	const divPolygons = document.querySelectorAll('.div-svg');
	divPolygons.forEach(i => { i.remove(); });
	workZoneAreaCnt.style.left = 0 + "px";
	workZoneAreaCnt.style.bottom = 0 + "px";
	workZoneMarkupLeftCnt.style.bottom = 0 + "px";
	workZoneMarkupBottomCnt.style.left = 0 + "px";
	zoomCoefficient = 1;
	zoomSizes();
});
