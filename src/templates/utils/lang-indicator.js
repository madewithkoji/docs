export const addLanguageIndicator = (block) => {
	let lang = block.dataset.lang;
	let langIndicator = document.createElement('div');
	langIndicator.dataset['language'] = lang;
	langIndicator.classList.add('lang-indicator');
	block.parentNode.prepend(langIndicator);
};