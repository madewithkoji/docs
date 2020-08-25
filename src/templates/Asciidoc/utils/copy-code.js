const TRANSITION_TIME = 600;

const copyBlock = (e) => {
	e.preventDefault();
	e.stopPropagation();
	let copyTextarea = document.createElement('textarea');
	let parent = e.target.parentNode;
	copyTextarea.textContent = parent.textContent;
	copyTextarea.style.opacity = 0;
	copyTextarea.style.position = 'fixed';
	copyTextarea.style.left = '0px';
	copyTextarea.style.top = '0px';
	document.body.appendChild(copyTextarea);
	copyTextarea.focus();
	copyTextarea.select();
	document.execCommand('copy');
	document.body.removeChild(copyTextarea);
	e.target.classList.add('copied');
	setTimeout(()=>{e.target.classList.remove('copied');},TRANSITION_TIME);
}

export const addCopyCodeButton = (block) => {
	let button = document.createElement('button');
	button.classList.add('copy');
	button.dataset.tooltip = "Copy";
	button.innerHTML = '<i class="fa fa-copy"></i>';
	block.parentNode.prepend(button);
	button.addEventListener('click', copyBlock);
};