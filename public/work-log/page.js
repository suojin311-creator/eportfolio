const modes = {
  free: ['持续理解上下文，保持相对稳定的角色表现。', '交互预期更开放，也更依赖对话表现。'],
  role: ['通过故事、角色和明确话题，限定互动范围。', '互动规则更清楚，用户更容易理解它能做什么。'],
  care: ['通过动作、反馈与照顾行为建立互动关系。', '减少对开放式对话的依赖，仍需验证持续互动的理由。']
};
const tabs = [...document.querySelectorAll('[data-mode]')];
function selectMode(button) {
  tabs.forEach(tab => { tab.setAttribute('aria-selected', String(tab === button)); tab.tabIndex = tab === button ? 0 : -1; });
  const [description, implication] = modes[button.dataset.mode];
  document.querySelector('#mode-description').textContent = description;
  document.querySelector('#mode-implication').textContent = implication;
  document.querySelector('#mode-panel').setAttribute('aria-labelledby', button.id);
  const character = document.querySelector('#mode-character');
  character.src = `./assets/mascot-${({ free: 'standing', role: 'cheer', care: 'standing' })[button.dataset.mode]}.webp?v=clean4`;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectMode(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectMode(tabs[next]); tabs[next].focus(); }
  });
});
const links = [...document.querySelectorAll('.chapter-rail nav a')];
const chapters = [...document.querySelectorAll('.chapter')];
let scheduled = false;
function updateReading() {
  const distance = document.documentElement.scrollHeight - innerHeight;
  document.querySelector('.read-progress').style.width = `${distance > 0 ? Math.min(100, Math.max(0, scrollY / distance * 100)) : 0}%`;
  const current = chapters.filter(section => section.getBoundingClientRect().top < innerHeight * .43).at(-1);
  links.forEach(link => { const active = link.hash === `#${current?.id}`; link.classList.toggle('active', active); if(active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
  scheduled = false;
}
addEventListener('scroll', () => { if(!scheduled) { scheduled = true; requestAnimationFrame(updateReading); } }, {passive:true});
addEventListener('resize', updateReading); updateReading();
const dialog = document.querySelector('.image-dialog');
const expanded = document.querySelector('#expanded-image');
let imageTrigger;
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  imageTrigger = button;
  expanded.src = button.dataset.image;
  expanded.alt = button.querySelector('img').alt;
  document.querySelector('#image-caption').textContent = button.dataset.caption;
  dialog.showModal(); document.body.classList.add('no-scroll');
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if(event.target === dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('no-scroll'); imageTrigger?.focus(); });
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('play', () => document.querySelectorAll('video').forEach(other => { if(other !== video) other.pause(); }));
});
