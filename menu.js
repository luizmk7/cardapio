export const products = [{"id": "alcatra", "name": "Espeto de Alcatra", "subtitle": "Carne macia, brasa e sal na medida", "photo": 0, "image": "assets/espetos.jpg", "category": ["classics", "skewer"], "tag": "Na brasa", "prices": [1200], "type": "food", "volume": "Unidade", "description": "Carne macia, brasa e sal na medida. Preparado na hora para o seu pedido. Imagem ilustrativa."}, {"id": "frango-brasa", "name": "Espeto de Frango", "subtitle": "Cubos de frango dourados na churrasqueira", "photo": 1, "image": "assets/espetos.jpg", "category": ["chicken", "skewer"], "tag": "Bem temperado", "prices": [1000], "type": "food", "volume": "Unidade", "description": "Cubos de frango dourados na churrasqueira. Preparado na hora para o seu pedido. Imagem ilustrativa."}, {"id": "linguica", "name": "Linguiça Toscana", "subtitle": "Douradinha por fora, suculenta por dentro", "photo": 2, "image": "assets/espetos.jpg", "category": ["classics", "skewer"], "tag": "Clássico do bar", "prices": [1000], "type": "food", "volume": "Unidade", "description": "Douradinha por fora, suculenta por dentro. Preparado na hora para o seu pedido. Imagem ilustrativa."}, {"id": "coracao", "name": "Coração de Frango", "subtitle": "O clássico de todo bom churrasco", "photo": 3, "image": "assets/espetos.jpg", "category": ["chicken", "skewer"], "tag": "Para petiscar", "prices": [1200], "type": "food", "volume": "Unidade", "description": "O clássico de todo bom churrasco. Preparado na hora para o seu pedido. Imagem ilustrativa."}, {"id": "medalhao", "name": "Medalhão com Bacon", "subtitle": "Frango envolto em bacon na brasa", "photo": 4, "image": "assets/espetos.jpg", "category": ["cheese", "skewer"], "tag": "Especial da casa", "prices": [1500], "type": "food", "volume": "Unidade", "description": "Frango envolto em bacon na brasa. Preparado na hora para o seu pedido. Imagem ilustrativa."}, {"id": "queijo-coalho", "name": "Queijo Coalho", "subtitle": "Queijo dourado com casquinha de brasa", "photo": 5, "image": "assets/espetos.jpg", "category": ["veggie", "skewer"], "tag": "Sem carne", "prices": [1000], "type": "food", "volume": "Unidade", "description": "Queijo dourado com casquinha de brasa. Preparado na hora para o seu pedido. Imagem ilustrativa."}, {"id": "pao-alho", "name": "Pão de Alho", "subtitle": "Crocante, cremoso e cheio de sabor", "photo": 0, "image": "assets/espetos.jpg", "category": ["veggie", "skewer"], "tag": "Acompanhamento", "prices": [900], "type": "food", "volume": "Unidade", "description": "Crocante, cremoso e cheio de sabor. Preparado na hora para o seu pedido. Imagem ilustrativa."}, {"id": "combo-brasa", "name": "Combo da Brasa", "subtitle": "Alcatra, frango, linguiça, farofa e vinagrete", "photo": 1, "image": "assets/espetos.jpg", "category": ["combo"], "tag": "Pedido completo", "prices": [3490], "type": "food", "volume": "3 espetos + acompanhamentos", "description": "Alcatra, frango, linguiça, farofa e vinagrete. Preparado na hora para o seu pedido. Imagem ilustrativa."}, {"id": "batata", "name": "Batata Frita", "subtitle": "Porção crocante para dividir a mesa", "photo": 2, "image": "assets/petiscos.jpg", "category": ["portion"], "tag": "Para compartilhar", "prices": [2490], "type": "food", "volume": "Porção 400 g", "description": "Porção crocante para dividir a mesa. Preparado na hora para o seu pedido. Imagem ilustrativa."}, {"id": "calabresa", "name": "Calabresa Acebolada", "subtitle": "Calabresa na chapa com cebola dourada", "photo": 3, "image": "assets/petiscos.jpg", "category": ["portion"], "tag": "Petisco de bar", "prices": [2990], "type": "food", "volume": "Porção 400 g", "description": "Calabresa na chapa com cebola dourada. Preparado na hora para o seu pedido. Imagem ilustrativa."}, {"id": "mandioca", "name": "Mandioca Frita", "subtitle": "Dourada, macia por dentro e crocante por fora", "photo": 4, "image": "assets/petiscos.jpg", "category": ["portion"], "tag": "Vai bem com tudo", "prices": [2290], "type": "food", "volume": "Porção 400 g", "description": "Dourada, macia por dentro e crocante por fora. Preparado na hora para o seu pedido. Imagem ilustrativa."}, {"id": "abacaxi", "name": "Abacaxi com Canela", "subtitle": "Abacaxi na brasa com canela", "photo": 5, "image": "assets/petiscos.jpg", "category": ["sweet"], "tag": "Final doce", "prices": [900], "type": "food", "volume": "Unidade", "description": "Abacaxi na brasa com canela. Preparado na hora para o seu pedido. Imagem ilustrativa."}, {"id": "coca-lata", "name": "Coca-Cola 350 ml", "subtitle": "350 ml · bem gelada", "photo": 0, "image": "assets/coca-lata.jpg", "category": ["drink"], "tag": "Geladinha", "prices": [600], "type": "drink", "volume": "350 ml", "description": "Coca-Cola 350 ml para acompanhar seu pedido."}, {"id": "cerveja", "name": "Cerveja Pilsen", "subtitle": "Long neck 330 ml · bem gelada", "photo": 2, "image": "assets/bebidas.jpg", "category": ["beer"], "tag": "18+", "prices": [1200], "type": "drink", "volume": "Long neck 330 ml", "description": "Cerveja Pilsen para acompanhar seu pedido. Exclusivo para maiores de 18 anos."}, {"id": "caipirinha", "name": "Caipirinha de Limão", "subtitle": "Copo 300 ml · bem gelada", "photo": 3, "image": "assets/bebidas.jpg", "category": ["beer"], "tag": "18+", "prices": [1800], "type": "drink", "volume": "Copo 300 ml", "description": "Caipirinha de Limão para acompanhar seu pedido. Exclusivo para maiores de 18 anos."}];
export const pizzas = products.filter(p=>p.type==='food');
export const acais=[];
export const drinks=products.filter(p=>p.type==='drink');
export const sizes=[{name:'Unidade',maxFlavors:1}];
export const acaiSizes=sizes;
export const pizzaCrusts=[{id:'none',name:'Sem adicional',price:0}];
export const getCrust=()=>pizzaCrusts[0];
export const removableIngredientsFor=()=>[];
export const sizesFor=p=>[{name:p.volume||'Unidade',maxFlavors:1}];
export const toppingsFor=p=>p.type==='drink'?[]:[{id:'farofa',name:'Farofa extra',price:300,icon:'bowl'},{id:'vinagrete',name:'Vinagrete extra',price:300,icon:'leaf'},{id:'molho',name:'Molho de alho',price:200,icon:'cheese'}];
export const sizeDescription=p=>p.volume||'Unidade';
export const formatMoney = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100);

