const modes = {
 free: ['持续理解上下文，保持角色表现一致。','开放话题中的失配，影响陪伴预期。','对话为何中断，孩子下次是否主动发起。'],
 role: ['明确的角色、故事和主题内回应。','主题之外的诉求可能得不到承接。','主题内回应是否相关，孩子是否愿意继续。'],
 care: ['可辨识的动作、反馈与状态变化。','反馈重复，可能缺少持续互动的理由。','孩子是否主动照顾、回应，并再次参与。']
};
const tabs = [...document.querySelectorAll('[data-mode]')];
function selectMode(button) {
 tabs.forEach(tab => {tab.setAttribute('aria-selected',String(tab===button));tab.tabIndex=tab===button?0:-1;});
 const [ability,risk,validation]=modes[button.dataset.mode];
 document.querySelector('#mode-description').textContent=ability;
 document.querySelector('#mode-implication').textContent=risk;
 document.querySelector('#mode-validation').textContent=validation;
 document.querySelector('#mode-panel').setAttribute('aria-labelledby',button.id);
}
tabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectMode(tab));
 tab.addEventListener('keydown',event=>{
  let next;
  if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(index+1)%tabs.length;
  if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
  if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;
  if(next!==undefined){event.preventDefault();selectMode(tabs[next]);tabs[next].focus();}
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

document.querySelectorAll("details").forEach(details=>details.addEventListener("toggle",()=>{if(!details.open)details.querySelectorAll("video").forEach(video=>video.pause());}));
