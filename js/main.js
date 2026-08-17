(function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    };

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });

    nav.addEventListener('click', (event) => {
      if (event.target.matches('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();

  const newsContainer = document.querySelector('[data-news-list]');
  if (newsContainer && window.labNews) {
    window.labNews.forEach((item, index) => {
      const article = document.createElement('article');
      article.className = 'news-item';
      if (index > 5) {
        article.classList.add('news-more');
        article.hidden = true;
      }
      const date = document.createElement('time');
      date.className = 'news-date';
      date.dateTime = item.machineDate;
      date.textContent = item.date;
      const content = document.createElement('div');
      const announcement = document.createElement('p');
      announcement.textContent = `${item.status} at ${item.venue}.${item.firstAuthor ? ` Congratulations, ${item.firstAuthor}!` : ''}`;
      content.append(announcement);
      article.append(date, content);
      newsContainer.append(article);
    });
  }

  const showNews = document.querySelector('[data-show-news]');
  if (showNews) {
    if (!window.labNews || window.labNews.length <= 6) showNews.hidden = true;
    showNews.addEventListener('click', () => {
      document.querySelectorAll('.news-more').forEach((item) => { item.hidden = false; });
      showNews.remove();
    });
  }

  const publicationContainer = document.querySelector('[data-publications]');

  const acceptanceContainer = document.querySelector('[data-acceptances]');
  if (acceptanceContainer && window.labAcceptances) {
    window.labAcceptances.forEach((item) => {
      const article = document.createElement('article');
      article.className = 'acceptance';
      const date = document.createElement('time');
      date.className = 'acceptance-date';
      date.dateTime = item.machineDate;
      date.textContent = item.date;
      const content = document.createElement('div');
      if (item.title) {
        const title = document.createElement('h3');
        title.textContent = item.title;
        content.append(title);
      }
      const details = document.createElement('p');
      details.className = 'acceptance-details';
      details.textContent = `Paper accepted at ${item.venue}.`;
      const authors = document.createElement('p');
      authors.className = 'acceptance-authors';
      authors.textContent = `Authors: ${item.authors}`;
      content.append(details, authors);
      article.append(date, content);
      acceptanceContainer.append(article);
    });
  }

  if (publicationContainer && window.labPublications) {
    const byYear = window.labPublications.reduce((groups, publication) => {
      (groups[publication.year] ||= []).push(publication);
      return groups;
    }, {});

    Object.keys(byYear).sort((a, b) => b - a).forEach((publicationYear) => {
      const heading = document.createElement('h2');
      heading.className = 'publication-year';
      heading.textContent = publicationYear;
      const list = document.createElement('div');
      list.className = 'publication-list';
      byYear[publicationYear].forEach((item) => {
        const article = document.createElement('article');
        article.className = 'publication';
        article.dataset.type = item.type;
        const title = document.createElement('h3');
        title.textContent = item.title;
        const authors = document.createElement('p');
        authors.className = 'publication-meta';
        authors.textContent = item.authors;
        const venue = document.createElement('p');
        venue.className = 'publication-meta';
        venue.textContent = item.venue;
        article.append(title, authors, venue);
        if (item.links && item.links.length) {
          const links = document.createElement('div');
          links.className = 'publication-links';
          item.links.forEach((link) => {
            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.textContent = link.label;
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';
            links.append(anchor);
          });
          article.append(links);
        }
        list.append(article);
      });
      publicationContainer.append(heading, list);
    });
  }

  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      document.querySelectorAll('.publication').forEach((item) => { item.hidden = filter !== 'all' && item.dataset.type !== filter; });
      document.querySelectorAll('.publication-year').forEach((heading) => {
        const list = heading.nextElementSibling;
        heading.hidden = !Array.from(list.children).some((item) => !item.hidden);
      });
    });
  });
})();
