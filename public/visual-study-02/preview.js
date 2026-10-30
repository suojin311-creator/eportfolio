(() => {
 const controls = [...document.querySelectorAll('[data-font]')];
 function setType(type, announce = true) {
   if (!['sans','serif'].includes(type)) return;
   document.documentElement.dataset.type = type;
   controls.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.font === type)));
   document.getElementById('font-label').textContent = type === 'sans' ? 'Noto Sans SC' : 'Noto Serif SC';
   if (announce) document.getElementById('font-status').textContent = type === 'sans' ? '已切换黑体标题' : '已切换宋体标题';
   try { sessionStorage.setItem('visual-02-type',type); } catch (_) {}
 }
 let stored;
 try { stored = sessionStorage.getItem('visual-02-type'); } catch (_) {}
 setType(stored || 'serif', false);
 document.fonts.load('450 48px StudySans').catch(() => {});
 document.fonts.load('450 48px StudySerif').catch(() => {});
 controls.forEach(b => b.addEventListener('click', () => setType(b.dataset.font)));
 const open = document.querySelector('.open-project');
 const note = document.getElementById('project-note');
 const close = document.querySelector('.close-project');
 open.addEventListener('click', () => {
   const next = open.getAttribute('aria-expanded') !== 'true';
   open.setAttribute('aria-expanded',String(next));
   open.setAttribute('aria-label',next ? '收起开学季成长包' : '展开开学季成长包');
   note.hidden = !next;
   if (next) note.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
 });
 close.addEventListener('click', () => {
   note.hidden = true;
   open.setAttribute('aria-expanded','false');
   open.setAttribute('aria-label','展开开学季成长包');
   open.focus({preventScroll:true});
   document.getElementById('project').scrollIntoView({behavior:'smooth',block:'center'});
 });
})();
