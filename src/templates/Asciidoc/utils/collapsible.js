const COLLAPSED_HEIGHT = 200;

const expand = (e) => {
	e.target.parentNode.style.maxHeight = e.target.parentNode.getAttribute('fullHeight')+'px';
	e.target.remove();
}

export const makeCollapsible = (block) => {
	if (block.offsetHeight <= COLLAPSED_HEIGHT + 50) return;
	block.setAttribute('fullHeight', block.offsetHeight);
	let collapsibleBlock = document.createElement("div");
	collapsibleBlock.classList.add('collapsible');
	block.appendChild(collapsibleBlock);
	block.style.maxHeight = `${COLLAPSED_HEIGHT}px`;
	collapsibleBlock.addEventListener('click', expand);
};