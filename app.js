import {isStoreOpen} from './store-status.js';
import {storeConfig} from './config.js';
import {pizzas, acais, drinks, products, flavorIds, flavorDescription, itemName, sizesFor, toppingsFor, sizeDescription, formatMoney, unitPrice, cartTotal, sanitizeCart, pizzaCrusts, getCrust, removableIngredientsFor, formatItemDetails, formatItemAsText} from './menu.js';
import {animateProductOpen, animateProductSize, captureProduct, flyProduct, animatePrice} from './motion.js';

const paths = {
  bowl: '<path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M8 21h8m-1-12 5-7"/><circle cx="7" cy="7" r="2"/><path d="M11 7c0-2 2-3 3-2"/>',
  bag: '<path d="M6 7h12l2 14H4L6 7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.01"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  back: '<path d="M19 12H5m6-6-6 6 6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  pin: '<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  grid: '<circle cx="6" cy="6" r="1" fill="currentColor"/><circle cx="12" cy="6" r="1" fill="currentColor"/><circle cx="18" cy="6" r="1" fill="currentColor"/><circle cx="6" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="18" cy="12" r="1" fill="currentColor"/><circle cx="6" cy="18" r="1" fill="currentColor"/><circle cx="12" cy="18" r="1" fill="currentColor"/><circle cx="18" cy="18" r="1" fill="currentColor"/>',
  pizza: '<path d="m3 21 8-18a22 22 0 0 1 10 10L3 21Z"/><path d="M10 6a17 17 0 0 1 8 8"/><circle cx="10" cy="13" r="1"/><circle cx="7.5" cy="17.5" r=".5"/>',
  cheese: '<path d="m3 13 15-9 3 5v11H3V13Z"/><path d="M3 13h18"/><circle cx="15" cy="16.5" r="1"/><circle cx="8" cy="17" r=".7"/>',
  chicken: '<path d="M15 3a6 6 0 0 0-5.5 8.4L5 16a2 2 0 1 0-2 3 2 2 0 1 0 3 2l4.6-4.5A6 6 0 1 0 15 3Z"/>',
  leaf: '<path d="M20 3c-8-1-16 3-16 10a7 7 0 0 0 7 7c7 0 10-8 9-17Z"/><path d="m4 21 11-12"/>',
  mushroom: '<path d="M3 12a9 9 0 0 1 18 0H3Z"/><path d="M9 12v6a3 3 0 0 0 6 0v-6"/><path d="M7 8h.01M12 6h.01M17 8h.01"/>',
  bacon: '<path d="M4 4c3 0 3 3 6 3s3-3 6-3h4v5c-3 0-3 3-6 3S11 9 8 9H4V4Zm0 11c3 0 3 3 6 3s3-3 6-3h4v5c-3 0-3 3-6 3s-3-3-6-3H4v-5Z"/>',
  sparkles: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  drink: '<path d="M7 2h10l-1.5 18H8.5L7 2Z"/><path d="M6 6h12m-6-4v4"/>',
  delivery: '<circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 18h6M12 10l3 8m-3-8H9l-2 5h5"/>',
  pickup: '<path d="M3 9l2-5h14l2 5v2H3V9Zm1 4v7h14v-7M9 20v-5h6v5"/>',
  money: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 10h.01M18 14h.01"/>',
  pix: '<path d="M4.5 12.5 12 5l7.5 7.5-7.5 7.5-7.5-7.5Z"/><path d="m9 12 3-3 3 3-3 3-3-3Z"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M7 15h3"/>',
  whatsapp: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  edit: '<path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
  trash: '<path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>'
};

const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name === 'pizza' ? 'chicken' : name] ?? paths.chicken}</svg>`;
const $ = s => document.querySelector(s);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const priceHtml = value => `<span class="currency">R$</span>${(value / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const storageKey = 'brasa-demo-v1';
let saved = {};
try {
  saved = JSON.parse(localStorage.getItem(storageKey) || '{}') ?? {};
  // Explicitly ignore and remove any legacy roulette or rewardSpins keys
  if (saved && typeof saved === 'object') {
    delete saved.rewardSpins;
    delete saved.spins;
    delete saved.rewards;
    delete saved.discount;
  }
  localStorage.removeItem('rewardSpins');
  localStorage.removeItem('spins');
  localStorage.removeItem('rewards');
} catch {}

let cart = sanitizeCart(saved.cart);
let favorites = new Set(Array.isArray(saved.favorites) ? saved.favorites.filter(id => products.some(p => p.id === id)) : []);
let category = 'all';
let query = '';
let currentView = 'home';
let detail = null;
let toastTimeout;
let editingItemKey = null;

// Persistent saved profile (only saved if user explicitly checks "Salvar meus dados")
let savedProfile = saved.savedProfile ?? null;
// Last prepared/copied order for "Repetir último pedido"
let lastOrder = saved.lastOrder ?? null;

// 3-Step Checkout state: 1: Pedido, 2: Entrega/Retirada, 3: Pagamento e revisão
let checkoutStep = 1;
let checkoutData = {
  method: savedProfile?.method || 'delivery',
  name: savedProfile?.name || '',
  street: savedProfile?.street || '',
  number: savedProfile?.number || '',
  noNumber: savedProfile?.noNumber || false,
  neighborhood: savedProfile?.neighborhood || '',
  city: savedProfile?.city || storeConfig.city,
  complement: savedProfile?.complement || '',
  reference: savedProfile?.reference || '',
  deliveryNotes: savedProfile?.deliveryNotes || '',
  pickupPerson: '',
  paymentMethod: 'cash',
  needsChange: false,
  changeFor: '',
  saveProfile: !!savedProfile
};

function persist() {
  try {
    const dataToSave = {
      cart,
      favorites: [...favorites],
      savedProfile: checkoutData.saveProfile ? {
        method: checkoutData.method,
        name: checkoutData.name,
        street: checkoutData.street,
        number: checkoutData.number,
        noNumber: checkoutData.noNumber,
        neighborhood: checkoutData.neighborhood,
        city: checkoutData.city,
        complement: checkoutData.complement,
        reference: checkoutData.reference,
        deliveryNotes: checkoutData.deliveryNotes
      } : null,
      lastOrder
    };
    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
  } catch {}
}

function fillIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(el => {
    el.innerHTML = icon(el.dataset.icon);
  });
}

function toast(message) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => el.classList.remove('visible'), 2800);
}

function openDialog(id) {
  const dialog = $('#' + id);
  if (dialog && !dialog.open) dialog.showModal();
  document.body.classList.add('dialog-open');
}

function closeDialog(id, returnToCard = true) {
  const snapshot = id === 'product-dialog' && returnToCard ? captureProduct($('.detail-pizza')) : null;
  const dialog = $('#' + id);
  if (dialog && dialog.open) dialog.close();
  if (!document.querySelector('dialog[open]')) document.body.classList.remove('dialog-open');
  if (snapshot && detail) {
    const target = [...document.querySelectorAll(`[data-product="${detail.id}"] .product-photo`)].find(el => el.getBoundingClientRect().width > 0);
    if (target) flyProduct(snapshot, target);
  }
  editingItemKey = null;
}

function photo(p, cls = '') {
  const imgUrl = p?.image || `/assets/products/${p?.id}.jpg`;
  return `<span class="pizza-art ${cls}" data-id="${p?.id ?? ''}" data-photo="${p?.photo ?? 0}" style="background-image:url('${imgUrl}')" role="img" aria-label="${esc(p?.name ?? '')}"></span>`;
}

function card(p) {
  const loved = favorites.has(p.id);
  const isAcai = p.type === 'acai';
  const isDrink = p.type === 'drink';
  const startingPrice = p.prices ? p.prices[0] : 0;

  return `<article class="product-card ${isAcai ? 'acai-card' : ''} ${isDrink ? 'drink-card' : ''}">
    <button class="favorite-button ${loved ? 'selected' : ''}" data-favorite="${p.id}" aria-label="${loved ? 'Remover dos' : 'Adicionar aos'} favoritos: ${esc(p.name)}" aria-pressed="${loved}">${icon('heart')}</button>
    <button class="product-open" data-product="${p.id}" aria-label="Escolher ${esc(p.name)}">
      ${photo(p, 'product-photo')}
      <span class="product-tag">${p.tag}</span>
      <h3>${p.name}</h3>
      <p class="description"><span class="desc-full">${p.subtitle}</span><span class="desc-more">Saber mais <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span></p>
    </button>
    <div class="product-bottom">
      <div>
        <small class="price-caption">${isDrink ? 'preço' : 'a partir de'}</small>
        <span class="price">${priceHtml(startingPrice)}</span>
      </div>
      <button class="add-button" data-product="${p.id}" aria-label="Personalizar ${esc(p.name)}">${icon('plus')}</button>
    </div>
  </article>`;
}

function renderCatalog() {
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const list = products.filter(p => (category === 'all' || p.category.includes(category)) && normalize(p.name + ' ' + p.subtitle).includes(normalize(query)));
  $('#product-grid').innerHTML = list.map(card).join('');
  $('#catalog-empty').hidden = !!list.length;
  $('#results-count').textContent = `${list.length} ${list.length === 1 ? 'opção' : 'opções'}`;
  document.querySelectorAll('[data-category]').forEach(b => {
    const selected = b.dataset.category === category;
    b.classList.toggle('active', selected);
    b.setAttribute('aria-pressed', selected);
  });
}

function renderFavorites() {
  const list = products.filter(p => favorites.has(p.id));
  $('#favorites-grid').innerHTML = list.map(card).join('');
  $('#favorites-empty').hidden = !!list.length;
}

function updateBadges() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('.cart-badge,.nav-count').forEach(el => {
    el.textContent = count;
    el.hidden = count === 0;
  });
  $('.cart-toggle')?.setAttribute('aria-label', `Abrir sacola, ${count} itens`);
}