export function flavorIds(item) {
  return item.flavors ?? [item.id];
}

export function flavorDescription(item) {
  const ids = flavorIds(item);
  if (ids.length <= 1) {
    const prod = products.find(p => p.id === ids[0]);
    return prod ? prod.name : '';
  }
  return ids.map(id => `1/${ids.length} ` + (products.find(p => p.id === id)?.name ?? id)).join(' + ');
}

export function itemName(item) {
  const ids = flavorIds(item);
  if (ids.length > 1) {
    return 'Pizza · ' + ids.length + ' sabores';
  }
  return products.find(p => p.id === item.id)?.name ?? 'Item';
}

export function unitPrice(item) {
  const product = products.find(p => p.id === item?.id);
  if (!product || !Number.isInteger(item.size) || item.size < 0 || item.size >= sizesFor(product).length) {
    throw new Error('Produto ou tamanho inválido.');
  }
  const extras = item.extras ?? [];
  const allowed = toppingsFor(product);
  if (!Array.isArray(extras) || new Set(extras).size !== extras.length || extras.some(id => !allowed.some(t => t.id === id))) {
    throw new Error('Adicional inválido para este produto.');
  }
  const ids = flavorIds(item);
  if (!Array.isArray(ids) || !ids.length || new Set(ids).size !== ids.length || ids[0] !== item.id) {
    throw new Error('Combinação de sabores inválida.');
  }
  if (product.type === 'pizza') {
    if (ids.length > sizes[item.size].maxFlavors || ids.some(id => !products.some(p => p.id === id && p.type === 'pizza'))) {
      throw new Error('Combinação de sabores inválida.');
    }
    // Preço pelo sabor mais caro entre os escolhidos + adicionais + borda recheada
    const highestFlavorPrice = Math.max(...ids.map(id => products.find(p => p.id === id).prices[item.size]));
    const extrasTotal = extras.reduce((sum, id) => sum + (allowed.find(t => t.id === id)?.price ?? 0), 0);
    const crust = getCrust(item.crust || 'none');
    const crustPrice = crust ? crust.price : 0;
    return highestFlavorPrice + extrasTotal + crustPrice;
  }
  // Açaí ou Bebida
  const basePrice = product.prices[item.size] ?? product.prices[0];
  const extrasTotal = extras.reduce((sum, id) => sum + (allowed.find(t => t.id === id)?.price ?? 0), 0);
  return basePrice + extrasTotal;
}

