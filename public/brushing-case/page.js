(() => {
 const examples=[
 {q:'如果小牙齿会说话，你觉得它睡前想提醒我们什么？',child:'它想把嘴巴里的饼干屑洗掉。',next:'那你想先从哪边的小牙齿开始帮忙？'},
 {q:'小乐有点不想刷牙，你会怎么邀请它一起？',child:'我先拿牙刷，它跟我一起刷。',next:'你想给我们一起刷牙取个什么名字？'},
 {q:'刷牙时，有什么地方让你觉得不舒服？',child:'泡泡到嘴边有点痒。',next:'你想怎么告诉爸爸妈妈，请他们帮你？'},
 {q:'你想让小乐在什么时候提醒你刷牙？',child:'睡前换好睡衣的时候。',next:'那到时候，我该怎么叫你，你会更愿意来？'},
 {q:'牙齿里面藏了一小块饼干，你会怎么找到它？',child:'请妈妈看一看。',next:'妈妈帮你找到以后，你想怎么试一试把它刷掉？'},
 {q:'刷牙这件事，你最想和谁一起做？',child:'和爸爸一起。',next:'你想先告诉爸爸什么，邀请他加入？'},
 {q:'如果今天特别想快点睡觉，你想怎么记得刷牙？',child:'把牙刷放到杯子里，看到就记得。',next:'你想把杯子放在哪里，才容易看见？'},
 {q:'刚才动画里，你最想学的是哪一个刷牙动作？',child:'慢慢刷后面的牙。',next:'下次练习时，你想请谁帮你看一看？'},
 {q:'如果有一天忘记刷牙，你想怎么提醒明天的自己？',child:'画一张小牙齿的画。',next:'这张画放在哪里，你最容易看到？'},
 {q:'睡前刷完牙以后，你想对小牙齿说什么？',child:'晚安，明天见。',next:'明天我们还想怎么照顾它们？'}
 ];
 const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let index=0;
 function bubble(message,child=false){return `<div class="chat-row ${child?'child':'toy'}"><span class="chat-avatar">${child?'孩子':'<img src="./assets/goals-reference.png" alt="小乐">'}</span><div class="bubble-wrap"><p class="bubble">${escape(message)}</p></div></div>`;}
 function render(){const e=examples[index];document.getElementById('question-preview').textContent=e.q;document.getElementById('chat-messages').innerHTML=bubble(e.q)+bubble(e.child,true)+bubble(e.next);}
 function touch(){index=(index+1)%examples.length;render();}
 document.getElementById('next-question').addEventListener('click',touch);
 document.getElementById('question-bank').innerHTML=examples.map(e=>`<li>${escape(e.q)}</li>`).join('');
 document.getElementById('back-to-goal').addEventListener('click',()=>document.querySelector('growth-demo').showGoals?.());
 render();
})();