function toggleFavorite(id) {
  if (!products.some(p => p.id === id)) return;
  const selected = !favorites.has(id);
  if (selected) favorites.add(id);
  else favorites.delete(id);
  persist();
  renderCatalog();
  renderFavorites();
  document.querySelectorAll(`#product-dialog [data-favorite="${id}"]`).forEach(b => {
    b.classList.toggle('selected', selected);
    b.setAttribute('aria-pressed', selected);
    b.setAttribute('aria-label', selected ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
  });
  toast(selected ? 'Salvo nos favoritos' : 'Removido dos favoritos');
}

function view(name) {
  if (!['home', 'favorites', 'cart'].includes(name)) name = 'home';
  currentView = name;
  $('#catalog-view').hidden = name !== 'home';
  $('#favorites-view').hidden = name !== 'favorites';
  $('#cart-view').hidden = name !== 'cart';
  document.querySelectorAll('.nav-item').forEach(el => {
    const active = el.dataset.action === name;
    el.classList.toggle('active', active);
    if (active) el.setAttribute('aria-current', 'page');
    else el.removeAttribute('aria-current');
  });
  if (name === 'favorites') renderFavorites();
  if (name === 'cart') renderCart();
  updateBadges();
  window.scrollTo({ top: 0, behavior: 'instant' });
  const hash = { home: '#cardapio', favorites: '#favoritas', cart: '#sacola' }[name];
  if (location.hash !== hash) history.replaceState(null, '', hash);
}

// Observation quick chips per product type (focado em preparo e preferências gerais)
const quickChips = {
 food: ['Pouco sal', 'Molho separado', 'Sem descartáveis'],
  pizza: ['Massa bem assada', 'Massa fininha', 'Caprichar no orégano', 'Cortar à francesa', 'Entregar bem quentinha'],
  acai: ['Granola separada', 'Leite em pó separado', 'Pouco doce', 'Sem descartáveis'],
  drink: ['Bem gelada', 'Com copo descartável', 'Sem gelo']
};

function areRemovalsEqual(a, b) {
  const cleanA = a || {};
  const cleanB = b || {};
  const keysA = Object.keys(cleanA).filter(k => Array.isArray(cleanA[k]) && cleanA[k].length).sort();
  const keysB = Object.keys(cleanB).filter(k => Array.isArray(cleanB[k]) && cleanB[k].length).sort();
  if (keysA.length !== keysB.length) return false;
  for (let i = 0; i < keysA.length; i++) {
    const k = keysA[i];
    if (k !== keysB[i]) return false;
    const listA = [...cleanA[k]].sort();
    const listB = [...cleanB[k]].sort();
    if (JSON.stringify(listA) !== JSON.stringify(listB)) return false;
  }
  return true;
}

function openProduct(id, builder = false, source = null) {
  const p = products.find(p => p.id === id);
  if (!p) return;
  editingItemKey = null;
  const sourceEl = source || document.querySelector(`[data-product="${id}"] .product-photo`);
  const sourceRect = sourceEl ? sourceEl.getBoundingClientRect() : null;
  detail = {
    id,
    flavors: [id],
    size: 0,
    crust: 'none',
    removedIngredients: {},
    extras: [],
    qty: 1,
    note: '',
    builder
  };
  renderDetail();
  openDialog('product-dialog');
  $('#product-dialog').scrollTop = 0;
  animateProductOpen($('.detail-pizza'), sourceRect, detail.size, sourceEl);
}

function editCartItem(key) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  const p = products.find(p => p.id === item.id);
  if (!p) return;
  editingItemKey = key;
  detail = {
    id: item.id,
    flavors: [...flavorIds(item)],
    size: item.size,
    crust: item.crust || 'none',
    removedIngredients: JSON.parse(JSON.stringify(item.removedIngredients || {})),
    extras: [...(item.extras ?? [])],
    qty: item.qty,
    note: item.note || '',
    builder: false
  };
  renderDetail();
  openDialog('product-dialog');
  $('#product-dialog').scrollTop = 0;
}

function duplicateCartItem(key) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  if (item.qty >= 99) {
    toast('Limite de unidades atingido para este item.');
    return;
  }
  const newItem = {
    key: globalThis.crypto?.randomUUID?.() ?? 'item-' + Date.now().toString(36),
    id: item.id,
    flavors: [...flavorIds(item)],
    size: item.size,
    crust: item.crust || 'none',
    removedIngredients: JSON.parse(JSON.stringify(item.removedIngredients || {})),
    extras: [...(item.extras ?? [])],
    qty: 1,
    note: item.note || ''
  };
  cart.push(newItem);
  persist();
  updateBadges();
  renderCart();
  toast('Item duplicado na sacola!');
}

function renderDetail() {
  const p = products.find(p => p.id === detail.id);
  if (!p) return;
  const loved = favorites.has(p.id);
  const isAcai = p.type === 'acai';
  const isDrink = p.type === 'drink';
  const productSizes = sizesFor(p);
  const extras = toppingsFor(p);
  const chips = quickChips[p.type] || [];

  $('#product-detail').innerHTML = `<div class="detail-container ${detail.builder ? 'builder' : ''} ${isAcai ? 'acai-detail' : ''} ${isDrink ? 'drink-detail' : ''}">
    <div class="detail-top">
      <button class="icon-button" data-close="product-dialog" aria-label="Voltar">${icon('back')}</button>
      <button class="favorite-button ${loved ? 'selected' : ''}" data-favorite="${p.id}" aria-label="${loved ? 'Remover dos' : 'Adicionar aos'} favoritos" aria-pressed="${loved}">${icon('heart')}</button>
    </div>
    <div class="detail-content">
      <div class="detail-visual">
        ${photo(p, 'detail-pizza')}
      </div>

      <div class="detail-header-row">
        <div class="detail-title">
          <span class="detail-kicker">${editingItemKey ? 'EDITAR ITEM' : detail.builder ? 'FEITA POR VOCÊ' : p.tag.toUpperCase()}</span>
          <h2 id="detail-title">${detail.builder ? 'Monte a sua pizza' : itemName(detail)}</h2>
          <p class="detail-subtitle">${detail.builder ? 'Combine seus sabores favoritos.' : detail.flavors.length > 1 ? 'Seus sabores favoritos em partes iguais.' : p.subtitle}</p>
          ${detail.builder ? `<label class="base-selector control-label" for="pizza-base">Sabor da base</label><div class="base-selector"><select id="pizza-base">${pizzas.filter(x => x.id !== 'banana').map(x => `<option value="${x.id}" ${x.id === p.id ? 'selected' : ''}>${x.name}</option>`).join('')}</select></div>` : ''}
        </div>
        <div class="detail-price">
          <span id="detail-unit-price" class="price">${priceHtml(unitPrice(detail))}</span>
          <span id="detail-dimensions" class="detail-dimensions"></span>
        </div>
      </div>

      <div class="detail-controls">
        ${productSizes.length > 1 ? `
          <span class="control-label">Qual o tamanho?<small>Escolha 1 opção</small></span>
          <div class="sizes" role="group" aria-label="Tamanho do produto">
            ${productSizes.map((size, i) => `<button class="size-button" data-size="${i}" aria-pressed="false">${size.name}<small>${isAcai ? ['300 ml', '500 ml', '700 ml'][i] : size.slices + ' fatias · até ' + size.maxFlavors + ' sabores'}</small></button>`).join('')}
          </div>
        ` : ''}

        <div id="flavor-area" ${isAcai || isDrink ? 'hidden' : ''}></div>

        ${!isAcai && !isDrink ? `
          <div id="crust-area"></div>
          <div id="removals-area"></div>
        ` : ''}

        ${extras.length ? `
          <span class="control-label">${isAcai ? 'Capriche nos complementos' : 'Adicionais'}<small>Opcional</small></span>
          <div class="topping-options" role="group" aria-label="Adicionais">
            ${extras.map(t => `<button class="topping-chip" data-topping="${t.id}" aria-pressed="false">${icon(t.icon)}<span>${t.name} + ${formatMoney(t.price)}</span></button>`).join('')}
          </div>
        ` : ''}
      </div>

      <div class="detail-description">
        <p>${p.description}</p>
        
        <label class="notes-label" for="pizza-note">Observações do produto</label>
        
        <textarea class="note-input" id="pizza-note" maxlength="200" rows="2" placeholder="${isAcai ? 'Ex.: granola separada, pouco doce...' : isDrink ? 'Ex.: com copo descartável...' : 'Ex.: pouco sal, molho separado...'}">${esc(detail.note)}</textarea>
      </div>

      <p class="size-tagline">${isAcai ? 'Geladinho. Cremoso. Do seu jeito.' : isDrink ? 'Geladinho para acompanhar seu pedido.' : 'Cada fatia, um bom motivo.'}</p>
    </div>

    <div class="detail-bottom">
      <div class="quantity-control">
        <button data-detail-qty="-1" aria-label="Diminuir quantidade">${icon('minus')}</button>
        <strong id="detail-quantity">1</strong>
        <button data-detail-qty="1" aria-label="Aumentar quantidade">${icon('plus')}</button>
      </div>
      ${editingItemKey ? `
        <div style="display:flex;gap:8px;flex:1;">
          <button class="text-button" data-close="product-dialog" style="min-height:52px;padding:12px 14px;">Cancelar</button>
          <button class="primary-button" data-action="save-cart-item" style="flex:1;">
            <span>${icon('check')}Salvar alterações</span>
            <strong id="detail-total"></strong>
          </button>
        </div>
      ` : `
        <button class="primary-button" data-action="add-to-cart">
          <span>${icon('bag')}Adicionar</span>
          <strong id="detail-total"></strong>
        </button>
      `}
    </div>
  </div>`;

  updateDetail(false);
}