export function cartTotal(cart) {
  return cart.reduce((sum, item) => {
    if (!Number.isInteger(item.qty) || item.qty < 1 || item.qty > 99) {
      throw new Error('Quantidade inválida.');
    }
    return sum + unitPrice(item) * item.qty;
  }, 0);
}

export function sanitizeCart(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 100).flatMap((item, i) => {
    try {
      const prod = products.find(p => p.id === item?.id);
      if (!prod) return [];
      if (!Number.isInteger(item.qty) || item.qty < 1 || item.qty > 99) return [];

      const crustId = (prod.type === 'pizza' && pizzaCrusts.some(c => c.id === item.crust)) ? item.crust : 'none';

      // Sanitizar remoções por sabor
      const rawRemovals = item.removedIngredients && typeof item.removedIngredients === 'object' ? item.removedIngredients : {};
      const validFlavors = flavorIds(item);
      const cleanedRemovals = {};
      validFlavors.forEach(fid => {
        const allowedList = removableIngredientsFor(fid);
        if (Array.isArray(rawRemovals[fid])) {
          const filtered = rawRemovals[fid].filter(ing => allowedList.includes(ing));
          if (filtered.length) {
            cleanedRemovals[fid] = filtered;
          }
        }
      });

      const sanitizedItem = {
        key: typeof item.key === 'string' && /^[a-z0-9-]{1,80}$/.test(item.key) ? item.key : 'restored-' + i,
        id: item.id,
        size: item.size,
        flavors: [...validFlavors],
        crust: crustId,
        removedIngredients: cleanedRemovals,
        extras: [...(item.extras ?? [])],
        qty: item.qty,
        note: typeof item.note === 'string' ? item.note.slice(0, 200) : ''
      };

      unitPrice(sanitizedItem);
      return [sanitizedItem];
    } catch {
      return [];
    }
  });
}

/**
 * Retorna as linhas padronizadas do item conforme as regras:
 * ITEM {index + 1}
 * {qty}× {tamanho} · {fatias} fatias
 * {sabores com fração e '— sem ...'} ou {sabor inteira — sem ...}
 * Borda recheada: ... ou Sem borda recheada
 * Adicionais: ... (se houver)
 * Observação: ... (se houver)
 * Valor: R$ ...
 */
