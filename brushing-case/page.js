(() => {
 const examples=[["如果小牙齿会说话，你觉得它睡前想提醒我们什么？", "把饼干屑洗掉。", "它会躲在哪些地方呢？", "后面的牙齿那里。", "你想怎么帮后面的牙齿？", "慢慢刷，不着急。", "有看不清的地方，你想请谁帮忙？", "请妈妈看看。", "那今晚你想先准备什么？", "先拿牙刷，再叫妈妈。"], ["小乐有点不想刷牙，你会怎么邀请它一起？", "我先拿牙刷，它跟我一起刷。", "你想先对小乐说什么？", "小乐，我们一起去洗手间吧。", "如果它还想继续玩呢？", "我陪它把玩具放好。", "你们准备好以后，想请谁来帮忙？", "叫妈妈来。", "那你想负责准备哪样东西？", "我拿杯子和牙刷。"], ["刷牙时，有什么地方让你觉得不舒服？", "泡泡到嘴边有点痒。", "觉得痒的时候，你想怎么告诉大人？", "我会说这里不舒服。", "你最想请谁帮你看看？", "请爸爸看看。", "如果还不舒服，你想再告诉爸爸什么？", "我想停一下，再请他帮忙。", "那我们下次先和爸爸说好什么？", "不舒服的时候，我会告诉他。"], ["你想让小乐在什么时候提醒你刷牙？", "睡前换好睡衣的时候。", "那个时候，你通常在哪里？", "在我的小房间。", "我怎么提醒，你会比较愿意来？", "叫我的名字，说一起刷牙啦。", "你想请谁和你一起去？", "和妈妈一起去。", "今晚你想先和妈妈约定什么？", "换好睡衣就一起去刷牙。"], ["牙齿里面藏了一小块饼干，你会怎么找到它？", "请妈妈看一看。", "你想怎么请她帮忙？", "妈妈，帮我看看后面的牙齿。", "找到以后，你想做什么？", "把它刷干净。", "有自己刷不到的地方，可以怎么办？", "请妈妈帮我刷。", "最后你想请妈妈再看看什么？", "看看还有没有没刷到的地方。"], ["刷牙这件事，你最想和谁一起做？", "和爸爸一起。", "你想先说什么，邀请他加入？", "爸爸，陪我一起刷牙吧。", "如果爸爸正在忙，你想怎么办？", "先问他什么时候可以陪我。", "你等他的时候，可以先准备什么？", "准备好我的杯子。", "那今晚你想先和爸爸约定什么？", "约好换睡衣以后一起去。"], ["如果今天特别想快点睡觉，你想怎么记得刷牙？", "看到牙刷就会记得。", "你想把牙刷放在哪里？", "放在洗手间的杯子里。", "谁可以和你一起准备好？", "我和妈妈一起。", "如果躺上床才想起来，你会怎么说？", "妈妈，我还没有刷牙。", "那你想请她怎样帮你？", "陪我去，再一起回来睡觉。"], ["刚才动画里，你最想学的是哪一个刷牙动作？", "慢慢刷后面的牙。", "你觉得这个动作哪里需要帮忙？", "我看不见后面的牙。", "你想请谁陪你练习？", "请爸爸陪我。", "你准备怎么告诉他？", "爸爸，帮我看看这里。", "那这次练习，你想先试哪一步？", "先让我试，再请爸爸帮忙。"], ["如果有一天忘记刷牙，你想怎么提醒明天的自己？", "画一张小牙齿的画。", "你想把它画成什么样子？", "一颗笑眯眯的小牙齿。", "这张画放在哪里，你最容易看到？", "放在换睡衣的地方。", "你想请谁帮你一起放好？", "请妈妈一起放。", "看到这张画，你想提醒自己什么？", "换好睡衣，还要去刷牙。"], ["睡前刷完牙以后，你想对小牙齿说什么？", "晚安，明天见。", "你想让它明天和你一起做什么？", "一起吃早饭。", "那明天还可以怎么照顾它？", "继续记得刷牙。", "你想请谁提醒你？", "请小乐提醒，也请爸爸陪我。", "你想把这个约定告诉爸爸吗？", "想，我现在就去和他说。"]];
 const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const list=document.getElementById('question-list'),select=document.getElementById('question-select'),messages=document.getElementById('chat-messages'),panel=document.getElementById('record');
 let active=0;
 list.innerHTML=examples.map((e,i)=>`<button type="button" class="question-option" id="question-tab-${i}" role="tab" aria-selected="${i===0}" aria-controls="record" tabindex="${i===0?0:-1}" data-index="${i}"><span>${String(i+1).padStart(2,'0')}</span><strong>${escape(e[0])}</strong></button>`).join('');
 select.innerHTML=examples.map((e,i)=>`<option value="${i}">${i+1}. ${escape(e[0])}</option>`).join('');
 function bubble(text,i){const child=i%2===1;return `<div class="chat-row ${child?'child':'toy'}"><span class="chat-avatar">${child?'孩子':'<img src="./assets/goals-reference.png" alt="小乐">'}</span><div class="bubble-wrap"><p class="bubble">${escape(text)}</p></div></div>`;}
 function choose(i){if(!Number.isInteger(i)||i<0||i>=examples.length)return;active=i;select.value=String(i);list.querySelectorAll('[data-index]').forEach(b=>{const yes=Number(b.dataset.index)===i;b.setAttribute('aria-selected',String(yes));b.tabIndex=yes?0:-1;});panel.setAttribute('aria-labelledby',`question-tab-${i}`);messages.innerHTML=examples[i].map(bubble).join('');messages.scrollTop=0;}
 list.addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(b)choose(Number(b.dataset.index));});
 list.addEventListener('keydown',e=>{if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;e.preventDefault();const focused=Number(e.target.closest('[data-index]')?.dataset.index??active);const i=e.key==='Home'?0:e.key==='End'?9:(focused+(e.key==='ArrowDown'?1:-1)+10)%10;choose(i);list.querySelector(`[data-index="${i}"]`).focus({preventScroll:true});});
 select.addEventListener('change',()=>choose(Number(select.value)));

 const visual=document.getElementById('flow-visual');
 const icons={
 brush:'<svg viewBox="0 0 90 90" aria-hidden="true"><path d="m17 68 40-40 13 13-40 40zM54 25l8-8 14 14-8 8M61 17l6-6m-1 11 6-6m-1 11 6-6M16 70l6 6"/><path d="M26 18h16v32H26zM22 17h24M25 52h18"/></svg>',
 repeat:'<svg viewBox="0 0 90 90" aria-hidden="true"><rect x="16" y="23" width="58" height="53" rx="6"/><path d="M16 37h58M30 16v14m30-14v14M29 47h7m12 0h7M29 58h7m12 0h7M29 68h7"/></svg>'
 };
 function showFlow(key){
 document.querySelectorAll('[data-flow]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.flow===key)));
 if(['watch','offer','confirm','complete'].includes(key)){const file={watch:'content',offer:'offer',confirm:'goal',complete:'complete'}[key];visual.innerHTML=`<img src="./assets/flow/${file}.png" alt="${{watch:'动画内容界面',offer:'动画结束后的成长目标推荐',confirm:'家长确认后的成长目标',complete:'家长记录今日完成'}[key]}">`;}
 else if(key==='remind')visual.innerHTML='<div class="flow-scene"><div class="flow-avatar"><img src="./assets/goals-reference.png" alt="小乐"></div><div class="flow-bubble">到刷牙时间啦，<br>我们一起去吧。</div></div>';
 else visual.innerHTML=`<div class="flow-scene">${icons[key==='brush'?'brush':'repeat']}</div>`;
 }
 document.querySelectorAll('[data-flow]').forEach(b=>b.addEventListener('click',()=>showFlow(b.dataset.flow)));
 showFlow('watch');
 choose(0);
})();