function renderFlavors() {
  const area = $('#flavor-area');
  const p = products.find(p => p.id === detail.id);
  if (!p || p.type !== 'pizza') return;
  const max = sizesFor(p)[detail.size].maxFlavors;
  const ids = detail.flavors;

  area.innerHTML = `<section class="flavor-section" aria-labelledby="flavor-title">
    <div class="flavor-heading">
      <h3 id="flavor-title">Divida em sabores</h3>
      <strong>${ids.length} / ${max} selecionados</strong>
    </div>
    <p>Escolha até ${max} sabores. A pizza será dividida em partes iguais (1/${ids.length}).</p>
    <div class="flavor-options" role="group" aria-label="Sabores da pizza">
      ${pizzas.map(f => {
        const selected = ids.includes(f.id);
        const disabled = !selected && ids.length >= max;
        return `<button class="flavor-option ${selected ? 'selected' : ''}" data-flavor="${f.id}" aria-pressed="${selected}" ${disabled ? 'disabled' : ''}>
          <span>${f.name}<small>${formatMoney(f.prices[detail.size])}</small></span>
          <b>${selected ? '✓' : '+'}</b>
        </button>`;
      }).join('')}
    </div>
    <p class="flavor-summary" aria-live="polite">${esc(flavorDescription(detail))}</p>
    <p class="flavor-rule">Vale o preço do sabor mais caro entre os escolhidos no tamanho selecionado. Adicionais e borda recheada são cobrados à parte.</p>
  </section>`;
}

function renderCrusts() {
  const area = $('#crust-area');
  if (!area) return;
  const p = products.find(p => p.id === detail.id);
  if (!p || p.type !== 'pizza') {
    area.innerHTML = '';
    return;
  }

  const selectedCrust = detail.crust || 'none';

  area.innerHTML = `
    <span class="control-label">Qual a borda?<small>Escolha 1 opção</small></span>
    <div class="crust-options" role="radiogroup" aria-label="Qual a borda?">
      ${pizzaCrusts.map(c => {
        const isSelected = selectedCrust === c.id;
        const priceText = c.price > 0 ? `+ ${formatMoney(c.price)}` : 'Sem custo adicional';
        return `
          <button type="button" class="crust-card ${isSelected ? 'selected' : ''}" data-crust="${c.id}" role="radio" aria-checked="${isSelected}">
            <div class="crust-radio"></div>
            <div class="crust-info">
              <strong>${esc(c.name)}</strong>
              <span class="crust-price">${priceText}</span>
            </div>
          </button>
        `;
      }).join('')}
    </div>
  `;
}

function renderRemovals() {
  const area = $('#removals-area');
  if (!area) return;
  const p = products.find(p => p.id === detail.id);
  if (!p || p.type !== 'pizza') {
    area.innerHTML = '';
    return;
  }

  // Garantir que removedIngredients só guarde sabores selecionados
  if (!detail.removedIngredients) detail.removedIngredients = {};
  Object.keys(detail.removedIngredients).forEach(fid => {
    if (!detail.flavors.includes(fid)) {
      delete detail.removedIngredients[fid];
    }
  });

  const ids = detail.flavors;
  const hasAnyRemovables = ids.some(fid => removableIngredientsFor(fid).length > 0);
  if (!hasAnyRemovables) {
    area.innerHTML = '';
    return;
  }

  if (ids.length <= 1) {
    const fid = ids[0];
    const removableList = removableIngredientsFor(fid);
    const activeRemovals = detail.removedIngredients[fid] || [];

    area.innerHTML = `
      <span class="control-label">Quer retirar algum ingrediente?<small>Opcional · marque para retirar</small></span>
      <div class="ingredient-removal-group">
        <div class="removal-chips" role="group" aria-label="Retirar ingredientes">
          ${removableList.map(ing => {
            const isRemoved = activeRemovals.includes(ing);
            return `
              <button type="button" class="removal-chip ${isRemoved ? 'removed' : ''}" data-removal-flavor="${fid}" data-removal-ing="${esc(ing)}" aria-pressed="${isRemoved}">
                <span class="removal-icon">${isRemoved ? '✕' : '–'}</span>
                <span>Sem ${esc(ing.toLowerCase())}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  } else {
    // Múltiplos sabores: separar por fração!
    const fraction = ids.length === 2 ? '½' : ids.length === 3 ? '⅓' : '¼';
    const blocksHtml = ids.map(fid => {
      const pFlavor = pizzas.find(x => x.id === fid);
      const removableList = removableIngredientsFor(fid);
      if (!removableList.length) return '';
      const activeRemovals = detail.removedIngredients[fid] || [];

      return `
        <div class="flavor-removal-block">
          <div class="flavor-removal-heading">
            <span class="fraction-badge">${fraction}</span>
            <strong>${pFlavor ? esc(pFlavor.name) : fid}</strong>
          </div>
          <div class="removal-chips" role="group" aria-label="Retirar ingredientes de ${pFlavor ? esc(pFlavor.name) : fid}">
            ${removableList.map(ing => {
              const isRemoved = activeRemovals.includes(ing);
              return `
                <button type="button" class="removal-chip ${isRemoved ? 'removed' : ''}" data-removal-flavor="${fid}" data-removal-ing="${esc(ing)}" aria-pressed="${isRemoved}">
                  <span class="removal-icon">${isRemoved ? '✕' : '–'}</span>
                  <span>Sem ${esc(ing.toLowerCase())}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).filter(Boolean).join('');

    area.innerHTML = `
      <span class="control-label">Quer retirar algum ingrediente?<small>Opcional · marque para retirar por sabor</small></span>
      <div class="ingredient-removal-group">
        ${blocksHtml}
      </div>
    `;
  }
}

function updateDetail(animate = true) {
  if (!detail) return;
  renderFlavors();
  renderCrusts();
  renderRemovals();
  const p = products.find(p => p.id === detail.id);
  const selectedSize = sizesFor(p)[detail.size];

  animatePrice($('#detail-unit-price'), unitPrice(detail), priceHtml);
  animatePrice($('#detail-total'), unitPrice(detail) * detail.qty, formatMoney);
  $('#detail-quantity').textContent = detail.qty;
  
  if (p.type === 'pizza') {
    $('#detail-dimensions').textContent = `${selectedSize.diameter} cm · ${selectedSize.slices} fatias · até ${selectedSize.maxFlavors} sabores`;
  } else if (p.type === 'acai') {
    $('#detail-dimensions').textContent = selectedSize.volume + ' ml';
  } else {
    const vol = String(p.volume || 'Unidade').trim();
    if (/espeto|unidade/i.test(vol)) {
      $('#detail-dimensions').textContent = 'Unidade';
    } else {
      $('#detail-dimensions').textContent = vol || 'Unidade';
    }
  }

  document.querySelectorAll('[data-size]').forEach(b => {
    const active = Number(b.dataset.size) === detail.size;
    b.classList.toggle('selected', active);
    b.setAttribute('aria-pressed', active);
  });

  document.querySelectorAll('[data-topping]').forEach(b => {
    const active = detail.extras.includes(b.dataset.topping);
    b.classList.toggle('selected', active);
    b.setAttribute('aria-pressed', active);
  });

  const productImage = $('.detail-pizza');
  if (productImage) {
    if (!animate || productImage.dataset.size !== String(detail.size)) {
      animateProductSize(productImage, detail.size, animate);
    }
    productImage.dataset.size = String(detail.size);
    productImage.classList.toggle('has-extras', detail.extras.length > 0);
  }

  $('[data-detail-qty="-1"]').disabled = detail.qty <= 1;
  $('[data-detail-qty="1"]').disabled = detail.qty >= 99;
}

function toggleQuickChip(chipText) {
  if (!detail) return;
  const current = detail.note.trim();
  const parts = current ? current.split(',').map(s => s.trim()).filter(Boolean) : [];
  const index = parts.indexOf(chipText);
  if (index >= 0) {
    parts.splice(index, 1);
  } else {
    parts.push(chipText);
  }
  detail.note = parts.join(', ');
  const input = $('#pizza-note');
  if (input) input.value = detail.note;
  document.querySelectorAll('[data-chip]').forEach(btn => {
    const active = parts.includes(btn.dataset.chip);
    btn.classList.toggle('active', active);
    const bEl = btn.querySelector('b');
    if (bEl) bEl.textContent = active ? '✓' : '+';
  });
}

function addToCart() {
  if (!detail) return;
  const p = products.find(prod => prod.id === detail.id);
  const note = detail.note.trim();
  const extras = [...detail.extras].sort();
  const crust = (p?.type === 'pizza') ? (detail.crust || 'none') : 'none';
  const removals = (p?.type === 'pizza') ? JSON.parse(JSON.stringify(detail.removedIngredients || {})) : {};

  const match = cart.find(i => {
    if (i.id !== detail.id && (!detail.flavors.includes(i.id) || flavorIds(i).length !== detail.flavors.length)) return false;
    if (JSON.stringify([...flavorIds(i)].sort()) !== JSON.stringify([...detail.flavors].sort())) return false;
    if (i.size !== detail.size) return false;
    if ((i.crust || 'none') !== crust) return false;
    if ((i.note || '').trim() !== note) return false;
    if (JSON.stringify([...(i.extras || [])].sort()) !== JSON.stringify(extras)) return false;
    if (!areRemovalsEqual(i.removedIngredients, removals)) return false;
    return true;
  });
  
  if (match && match.qty + detail.qty > 99) {
    toast('O limite é de 99 unidades por item.');
    return;
  }
  if (match) {
    match.qty += detail.qty;
  } else {
    cart.push({
      key: globalThis.crypto?.randomUUID?.() ?? 'item-' + Date.now().toString(36),
      id: detail.id,
      flavors: [...detail.flavors],
      size: detail.size,
      crust,
      removedIngredients: removals,
      extras,
      qty: detail.qty,
      note
    });
  }

  const snapshot = captureProduct($('.detail-pizza'));
  const name = itemName(detail);
  persist();
  updateBadges();
  if (currentView === 'cart') renderCart();
  closeDialog('product-dialog', false);
  flyProduct(snapshot, $('.bottom-nav [data-action="cart"]'), { cart: true }).then(() => toast(name + ' na sacola!'));
}

function saveCartItem() {
  if (!detail || !editingItemKey) return;
  const item = cart.find(i => i.key === editingItemKey);
  if (!item) return;
  const p = products.find(prod => prod.id === detail.id);

  item.id = detail.id;
  item.flavors = [...detail.flavors];
  item.size = detail.size;
  item.crust = (p?.type === 'pizza') ? (detail.crust || 'none') : 'none';
  item.removedIngredients = (p?.type === 'pizza') ? JSON.parse(JSON.stringify(detail.removedIngredients || {})) : {};
  item.extras = [...detail.extras].sort();
  item.qty = detail.qty;
  item.note = detail.note.trim();

  persist();
  updateBadges();
  renderCart();
  closeDialog('product-dialog', false);
  toast('Alterações salvas!');
}

function getSuggestedBeverage() {
  const hasBeverage = cart.some(i => {
    const p = products.find(p => p.id === i.id);
    return p?.type === 'drink';
  });
  if (hasBeverage) return null;
  // Return the classic Coca-Cola or Guaraná
  return drinks[0] || null;
}

function quickAdd(productId) {
  const p = products.find(x => x.id === productId);
  if (!p) return;
  const match = cart.find(i => i.id === productId && i.size === 0 && (!i.extras || !i.extras.length) && !i.note && flavorIds(i).length === 1 && (i.crust || 'none') === 'none' && (!i.removedIngredients || !Object.keys(i.removedIngredients).length));
  if (match) {
    if (match.qty >= 99) {
      toast('O limite é de 99 unidades por item.');
      return;
    }
    match.qty++;
  } else {
    cart.push({
      key: globalThis.crypto?.randomUUID?.() ?? 'item-' + Date.now().toString(36),
      id: productId,
      flavors: [productId],
      size: 0,
      crust: 'none',
      removedIngredients: {},
      extras: [],
      qty: 1,
      note: ''
    });
  }
  persist();
  updateBadges();
  renderCart();
  toast(p.name + ' adicionado à sacola!');
}

function changeCartQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.min(99, item.qty + delta);
  if (item.qty <= 0) {
    cart = cart.filter(i => i.key !== key);
    toast('Item removido da sacola');
  }
  persist();
  updateBadges();
  renderCart();
}

