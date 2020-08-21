const COLLAPSED_HEIGHT = 200;

const expand = (e) => {
	e.target.style.maxHeight = e.target.getAttribute('fullHeight')+'px';
	e.target.classList.remove('collapsible');
}

export const makeCollapsible = (block) => {
	if (block.offsetHeight <= COLLAPSED_HEIGHT + 50) return;
	block.setAttribute('fullHeight', block.offsetHeight);
	block.classList.add('collapsible');
	block.style.maxHeight = `${COLLAPSED_HEIGHT}px`;
	block.addEventListener('click', expand);
};