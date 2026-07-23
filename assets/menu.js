const menuPanel = document.querySelector('#menu-panel');
const menuTabs = [...document.querySelectorAll('[data-menu]')];
const menuCache = new Map();

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function getMenu(name) {
  if (menuCache.has(name)) return menuCache.get(name);
  const response = await fetch(`/content/${name}.json`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Could not load ${name} menu`);
  const menu = await response.json();
  menuCache.set(name, menu);
  return menu;
}

function renderMenu(menu) {
  const sections = menu.sections || [];
  menuPanel.innerHTML = sections.map((section) => `
    <section class="menu-section">
      <div class="menu-section-heading">
        <p class="eyebrow">${escapeHtml(section.kicker || '')}</p>
        <h2>${escapeHtml(section.title)}</h2>
      </div>
      <div class="menu-items">
        ${(section.items || []).map((item) => `
          <article class="menu-item">
            <div>
              <h3>${escapeHtml(item.name)}${item.dietary ? ` <small>${escapeHtml(item.dietary)}</small>` : ''}</h3>
              ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ''}
            </div>
            <strong>${escapeHtml(item.price)}</strong>
          </article>
        `).join('')}
      </div>
    </section>
  `).join('');
}

async function selectMenu(name, focusTab = false) {
  menuTabs.forEach((tab) => {
    const selected = tab.dataset.menu === name;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focusTab) tab.focus();
  });

  menuPanel.innerHTML = '<p class="loading-message">Loading menu…</p>';
  try {
    renderMenu(await getMenu(name));
  } catch (error) {
    menuPanel.innerHTML = '<p class="error-message">The menu could not be loaded. Please try again shortly.</p>';
    console.error(error);
  }
}

menuTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectMenu(tab.dataset.menu));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = (index + direction + menuTabs.length) % menuTabs.length;
    selectMenu(menuTabs[next].dataset.menu, true);
  });
});

selectMenu('brunch');