function removeCartItem(key) {
  cart = cart.filter(i => i.key !== key);
  persist();
  updateBadges();
  renderCart();
  toast('Item removido.');
}

// Parse currency input for Troco
function parseBRL(str) {
  if (!str) return 0;
  const clean = String(str).replace(/[^\d,.]/g, '').replace(/\./g, '').replace(',', '.');
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : Math.round(num * 100);
}

// Repeat Last Order
function repeatLastOrder() {
  if (!lastOrder || !Array.isArray(lastOrder.items) || !lastOrder.items.length) {
    toast('Nenhum pedido anterior encontrado para repetir.');
    return;
  }
  const restoredItems = [];
  let missed = 0;
  const warnings = [];

  lastOrder.items.forEach(oldItem => {
    const p = products.find(p => p.id === oldItem.id);
    if (!p) { missed++; return; }
    try {
      const allowedExtras = (oldItem.extras || []).filter(exId => toppingsFor(p).some(t => t.id === exId));
      if ((oldItem.extras || []).length > allowedExtras.length) {
        warnings.push('Algum adicional anterior não está mais disponível.');
      }

      // Validar borda
      let validCrust = 'none';
      if (p.type === 'pizza') {
        const found = pizzaCrusts.find(c => c.id === oldItem.crust);
        if (found) {
          validCrust = found.id;
        } else if (oldItem.crust && oldItem.crust !== 'none') {
          warnings.push(`Borda "${oldItem.crust}" descontinuada; alterada para sem borda.`);
        }
      }

      // Validar sabores e remoções
      const validFlavors = (oldItem.flavors || [oldItem.id]).filter(fid => products.some(pr => pr.id === fid && pr.type === p.type));
      if (!validFlavors.length) { missed++; return; }

      const validRemovals = {};
      const rawRemovals = oldItem.removedIngredients || {};
      validFlavors.forEach(fid => {
        const allowedList = removableIngredientsFor(fid);
        const removedInOld = Array.isArray(rawRemovals[fid]) ? rawRemovals[fid] : [];
        const filtered = removedInOld.filter(ing => allowedList.includes(ing));
        if (filtered.length) {
          validRemovals[fid] = filtered;
        }
      });

      const testItem = {
        key: globalThis.crypto?.randomUUID?.() ?? 'item-' + Date.now().toString(36),
        id: validFlavors[0],
        flavors: validFlavors,
        size: (oldItem.size >= 0 && oldItem.size < sizesFor(p).length) ? oldItem.size : 0,
        crust: validCrust,
        removedIngredients: validRemovals,
        extras: allowedExtras,
        qty: Math.max(1, Math.min(99, oldItem.qty || 1)),
        note: oldItem.note || ''
      };
      unitPrice(testItem);
      restoredItems.push(testItem);
    } catch {
      missed++;
    }
  });

  if (!restoredItems.length) {
    toast('Não foi possível recuperar os produtos do pedido anterior.');
    return;
  }

  cart = restoredItems;
  if (lastOrder.checkoutData) {
    checkoutData.method = lastOrder.checkoutData.method || checkoutData.method;
    checkoutData.name = lastOrder.checkoutData.name || checkoutData.name;
    checkoutData.street = lastOrder.checkoutData.street || checkoutData.street;
    checkoutData.number = lastOrder.checkoutData.number || checkoutData.number;
    checkoutData.noNumber = !!lastOrder.checkoutData.noNumber;
    checkoutData.neighborhood = lastOrder.checkoutData.neighborhood || checkoutData.neighborhood;
    checkoutData.city = lastOrder.checkoutData.city || checkoutData.city;
    checkoutData.complement = lastOrder.checkoutData.complement || checkoutData.complement;
    checkoutData.reference = lastOrder.checkoutData.reference || checkoutData.reference;
    if (lastOrder.checkoutData.deliveryNotes) checkoutData.deliveryNotes = lastOrder.checkoutData.deliveryNotes;
    if (lastOrder.checkoutData.pickupPerson) checkoutData.pickupPerson = lastOrder.checkoutData.pickupPerson;
  }
  checkoutStep = 1;
  persist();
  updateBadges();
  view('cart');
  if (missed > 0) {
    toast(`Pedido anterior carregado (${missed} item descontinuado removido). Preços atualizados!`);
  } else if (warnings.length > 0) {
    toast(`Pedido anterior carregado com preços atuais (${warnings[0]})`);
  } else {
    toast('Pedido anterior carregado com os preços atuais do cardápio!');
  }
}

// WhatsApp Formatted Plaintext Generator
function buildWhatsAppMessage() {
  const total = cartTotal(cart);
  const itemsText = cart.map((item, idx) => formatItemAsText(item, idx)).join('\n\n');

  let destinationSection = '';
  if (checkoutData.method === 'delivery') {
    const numText = checkoutData.noNumber ? 'S/N' : (checkoutData.number || 'S/N');
    const compText = checkoutData.complement ? ` (${checkoutData.complement})` : '';
    destinationSection = `ENTREGA\n` +
      `Nome: ${checkoutData.name}\n` +
      `Endereço: ${checkoutData.street}, ${numText}${compText}\n` +
      `Bairro: ${checkoutData.neighborhood} — ${checkoutData.city || storeConfig.city}`;
    if (checkoutData.reference) {
      destinationSection += `\nReferência: ${checkoutData.reference}`;
    }
    if (checkoutData.deliveryNotes) {
      destinationSection += `\nInstruções de entrega: ${checkoutData.deliveryNotes}`;
    }
  } else {
    destinationSection = `RETIRADA NO BALCÃO\n` +
      `Cliente: ${checkoutData.name}\n` +
      (checkoutData.pickupPerson ? `Quem retira: ${checkoutData.pickupPerson}\n` : '') +
      `Local de retirada: ${storeConfig.address}`;
  }

  let paymentSection = 'PAGAMENTO\n';
  if (checkoutData.paymentMethod === 'pix') {
    paymentSection += 'Forma: PIX (solicitar chave / QR Code)';
  } else if (checkoutData.paymentMethod === 'cash') {
    paymentSection += 'Forma: Dinheiro';
    if (checkoutData.needsChange && checkoutData.changeFor) {
      const changeVal = parseBRL(checkoutData.changeFor);
      if (changeVal > total) {
        paymentSection += `\nTroco para: ${formatMoney(changeVal)} (levar troco de ${formatMoney(changeVal - total)})`;
      } else {
        paymentSection += `\nTroco para: ${formatMoney(changeVal)}`;
      }
    } else {
      paymentSection += ' (não precisa de troco)';
    }
  } else if (checkoutData.paymentMethod === 'credit') {
    paymentSection += 'Forma: Cartão de Crédito (levar maquininha)';
  } else if (checkoutData.paymentMethod === 'debit') {
    paymentSection += 'Forma: Cartão de Débito (levar maquininha)';
  }

  return `🍕 PEDIDO — ${storeConfig.name.toUpperCase()}\n\n` +
    `CLIENTE\nNome: ${checkoutData.name}\n\n` +
    `ITENS\n\n` +
    `${itemsText}\n\n` +
    `TOTAL DOS PRODUTOS\n${formatMoney(total)}\n\n` +
    `${destinationSection}\n\n` +
    `${paymentSection}\n\n` +
    `Aguardo a confirmação do pedido e a previsão de ${checkoutData.method === 'delivery' ? 'entrega' : 'retirada'}.`;
}

