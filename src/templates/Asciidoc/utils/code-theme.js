// const TRANSITION_TIME = 600;

const changeTheme = (e) => {
  e.preventDefault();
  e.stopPropagation();
  document.body.classList.toggle('darkCode');
  if (document.body.classList.contains('darkCode')) {
    localStorage.removeItem('lightCode', 1);
  } else {
    localStorage.setItem('lightCode', 1);
  }
};

const checkLocalStorage = () => {
  if (localStorage.getItem('lightCode')) {
    document.body.classList.remove('darkCode');
  } else {
    document.body.classList.add('darkCode');
  }
};

// eslint-disable-next-line import/prefer-default-export
export const addChangeThemeButton = (block) => {
  const button = document.createElement('button');
  button.classList.add('theme');
  button.dataset.tooltip = 'Toggle theme';
  button.innerHTML = '<i class="fa fa-adjust"></i>';
  block.parentNode.prepend(button);
  button.addEventListener('click', changeTheme);
  checkLocalStorage();
};
