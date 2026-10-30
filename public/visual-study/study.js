(() => {
  const root = document.documentElement;
  const choices = [...document.querySelectorAll('[data-choice]')];
  const caption = document.getElementById('scene-caption');
  const scene = document.querySelector('.color-scene');
  const status = document.getElementById('palette-status');
  function selectPalette(palette, announce = true) {
    if (!['warm', 'cool'].includes(palette)) return;
    root.dataset.palette = palette;
    choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.choice === palette)));
    caption.textContent = palette === 'warm' ? '温暖，有自己的秩序。' : '清朗，也保留温度。';
    scene.setAttribute('aria-label', palette === 'warm' ? '色彩构成：暖红、柔绿、淡粉、浅黄和灰蓝，在柔光与几何结构中相接。' : '色彩构成：灰蓝、淡粉、浅黄与柔绿，在柔光与几何结构中相接。');
    document.querySelector('meta[name="theme-color"]').content = palette === 'warm' ? '#f2ede2' : '#eeefe9';
    if (announce) status.textContent = palette === 'warm' ? '已切换暖色方案' : '已切换冷色方案';
    try { sessionStorage.setItem('portfolio-visual-palette', palette); } catch (_) {}
  }
  let stored;
  try { stored = sessionStorage.getItem('portfolio-visual-palette'); } catch (_) {}
  selectPalette(stored || 'warm', false);
  choices.forEach(button => button.addEventListener('click', () => selectPalette(button.dataset.choice)));
  const toggle = document.querySelector('.project-toggle');
  const detail = document.getElementById('project-detail');
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(expanded));
    detail.hidden = !expanded;
    toggle.firstElementChild.textContent = expanded ? '收起判断' : '看看我的判断';
  });
})();