function saveOrderSnapshot() {
  lastOrder = {
    date: new Date().toISOString(),
    items: cart.map(i => ({
      id: i.id,
      flavors: [...flavorIds(i)],
      size: i.size,
      crust: i.crust || 'none',
      removedIngredients: JSON.parse(JSON.stringify(i.removedIngredients || {})),
      extras: [...(i.extras || [])],
      qty: i.qty,
      note: i.note || ''
    })),
    checkoutData: {
      method: checkoutData.method,
      name: checkoutData.name,
      street: checkoutData.street,
      number: checkoutData.number,
      noNumber: checkoutData.noNumber,
      neighborhood: checkoutData.neighborhood,
      city: checkoutData.city,
      complement: checkoutData.complement,
      reference: checkoutData.reference,
      deliveryNotes: checkoutData.deliveryNotes,
      pickupPerson: checkoutData.pickupPerson,
      paymentMethod: checkoutData.paymentMethod,
      needsChange: checkoutData.needsChange,
      changeFor: checkoutData.changeFor
    }
  };
  persist();
}

async function sendWhatsAppOrder() {
  if (!validateStep2()) {
    checkoutStep = 2;
    renderCart();
    toast('Preencha os campos obrigatórios de entrega/retirada.');
    return;
  }
  if (!validateStep3()) {
    return;
  }

  saveOrderSnapshot();
  const text = buildWhatsAppMessage();

  let phone = (storeConfig.whatsappNumber || '').replace(/\D/g, '');
  if (phone.length === 10 || phone.length === 11) {
    phone = '55' + phone;
  }
  if (!phone) {
    // WhatsApp number not yet configured in storeConfig
    $('#order-summary').textContent = text;
    openDialog('checkout-dialog');
    toast('Número de WhatsApp não configurado na loja. Você pode copiar o pedido abaixo!');
    return;
  }

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
  toast('Abrindo o WhatsApp com seu pedido...');
}

async function copyOrderText() {
  const text = buildWhatsAppMessage();
  try {
    await navigator.clipboard.writeText(text);
    toast('Pedido copiado com sucesso! Pronto para colar no WhatsApp.');
  } catch {
    $('#order-summary').textContent = text;
    openDialog('checkout-dialog');
    toast('Selecione e copie o texto do pedido.');
  }
}

function validateStep2() {
  if (!checkoutData.name.trim()) return false;
  if (checkoutData.method === 'delivery') {
    if (!checkoutData.street.trim()) return false;
    if (!checkoutData.noNumber && !checkoutData.number.trim()) return false;
    if (!checkoutData.neighborhood.trim()) return false;
  }
  return true;
}

function validateStep3() {
  const total = cartTotal(cart);
  if (checkoutData.paymentMethod === 'cash' && checkoutData.needsChange) {
    const val = parseBRL(checkoutData.changeFor);
    if (!val || val < total) {
      toast(`O valor para troco deve ser maior ou igual ao total (${formatMoney(total)}).`);
      return false;
    }
  }
  return true;
}

function clearSavedProfile() {
  savedProfile = null;
  checkoutData.saveProfile = false;
  persist();
  renderCart();
  toast('Dados salvos neste aparelho foram removidos.');
}

