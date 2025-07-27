document.addEventListener('DOMContentLoaded', () => {
    // --- THEME SWITCHER ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    const logoImg = document.getElementById('logo-img');

    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        logoImg.src="assets/rasa_apps_well_night.png" // 🌙 Logo para modo oscuro
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        logoImg.src="assets/rasa_apps_well_day.png" // ☀️ Logo para modo claro
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
        
        // Update icon and save preference
        let theme = 'light';
        if (body.classList.contains('dark-theme')) {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            logoImg.src="assets/rasa_apps_well_night.png" // 🌙 Logo para modo oscuro
            theme = 'dark';
        } else {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            logoImg.src="assets/rasa_apps_well_day.png" // ☀️ Logo para modo claro
        }
        localStorage.setItem('theme', theme);
    });

    // --- DYNAMICALLY LOAD PROJECTS ---
    const projectGrid = document.getElementById('project-grid');

    fetch('data/projects.json')
        .then(response => response.json())
        .then(projects => {
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';

                projectCard.innerHTML = `
                    <img src="${project.imageUrl}" alt="${project.title}">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="project-links">
                        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank">Live Demo</a>` : ''}
                        ${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank">GitHub Repo</a>` : ''}
                    </div>
                `;
                projectGrid.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
});