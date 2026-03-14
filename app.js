// ===========================
// 数据存储
// ===========================
const STORAGE_KEY = 'homemenu_dishes';

// ===========================
// 二维码生成（纯JavaScript实现 - 无依赖）
// ===========================
function generateQRCode(text, container, size = 200) {
  // 清空容器
  container.innerHTML = '';
  
  try {
    // 直接使用在线QR Code API生成图片
    const qrSize = Math.min(size, 200);
    const encodedText = encodeURIComponent(text);
    const qrImg = document.createElement('img');
    
    // 使用可靠的二维码生成服务
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodedText}&format=png&margin=10`;
    qrImg.alt = '点餐二维码';
    qrImg.style.width = `${qrSize}px`;
    qrImg.style.height = `${qrSize}px`;
    qrImg.style.borderRadius = '8px';
    qrImg.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    
    // 图片加载失败时的备用方案
    qrImg.onerror = function() {
      container.innerHTML = `
        <div style="text-align:center;padding:20px;border:2px dashed #ddd;border-radius:8px;background:#f9f9f9;">
          <div style="color:#e67e22;font-size:16px;margin-bottom:10px;">请直接访问链接</div>
          <div style="font-size:14px;color:#2c3e50;padding:10px;background:white;border-radius:6px;word-break:break-all;margin:10px 0;">
            <strong>${text}</strong>
          </div>
          <div style="color:#7f8c8d;font-size:12px;margin-top:10px;">
            复制此链接发给朋友，或截图分享
          </div>
        </div>
      `;
    };
    
    container.appendChild(qrImg);
    return true;
    
  } catch (error) {
    console.warn('二维码生成失败:', error);
    // 最终备用：显示文本链接
    container.innerHTML = `
      <div style="text-align:center;padding:20px;border:2px dashed #ddd;border-radius:8px;background:#f9f9f9;">
        <div style="color:#e67e22;font-size:16px;margin-bottom:10px;">请直接访问链接</div>
        <div style="font-size:14px;color:#2c3e50;padding:10px;background:white;border-radius:6px;word-break:break-all;margin:10px 0;">
          <strong>${text}</strong>
        </div>
        <div style="color:#7f8c8d;font-size:12px;margin-top:10px;">
          复制此链接发给朋友，或截图分享
        </div>
      </div>
    `;
    return false;
  }
}

function loadDishes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch { return []; }
}

function saveDishes(dishes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes));
}

// ===========================
// 示例数据（首次打开预填）
// ===========================
const SAMPLE_DISHES = [
  {
    id: 'demo1',
    name: '红烧肉',
    category: '热菜',
    time: '90分钟',
    cost: 28,
    price: 58,
    img: '',
    emoji: '🥩',
    desc: '五花肉慢炖而成，肥而不腻，色泽红亮，入口即化，是老少皆宜的家常经典菜肴。',
    ingredients: [
      { name: '五花肉', amount: '500g' },
      { name: '生姜', amount: '3片' },
      { name: '大葱', amount: '2根' },
      { name: '老抽', amount: '2汤匙' },
      { name: '生抽', amount: '1汤匙' },
      { name: '料酒', amount: '2汤匙' },
      { name: '冰糖', amount: '30g' },
      { name: '桂皮', amount: '1小块' },
      { name: '八角', amount: '2个' }
    ],
    steps: [
      '五花肉切成约3cm见方的块，放入冷水锅中，加入姜片和料酒，焯水至变色，捞出洗净备用。',
      '热锅冷油，放入冰糖小火炒至琥珀色，注意不要炒焦。',
      '放入五花肉块，翻炒均匀上色，再加入葱姜炒香。',
      '加入老抽、生抽、料酒翻炒均匀，倒入热水没过肉块，加入八角和桂皮。',
      '大火烧开后转小火，加盖焖煮60分钟至肉质软烂。',
      '开盖大火收汁至浓稠，装盘撒葱花即可。'
    ],
    tips: '炒糖色时一定要用小火，耐心等待冰糖融化变色，这是红烧肉好看好吃的关键。收汁时不断翻炒防止粘锅。'
  },
  {
    id: 'demo2',
    name: '番茄蛋花汤',
    category: '汤类',
    time: '15分钟',
    cost: 6,
    price: 12,
    img: '',
    emoji: '🍅',
    desc: '酸甜开胃的家常汤，番茄的酸味与鸡蛋的鲜味完美融合，色彩鲜艳，营养丰富。',
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '2个' },
      { name: '食盐', amount: '适量' },
      { name: '白糖', amount: '少许' },
      { name: '葱花', amount: '适量' },
      { name: '香油', amount: '数滴' }
    ],
    steps: [
      '番茄洗净切滚刀块，鸡蛋打散备用。',
      '热锅放少许油，下番茄翻炒出汁，加一小撮糖提鲜。',
      '加入适量清水，大火烧开后转中火煮3分钟。',
      '沿锅边缓缓淋入蛋液，用筷子轻轻画圈形成蛋花。',
      '加盐调味，撒葱花，淋几滴香油即可出锅。'
    ],
    tips: '淋蛋液时要等汤再次沸腾后再淋，这样蛋花更嫩滑好看。可根据个人口味调整糖和盐的比例。'
  },
  {
    id: 'demo3',
    name: '蒜泥白肉',
    category: '凉菜',
    time: '30分钟',
    cost: 18,
    price: 35,
    img: '',
    emoji: '🍖',
    desc: '四川传统凉菜，薄薄的猪肉片配上香辣蒜泥调味，口感爽滑，风味独特。',
    ingredients: [
      { name: '猪五花肉', amount: '300g' },
      { name: '大蒜', amount: '6瓣' },
      { name: '生抽', amount: '2汤匙' },
      { name: '辣椒油', amount: '1汤匙' },
      { name: '香醋', amount: '1茶匙' },
      { name: '白糖', amount: '少许' },
      { name: '黄瓜', amount: '半根' }
    ],
    steps: [
      '猪肉整块放入冷水中，加葱姜料酒，大火烧开后小火煮20分钟。',
      '煮熟的肉捞出，放入冰水中浸泡10分钟使肉质更紧实。',
      '黄瓜切丝铺底，肉切薄片铺在黄瓜上。',
      '大蒜捣成蒜泥，加入生抽、辣椒油、香醋、白糖调成酱汁。',
      '将调好的蒜泥酱汁均匀淋在肉片上即可。'
    ],
    tips: '肉片要切得足够薄，口感才好。冰水浸泡是让肉质紧实的关键。蒜泥现捣现用香味更浓。'
  },
  {
    id: 'demo4',
    name: '蛋炒饭',
    category: '主食',
    time: '10分钟',
    cost: 5,
    price: 15,
    img: '',
    emoji: '🍳',
    desc: '用隔夜米饭炒制，粒粒分明，蛋香四溢，加上葱花和酱油，简单却美味无比。',
    ingredients: [
      { name: '隔夜米饭', amount: '2碗' },
      { name: '鸡蛋', amount: '2个' },
      { name: '葱花', amount: '适量' },
      { name: '生抽', amount: '1汤匙' },
      { name: '食盐', amount: '适量' },
      { name: '食用油', amount: '适量' }
    ],
    steps: [
      '隔夜饭用手捏散，鸡蛋打散备用。',
      '热锅多放油，油温七成热时倒入蛋液，快速翻炒成蛋碎。',
      '倒入米饭，大火翻炒2分钟，让米饭均匀受热。',
      '沿锅边淋入生抽，加盐调味，继续翻炒均匀。',
      '撒上葱花，翻炒几下出锅。'
    ],
    tips: '隔夜饭水分少，炒出来更香更粒粒分明。火要够大，翻炒要快，这样才能炒出"锅气"。'
  }
];

// ===========================
// 初始化
// ===========================
let dishes = loadDishes();
let currentCategory = '全部';
let currentOrderCategory = '全部';
let cart = {};
let currentDetailId = null;
let pendingDeleteId = null;

window.addEventListener('DOMContentLoaded', () => {
  // 首次打开时加载示例数据
  if (dishes.length === 0) {
    dishes = SAMPLE_DISHES;
    saveDishes(dishes);
  }

  // 检查URL参数，如果有 ?order=1 则显示点餐界面
  const params = new URLSearchParams(window.location.search);
  if (params.get('order') === '1') {
    renderOrderPage();
    showPage('order');
  } else {
    renderDishGrid();
    showPage('owner');
  }
});

// ===========================
// 页面切换
// ===========================
function showPage(name) {
  document.querySelectorAll('.app-page').forEach(p => p.classList.remove('active'));
  const pageMap = {
    'owner': 'app-owner',
    'detail': 'app-detail',
    'manage': 'app-manage',
    'add-dish': 'app-add-dish',
    'order': 'app-order',
    'order-detail': 'app-order-detail'
  };
  const el = document.getElementById(pageMap[name]);
  if (el) el.classList.add('active');

  if (name === 'owner') renderDishGrid();
  if (name === 'manage') renderManageList();
  if (name === 'order') renderOrderPage();
  if (name === 'add-dish' && !document.getElementById('editId').value) {
    resetForm();
  }

  window.scrollTo(0, 0);
}

// ===========================
// 菜品网格渲染（管理员视角）
// ===========================
function renderDishGrid(filterCat, keyword) {
  const grid = document.getElementById('dishGrid');
  let list = [...dishes];
  const cat = filterCat || currentCategory;
  const q = keyword !== undefined ? keyword : (document.getElementById('searchInput')?.value || '');

  if (cat !== '全部') list = list.filter(d => d.category === cat);
  if (q.trim()) list = list.filter(d => d.name.includes(q.trim()) || (d.desc || '').includes(q.trim()));

  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-icon">🍽️</div><p>暂无菜品</p><p class="empty-hint">点击右下角 + 添加第一道菜</p></div>`;
    return;
  }

  grid.innerHTML = list.map(d => `
    <div class="dish-card" onclick="showDetail('${d.id}')">
      ${d.img
        ? `<img class="dish-card-img" src="${escapeAttr(d.img)}" alt="${escapeAttr(d.name)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div class="dish-card-img-placeholder" style="display:none">${d.emoji || '🍽️'}</div>`
        : `<div class="dish-card-img-placeholder">${d.emoji || '🍽️'}</div>`
      }
      <div class="dish-card-body">
        <div class="dish-card-name">${escapeHtml(d.name)}</div>
        <div class="dish-card-meta">
          <span class="dish-card-cat">${escapeHtml(d.category || '')}</span>
          ${d.time ? `<span class="dish-card-time">⏱ ${escapeHtml(d.time)}</span>` : ''}
        </div>
        <div>
          <span class="dish-card-price">¥${(+d.price || 0).toFixed(2)}</span>
          ${d.cost ? `<span class="dish-card-cost">成本¥${(+d.cost || 0).toFixed(2)}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function filterCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('#categoryBar .cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderDishGrid();
}

function searchDishes() {
  renderDishGrid(currentCategory, document.getElementById('searchInput').value);
}

// ===========================
// 菜品详情
// ===========================
function showDetail(id, isOrder) {
  const dish = dishes.find(d => d.id === id);
  if (!dish) return;
  currentDetailId = id;

  const targetPage = isOrder ? 'app-order-detail' : 'app-detail';
  const titleEl = isOrder ? 'orderDetailTitle' : 'detailTitle';
  const contentEl = isOrder ? 'orderDetailContent' : 'detailContent';
  const editBtn = document.getElementById('detailEditBtn');
  if (editBtn) editBtn.style.display = isOrder ? 'none' : '';

  document.getElementById(titleEl).textContent = dish.name;

  const profit = (dish.price - dish.cost) || 0;
  const profitRate = dish.cost > 0 ? Math.round((profit / dish.cost) * 100) : 0;

  document.getElementById(contentEl).innerHTML = `
    ${dish.img
      ? `<img class="detail-hero-img" src="${escapeAttr(dish.img)}" alt="${escapeAttr(dish.name)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div class="detail-hero-placeholder" style="display:none">${dish.emoji || '🍽️'}</div>`
      : `<div class="detail-hero-placeholder">${dish.emoji || '🍽️'}</div>`
    }
    <div class="detail-body">
      <h1 class="detail-name">${escapeHtml(dish.name)}</h1>
      <div class="detail-badges">
        ${dish.category ? `<span class="badge badge-cat">${escapeHtml(dish.category)}</span>` : ''}
        ${dish.time ? `<span class="badge badge-time">⏱ ${escapeHtml(dish.time)}</span>` : ''}
      </div>

      ${(dish.price || dish.cost) ? `
      <div class="detail-price-row">
        ${dish.price ? `
        <div class="price-item">
          <div class="price-label">菜单价</div>
          <div class="price-value">¥${(+dish.price).toFixed(2)}</div>
        </div>` : ''}
        ${dish.price && dish.cost ? '<div class="price-divider"></div>' : ''}
        ${dish.cost ? `
        <div class="price-item">
          <div class="price-label">食材成本</div>
          <div class="price-value" style="font-size:18px;color:#666">¥${(+dish.cost).toFixed(2)}</div>
        </div>` : ''}
        ${profit > 0 && !isOrder ? `
        <div class="price-divider"></div>
        <div class="price-item">
          <div class="price-label">利润</div>
          <div class="price-value" style="font-size:18px;color:#27ae60">¥${profit.toFixed(2)}</div>
          <div class="price-profit">利润率 ${profitRate}%</div>
        </div>` : ''}
      </div>` : ''}

      ${dish.desc ? `<div class="detail-desc">${escapeHtml(dish.desc)}</div>` : ''}

      ${dish.ingredients && dish.ingredients.length > 0 ? `
      <div class="section-block">
        <h3><span class="section-icon">🥬</span> 食材原料</h3>
        <div class="ingredient-chips">
          ${dish.ingredients.map(ing => `
            <div class="ingredient-chip">
              <span class="ing-name">${escapeHtml(ing.name)}</span>
              ${ing.amount ? `<span class="ing-amount">${escapeHtml(ing.amount)}</span>` : ''}
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      ${dish.steps && dish.steps.length > 0 ? `
      <div class="section-block">
        <h3><span class="section-icon">👨‍🍳</span> 烹饪步骤</h3>
        <div class="step-list-view">
          ${dish.steps.map((step, i) => `
            <div class="step-item">
              <div class="step-num">${i + 1}</div>
              <div class="step-text">${escapeHtml(step)}</div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      ${dish.tips ? `
      <div class="section-block">
        <h3><span class="section-icon">💡</span> 烹饪小贴士</h3>
        <div class="tips-box">${escapeHtml(dish.tips)}</div>
      </div>` : ''}

      ${isOrder ? `
      <div style="margin-top:20px">
        <button class="btn-primary-full" onclick="addToCart('${dish.id}');showPage('order')">
          + 加入点单
        </button>
      </div>` : ''}
    </div>
  `;

  showPage(isOrder ? 'order-detail' : 'detail');
}

function editCurrentDish() {
  if (currentDetailId) editDish(currentDetailId);
}

// ===========================
// 管理列表
// ===========================
function renderManageList() {
  const list = document.getElementById('manageList');
  if (dishes.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">🍽️</div><p>还没有任何菜品</p><p class="empty-hint">点击右上角"新增"按钮添加</p></div>`;
    return;
  }
  list.innerHTML = dishes.map(d => `
    <div class="manage-item">
      ${d.img
        ? `<img class="manage-item-img" src="${escapeAttr(d.img)}" alt="${escapeAttr(d.name)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div class="manage-item-img-placeholder" style="display:none">${d.emoji || '🍽️'}</div>`
        : `<div class="manage-item-img-placeholder">${d.emoji || '🍽️'}</div>`
      }
      <div class="manage-item-info">
        <div class="manage-item-name">${escapeHtml(d.name)}</div>
        <div class="manage-item-meta">
          <span class="dish-card-cat" style="font-size:11px;padding:2px 8px">${escapeHtml(d.category || '')}</span>
          <span style="font-size:12px;color:#e8630a;font-weight:700">¥${(+d.price || 0).toFixed(2)}</span>
        </div>
      </div>
      <div class="manage-item-actions">
        <button class="btn-sm-edit" onclick="editDish('${d.id}')" title="编辑">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="btn-sm-delete" onclick="confirmDelete('${d.id}')" title="删除">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

// ===========================
// 添加/编辑菜品表单
// ===========================
function resetForm() {
  document.getElementById('editId').value = '';
  document.getElementById('formTitle').textContent = '添加菜品';
  document.getElementById('dishName').value = '';
  document.getElementById('dishCategory').value = '热菜';
  document.getElementById('dishTime').value = '';
  document.getElementById('dishCost').value = '';
  document.getElementById('dishPrice').value = '';
  document.getElementById('dishDesc').value = '';
  document.getElementById('dishTips').value = '';
  document.getElementById('imgUrl').value = '';
  document.getElementById('imgPreview').src = '';
  document.getElementById('imgPreview').style.display = 'none';
  document.getElementById('imgPlaceholder').style.display = 'flex';
  document.getElementById('ingredientList').innerHTML = '';
  document.getElementById('stepList').innerHTML = '';
  // 默认添加2个食材和2个步骤
  addIngredient(); addIngredient();
  addStep(); addStep();
}

function editDish(id) {
  const dish = dishes.find(d => d.id === id);
  if (!dish) return;

  document.getElementById('formTitle').textContent = '编辑菜品';
  document.getElementById('editId').value = dish.id;
  document.getElementById('dishName').value = dish.name || '';
  document.getElementById('dishCategory').value = dish.category || '热菜';
  document.getElementById('dishTime').value = dish.time || '';
  document.getElementById('dishCost').value = dish.cost || '';
  document.getElementById('dishPrice').value = dish.price || '';
  document.getElementById('dishDesc').value = dish.desc || '';
  document.getElementById('dishTips').value = dish.tips || '';
  document.getElementById('imgUrl').value = dish.img || '';

  if (dish.img) {
    document.getElementById('imgPreview').src = dish.img;
    document.getElementById('imgPreview').style.display = 'block';
    document.getElementById('imgPlaceholder').style.display = 'none';
  } else {
    document.getElementById('imgPreview').src = '';
    document.getElementById('imgPreview').style.display = 'none';
    document.getElementById('imgPlaceholder').style.display = 'flex';
  }

  document.getElementById('ingredientList').innerHTML = '';
  (dish.ingredients || []).forEach(ing => addIngredient(ing.name, ing.amount));
  if ((dish.ingredients || []).length === 0) { addIngredient(); addIngredient(); }

  document.getElementById('stepList').innerHTML = '';
  (dish.steps || []).forEach(s => addStep(s));
  if ((dish.steps || []).length === 0) { addStep(); addStep(); }

  showPage('add-dish');
}

function addIngredient(name = '', amount = '') {
  const container = document.getElementById('ingredientList');
  const idx = container.children.length;
  const row = document.createElement('div');
  row.className = 'ingredient-row';
  row.innerHTML = `
    <input type="text" class="form-input ing-name" placeholder="食材名称" value="${escapeAttr(name)}" />
    <input type="text" class="form-input ing-amount" placeholder="用量" value="${escapeAttr(amount)}" style="max-width:100px" />
    <button class="btn-remove" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(row);
}

function addStep(text = '') {
  const container = document.getElementById('stepList');
  const updateNums = () => {
    container.querySelectorAll('.step-number-badge').forEach((b, i) => b.textContent = i + 1);
  };
  const row = document.createElement('div');
  row.className = 'step-row';
  row.innerHTML = `
    <div class="step-number-badge">1</div>
    <textarea class="form-input" placeholder="描述这一步的操作...">${escapeHtml(text)}</textarea>
    <button class="btn-remove" onclick="this.parentElement.remove();updateStepNums()">×</button>
  `;
  container.appendChild(row);
  updateNums();
}

window.updateStepNums = () => {
  document.querySelectorAll('#stepList .step-number-badge').forEach((b, i) => b.textContent = i + 1);
};

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const url = e.target.result;
    document.getElementById('imgPreview').src = url;
    document.getElementById('imgPreview').style.display = 'block';
    document.getElementById('imgPlaceholder').style.display = 'none';
    document.getElementById('imgUrl').value = url;
  };
  reader.readAsDataURL(file);
}

function handleImgUrlInput() {
  const url = document.getElementById('imgUrl').value.trim();
  if (url) {
    document.getElementById('imgPreview').src = url;
    document.getElementById('imgPreview').style.display = 'block';
    document.getElementById('imgPlaceholder').style.display = 'none';
  } else {
    document.getElementById('imgPreview').src = '';
    document.getElementById('imgPreview').style.display = 'none';
    document.getElementById('imgPlaceholder').style.display = 'flex';
  }
}

function saveDish() {
  const name = document.getElementById('dishName').value.trim();
  if (!name) { alert('请填写菜品名称'); return; }

  const ingredients = [];
  document.querySelectorAll('#ingredientList .ingredient-row').forEach(row => {
    const n = row.querySelector('.ing-name').value.trim();
    const a = row.querySelector('.ing-amount').value.trim();
    if (n) ingredients.push({ name: n, amount: a });
  });

  const steps = [];
  document.querySelectorAll('#stepList .step-row textarea').forEach(ta => {
    const s = ta.value.trim();
    if (s) steps.push(s);
  });

  const imgUrl = document.getElementById('imgUrl').value.trim();
  const editId = document.getElementById('editId').value;

  const dish = {
    id: editId || 'dish_' + Date.now(),
    name,
    category: document.getElementById('dishCategory').value,
    time: document.getElementById('dishTime').value.trim(),
    cost: parseFloat(document.getElementById('dishCost').value) || 0,
    price: parseFloat(document.getElementById('dishPrice').value) || 0,
    img: imgUrl,
    emoji: getCategoryEmoji(document.getElementById('dishCategory').value),
    desc: document.getElementById('dishDesc').value.trim(),
    ingredients,
    steps,
    tips: document.getElementById('dishTips').value.trim()
  };

  if (editId) {
    const idx = dishes.findIndex(d => d.id === editId);
    if (idx > -1) dishes[idx] = dish;
  } else {
    dishes.unshift(dish);
  }
  saveDishes(dishes);

  showPage('manage');
}

function getCategoryEmoji(cat) {
  const map = { '热菜': '🍲', '凉菜': '🥗', '汤类': '🍜', '主食': '🍚', '甜品': '🍰' };
  return map[cat] || '🍽️';
}

// ===========================
// 删除菜品
// ===========================
function confirmDelete(id) {
  pendingDeleteId = id;
  document.getElementById('confirmDeleteBtn').onclick = () => {
    dishes = dishes.filter(d => d.id !== id);
    saveDishes(dishes);
    closeDeleteModal();
    renderManageList();
  };
  document.getElementById('deleteModal').classList.add('open');
}

function closeDeleteModal(event) {
  if (event && event.target !== document.getElementById('deleteModal')) return;
  document.getElementById('deleteModal').classList.remove('open');
}

// ===========================
// 点餐页面
// ===========================
function renderOrderPage() {
  const grid = document.getElementById('orderGrid');
  let list = [...dishes];
  if (currentOrderCategory !== '全部') list = list.filter(d => d.category === currentOrderCategory);

  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🍽️</div><p>暂无菜品</p></div>`;
    return;
  }

  grid.innerHTML = list.map(d => {
    const qty = cart[d.id] || 0;
    return `
    <div class="order-card" onclick="showDetail('${d.id}', true)">
      ${d.img
        ? `<img class="order-card-img" src="${escapeAttr(d.img)}" alt="${escapeAttr(d.name)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div class="order-card-img-placeholder" style="display:none">${d.emoji || '🍽️'}</div>`
        : `<div class="order-card-img-placeholder">${d.emoji || '🍽️'}</div>`
      }
      <div class="order-card-body">
        <div class="order-card-name">${escapeHtml(d.name)}</div>
        <div class="order-card-footer" onclick="event.stopPropagation()">
          <span class="order-price">¥${(+d.price || 0).toFixed(2)}</span>
          ${qty > 0
            ? `<div class="qty-control">
                <button class="qty-btn" onclick="removeFromCart('${d.id}')">−</button>
                <span class="qty-num" id="qty-${d.id}">${qty}</span>
                <button class="qty-btn" onclick="addToCart('${d.id}')">+</button>
               </div>`
            : `<button class="add-to-cart-btn" onclick="addToCart('${d.id}')">+</button>`
          }
        </div>
      </div>
    </div>
    `;
  }).join('');
}

function filterOrderCategory(cat, btn) {
  currentOrderCategory = cat;
  document.querySelectorAll('#orderCategoryBar .cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderOrderPage();
}

// ===========================
// 购物车
// ===========================
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
  renderOrderPage();
}

function removeFromCart(id) {
  if (cart[id] > 0) cart[id]--;
  if (cart[id] === 0) delete cart[id];
  updateCartUI();
  renderOrderPage();
}

function clearCart() {
  cart = {};
  updateCartUI();
  renderOrderPage();
  closeCart();
}

function updateCartUI() {
  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const d = dishes.find(x => x.id === id);
    return sum + (d ? d.price * qty : 0);
  }, 0);
  const count = Object.values(cart).reduce((s, v) => s + v, 0);

  document.getElementById('cartBadge').textContent = count;
  document.getElementById('cartTotal').textContent = `¥${total.toFixed(2)}`;
  document.getElementById('cartBar').style.display = count > 0 ? 'flex' : 'none';
}

function showCart() {
  renderCartItems();
  document.getElementById('cartModal').classList.add('open');
}

function closeCart(event) {
  if (event && event.target !== document.getElementById('cartModal')) return;
  document.getElementById('cartModal').classList.remove('open');
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const entries = Object.entries(cart).filter(([_, qty]) => qty > 0);

  if (entries.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:30px;color:#aaa">购物车是空的</div>`;
    document.getElementById('cartCount').textContent = '0';
    document.getElementById('cartSummaryTotal').textContent = '¥0.00';
    return;
  }

  let total = 0, count = 0;
  container.innerHTML = entries.map(([id, qty]) => {
    const d = dishes.find(x => x.id === id);
    if (!d) return '';
    total += d.price * qty;
    count += qty;
    return `
      <div class="cart-item">
        ${d.img
          ? `<img class="cart-item-img" src="${escapeAttr(d.img)}" onerror="this.style.display='none'" />`
          : `<div class="cart-item-img" style="background:linear-gradient(135deg,#fde8d8,#ffd5b0);display:flex;align-items:center;justify-content:center;font-size:24px">${d.emoji || '🍽️'}</div>`
        }
        <div class="cart-item-info">
          <div class="cart-item-name">${escapeHtml(d.name)}</div>
          <div class="cart-item-price">¥${(d.price * qty).toFixed(2)}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="removeFromCart('${id}');renderCartItems()">−</button>
          <span class="qty-num">${qty}</span>
          <button class="qty-btn" onclick="addToCart('${id}');renderCartItems()">+</button>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartSummaryTotal').textContent = `¥${total.toFixed(2)}`;
}

function submitOrder() {
  const entries = Object.entries(cart).filter(([_, qty]) => qty > 0);
  if (entries.length === 0) return;

  const items = entries.map(([id, qty]) => {
    const d = dishes.find(x => x.id === id);
    return `${d ? d.name : id} × ${qty}`;
  }).join('、');

  const total = entries.reduce((sum, [id, qty]) => {
    const d = dishes.find(x => x.id === id);
    return sum + (d ? d.price * qty : 0);
  }, 0);

  document.getElementById('orderSuccessText').textContent = `您点了：${items}，共 ¥${total.toFixed(2)}，请等待厨师制作`;
  document.getElementById('cartModal').classList.remove('open');
  document.getElementById('orderSuccessModal').classList.add('open');
  cart = {};
  updateCartUI();
  renderOrderPage();
}

function closeOrderSuccess() {
  document.getElementById('orderSuccessModal').classList.remove('open');
}

// ===========================
// 二维码
// ===========================
function showQRCode() {
  // 固定使用部署的网站链接
  const baseUrl = window.location.origin; // 自动获取当前域名
  const url = baseUrl + '/?order=1';
  document.getElementById('qrUrl').textContent = url;

  const qrBox = document.getElementById('qrcode');
  qrBox.innerHTML = '<div style="text-align:center;padding:20px;color:#7f8c8d;">正在生成二维码...</div>';

  // 使用纯JavaScript二维码生成
  generateQRCode(url, qrBox, 200);

  document.getElementById('qrModal').classList.add('open');
}

function closeQR(event) {
  if (event && event.target !== document.getElementById('qrModal')) return;
  document.getElementById('qrModal').classList.remove('open');
}

// ===========================
// 工具函数
// ===========================
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