// ---------------- RENDER 3-STEP CHECKOUT VIEW ----------------
function renderCart() {
  if (!cart.length) {
    $('#cart-content').innerHTML = `
      ${lastOrder && Array.isArray(lastOrder.items) && lastOrder.items.length ? `
        <div class="repeat-order-banner">
          <div>
            <strong>Repetir último pedido</strong>
            <small>${lastOrder.items.length} ${lastOrder.items.length === 1 ? 'item' : 'itens'} no seu último pedido neste aparelho</small>
          </div>
          <button class="repeat-btn" data-action="repeat-order">
            ${icon('repeat')}<span>Repetir</span>
          </button>
        </div>
      ` : ''}
      <div class="empty-state">
        <span>${icon('bag')}</span>
        <h2>Sua sacola está vazia</h2>
        <p>Que tal escolher um espetinho na brasa ou uma porção para compartilhar?</p>
        <button class="primary-button" data-action="home">Explorar cardápio</button>
      </div>
    `;
    return;
  }

  const total = cartTotal(cart);
  const suggested = getSuggestedBeverage();

  // Stepper Header
  const stepperHtml = `
    <nav class="checkout-stepper" aria-label="Etapas do pedido">
      <button class="step-item ${checkoutStep === 1 ? 'active' : checkoutStep > 1 ? 'completed' : ''}" data-step="1">
        <span class="step-num">${checkoutStep > 1 ? '✓' : '1'}</span>
        <span class="step-label-text">Seu pedido</span>
      </button>
      <div class="step-divider" aria-hidden="true"></div>
      <button class="step-item ${checkoutStep === 2 ? 'active' : checkoutStep > 2 ? 'completed' : ''}" data-step="2">
        <span class="step-num">${checkoutStep > 2 ? '✓' : '2'}</span>
        <span class="step-label-text">Entrega ou retirada</span>
      </button>
      <div class="step-divider" aria-hidden="true"></div>
      <button class="step-item ${checkoutStep === 3 ? 'active' : ''}" data-step="3">
        <span class="step-num">3</span>
        <span class="step-label-text">Pagamento e revisão</span>
      </button>
    </nav>
  `;

  let stepBodyHtml = '';

  // ---------------- STEP 1: SEU PEDIDO ----------------
  if (checkoutStep === 1) {
    stepBodyHtml = `
      <div class="cart-layout">
        <div class="cart-items">
          ${lastOrder && Array.isArray(lastOrder.items) && lastOrder.items.length ? `
            <div class="repeat-order-banner">
              <div>
                <strong>Deseja repetir seu pedido anterior?</strong>
                <small>Recupera os itens com os valores atualizados do cardápio</small>
              </div>
              <button class="repeat-btn" data-action="repeat-order">
                ${icon('repeat')}<span>Repetir</span>
              </button>
            </div>
          ` : ''}

          ${cart.map((item, index) => {
            const p = products.find(p => p.id === item.id);
            if (!p) return '';
            const details = formatItemDetails(item, index);
            const price = unitPrice(item) * item.qty;
            return `
              <article class="cart-item" data-key="${item.key}">
                ${photo(p, 'cart-photo')}
                <div class="cart-item-info">
                  <div class="cart-item-badge-row">
                    <span class="cart-item-num-badge">${details.header}</span>
                    <strong class="cart-item-title-bold">${esc(details.titleLine)}</strong>
                  </div>
                  <div class="cart-item-standard-lines">
                    ${details.flavorLines.map(line => `<div class="item-subline flavor-subline">${esc(line)}</div>`).join('')}
                    ${details.crustLine ? `<div class="item-subline crust-subline">${esc(details.crustLine)}</div>` : ''}
                    ${details.extrasLine ? `<div class="item-subline optional-subline">${esc(details.extrasLine)}</div>` : ''}
                    ${details.noteLine ? `<div class="item-subline optional-subline">${esc(details.noteLine)}</div>` : ''}
                  </div>
                  <span class="price">${priceHtml(price)}</span>

                  <div class="cart-item-actions">
                    <button class="cart-action-btn" data-action="edit-item" data-key="${item.key}">
                      ${icon('edit')}<span>Editar</span>
                    </button>
                    <button class="cart-action-btn" data-action="duplicate-item" data-key="${item.key}" ${item.qty >= 99 ? 'disabled' : ''}>
                      ${icon('plus')}<span>Duplicar</span>
                    </button>
                    <button class="cart-action-btn delete" data-action="remove-item" data-key="${item.key}">
                      ${icon('trash')}<span>Remover</span>
                    </button>
                  </div>
                </div>

                <div class="quantity-control">
                  <button data-cart-qty="1" data-key="${item.key}" aria-label="Adicionar uma unidade" ${item.qty >= 99 ? 'disabled' : ''}>${icon('plus')}</button>
                  <strong>${item.qty}</strong>
                  <button data-cart-qty="-1" data-key="${item.key}" aria-label="${item.qty === 1 ? 'Remover' : 'Diminuir'}">${icon('minus')}</button>
                </div>
              </article>
            `;
          }).filter(Boolean).join('')}

          ${suggested ? `
            <div class="cart-upsell-card">
              <div class="upsell-media">${photo(suggested, 'upsell-photo')}</div>
              <div class="upsell-details">
                <span class="upsell-kicker">QUE TAL UMA BEBIDA GELADA?</span>
                <strong>${esc(suggested.name)}</strong>
                <p>${esc(suggested.volume)} · ${formatMoney(suggested.prices[0])}</p>
                <span class="price">${priceHtml(suggested.prices[0])}</span>
              </div>
              <button class="upsell-add-btn" data-action="quick-add" data-id="${suggested.id}" aria-label="Adicionar ${esc(suggested.name)}">
                ${icon('plus')}<span>Adicionar</span>
              </button>
            </div>
          ` : ''}
        </div>

        <aside class="cart-summary">
          <h2>Resumo do pedido</h2>
          <div class="summary-row">
            <span>Quantidade de itens</span>
            <strong>${cart.reduce((sum, i) => sum + i.qty, 0)}</strong>
          </div>
          <div class="summary-row">
            <span>Entrega ou retirada</span>
            <span>A definir na etapa 2</span>
          </div>
          <div class="summary-row total">
            <strong>Total dos produtos</strong>
            <strong>${priceHtml(total)}</strong>
          </div>

          <button class="primary-button full-width" data-action="goto-step-2">
            <span>Avançar para entrega</span>
            ${icon('arrow')}
          </button>
          <p class="cart-disclaimer">Preços reais e sem taxas ocultas. Seu pedido será enviado diretamente para o WhatsApp da loja.</p>
        </aside>
      </div>
    `;
  }

  // ---------------- STEP 2: ENTREGA OU RETIRADA ----------------
  else if (checkoutStep === 2) {
    stepBodyHtml = `
      <div class="checkout-step-page">
        <div class="method-selector" role="radiogroup" aria-label="Forma de recebimento">
          <div class="method-card ${checkoutData.method === 'delivery' ? 'selected' : ''}" data-select-method="delivery" role="radio" aria-checked="${checkoutData.method === 'delivery'}" tabindex="0">
            <div class="method-card-icon">${icon('delivery')}</div>
            <div>
              <strong>Receber em casa</strong>
            </div>
          </div>
          <div class="method-card ${checkoutData.method === 'pickup' ? 'selected' : ''}" data-select-method="pickup" role="radio" aria-checked="${checkoutData.method === 'pickup'}" tabindex="0">
            <div class="method-card-icon">${icon('pickup')}</div>
            <div>
              <strong>Retirar no balcão</strong>
            </div>
          </div>
        </div>

        <div class="checkout-form">
          ${checkoutData.method === 'delivery' ? `
            <h3 class="form-title">Endereço de entrega</h3>
            <p class="form-sub">Informe os dados para que o entregador chegue sem dificuldades.</p>

            ${storeConfig.estimates?.delivery ? `
              <div class="estimate-pill">
                ${icon('check')}
                <span>Tempo estimado de entrega: ${storeConfig.estimates.delivery}</span>
              </div>
            ` : ''}

            <div class="form-grid">
              <div class="form-group full-width">
                <label class="form-label" for="inp-name">Seu nome completo *</label>
                <input class="form-input" id="inp-name" type="text" placeholder="Como podemos te chamar?" value="${esc(checkoutData.name)}" required autocomplete="name">
              </div>

              <div class="form-group">
                <label class="form-label" for="inp-street">Rua / Avenida *</label>
                <input class="form-input" id="inp-street" type="text" placeholder="Ex.: Rua das Flores" value="${esc(checkoutData.street)}" required autocomplete="street-address">
              </div>

              <div class="form-group input-with-checkbox">
                <label class="form-label" for="inp-number">Número *</label>
                <input class="form-input" id="inp-number" type="text" placeholder="Ex.: 123" value="${esc(checkoutData.number)}" ${checkoutData.noNumber ? 'disabled' : ''}>
                <label class="checkbox-label">
                  <input type="checkbox" id="chk-no-number" ${checkoutData.noNumber ? 'checked' : ''}>
                  <span>Sem número (S/N)</span>
                </label>
              </div>

              <div class="form-group">
                <label class="form-label" for="inp-neighborhood">Bairro *</label>
                <input class="form-input" id="inp-neighborhood" type="text" placeholder="Ex.: Centro" value="${esc(checkoutData.neighborhood)}" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="inp-city">Cidade</label>
                <input class="form-input" id="inp-city" type="text" value="${esc(checkoutData.city || storeConfig.city)}" placeholder="Cidade">
              </div>

              <div class="form-group">
                <label class="form-label" for="inp-complement">Complemento <small>(opcional)</small></label>
                <input class="form-input" id="inp-complement" type="text" placeholder="Apto, Bloco, Casa 2..." value="${esc(checkoutData.complement)}">
              </div>

              <div class="form-group">
                <label class="form-label" for="inp-reference">Ponto de referência <small>(opcional)</small></label>
                <input class="form-input" id="inp-reference" type="text" placeholder="Próximo à padaria, em frente à praça..." value="${esc(checkoutData.reference)}">
              </div>

              <div class="form-group full-width">
                <label class="form-label" for="inp-delivery-notes">Instruções para o entregador <small>(opcional)</small></label>
                <input class="form-input" id="inp-delivery-notes" type="text" placeholder="Ex.: Tocar interfone 42, deixar na portaria..." value="${esc(checkoutData.deliveryNotes)}">
              </div>
            </div>
          ` : `
            <h3 class="form-title">Dados para retirada no balcão</h3>
            <p class="form-sub">Seu pedido será preparado para você retirar direto na nossa loja.</p>

            ${storeConfig.estimates?.pickup ? `
              <div class="estimate-pill">
                ${icon('check')}
                <span>Tempo estimado de preparo: ${storeConfig.estimates.pickup}</span>
              </div>
            ` : ''}

            <div class="form-grid">
              <div class="form-group full-width">
                <label class="form-label" for="inp-name">Seu nome *</label>
                <input class="form-input" id="inp-name" type="text" placeholder="Como podemos te chamar?" value="${esc(checkoutData.name)}" required autocomplete="name">
              </div>

              <div class="form-group full-width">
                <label class="form-label" for="inp-pickup-person">Nome de quem vai retirar <small>(opcional, caso outra pessoa venha buscar)</small></label>
                <input class="form-input" id="inp-pickup-person" type="text" placeholder="Deixe em branco se você mesmo vai retirar" value="${esc(checkoutData.pickupPerson)}">
              </div>
            </div>

            <div class="store-pickup-card">
              <h4>Endereço da loja</h4>
              <p>${storeConfig.address}</p>
              <div class="store-pickup-actions">
                ${storeConfig.locationUrl ? `
                  <a href="${storeConfig.locationUrl}" target="_blank" rel="noopener noreferrer" class="btn-map">
                    ${icon('pin')}<span>Como chegar</span>
                  </a>
                ` : ''}
              </div>
            </div>
          `}
        </div>

        <div class="step-nav-buttons">
          <button class="back-step-btn" data-step="1">
            ${icon('back')}<span>Voltar</span>
          </button>
          <button class="primary-button next-step-btn" data-action="goto-step-3">
            <span>Avançar para pagamento</span>
            ${icon('arrow')}
          </button>
        </div>
      </div>
    `;
  }

  // ---------------- STEP 3: PAGAMENTO E REVISÃO ----------------
  else if (checkoutStep === 3) {
    const totalProd = cartTotal(cart);
    const parsedChange = parseBRL(checkoutData.changeFor);
    const trocoVal = parsedChange > totalProd ? parsedChange - totalProd : 0;

    stepBodyHtml = `
      <div class="checkout-step-page">
        <!-- FORMA DE PAGAMENTO -->
        <div class="checkout-form">
          <h3 class="form-title">Forma de pagamento</h3>
          <p class="form-sub">Escolha como prefere pagar na entrega ou na retirada.</p>

          <div class="payment-options" role="radiogroup" aria-label="Forma de pagamento">
            <div class="payment-card ${checkoutData.paymentMethod === 'pix' ? 'selected' : ''}" data-select-payment="pix" role="radio" aria-checked="${checkoutData.paymentMethod === 'pix'}" tabindex="0">
              <div class="payment-card-icon">${icon('pix')}</div>
              <strong>PIX</strong>
            </div>
            <div class="payment-card ${checkoutData.paymentMethod === 'cash' ? 'selected' : ''}" data-select-payment="cash" role="radio" aria-checked="${checkoutData.paymentMethod === 'cash'}" tabindex="0">
              <div class="payment-card-icon">${icon('money')}</div>
              <strong>Dinheiro</strong>
            </div>
            <div class="payment-card ${checkoutData.paymentMethod === 'credit' ? 'selected' : ''}" data-select-payment="credit" role="radio" aria-checked="${checkoutData.paymentMethod === 'credit'}" tabindex="0">
              <div class="payment-card-icon">${icon('card')}</div>
              <strong>Cartão de Crédito</strong>
            </div>
            <div class="payment-card ${checkoutData.paymentMethod === 'debit' ? 'selected' : ''}" data-select-payment="debit" role="radio" aria-checked="${checkoutData.paymentMethod === 'debit'}" tabindex="0">
              <div class="payment-card-icon">${icon('card')}</div>
              <strong>Cartão de Débito</strong>
            </div>
          </div>

          ${checkoutData.paymentMethod === 'pix' ? `
            <div class="pix-box">
              <div class="pix-badge-row">
                <span class="pix-badge">Pagamento Instantâneo</span>
              </div>
              <p class="pix-note">A chave PIX ou o QR Code de cobrança serão informados pela equipe ao confirmar o pedido via WhatsApp.</p>
            </div>
          ` : checkoutData.paymentMethod === 'cash' ? `
            <div class="change-box">
              <div class="change-toggle-row">
                <strong>Precisa de troco?</strong>
                <div class="change-btn-group">
                  <button type="button" class="change-btn ${!checkoutData.needsChange ? 'active' : ''}" data-change-toggle="no">Não</button>
                  <button type="button" class="change-btn ${checkoutData.needsChange ? 'active' : ''}" data-change-toggle="yes">Sim</button>
                </div>
              </div>

              ${checkoutData.needsChange ? `
                <div class="change-input-wrap">
                  <label class="form-label" for="inp-change">Troco para quanto?</label>
                  <input class="form-input" id="inp-change" type="text" placeholder="Ex.: 50,00 ou 100,00" value="${esc(checkoutData.changeFor)}">
                  <span class="change-note">Total dos produtos: <strong>${formatMoney(totalProd)}</strong>. O valor informado para troco será enviado à espetaria para que o entregador leve a quantia exata.</span>
                  ${parsedChange > 0 && parsedChange < totalProd ? `
                    <span class="change-error">O valor para troco deve ser maior ou igual a ${formatMoney(totalProd)}.</span>
                  ` : parsedChange >= totalProd ? `
                    <span style="font-size:12px;color:#16a34a;font-weight:600;">Troco a levar: ${formatMoney(trocoVal)}</span>
                  ` : ''}
                </div>
              ` : ''}
            </div>
          ` : `
            <p class="change-note">O pagamento será realizado na maquininha na entrega ou no balcão da loja.</p>
          `}
        </div>

        <!-- REVISÃO COMPLETA DO PEDIDO -->
        <div class="review-card">
          <div class="review-header">
            <h3>Revisão do pedido</h3>
            <button class="review-change-link" data-step="1">Alterar itens</button>
          </div>

          <div class="review-section">
            <div class="review-section-title">
              <span>Itens (${cart.reduce((sum, i) => sum + i.qty, 0)})</span>
            </div>
            ${cart.map((item, index) => {
              const details = formatItemDetails(item, index);
              return `
                <div class="review-item-standard-card">
                  <div class="review-item-header">
                    <span class="cart-item-num-badge">${details.header}</span>
                    <span class="review-item-title">${esc(details.titleLine)}</span>
                  </div>
                  <div class="cart-item-standard-lines">
                    ${details.flavorLines.map(line => `<div class="item-subline flavor-subline">${esc(line)}</div>`).join('')}
                    ${details.crustLine ? `<div class="item-subline crust-subline">${esc(details.crustLine)}</div>` : ''}
                    ${details.extrasLine ? `<div class="item-subline optional-subline">${esc(details.extrasLine)}</div>` : ''}
                    ${details.noteLine ? `<div class="item-subline optional-subline">${esc(details.noteLine)}</div>` : ''}
                    <div class="item-value-subline"><strong>${esc(details.priceLine)}</strong></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="review-section">
            <div class="review-section-title">
              <span>${checkoutData.method === 'delivery' ? 'Entrega' : 'Retirada no balcão'}</span>
              <button class="review-change-link" data-step="2">Alterar</button>
            </div>
            ${checkoutData.method === 'delivery' ? `
              <div><strong>${esc(checkoutData.name)}</strong></div>
              <div>${esc(checkoutData.street)}, ${checkoutData.noNumber ? 'S/N' : esc(checkoutData.number)}${checkoutData.complement ? ` (${esc(checkoutData.complement)})` : ''}</div>
              <div style="font-size:12px;color:var(--muted);">${esc(checkoutData.neighborhood)} — ${esc(checkoutData.city || storeConfig.city)}</div>
              ${checkoutData.reference ? `<div style="font-size:12px;color:var(--muted);">Ref.: ${esc(checkoutData.reference)}</div>` : ''}
            ` : `
              <div><strong>${esc(checkoutData.name)}</strong></div>
              ${checkoutData.pickupPerson ? `<div>Quem retira: ${esc(checkoutData.pickupPerson)}</div>` : ''}
              <div style="font-size:12px;color:var(--muted);">Local: ${esc(storeConfig.address)}</div>
            `}
          </div>

          <div class="review-section">
            <div class="review-section-title">
              <span>Pagamento</span>
              <button class="review-change-link" data-step="3">Alterar</button>
            </div>
            <div>
              <strong>${checkoutData.paymentMethod === 'pix' ? 'PIX' : checkoutData.paymentMethod === 'cash' ? 'Dinheiro' : checkoutData.paymentMethod === 'credit' ? 'Cartão de Crédito' : 'Cartão de Débito'}</strong>
              ${checkoutData.paymentMethod === 'cash' && checkoutData.needsChange && checkoutData.changeFor ? `
                <div style="font-size:12px;color:var(--muted);">Troco para: ${formatMoney(parsedChange)} (Troco: ${formatMoney(trocoVal)})</div>
              ` : ''}
            </div>
          </div>

          <div class="summary-row total" style="margin-top:16px;padding-top:14px;border-top:1.5px solid var(--line);">
            <strong>Total dos produtos</strong>
            <strong>${priceHtml(totalProd)}</strong>
          </div>
        </div>

        <!-- WHATSAPP SEND ACTION -->
        <div class="whatsapp-action-card">
          <button class="btn-whatsapp" data-action="send-whatsapp">
            ${icon('whatsapp')}
            <span>Enviar pedido pelo WhatsApp</span>
          </button>

          <button type="button" class="btn-copy-order" data-action="copy-order">
            ${icon('copy')}<span>Copiar pedido</span>
          </button>
        </div>

        <div class="step-nav-buttons">
          <button class="back-step-btn" data-step="2">
            ${icon('back')}<span>Voltar</span>
          </button>
        </div>
      </div>
    `;
  }

  $('#cart-content').innerHTML = `
    <div class="cart-container">
      ${stepperHtml}
      ${stepBodyHtml}
    </div>
  `;
}

// ---------------- GLOBAL ACTIONS ----------------
const actions = {
  home: () => view('home'),
  favorites: () => view('favorites'),
  cart: () => view('cart'),
  info: () => openDialog('info-dialog'),
  builder: () => openProduct('combo-brasa', false),
  'reset-search': () => {
    category = 'all';
    query = '';
    const s = $('#search');
    if (s) s.value = '';
    renderCatalog();
  },
  'add-to-cart': addToCart,
  'save-cart-item': saveCartItem,
  'goto-step-2': () => {
    checkoutStep = 2;
    renderCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  'goto-step-3': () => {
    if (!validateStep2()) {
      toast('Por favor, preencha seu nome e endereço.');
      return;
    }
    checkoutStep = 3;
    renderCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  'send-whatsapp': sendWhatsAppOrder,
  'copy-order': copyOrderText,
  'repeat-order': repeatLastOrder,
  'clear-saved-profile': clearSavedProfile
};

// ---------------- EVENT LISTENERS ----------------
document.addEventListener('click', e => {
  const target = e.target.closest('button, a, [data-action], [data-step], [data-select-method], [data-select-payment], [data-change-toggle], [data-chip], [data-crust], [data-removal-ing]');
  if (!target) return;

  // Quick chips in product customization
  if (target.dataset.chip) {
    toggleQuickChip(target.dataset.chip);
    return;
  }

  // Crust selection in pizzas
  if (target.dataset.crust && detail) {
    detail.crust = target.dataset.crust;
    updateDetail();
    return;
  }

  // Ingredient removal toggle per flavor
  if (target.dataset.removalIng && target.dataset.removalFlavor && detail) {
    const fid = target.dataset.removalFlavor;
    const ing = target.dataset.removalIng;
    if (!detail.removedIngredients) detail.removedIngredients = {};
    if (!detail.removedIngredients[fid]) detail.removedIngredients[fid] = [];
    const idx = detail.removedIngredients[fid].indexOf(ing);
    if (idx >= 0) {
      detail.removedIngredients[fid].splice(idx, 1);
    } else {
      detail.removedIngredients[fid].push(ing);
    }
    updateDetail(false);
    return;
  }

  // Stepper navigation
  if (target.dataset.step) {
    const s = Number(target.dataset.step);
    if (s === 3 && !validateStep2()) {
      toast('Preencha os dados de entrega antes de avançar.');
      return;
    }
    checkoutStep = s;
    renderCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Method selector (Delivery vs Pickup)
  if (target.dataset.selectMethod) {
    checkoutData.method = target.dataset.selectMethod;
    renderCart();
    return;
  }

  // Payment selector
  if (target.dataset.selectPayment) {
    checkoutData.paymentMethod = target.dataset.selectPayment;
    if (checkoutData.paymentMethod !== 'cash') {
      checkoutData.needsChange = false;
    }
    renderCart();
    return;
  }

  // Change toggle (Yes / No)
  if (target.dataset.changeToggle) {
    checkoutData.needsChange = target.dataset.changeToggle === 'yes';
    renderCart();
    return;
  }

  // Cart item editing and removal
  if (target.dataset.action === 'edit-item') {
    editCartItem(target.dataset.key);
    return;
  }
  if (target.dataset.action === 'duplicate-item') {
    duplicateCartItem(target.dataset.key);
    return;
  }
  if (target.dataset.action === 'remove-item') {
    removeCartItem(target.dataset.key);
    return;
  }

  // Quick add (drink or upsell)
  if (target.dataset.action === 'quick-add') {
    quickAdd(target.dataset.id);
    return;
  }

  // Generic actions
  if (target.dataset.action) {
    actions[target.dataset.action]?.();
    return;
  }

  if (target.dataset.close) {
    closeDialog(target.dataset.close);
    return;
  }

  if (target.dataset.product) {
    openProduct(target.dataset.product, false, target.closest('.product-card')?.querySelector('.product-photo'));
    return;
  }

  if (target.dataset.favorite) {
    toggleFavorite(target.dataset.favorite);
    return;
  }

  if (target.dataset.category) {
    category = target.dataset.category;
    renderCatalog();
    try {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    } catch {}
    return;
  }

  // Product detail sizes
  if (target.dataset.size !== undefined && detail) {
    const next = Number(target.dataset.size);
    const p = products.find(p => p.id === detail.id);
    if (p.type === 'pizza' && detail.flavors.length > sizesFor(p)[next].maxFlavors) {
      toast('Remova sabores até ficar com ' + sizesFor(p)[next].maxFlavors + ' antes de diminuir o tamanho.');
      return;
    }
    detail.size = next;
    updateDetail();
    return;
  }

  // Flavor selection in pizzas
  if (target.dataset.flavor && detail) {
    const id = target.dataset.flavor;
    if (detail.flavors.includes(id)) {
      if (detail.flavors.length === 1) {
        toast('Escolha pelo menos um sabor.');
        return;
      }
      detail.flavors = detail.flavors.filter(f => f !== id);
      if (detail.removedIngredients && detail.removedIngredients[id]) {
        delete detail.removedIngredients[id];
      }
    } else {
      if (detail.flavors.length >= sizesFor(products.find(p => p.id === detail.id))[detail.size].maxFlavors) return;
      detail.flavors.push(id);
    }
    detail.id = detail.flavors[0];
    renderDetail();
    document.querySelector(`[data-flavor="${id}"]`)?.focus({ preventScroll: true });
    return;
  }

  // Toppings / extras
  if (target.dataset.topping && detail) {
    const id = target.dataset.topping;
    detail.extras = detail.extras.includes(id) ? detail.extras.filter(x => x !== id) : [...detail.extras, id];
    updateDetail();
    return;
  }

  // Detail quantity
  if (target.dataset.detailQty && detail) {
    detail.qty = Math.max(1, Math.min(99, detail.qty + Number(target.dataset.detailQty)));
    updateDetail();
    return;
  }

  // Cart item quantity
  if (target.dataset.cartQty) {
    changeCartQty(target.dataset.key, Number(target.dataset.cartQty));
    return;
  }

  if (target.matches('a[href="#cardapio"]')) {
    e.preventDefault();
    view('home');
  }
});

// Inputs in Step 2 and Step 3
document.addEventListener('input', e => {
  const t = e.target;
  if (!t) return;
  if (t.id === 'inp-name') checkoutData.name = t.value;
  if (t.id === 'inp-street') checkoutData.street = t.value;
  if (t.id === 'inp-number') checkoutData.number = t.value;
  if (t.id === 'inp-neighborhood') checkoutData.neighborhood = t.value;
  if (t.id === 'inp-city') checkoutData.city = t.value;
  if (t.id === 'inp-complement') checkoutData.complement = t.value;
  if (t.id === 'inp-reference') checkoutData.reference = t.value;
  if (t.id === 'inp-delivery-notes') checkoutData.deliveryNotes = t.value;
  if (t.id === 'inp-pickup-person') checkoutData.pickupPerson = t.value;
  if (t.id === 'inp-change') {
    checkoutData.changeFor = t.value;
    const totalProd = cartTotal(cart);
    const parsedChange = parseBRL(t.value);
    const errEl = $('.change-error');
    if (errEl) {
      errEl.textContent = (parsedChange > 0 && parsedChange < totalProd) ? `O valor para troco deve ser maior ou igual a ${formatMoney(totalProd)}.` : '';
    }
  }
  if (t.id === 'pizza-note' && detail) {
    detail.note = t.value.slice(0, 200);
    // Update chip active states
    document.querySelectorAll('[data-chip]').forEach(btn => {
      const active = detail.note.includes(btn.dataset.chip);
      btn.classList.toggle('active', active);
      const bEl = btn.querySelector('b');
      if (bEl) bEl.textContent = active ? '✓' : '+';
    });
  }
});

// Checkbox changes
document.addEventListener('change', e => {
  const t = e.target;
  if (!t) return;
  if (t.id === 'chk-no-number') {
    checkoutData.noNumber = t.checked;
    const numInput = $('#inp-number');
    if (numInput) {
      numInput.disabled = t.checked;
      if (t.checked) numInput.value = '';
    }
  }
  if (t.id === 'chk-save-profile') {
    checkoutData.saveProfile = t.checked;
    persist();
  }
  if (t.id === 'pizza-base' && detail && products.some(p => p.id === t.value)) {
    detail.id = t.value;
    detail.flavors = [detail.id];
    renderDetail();
  }
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset?.action && e.target.getAttribute('role') === 'button') {
    e.preventDefault();
    actions[e.target.dataset.action]?.();
  }
  if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !document.querySelector('dialog[open]')) {
    e.preventDefault();
    view('home');
    $('#search')?.focus();
  }
});

$('#search')?.addEventListener('input', e => {
  query = e.target.value;
  renderCatalog();
});

// Dialog behavior
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('cancel', e => {
    if (dialog.id === 'product-dialog') {
      e.preventDefault();
      closeDialog(dialog.id);
    }
  });
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('dialog-open');
  });
  dialog.addEventListener('click', e => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        closeDialog(dialog.id);
      }
    }
  });
});

window.addEventListener('hashchange', () => {
  view(location.hash === '#sacola' ? 'cart' : location.hash === '#favoritas' ? 'favorites' : 'home');
});

// Initialization
fillIcons();
renderCatalog();
renderFavorites();
updateBadges();
view(location.hash === '#sacola' ? 'cart' : location.hash === '#favoritas' ? 'favorites' : 'home');

// Structured access for tools / inspections
if (document.modelContext?.registerTool) {
  const lifecycle = new AbortController();
  const register = tool => { try { Promise.resolve(document.modelContext.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); } catch {} };
  const read = items => ({
    currency: 'BRL',
    store: storeConfig.name,
    products: items.map(p => ({
      id: p.id,
      name: p.name,
      type: p.type,
      prices: p.prices.map((value, i) => ({ size: sizesFor(p)[i]?.name ?? 'Padrão', value: value / 100 }))
    }))
  });
  register({ name: 'read_pizza_menu', title: 'Consultar pizzas', description: 'Consulta sabores e preços das pizzas.', inputSchema: { type: 'object', properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true }, execute: () => read(pizzas) });
  register({ name: 'read_food_menu', title: 'Consultar cardápio completo', description: 'Consulta todos os produtos e preços.', inputSchema: { type: 'object', properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true }, execute: () => read(products) });
  window.addEventListener('pagehide', () => lifecycle.abort(), { once: true });
}


// Identidade do cliente, editável em config.js.
function renderClientBanner() {
  const container = document.getElementById('client-banner');
  const banner = storeConfig.banner;
  if (!container || !banner || banner.enabled === false) return;
  container.innerHTML = `
    <img class="client-banner-photo" alt="${esc(banner.imageAlt)}" fetchpriority="high">
    <div class="client-banner-shade"></div>
    <div class="client-banner-content">
      <div class="client-banner-identity">${banner.logo ? '<img class="client-banner-logo" alt="">' : '<span class="client-banner-mark" aria-hidden="true">✦</span>'}<span>${esc(storeConfig.name)}</span></div>
      <p class="client-banner-eyebrow">${esc(banner.eyebrow)}</p>
      <h1 id="client-banner-title">${esc(banner.title)}</h1>
      <p class="client-banner-description">${esc(banner.description)}</p>
      <button type="button" class="client-banner-cta">${esc(banner.buttonText || 'Ver cardápio')} ${icon('arrow')}</button>
    </div>`;
  const photo = container.querySelector('.client-banner-photo');
  photo.src = banner.image || 'assets/espetos.jpg';
  photo.style.objectPosition = banner.imagePosition || 'center';
  photo.addEventListener('error', () => { photo.hidden = true; });
  const logo = container.querySelector('.client-banner-logo');
  if (logo) {
    logo.src = banner.logo;
    logo.addEventListener('error', () => { logo.hidden = true; });
  }
  container.querySelector('.client-banner-cta').addEventListener('click', () => {
    document.querySelector('.menu-surface').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
    document.getElementById('search').focus({preventScroll: true});
  });
  container.hidden = false;
}
renderClientBanner();

function renderStoreEssentials() {
  const open = isStoreOpen(storeConfig);
  const methods = [];
  if (storeConfig.deliveryEnabled) methods.push(`<span>${icon('delivery')}<span>Entrega <strong>${esc(storeConfig.estimates?.delivery || '')}</strong></span></span>`);
  if (storeConfig.pickupEnabled) methods.push(`<span>${icon('pickup')}<span>Retirada <strong>${esc(storeConfig.estimates?.pickup || '')}</strong></span></span>`);
  document.getElementById('store-quick-info').innerHTML = `<button type="button" data-action="info" class="store-open-status ${open ? 'is-open' : ''}"><i aria-hidden="true"></i>${open ? 'Aberto agora' : 'Fechado agora'} ${icon('chevron')}</button>${methods.join('')}`;
}
function renderStoreLocation() {
  const mapUrl = /^https?:\/\//i.test(storeConfig.locationUrl || '') ? storeConfig.locationUrl : '';
  document.getElementById('store-location').innerHTML = `<div class="location-symbol">${icon('pin')}</div><div class="location-copy"><h2 id="location-title">Onde estamos</h2><p>${esc(storeConfig.address)}</p>${mapUrl ? '' : '<small>Localização da loja ainda não cadastrada.</small>'}</div>${mapUrl ? `<a class="location-link" href="${esc(mapUrl)}" target="_blank" rel="noopener noreferrer">Como chegar ${icon('arrow')}</a>` : ''}`;
}
renderStoreEssentials();
renderStoreLocation();
setInterval(renderStoreEssentials, 60000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) renderStoreEssentials(); });

function renderFeaturedProducts() {
  const section = document.getElementById('featured-products');
  const config = storeConfig.featured;
  const chosen = [...new Set(config?.productIds || [])].map(id => products.find(p => p.id === id)).filter(Boolean).slice(0, 6);
  if (!config || config.enabled === false || !chosen.length) return;
  section.innerHTML = `<div class="featured-heading"><h2 id="featured-title">${esc(config.title || 'Destaques da casa')}</h2></div><div class="featured-track">${chosen.map(product => `<button type="button" class="featured-item" data-product="${esc(product.id)}" aria-label="Ver ${esc(product.name)}"><span class="featured-photo"><img src="${esc(product.image)}" alt="" loading="lazy" decoding="async" width="160" height="160"></span><span class="featured-name">${esc(product.name)}</span></button>`).join('')}</div>`;
  section.hidden = false;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      section.querySelectorAll('.featured-photo').forEach((card, index) => {
        card.animate?.([{opacity:.4, translate:'0 6px'}, {opacity:1, translate:'0 0'}], {
          duration:360, delay:index*45, easing:'cubic-bezier(.22,1,.36,1)', fill:'backwards'
        });
      });
    }, {threshold:.15});
    observer.observe(section);
  }
}
renderFeaturedProducts();
