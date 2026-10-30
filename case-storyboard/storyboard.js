(() => {
 const steps={
 watch:['动画结束','内容先提供一个具体的家庭活动主题，让任务有明确的上下文。'],
 template:['任务模板','用与内容对应的现成活动，减少家长从空白开始构思。'],
 confirm:['直接确认','默认模板可直接采用；个性化日期和时间作为可选调整。'],
 remind:['按时提醒','复用玩偶的提醒能力，将家长的计划带入家庭日常。'],
 card:['对应集数的卡片','卡片与动画共享主题；孩子可以独立发起，无需先创建家长任务。'],
 touch:['触碰腹部','物理触碰作为孩子主动参与的入口；这里配小乐腹部动作与触卡反馈。'],
 question:['选一个启发问题','从该集预设的十个问题中选一个作为对谈起点，邀请孩子围绕主题表达。'],
 talk:['围绕主题对谈','帮助孩子理解与表达动画提倡的习惯和价值，不直接判定现实任务完成。']
 };
 document.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 const [title,reason]=steps[button.dataset.step];document.getElementById('step-title').textContent=title;document.getElementById('step-reason').textContent=reason;
 }));
 document.getElementById('show-notes').addEventListener('change',e=>document.body.classList.toggle('show-notes',e.target.checked));
})();
