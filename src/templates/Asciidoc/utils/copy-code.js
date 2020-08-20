const TRANSITION_TIME = 600;

const copyBlock = (e) => {
	e.preventDefault();
	e.stopPropagation();
	let copyTextarea = document.createElement('textarea');
	let parent = e.target.parentNode;
	copyTextarea.textContent = parent.textContent.substring(4);
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
	button.textContent = 'Copy';
	block.parentNode.prepend(button);
	button.addEventListener('click', copyBlock);
};