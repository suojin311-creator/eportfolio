(() => {
 const $ = s => document.querySelector(s);
 const app = $('#app');
 const state = { page:'settings', format:'flat', filter:'today', editing:null, nextId:1, tasks:[], checks:{}, recordOpen:null, returnTo:'list', draft:{title:'按时起床',days:[1,2,3,4,5,6,7],time:'07:30',remind:true} };
 const weekdays=['一','二','三','四','五','六','日'];
 const today = () => new Date().getDay() || 7;
 const escape = v => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const repeat = days => days.length===7 ? '每天' : days.join(',')==='1,2,3,4,5' ? '周一至周五' : '每周'+days.map(d=>weekdays[d-1]).join('、');
 const timeLine = task => repeat(task.days)+(task.remind ? ' · '+task.time+' 提醒' : ' · 提醒已关闭');
 const isValid = () => state.draft.title.trim().length>0 && state.draft.days.length>0 && (!state.draft.remind || /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(state.draft.time));
 const capsule = '<span class="capsule" aria-hidden="true"><span>•••</span><i></i><span>⊙</span></span>';
 function nav(title,route='list',label='返回成长目标') { return `<div class="app-nav"><button type="button" class="app-back" data-route="${route}" aria-label="${label}">‹</button><h3 class="app-title">${title}</h3>${capsule}</div>`; }
 function owner() { return '<div class="owner"><div class="avatar"><img src="./assets/goals-reference.png" alt="玩偶头像"></div><div><strong>我的成长伙伴</strong><p>一起练习好习惯</p></div><span>已绑定</span></div>'; }
 function settings() {
 const d=state.draft;
 return `${nav('设置成长目标',state.returnTo,state.returnTo==='offer'?'返回推荐任务':'返回成长目标')}<form class="task-form" id="task-form"><div class="app-content">${owner()}<div class="app-card"><span class="task-tag">动画推荐任务</span><label for="task-name" class="task-name-label visually-hidden">成长目标</label><input class="task-name" id="task-name" name="task-name" maxlength="20" required value="${escape(d.title)}" autocomplete="off"><p class="task-origin">来自《小乐闹钟，响啦！》</p></div><div class="app-card"><div class="field-heading">重复日期<span>至少选择一天</span></div><div class="quick-days" role="group" aria-label="快捷重复日期"><button type="button" data-days="daily" aria-pressed="${d.days.length===7}">每天</button><button type="button" data-days="weekdays" aria-pressed="${d.days.join(',')==='1,2,3,4,5'}">周一至周五</button></div><div class="day-picker" role="group" aria-label="重复日期">${weekdays.map((name,i)=>`<button type="button" data-day="${i+1}" aria-label="周${name}" aria-pressed="${d.days.includes(i+1)}">${name}</button>`).join('')}</div><div class="app-row"><label for="remind-enabled">玩偶提醒</label><label class="switch"><input id="remind-enabled" type="checkbox" ${d.remind?'checked':''} aria-label="开启玩偶提醒"><span></span></label></div><div class="app-row"><label for="remind-time">提醒时间</label><input id="remind-time" class="time-input" type="time" value="${escape(d.time)}" ${!d.remind?'disabled':''} ${d.remind?'required':''}></div></div></div><div class="app-footer"><p class="form-note">实际行为由家长核验本次完成。</p><button class="green-primary" type="submit" ${isValid()?'':'disabled'}>${state.editing?'保存设置':'确认加入成长目标'}</button></div></form>`;
 }
 function card(t) {
 const recording=state.recordOpen===t.id;
 return `<div class="app-card task-card"><div class="task-card-top"><span class="task-tag">${t.done?'今日已完成':'习惯养成'}</span><button class="edit-task" data-edit="${t.id}" aria-label="编辑${escape(t.title)}">编辑</button></div><h4>${escape(t.title)}</h4><p>${timeLine(t)}</p>${t.done?'<p class="done-note">家长已核验 · 后续仍按计划提醒</p>':state.filter==='today'?(recording?`<label class="record-check"><input type="checkbox" data-verify="${t.id}" ${state.checks[t.id]?'checked':''}>我已观察并核验孩子完成本次行为</label><button class="record-confirm" data-confirm-record="${t.id}" ${state.checks[t.id]?'':'disabled'}>确认今日完成</button>`:`<button class="record-button" data-record="${t.id}">记录今日完成</button>`):'<p>将在选定日期开始提醒</p>'}</div>`;
 }
 function list() {
 const filtered=state.tasks.filter(t=>state.filter==='today'?t.days.includes(today()):state.filter==='upcoming'?!t.days.includes(today()):false);
 const tabs=[['today','今天进行中'],['upcoming','未开始'],['ended','已结束']];
 return `${nav('成长目标','library','返回动画内容')}<div class="app-content">${owner()}<div class="goal-tabs" role="tablist" aria-label="成长目标状态">${tabs.map(([key,title])=>`<button role="tab" type="button" data-filter="${key}" id="filter-${key}" aria-selected="${state.filter===key}" aria-controls="goal-panel" tabindex="${state.filter===key?'0':'-1'}">${title}</button>`).join('')}</div><div id="goal-panel" role="tabpanel" aria-labelledby="filter-${state.filter}">${filtered.length?filtered.map(card).join(''):`<div class="empty"><div class="empty-symbol" aria-hidden="true">✓</div><p>${state.filter==='ended'?'暂无已结束目标':state.filter==='upcoming'?'暂无待开始目标':'今天还没有成长目标'}</p></div>`}</div></div><div class="app-footer"><button class="green-primary" data-new-task>添加目标</button></div>`;
 }
 function raw(page) {
 return `<div class="raw-screen"><img src="./assets/${page==='library'?'library':'animation'}.png" alt="${page==='library'?'原小程序动画内容入口':'原小程序动画详情，静态演示'}"><button class="raw-back" data-route="${page==='library'?'list':'library'}" aria-label="返回上一页"></button>${page==='library'?'<button class="raw-hotspot episode-hotspot" data-route="animation" aria-label="观看小乐闹钟动画"></button>':''}</div>`;
 }
 function offer() {
 return `${raw('animation').replace('class="raw-screen"','class="raw-screen" inert')}<div class="offer-backdrop"><section class="offer-sheet" role="dialog" aria-labelledby="offer-title"><button class="offer-dismiss" data-route="animation" aria-label="暂不添加成长目标">×</button><span class="task-tag">成长任务推荐</span><h3 id="offer-title">和小乐一起，<br>练习按时起床。</h3><p>把动画里的好习惯，带进日常。</p><div class="offer-preview"><strong>按时起床</strong>每天 · 07:30 玩偶提醒<br>由家长核验本次完成</div><button class="green-primary" data-quick-add>确认添加</button><button class="offer-secondary" data-adjust>调整提醒设置</button></section></div>`;
 }
 function render(focusSelector) {
 app.innerHTML=state.page==='settings'?settings():state.page==='list'?list():state.page==='offer'?offer():raw(state.page);
 document.querySelectorAll('[data-route]').forEach(b=>{
   if(!b.closest('.scene-links'))return;
   const active=state.page===b.dataset.route || (b.dataset.route==='library'&&['animation','offer'].includes(state.page));
   b.setAttribute('aria-pressed',String(active));
 });
 const helps={settings:'修改任务、重复日期与提醒时间，再确认添加。',list:'查看设置后的目标，可编辑计划或记录今日完成。',library:'点击第一集，按家长视角从内容进入任务。',animation:'这是静态界面演示。点击“模拟动画播完”，查看任务承接。',offer:'默认模板可直接确认，也可以调整提醒设置。'};
 $('#scene-help').textContent=helps[state.page];
 $('#simulation-control').hidden=state.page!=='animation';
 if(focusSelector) app.querySelector(focusSelector)?.focus({preventScroll:true});
 else if(state.page==='offer') app.querySelector('[data-quick-add]')?.focus({preventScroll:true});
 }
 function route(page) {
 if(!['settings','list','library','animation','offer'].includes(page))return;
 state.page=page;state.recordOpen=null;render();
 }
 function resetDraft() {state.draft={title:'按时起床',days:[1,2,3,4,5,6,7],time:'07:30',remind:true};state.editing=null;}
 function save() {
 if(!isValid())return;
 const existing=state.editing || state.tasks.find(t=>t.title===state.draft.title.trim())?.id;
 const task={...state.draft,title:state.draft.title.trim(),days:[...state.draft.days],done:false,id:existing||state.nextId++};
 if(existing)state.tasks=state.tasks.map(t=>t.id===existing?task:t);else state.tasks.push(task);
 state.editing=null;state.filter=task.days.includes(today())?'today':'upcoming';state.page='list';render();
 const toast=document.createElement('div');toast.className='toast';toast.setAttribute('role','status');toast.textContent=existing?'已更新成长目标':'已加入成长目标';app.append(toast);setTimeout(()=>toast.remove(),2200);
 }
 document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.hasAttribute('data-format')){
  state.format=b.dataset.format;$('#device').classList.toggle('phone',state.format==='phone');
  document.querySelectorAll('[data-format]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));return;
 }
 if(b.hasAttribute('data-route')){if(b.dataset.route==='settings'&&b.closest('.scene-links')){state.editing=null;state.returnTo='list';}route(b.dataset.route);return;}
 if(b.hasAttribute('data-day')){const d=+b.dataset.day;state.draft.days=(state.draft.days.includes(d)?state.draft.days.filter(x=>x!==d):[...state.draft.days,d]).sort((a,b)=>a-b);render(`[data-day="${d}"]`);return;}
 if(b.hasAttribute('data-days')){state.draft.days=b.dataset.days==='daily'?[1,2,3,4,5,6,7]:[1,2,3,4,5];render(`[data-days="${b.dataset.days}"]`);return;}
 if(b.hasAttribute('data-filter')){state.filter=b.dataset.filter;render(`[data-filter="${state.filter}"]`);return;}
 if(b.hasAttribute('data-edit')){const t=state.tasks.find(x=>x.id===+b.dataset.edit);if(!t)return;state.draft={title:t.title,days:[...t.days],time:t.time,remind:t.remind};state.editing=t.id;state.returnTo='list';route('settings');return;}
 if(b.hasAttribute('data-record')){state.recordOpen=+b.dataset.record;render(`[data-verify="${state.recordOpen}"]`);return;}
 if(b.hasAttribute('data-confirm-record')){const id=+b.dataset.confirmRecord;const t=state.tasks.find(t=>t.id===id);if(t&&state.checks[id]){t.done=true;state.recordOpen=null;render();}return;}
 if(b.hasAttribute('data-new-task')){resetDraft();state.returnTo='list';route('settings');return;}
 if(b.hasAttribute('data-adjust')){resetDraft();state.returnTo='offer';route('settings');return;}
 if(b.hasAttribute('data-quick-add')){resetDraft();save();return;}
 });
 app.addEventListener('input',e=>{
 const input=e.target;
 if(input.id==='task-name')state.draft.title=input.value;
 if(input.id==='remind-time')state.draft.time=input.value;
 const submit=app.querySelector('button[type="submit"]');if(submit)submit.disabled=!isValid();
 });
 app.addEventListener('change',e=>{
 const input=e.target;
 if(input.id==='remind-enabled'){state.draft.remind=input.checked;render('#remind-enabled');}
 if(input.hasAttribute('data-verify')){const id=+input.dataset.verify;state.checks[id]=input.checked;const confirm=app.querySelector(`[data-confirm-record="${id}"]`);if(confirm)confirm.disabled=!input.checked;}
 });
 app.addEventListener('submit',e=>{if(e.target.id==='task-form'){e.preventDefault();save();}});
 app.addEventListener('keydown',e=>{
 const tab=e.target.closest('[data-filter]');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
 e.preventDefault();const filters=['today','upcoming','ended'];const i=filters.indexOf(state.filter);
 state.filter=e.key==='Home'?filters[0]:e.key==='End'?filters[2]:filters[(i+(e.key==='ArrowRight'?1:-1)+3)%3];render(`[data-filter="${state.filter}"]`);
 });
 $('#finish-animation').addEventListener('click',()=>route('offer'));
 $('#reset-demo').addEventListener('click',()=>{state.tasks=[];state.nextId=1;state.checks={};resetDraft();state.returnTo='list';state.filter='today';route('settings');});
 const dialog=$('#reference-dialog');$('#reference-open').addEventListener('click',()=>dialog.showModal());$('#reference-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.page==='offer'){route('animation');}});
 const copyRows=[
 ['项目开头','让内容观看有下一步，让已有能力进入具体的家庭场景。让家长容易开始，孩子愿意参与，家庭有理由再次使用。','用主题动画连接成长任务，给智能玩偶一个日常使用场景。','合并重复的“下一步”和“具体场景”，直接交代方案。'],
 ['产品背景','团队已经有智能玩偶和配套小程序。对话中存在答非所问、接不住孩子话题的问题；小程序的部分能力也需要一个容易理解的使用场景。','玩偶经常答非所问；成长目标等功能需要家长自行构思与配置。','保留两项具体障碍，删掉泛化解释。展会、开学季与 COO 提出方向等信息仍保留在正文。'],
 ['用户研究','先理解家长愿意投入什么。研究以老用户为主。一份原始访谈提供了清楚的线索：这位家长需要可执行的方法，同时对准备和学习成本十分敏感。','直接呈现“我应该怎么做”的原文与时间戳，研究适用范围放入可展开说明。','减少为证据做铺垫的文字，同时保留年龄与来源边界。'],
 ['使用路径','把内容、任务和玩偶，接成一条使用路径。成长包规划包含玩偶、动画观看权益和主题 NFC 卡片。方案的核心，是关联已有成长目标能力，明确家长与儿童各自的下一步。','观看主题动画 → 确认对应任务 → 玩偶提醒与练习。','用流程代替长段说明，产品包组成和 NFC 规划状态另外保留。'],
 ['关键判断','这项判断连接了内容审核、交互规则与结果呈现，也帮助家长理解何时需要参与。完成依据，应与产品能获得的信息匹配。','对话练习记录本次练习；实际行为由家长核验。','先写清规则，保留本人负责的选题与审核工作。'],
 ['阶段交付','我参与至方案设计与定稿。这个案例以该阶段的产出呈现工作：研究输入、双端使用路径、PRD 与任务审核判断。','用“5 月方向提出—6 月定稿—8 月计划推出”的时间线，以及 PRD、审核材料呈现交付。','由阶段与交付物说明结果，不填未知上线成绩。'],
 ['结尾与材料','正文呈现项目判断，附件提供研究摘录和规则说明。补写的材料明确标为重构稿。理解一个问题，也把下一步想清楚。','附件直接标注“重构稿”；删除结尾口号。','标签已经说明材料性质，不再重复解释；保留后续验证方向。']
 ];
 $('#copy-comparisons').innerHTML=copyRows.map(([title,before,after,reason])=>`<article class="copy-row"><h3>${title}</h3><div class="copy-columns"><div><span>第一版相关表述 / 展示方式（节选合并）</span><p>${before}</p></div><div><span>本轮调整</span><p>${after}</p></div></div><p class="copy-reason">${reason}</p></article>`).join('');
 render();
})();
