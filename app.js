const themeButton = document.querySelector('.theme-btn');
const themeLabel = document.querySelector('.theme-label');
const menuButton = document.querySelector('.menu-btn');
const navigation = document.querySelector('.navbar');

function setTheme(isDark) {
	document.body.classList.toggle('dark-theme', isDark);
	themeButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
	themeLabel.textContent = isDark ? 'Light mode' : 'Dark mode';
	document.querySelector('meta[name="theme-color"]').content = isDark ? '#17201c' : '#f4f5ef';
}

try {
	setTheme(localStorage.getItem('portfolio-theme') === 'dark');
} catch {
	setTheme(false);
}

themeButton.addEventListener('click', () => {
	const isDark = !document.body.classList.contains('dark-theme');
	setTheme(isDark);
	try {
		localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
	} catch {
		// Theme switching still works when browser storage is unavailable.
	}
});

function closeNavigation() {
	navigation.classList.remove('is-open');
	menuButton.setAttribute('aria-expanded', 'false');
	menuButton.setAttribute('aria-label', 'Open navigation');
}

menuButton.addEventListener('click', () => {
	const isOpen = navigation.classList.toggle('is-open');
	menuButton.setAttribute('aria-expanded', String(isOpen));
	menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
document.addEventListener('keydown', event => {
	if (event.key === 'Escape') closeNavigation();
});

document.querySelector('#year').textContent = new Date().getFullYear();

const projectDetails = {
	'market-day': {
		title: 'Market Day',
		category: 'WEB DESIGN · FRONTEND',
		description: 'A welcoming marketplace concept connecting neighborhood growers and makers with people looking for fresh, local goods. The experience focuses on clear discovery and an easy path from browsing to buying.',
		tags: ['Responsive design', 'Product discovery', 'Frontend concept']
	},
	'still-studio': {
		title: 'Still Studio',
		category: 'PRODUCT · UI',
		description: 'A calm booking concept for creative workspaces. Visitors can explore rooms, understand what each space offers, and plan a visit without getting lost in the details.',
		tags: ['Booking flow', 'Interface design', 'Prototyping']
	},
	pocketwise: {
		title: 'Pocketwise',
		category: 'FULL STACK · CONCEPT',
		description: 'A personal finance concept that turns everyday money decisions into clear, manageable steps, with an emphasis on helpful summaries over overwhelming charts.',
		tags: ['Dashboard concept', 'Data presentation', 'Full stack']
	}
};

const projectDialog = document.querySelector('.project-dialog');
const dialogTitle = document.querySelector('#project-dialog-title');
const dialogCategory = document.querySelector('#project-dialog-category');
const dialogDescription = document.querySelector('#project-dialog-description');
const dialogTags = document.querySelector('#project-dialog-tags');
const dialogContact = document.querySelector('#project-dialog-contact');

document.querySelectorAll('[data-project]').forEach(projectLink => {
	projectLink.addEventListener('click', event => {
		const project = projectDetails[projectLink.dataset.project];
		if (!project || typeof projectDialog.showModal !== 'function') return;

		event.preventDefault();
		dialogTitle.textContent = project.title;
		dialogCategory.textContent = project.category;
		dialogDescription.textContent = project.description;
		dialogContact.href = `mailto:vasif20172019@gmail.com?subject=${encodeURIComponent(`Let's discuss ${project.title}`)}`;
		dialogTags.replaceChildren(...project.tags.map(tag => {
			const tagElement = document.createElement('span');
			tagElement.textContent = tag;
			return tagElement;
		}));
		projectDialog.showModal();
	});
});

document.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', event => {
	if (event.target === projectDialog) projectDialog.close();
});

const sectionLinks = new Map(
	[...navigation.querySelectorAll('a[href^="#"]')].map(link => [link.hash.slice(1), link])
);
if ('IntersectionObserver' in window) {
	const sectionObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (!entry.isIntersecting || !sectionLinks.has(entry.target.id)) return;
			sectionLinks.forEach(link => link.removeAttribute('aria-current'));
			sectionLinks.get(entry.target.id).setAttribute('aria-current', 'location');
		});
	}, { rootMargin: '-25% 0px -65% 0px' });
	document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
	const revealObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				revealObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });
	revealElements.forEach(element => revealObserver.observe(element));
} else {
	revealElements.forEach(element => element.classList.add('is-visible'));
}
