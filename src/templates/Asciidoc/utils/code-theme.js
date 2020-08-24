const TRANSITION_TIME = 600;

const changeTheme = (e) => {
	e.preventDefault();
	e.stopPropagation();
	document.body.classList.toggle('darkCode');
}

export const addChangeThemeButton = (block) => {
	let button = document.createElement('button');
	button.classList.add('theme');
	button.innerHTML = '<i class="fa fa-adjust"></i>';
	block.parentNode.prepend(button);
	button.addEventListener('click', changeTheme);
};