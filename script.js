'use strict';
const engineSelect = document.getElementById('search_engine');
const searchInput = document.getElementById('search_key');
const dropdown = document.getElementById('history_dropdown');
const storageStatus = document.getElementById('storage-status');
const engines = Array.from(engineSelect.options, option => option.value);
const savedEngine = OzUI.read('search_engine_pref');
if (engines.includes(savedEngine)) engineSelect.value = savedEngine;
function save(key, value) {
    if (!OzUI.write(key, value)) storageStatus.textContent = 'ブラウザに保存できません。履歴・ブックマークの変更はこの画面を閉じると失われます。';
}
engineSelect.addEventListener('change', () => save('search_engine_pref', engineSelect.value));
const savedHistory = OzUI.readJSON('search_history', []);
let history = Array.isArray(savedHistory) ? savedHistory.filter(value => typeof value === 'string').slice(0, 8) : [];

function executeSearch(query) {
    query = query.trim();
    if (!query) return;
    history = [query, ...history.filter(value => value !== query)].slice(0, 8);
    save('search_history', JSON.stringify(history));
    updateHistory();
    dropdown.style.display = 'none';
    window.open(`https://${engineSelect.value}${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
}
function updateHistory() {
    dropdown.replaceChildren();
    for (const query of history) {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'history-item';
        button.textContent = '↶ ' + query;
        button.addEventListener('pointerdown', event => event.preventDefault());
        button.addEventListener('click', () => { searchInput.value = query; executeSearch(query); });
        li.append(button);
        dropdown.append(li);
    }
}
updateHistory();
searchInput.addEventListener('focus', () => { if (history.length) dropdown.style.display = 'block'; });
document.querySelector('.search-input-wrapper').addEventListener('focusout', event => {
    if (!event.currentTarget.contains(event.relatedTarget)) dropdown.style.display = 'none';
});
document.getElementById('search_button').addEventListener('click', () => executeSearch(searchInput.value));
searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.isComposing) executeSearch(searchInput.value);
    if (event.key === 'Escape') dropdown.style.display = 'none';
});
document.addEventListener('keydown', event => {
    const target = event.target;
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !target.matches('input, textarea, select') && !target.isContentEditable) {
        event.preventDefault();
        searchInput.focus();
    }
});
document.getElementById('advanced_search').addEventListener('click', () => {
    const input = id => document.getElementById(id).value.trim();
    const query = [];
    const all = input('adv_all'), exact = input('adv_exact'), any = input('adv_any'), not = input('adv_not'), site = input('adv_site');
    if (all) query.push(all);
    if (exact) query.push(exact.split(/[,、]/).map(value => value.trim()).filter(Boolean).map(value => `"${value}"`).join(' '));
    if (any) query.push(`(${any.split(/\s+/).join(' OR ')})`);
    if (not) query.push(not.split(/\s+/).map(value => '-' + value).join(' '));
    if (site) {
        const sites = site.split(/\s+/).map(value => 'site:' + value);
        query.push(sites.length > 1 ? `(${sites.join(' OR ')})` : sites[0]);
    }
    executeSearch(query.join(' '));
});
function httpUrl(value) {
    if (typeof value !== 'string') return null;
    try {
        const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(value) ? value : 'https://' + value);
        return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
    } catch (_) { return null; }
}
const storedBookmarks = OzUI.readJSON('bookmarks', []);
let bookmarks = Array.isArray(storedBookmarks) ? storedBookmarks.filter(value => value && typeof value.title === 'string' && httpUrl(value.url)).map(value => ({ title: value.title, url: httpUrl(value.url) })) : [];
const grid = document.getElementById('bookmarks_grid');
const addModal = document.getElementById('bookmark_modal');
const deleteModal = document.getElementById('delete_modal');
const form = document.getElementById('bookmark_form');
const titleInput = document.getElementById('modal_title');
const urlInput = document.getElementById('modal_url');
let deleteTarget = -1;
function renderBookmarks() {
    grid.replaceChildren();
    for (const [index, bookmark] of bookmarks.entries()) {
        const card = document.createElement('div');
        card.className = 'bookmark-card';
        const link = document.createElement('a');
        link.href = bookmark.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = bookmark.title;
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = '×';
        remove.setAttribute('aria-label', bookmark.title + 'を削除');
        remove.addEventListener('click', () => {
            deleteTarget = index;
            document.getElementById('delete_target_name').textContent = `「${bookmark.title}」を削除しますか？`;
            deleteModal.showModal();
        });
        card.append(link, remove);
        grid.append(card);
    }
}
renderBookmarks();
document.getElementById('add_bookmark_btn').addEventListener('click', () => {
    form.reset();
    titleInput.setCustomValidity('');
    urlInput.setCustomValidity('');
    addModal.showModal();
});
urlInput.addEventListener('input', () => urlInput.setCustomValidity(''));
titleInput.addEventListener('input', () => titleInput.setCustomValidity(''));
form.addEventListener('submit', event => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const url = httpUrl(urlInput.value.trim());
    titleInput.setCustomValidity(title ? '' : 'サイト名を入力してください。');
    urlInput.setCustomValidity(url ? '' : 'http:// または https:// のURLを入力してください。');
    if (!form.reportValidity()) {
        return;
    }
    bookmarks.push({ title, url });
    save('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
    addModal.close();
});
document.getElementById('modal_cancel').addEventListener('click', () => addModal.close());
document.getElementById('delete_cancel').addEventListener('click', () => deleteModal.close());
document.getElementById('delete_execute').addEventListener('click', () => {
    if (deleteTarget >= 0 && deleteTarget < bookmarks.length) {
        bookmarks.splice(deleteTarget, 1);
        save('bookmarks', JSON.stringify(bookmarks));
        renderBookmarks();
    }
    deleteTarget = -1;
    deleteModal.close();
});
for (const dialog of [addModal, deleteModal]) dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
