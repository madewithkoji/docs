const TRANSITION_TIME = 600;

const changeTheme = (e) => {
	e.preventDefault();
	e.stopPropagation();
	document.body.classList.toggle('darkCode');
	if (document.body.classList.contains('darkCode')) {
		localStorage.setItem('darkCode', 1);
	} else {
		localStorage.removeItem('darkCode', 1);
	}
};

const checkLocalStorage = () => {
	if (localStorage.getItem('darkCode')) {
		document.body.classList.add('darkCode');
	} else {
		document.body.classList.remove('darkCode');
	}
};

export const addChangeThemeButton = (block) => {
	let button = document.createElement('button');
	button.classList.add('theme');
	button.dataset.tooltip = "Toggle theme";
	button.innerHTML = '<i class="fa fa-adjust"></i>';
	block.parentNode.prepend(button);
	button.addEventListener('click', changeTheme);
	checkLocalStorage();
};