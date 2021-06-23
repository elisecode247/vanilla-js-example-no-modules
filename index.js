import { isImage } from './modules/isImage.js';

document.addEventListener("DOMContentLoaded", async function (event) {

	var nav = document.getElementsByTagName('nav')[0],
		main = document.getElementsByTagName('main')[0],
		navLinks = document.getElementsByClassName('nav__link'),
		menu = document.getElementsByClassName('menu')[0],
		page = document.getElementsByClassName('page')[0];

	// https://davidwalsh.name/detect-scrollbar-width
	var scrollDiv = document.createElement("div");
	scrollDiv.className = "scrollbar-measure";
	document.body.appendChild(scrollDiv);
	var scrollbarWidth = (scrollDiv.offsetWidth - scrollDiv.clientWidth) + 'px';
	document.body.removeChild(scrollDiv);

	function toggleMenu() {
		if (nav.getAttribute('class') === 'nav--closed') {
			nav.setAttribute('class', 'nav--opened');
			main.setAttribute('class', 'main--width');
			document.body.style.marginRight = scrollbarWidth;
			document.body.setAttribute('class', 'body--overflow');

		} else {
			nav.setAttribute('class', 'nav--closed');
			main.setAttribute('class', 'main');
			document.body.style.marginRight = 0;
			document.body.setAttribute('class', '');

		}
	}

	function closeMenu() {
		var bookmark = this.innerHTML.trim().toLowerCase();
		nav.setAttribute('class', 'nav--scroll');
		main.setAttribute('class', 'main');
		setTimeout(function () {
			var dim = document.getElementById(bookmark).getBoundingClientRect();
			window.scrollBy(0, dim.top - 56);
		}, 100);
		setTimeout(function () {
			document.body.setAttribute('class', '');
			nav.setAttribute('class', 'nav--closed');
		}, 400);
		event.stopPropagation();
	}

	menu.addEventListener('click', toggleMenu);

	nav.addEventListener('click', toggleMenu);

	for (var i = 0; i < navLinks.length; i++) {
		navLinks[i].addEventListener('click', closeMenu, false);
	}

	let dogImageUrl = await fetchDogImageUrl();
	let dogImageContainer = document.getElementsByClassName('dog-image-container')[0];
	dogImageContainer.innerHTML = `
		<img alt="random dog" src=${dogImageUrl} style="max-height:200px;"/>
	`
})

async function fetchDogImageUrl() {
	let dogImageUrl = '';

	while(dogImageUrl === '') {
		console.log('dogImageUrl: ', dogImageUrl);
		let dogImageResponse = await fetch('https://random.dog/woof.json');
		let dogImage = await dogImageResponse.json();
		console.log('dogImage: ', dogImage);
		if (isImage(dogImage.url)) {
			dogImageUrl = dogImage.url;
		}
		console.log('dogImageUrl: ', dogImageUrl);
	}

    return dogImageUrl;
  }