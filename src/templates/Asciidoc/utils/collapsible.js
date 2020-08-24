const COLLAPSED_HEIGHT = 200;

const expand = (e) => {
	e.target.parentNode.style.maxHeight = e.target.parentNode.getAttribute('fullHeight')+'px';
	e.target.parentNode.style.overflow = 'auto';
	e.target.parentNode.classList.add('expanded');
	e.target.classList.add('expanded');
	e.target.removeEventListener('click', expand);
	e.target.addEventListener('click', retract);
}

const retract = (e) => {
	e.target.removeEventListener('click', retract);
	e.target.parentNode.classList.remove('expanded');
	e.target.classList.remove('expanded');
	makeCollapsible(e.target.parentNode);
}

export const makeCollapsible = (block) => {
	if (block.offsetHeight <= COLLAPSED_HEIGHT + 50) return;
	block.setAttribute('fullHeight', block.offsetHeight+50);
	let collapsibleBlock = block.getElementsByClassName('collapsible');
	if (collapsibleBlock.length > 0) {
		collapsibleBlock = collapsibleBlock[0];
	} else {
		collapsibleBlock = document.createElement("div");
	}
	collapsibleBlock.classList.add('collapsible');
	block.appendChild(collapsibleBlock);
	block.style.maxHeight = `${COLLAPSED_HEIGHT}px`;
	block.style.overflow = 'hidden';
	collapsibleBlock.addEventListener('click', expand);
};