export function formatItemDetails(item, index) {
  const p = products.find(prod => prod.id === item.id);
  const itemIndex = index + 1;
  const itemNumberLabel = `#${itemIndex}`;
  const totalItemPrice = unitPrice(item) * item.qty;
  const priceFormatted = formatMoney(totalItemPrice);

  if (!p) {
    return {
      index: itemIndex,
      header: itemNumberLabel,
      titleLine: `${item.qty}× Item`,
      flavorLines: [],
      crustLine: '',
      extrasLine: '',
      noteLine: '',
      priceLine: `Valor: ${priceFormatted}`,
      totalPrice: totalItemPrice
    };
  }

  if (p.type === 'pizza') {
    const size = sizes[item.size] || sizes[0];
    const titleLine = `${item.qty}× ${size.name} · ${size.slices} fatias`;
    const ids = flavorIds(item);
    const removals = item.removedIngredients || {};

    const flavorLines = [];
    if (ids.length <= 1) {
      const flavorProd = pizzas.find(x => x.id === ids[0]) || p;
      const removed = Array.isArray(removals[ids[0]]) ? removals[ids[0]] : [];
      let line = `${flavorProd.name} inteira`;
      if (removed.length) {
        line += ` — sem ${removed.map(r => r.toLowerCase()).join(', sem ')}`;
      }
      flavorLines.push(line);
    } else {
      const fractionSymbol = ids.length === 2 ? '½' : ids.length === 3 ? '⅓' : '¼';
      ids.forEach(fid => {
        const flavorProd = pizzas.find(x => x.id === fid);
        const name = flavorProd ? flavorProd.name : fid;
        const removed = Array.isArray(removals[fid]) ? removals[fid] : [];
        let line = `${fractionSymbol} ${name}`;
        if (removed.length) {
          line += ` — sem ${removed.map(r => r.toLowerCase()).join(', sem ')}`;
        }
        flavorLines.push(line);
      });
    }

    const crust = getCrust(item.crust || 'none');
    const crustLine = (!crust || crust.id === 'none') ? 'Sem borda recheada' : `Borda recheada: ${crust.name}`;

    let extrasLine = '';
    if (item.extras && item.extras.length) {
      const allowed = toppingsFor(p);
      const extraNames = item.extras.map(id => allowed.find(t => t.id === id)?.name ?? id);
      extrasLine = `Adicionais: ${extraNames.join(', ')}`;
    }

    let noteLine = '';
    if (item.note && item.note.trim()) {
      noteLine = `Observação: ${item.note.trim()}`;
    }

    const priceLine = `Valor: ${priceFormatted}`;

    return {
      index: itemIndex,
      header: itemNumberLabel,
      titleLine,
      flavorLines,
      crustLine,
      extrasLine,
      noteLine,
      priceLine,
      totalPrice: totalItemPrice
    };
  }

  if (p.type === 'acai') {
    const size = acaiSizes[item.size] || acaiSizes[0];
    const titleLine = `${item.qty}× ${p.name} (${size.volume} ml)`;

    let extrasLine = '';
    if (item.extras && item.extras.length) {
      const allowed = toppingsFor(p);
      const extraNames = item.extras.map(id => allowed.find(t => t.id === id)?.name ?? id);
      extrasLine = `Complementos: ${extraNames.join(', ')}`;
    }

    let noteLine = '';
    if (item.note && item.note.trim()) {
      noteLine = `Observação: ${item.note.trim()}`;
    }

    const priceLine = `Valor: ${priceFormatted}`;

    return {
      index: itemIndex,
      header: itemNumberLabel,
      titleLine,
      flavorLines: [],
      crustLine: '',
      extrasLine,
      noteLine,
      priceLine,
      totalPrice: totalItemPrice
    };
  }

  // Bebidas ou outros
  const titleLine = `${item.qty}× ${p.name} (${p.volume || 'Unidade'})`;
  const extrasLine = item.extras?.length ? 'Adicionais: '+item.extras.map(id=>toppingsFor(p).find(t=>t.id===id)?.name||id).join(', ') : '';
  let noteLine = '';
  if (item.note && item.note.trim()) {
    noteLine = `Observação: ${item.note.trim()}`;
  }
  const priceLine = `Valor: ${priceFormatted}`;

  return {
    index: itemIndex,
    header: itemNumberLabel,
    titleLine,
    flavorLines: [],
    crustLine: '',
    extrasLine,
    noteLine,
    priceLine,
    totalPrice: totalItemPrice
  };
}

/**
 * Converte o item para texto puro exatamente no padrão exigido:
 * ITEM 1
 * 1× Média · 6 fatias
 * Margherita inteira
 * Sem borda recheada
 * Valor: R$ 45,90
 */
export function formatItemAsText(item, index) {
  const details = formatItemDetails(item, index);
  const lines = [details.header, details.titleLine];
  details.flavorLines.forEach(l => lines.push(l));
  if (details.crustLine) lines.push(details.crustLine);
  if (details.extrasLine) lines.push(details.extrasLine);
  if (details.noteLine) lines.push(details.noteLine);
  lines.push(details.priceLine);
  return lines.join('\n');
}
