import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import './styles.css';

const PROJECT = '/projects/growth-companion';
const profile = { name: '[姓名]', email: '', role: '教育 / 内容 / AI 应用' };

declare global { interface Window { __PORTFOLIO_PREVIEW__?: boolean } }
const isStandalonePreview = () => window.location.protocol === 'file:' || window.__PORTFOLIO_PREVIEW__ === true;

function localSectionLink(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
  if (!isStandalonePreview()) return;
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Icon({ name, size = 20, className = '' }: { name: string; size?: number; className?: string }) {
  const paths: Record<string, ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    diagonal: <><path d="M6 18 18 6M6 6h12v12" /></>,
    play: <path d="m9 5 11 7-11 7z" />,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    book: <><path d="M12 5v16M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2z" /></>,
    chat: <path d="M21 11a8 8 0 0 1-8 8H5l-4 3V11a10 10 0 0 1 20 0Z" />,
    spark: <><path d="m12 3 2.8 6.2L21 12l-6.2 2.8L12 21l-2.8-6.2L3 12l6.2-2.8zM20 2v4m-2-2h4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="m12 12 8-8" /></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
    back: <path d="M19 12H5m6-6-6 6 6 6" />,
    folder: <path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v10H3z" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{paths[name] || paths.arrow}</svg>;
}

function Asterisk({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 80 80" aria-hidden="true"><path d="M40 0 45 26 63 7 55 32 80 27 59 43 78 58 53 54 58 80 40 60 23 79 27 54 1 59 21 42 0 27 26 32 17 7 35 26Z" fill="currentColor" /></svg>;
}

function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    document.title = location.pathname === PROJECT ? '智能玩偶开学季成长包 · 产品作品集' : `产品作品集 · ${profile.name}`;
    const id = decodeURIComponent(location.hash.slice(1));
    const handle = window.setTimeout(() => {
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    }, 40);
    return () => window.clearTimeout(handle);
  }, [location.key, location.pathname, location.hash]);
  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.key]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <header className="site-header">
    <div className="header-inner">
      <Link className="brand" to="/" aria-label="返回个人首页"><span className="brand-mark">N<span>•</span></span><span>{profile.name}<span className="brand-slash"> / </span><small>产品作品集</small></span></Link>
      <nav className="desktop-nav" aria-label="主导航">
        <Link to="/#work">精选作品</Link><Link to="/#about">关于我</Link><Link className="nav-contact" to="/#contact">聊一聊 <Icon name="diagonal" size={16} /></Link>
      </nav>
      <button className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? '关闭导航' : '打开导航'} onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
    </div>
    {open && <nav id="mobile-nav" className="mobile-nav" aria-label="移动导航"><Link to="/#work">精选作品 <Icon name="arrow" /></Link><Link to="/#about">关于我 <Icon name="arrow" /></Link><Link to="/#contact">联系信息 <Icon name="arrow" /></Link></nav>}
  </header>;
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-row"><Link className="footer-brand" to="/">{profile.name}<span> / 产品作品集</span></Link><p>以真实场景理解问题，以具体方案表达判断。</p><span className="footer-note">PORTFOLIO · 2026</span></div></footer>;
}

function Workbench() {
  return <div className="workbench" aria-label="从用户研究到产品方案的工作方式示意">
    <div className="bench-grid" />
    <div className="bench-label"><span className="tiny-dot" /> PRODUCT THINKING, IN PRACTICE</div>
    <div className="research-note"><span className="note-corner" /><div className="note-overline"><Icon name="chat" size={15} /> 用户的声音</div><p>“接下来，<br />我该怎么做？”</p><span className="note-caption">从一个具体的使用问题出发</span></div>
    <svg className="bench-connector" viewBox="0 0 420 300" aria-hidden="true"><path d="M125 125 C 125 245, 250 65, 280 195" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 6" /><path d="m271 185 9 12 5-14" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
    <div className="solution-note"><div className="note-overline"><span className="solution-bullet" /> 把方案写清楚</div><div className="solution-row"><span>01</span><p>明确一个用户场景</p><Icon name="check" size={15} /></div><div className="solution-row"><span>02</span><p>连接路径与任务规则</p><Icon name="check" size={15} /></div><div className="solution-row"><span>03</span><p>检查产品能力边界</p><Icon name="check" size={15} /></div></div>
    <div className="bench-sticker"><Asterisk /><span>THINK<br />THEN MAKE.</span></div>
    <div className="bench-bottom"><span>研究 → 需求 → 体验</span><span className="bench-plus">＋</span></div>
  </div>;
}

function Phone({ small = false }: { small?: boolean }) {
  return <div className={`phone-mock ${small ? 'phone-small' : ''}`}><div className="phone-island" /><img src="/media/content-library.png" alt="产品录屏中的习惯启蒙动画内容入口" loading="lazy" /><div className="phone-home-bar" /></div>;
}

function ToyFace({ active = false }: { active?: boolean }) {
  return <div className={`toy-face ${active ? 'toy-active' : ''}`} aria-hidden="true"><span className="toy-ear ear-left" /><span className="toy-ear ear-right" /><span className="toy-cheek cheek-left" /><span className="toy-cheek cheek-right" /><span className="toy-eye eye-left" /><span className="toy-eye eye-right" /><span className="toy-smile" /></div>;
}

function ProjectArtwork({ large = false }: { large?: boolean }) {
  return <div className={`project-art ${large ? 'project-art-large' : ''}`}>
    <div className="art-circle circle-one" /><div className="art-circle circle-two" />
    <span className="art-overline">CONTENT × COMPANION × ROUTINE</span>
    <Phone />
    <div className="floating-task"><span className="floating-task-label">任务模板 · 方案示意</span><h4>让好习惯，<br />有一个下一步。</h4><div className="task-mini-row"><span className="mini-check"><Icon name="check" size={13} /></span><span>家庭一起练习</span><span className="task-mini-tag">今天</span></div><div className="task-mini-row"><span className="mini-empty" /><span>家长确认本次参与</span></div><div className="task-mini-footer">成长任务 <Icon name="arrow" size={15} /></div></div>
    <div className="floating-toy"><ToyFace /><span>主题互动入口</span></div>
    <span className="art-caption">原界面截图 + 方案示意</span>
    <Asterisk className="art-star" />
  </div>;
}

function Home() {
  return <><main id="main-content">
    <section className="home-hero container">
      <div className="hero-copy"><span className="eyebrow"><span className="status-dot" /> 初级产品经理 · 求职作品集</span><p className="hello">你好，我是 {profile.name}</p><h1>从用户的问题出发，<br />让体验<span className="hero-emphasis">往前一步<svg viewBox="0 0 280 16" aria-hidden="true"><path d="M3 12Q130-2 275 7" /></svg></span>。</h1><p className="hero-description">从 C 端内容运营到 AI 产品，关注用户如何开始、<br className="desktop-break" />理解并持续使用一个产品。</p><div className="hero-actions"><Link className="button button-dark" to="/#work">看看我的作品 <Icon name="arrow" size={18} /></Link><Link className="text-link" to="/#about">了解我的经历 <Icon name="diagonal" size={16} /></Link></div><div className="hero-domains"><span>教育</span><span>内容</span><span>AI 应用体验</span></div></div>
      <Workbench />
    </section>
    <section id="work" className="work-section container section-anchor">
      <div className="section-intro"><div><span className="eyebrow">SELECTED WORK / 精选作品</span><h2>一个项目，<br />几次具体的产品判断。</h2></div><p>从问题依据到使用路径，<br />呈现我如何参与方案的形成。</p></div>
      <Link to={PROJECT} className="project-card" aria-label="阅读智能玩偶开学季成长包项目详情">
        <div className="project-card-copy"><div className="project-card-top"><span className="project-index">01</span><span className="project-phase">方案设计 · 定稿阶段</span></div><p className="project-kicker">AI 玩偶 × 小程序</p><h3>智能玩偶<br />开学季成长包</h3><p className="project-card-description">把动画、成长任务与玩偶互动，<br />组织成家庭可以开始的一项活动。</p><div className="tag-row"><span>用户研究</span><span>MVP / PRD</span><span>双端体验</span></div><div className="card-cta">阅读项目故事 <span><Icon name="diagonal" size={23} /></span></div></div><ProjectArtwork />
      </Link>
    </section>
    <section id="about" className="about-section section-anchor"><div className="container about-grid"><div className="about-intro"><span className="eyebrow">ABOUT / 关于我</span><h2>理解使用场景，<br />也把执行细节想清楚。</h2><p>运营工作让我接触内容供给、配置和用户路径；<br />产品工作让我继续追问：<br /><strong>这个需求为什么成立，规则怎样才合理？</strong></p><div className="about-note"><span className="hand-arrow">↗</span><p>我关注用户、内容与产品能力之间的连接。</p></div></div><div className="experience-list"><article className="experience-item"><div className="experience-heading"><h3>AI 产品</h3><span>2026.03 — 2026.06</span></div><p>围绕智能玩偶与配套小程序，参与用户研究、MVP 产品包 PRD、双端体验与内容适配。</p><div className="tag-row"><span>访谈与需求</span><span>任务规则</span><span>内容审核</span></div></article><article className="experience-item"><div className="experience-heading"><h3>C 端内容运营</h3><span>2025.12 — 2026.02</span></div><p>管理 <strong>500+</strong> 内容产品，参与小程序配置、运营侧迭代需求、活动功能协作及 FAQ 整理。</p><div className="tag-row"><span>内容配置</span><span>用户路径</span><span>跨职能协作</span></div></article><div className="capability-line"><span><Icon name="chat" size={16} /> 听清问题</span><span><Icon name="target" size={16} /> 写清需求</span><span><Icon name="eye" size={16} /> 检查边界</span></div></div></div></section>
    <section id="contact" className="contact-section container section-anchor"><div><span className="eyebrow">LET’S TALK / 联系</span><h2>从一个真实的问题，<br />开始下一次讨论。</h2></div><div className="contact-details"><p>期待教育、内容与 AI 应用方向的产品机会。</p>{profile.email ? <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<Icon name="diagonal" /></a> : <div className="contact-placeholder"><Icon name="mail" size={18} /><span>[邮箱 / 联系方式待补充]</span></div>}<span className="contact-small">姓名与联系信息暂用占位，后续统一替换。</span></div></section>
  </main><Footer /></>;
}

const sections = [
  ['context', '项目背景'], ['research', '研究线索'], ['approach', '方案取舍'], ['solution', '双端方案'], ['decision', '关键判断'], ['delivery', '阶段交付'], ['materials', '支持材料'],
] as const;

function useActiveSection() {
  const [active, setActive] = useState<string>('context');
  useEffect(() => {
    const update = () => {
      let id: string = sections[0][0];
      for (const [key] of sections) if ((document.getElementById(key)?.getBoundingClientRect().top ?? Infinity) < 210) id = key;
      setActive(id);
    };
    window.addEventListener('scroll', update, { passive: true }); update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  return active;
}

function Section({ id, number, label, title, children }: { id: string; number: string; label: string; title: ReactNode; children: ReactNode }) {
  return <section id={id} className="case-section section-anchor"><div className="case-section-label"><span>{number}</span>{label}</div><h2>{title}</h2>{children}</section>;
}

function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (open && !ref.current?.open) ref.current?.showModal(); else if (!open && ref.current?.open) ref.current.close(); }, [open]);
  return <dialog ref={ref} className="demo-modal" onClose={onClose} onCancel={onClose} aria-labelledby="demo-title" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}><div className="modal-inner"><div className="modal-heading"><div><span className="eyebrow">PRODUCT DEMO</span><h2 id="demo-title">原产品演示录屏</h2></div><button className="icon-button" onClick={onClose} aria-label="关闭产品演示"><Icon name="close" /></button></div>{open && <video src="/media/product-demo.mp4" controls playsInline preload="metadata" aria-label="智能玩偶配套小程序演示视频" />}<p>录屏设备未绑定，未展示完整的任务添加路径。NFC 作为产品包规划呈现。</p></div></dialog>;
}

type Journey = 'parent' | 'child' | 'routine';
const journeys: { key: Journey; title: string; label: string; steps: string[]; explanation: string }[] = [
  { key: 'parent', title: '家长设置', label: '把“看完”接到“下一步”', steps: ['观看主题动画', '出现对应模板', '约定周期与时间', '确认加入成长目标'], explanation: '用现成内容和任务承接家长的培养意愿，减少从空白页面重新构思与配置。' },
  { key: 'child', title: '儿童互动', label: '给孩子一个主动参与的入口', steps: ['看过主题内容', '触碰对应 NFC 卡', '开启主题引导', '参与表达或练习'], explanation: 'NFC 为规划中的交互入口。卡片和任务围绕同一主题，物理触碰的参与价值需要后续验证。' },
  { key: 'routine', title: '日常执行', label: '让主题活动进入家庭安排', steps: ['到达约定时点', '玩偶发起提醒', '孩子参与活动', '按类型记录结果'], explanation: '小程序管理时间与记录，玩偶提供提醒或引导，家长观察需要在现实中确认的行为。' },
];

function JourneyExplorer() {
  const [tab, setTab] = useState<Journey>('parent');
  const [weekdays, setWeekdays] = useState([1, 2, 3, 4, 5]);
  const [time, setTime] = useState('20:30');
  const [saved, setSaved] = useState(false);
  const [touched, setTouched] = useState(false);
  const [verified, setVerified] = useState(false);
  const [finished, setFinished] = useState(false);
  const current = journeys.find((j) => j.key === tab)!;
  function changeTab(key: Journey) { setTab(key); }
  function keyboardTab(e: React.KeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const index = (i + (e.key === 'ArrowRight' ? 1 : -1) + journeys.length) % journeys.length; setTab(journeys[index].key); document.getElementById(`journey-tab-${journeys[index].key}`)?.focus(); }
  }
  return <div className="journey-explorer"><div className="journey-tabs" role="tablist" aria-label="查看不同用户的使用路径">{journeys.map((j, i) => <button key={j.key} id={`journey-tab-${j.key}`} role="tab" aria-selected={tab === j.key} tabIndex={tab === j.key ? 0 : -1} aria-controls={`journey-panel-${j.key}`} onClick={() => changeTab(j.key)} onKeyDown={(e) => keyboardTab(e, i)}><span>0{i + 1}</span>{j.title}{j.key === 'child' && <small>规划</small>}</button>)}</div><div className="journey-panel" id={`journey-panel-${tab}`} role="tabpanel" aria-labelledby={`journey-tab-${tab}`}><div className="journey-story"><span className="eyebrow">{tab === 'parent' ? 'PARENT FLOW' : tab === 'child' ? 'CHILD FLOW' : 'DAILY ROUTINE'}</span><h3>{current.label}</h3><p>{current.explanation}</p><ol className="journey-steps">{current.steps.map((step, i) => <li key={step}><span>{i + 1}</span>{step}</li>)}</ol><p className="prototype-note"><Icon name="eye" size={14} /> 右侧为可操作的方案示意。</p></div><div className="prototype-area"><span className="prototype-caption">任务交互示意 / 非原产品截图</span><div className="prototype-phone"><div className="prototype-island" /><div className="prototype-screen"><div className="prototype-topline"><Icon name="back" size={16} /><span>{tab === 'child' ? '主题互动' : '成长任务'}</span><span>•••</span></div>{tab === 'parent' ? <><div className="prototype-avatar"><Icon name="spark" size={26} /></div><span className="prototype-eyebrow">刷牙主题 · 演示模板</span><h4>睡前一起刷牙</h4><p className="prototype-muted">把动画里的主题，加入家庭日常。</p><label className="field-label">重复日期</label><div className="weekday-picker">{['一', '二', '三', '四', '五', '六', '日'].map((d, i) => <button key={d} aria-label={`周${d}`} aria-pressed={weekdays.includes(i + 1)} className={weekdays.includes(i + 1) ? 'selected' : ''} onClick={() => { setWeekdays((prev) => prev.includes(i + 1) ? prev.filter((n) => n !== i + 1) : [...prev, i + 1]); setSaved(false); }}>{d}</button>)}</div><label className="time-field">提醒时间<input type="time" value={time} onChange={(e) => { setTime(e.target.value); setSaved(false); }} aria-label="提醒时间" /></label><button className="prototype-primary" disabled={!weekdays.length || !time || saved} onClick={() => setSaved(true)}>{saved ? <><Icon name="check" size={16} /> 已加入演示计划</> : '确认加入成长目标'}</button><p className={`prototype-feedback ${saved ? 'is-success' : ''}`} role="status">{saved ? `${weekdays.length} 天 / 周 · ${time} 提醒` : !weekdays.length ? '请至少选择一天' : '可调整日期和时间，体验设置过程。'}</p></> : tab === 'child' ? <><div className="prototype-toy"><ToyFace active={touched} /></div><h4>{touched ? '一起开始吧' : '打开今天的主题'}</h4><p className="prototype-muted">{touched ? '“到我们约好的刷牙时间啦，请和家长一起开始吧。”' : '主题卡片将内容与玩偶互动连接。'}</p><button className={`nfc-demo-card ${touched ? 'is-touched' : ''}`} onClick={() => setTouched(!touched)} aria-pressed={touched}><Icon name="spark" size={25} /><span>{touched ? '再次查看主题卡' : '触碰主题卡（演示）'}</span></button><p className="prototype-feedback" role="status">{touched ? '主题引导已开启 · 实际行为仍由家长核验' : 'NFC 为规划中的互动方式。'}</p></> : <><div className={`routine-status ${finished ? 'is-complete' : ''}`}><Icon name={finished ? 'check' : 'clock'} size={25} /></div><span className="prototype-eyebrow">今天 · 演示任务</span><h4>{finished ? '已记录本次参与' : '睡前一起刷牙'}</h4><p className="prototype-muted">{finished ? '完成依据：家长确认' : '玩偶负责提醒，实际行为由家长观察。'}</p><div className="routine-detail"><span>提醒时间</span><strong>{time}</strong></div><label className="verify-checkbox"><input type="checkbox" checked={verified} disabled={finished} onChange={(e) => setVerified(e.target.checked)} /><span>我已观察并核验本次活动</span></label><button className="prototype-primary" disabled={!verified || finished} onClick={() => setFinished(true)}>{finished ? <><Icon name="check" size={16} /> 家长已确认</> : '家长确认本次完成'}</button><p className="prototype-feedback" role="status">{finished ? '这里记录一次实际行为，不代表习惯已养成。' : '口头自述不会直接成为完成依据。'}</p></>}</div></div></div></div></div>;
}

function Project() {
  const active = useActiveSection();
  const [demoOpen, setDemoOpen] = useState(false);
  return <><main id="main-content">
    <div className="project-top container"><Link className="back-link" to="/#work"><Icon name="back" size={17} /> 返回精选作品</Link><span>CASE 01 / EDUCATION & AI</span></div>
    <section className="project-hero container"><div className="project-hero-copy"><span className="eyebrow">智能玩偶 × 小程序 × 主题内容</span><h1>智能玩偶<br />开学季<span>成长包</span></h1><p className="case-subtitle">从用户研究到 MVP 方案定稿</p><p className="project-hero-description">让内容观看有下一步，<br />让已有能力进入具体的家庭场景。</p><div className="hero-actions"><a className="button button-dark" href="#context" onClick={(e) => localSectionLink(e, 'context')}>阅读项目 <Icon name="arrow" size={18} /></a><button className="text-link" onClick={() => setDemoOpen(true)}><span className="play-circle"><Icon name="play" size={13} /></span>查看产品演示</button></div></div><ProjectArtwork large /></section>
    <div className="container project-meta"><div><span>我的角色</span><strong>AI 产品</strong><p>用户研究 / PRD / 内容与体验适配</p></div><div><span>目标用户</span><strong>3–6 岁儿童家庭</strong><p>已有玩偶家庭，兼顾新购启用</p></div><div><span>参与阶段</span><strong>研究 → 方案定稿</strong><p>2026.03–06 · 离职前规划确定</p></div><div><span>产品形态</span><strong>玩偶与小程序联动</strong><p>动画 / 成长任务 / NFC 主题卡（规划）</p></div></div>
    <div className="case-layout container"><aside className="case-toc"><span className="eyebrow">项目故事</span><nav aria-label="项目目录">{sections.map(([id, label], i) => <a href={`#${id}`} onClick={(e) => localSectionLink(e, id)} className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined} key={id}><span>0{i + 1}</span>{label}</a>)}</nav><p>以方案阶段的产出，<br />呈现产品判断。</p></aside><article className="case-article">
      <Section id="context" number="01" label="CONTEXT / 项目背景" title={<>已有产品，怎样进入<br className="desktop-break" />更具体的使用场景？</>}>
        <p className="section-lead">团队已经有智能玩偶和配套小程序。对话中存在答非所问、接不住孩子话题的问题；小程序的部分能力也需要一个容易理解的使用场景。</p>
        <div className="context-cards"><div><span className="line-icon"><Icon name="chat" size={23} /></span><h3>对话体验不稳定</h3><p>单靠开放式聊天，家庭难以形成明确、可靠的使用预期。</p></div><div><span className="line-icon"><Icon name="target" size={23} /></span><h3>功能需要被组织起来</h3><p>成长目标等能力已存在，家长仍需自己决定设什么、何时用。</p></div></div>
        <p>结合展会与开学节点，COO 提出成长包方向。我参与后续的用户研究、需求梳理与 PRD，以及内容和任务规则的审核。</p>
        <div className="big-question"><span>我们需要回答</span><p>如何让家长容易开始，<br />孩子愿意参与，家庭有理由再次使用？</p><Icon name="diagonal" size={31} /></div>
      </Section>
      <Section id="research" number="02" label="RESEARCH / 用户研究" title={<>先理解家长愿意<br />投入什么。</>}>
        <p className="section-lead">研究以老用户为主。一份原始访谈提供了清楚的线索：这位家长需要可执行的方法，同时对准备和学习成本十分敏感。</p>
        <figure className="research-quote"><span className="quote-mark">“</span><blockquote>我更需要的是你给我出一个解决方案，<br className="desktop-break" />我应该怎么做？</blockquote><figcaption><span className="quote-avatar">A</span><span>老用户家长 A <small>访谈转写 · 23:34</small></span><span className="source-pill">原文摘录</span></figcaption></figure>
        <div className="insight-grid"><div><span className="insight-number">01</span><h3>直接获得下一步</h3><p>为家长提供能直接使用的任务内容，减少重新构思。</p><small>23:34 · 行动建议偏好</small></div><div><span className="insight-number">02</span><h3>控制准备成本</h3><p>认可建议，也未必有时间准备材料或独立学习。</p><small>16:45 · 时间投入限制</small></div><div><span className="insight-number">03</span><h3>衔接已有习惯</h3><p>家庭已经使用语音定时，需要检验玩偶的额外价值。</p><small>05:00 · 已有提醒方式</small></div></div>
        <details className="evidence-details"><summary>查看研究来源与适用范围 <Icon name="chevron" size={17} /></summary><div><p>这份访谈主要讨论近 11 岁孩子，家庭另有 6 岁儿童；它支持对家长使用偏好的理解，不直接证明 3–6 岁儿童需求或 NFC 的有效性。</p><p>成长目标设置困难、玩偶对话表现等其他信息来自项目回忆，来源单独记录。资料中保留受访者认可部分育儿 AI 功能的正向反馈。</p><a href="/documents/case01-interview.pdf" target="_blank" rel="noreferrer">阅读精选访谈摘录 <Icon name="diagonal" size={15} /></a></div></details>
        <div className="insight-takeaway"><span>设计方向</span><p>用主题内容提供共同情境，<strong>让家长的“开始”更简单。</strong></p></div>
      </Section>
      <Section id="approach" number="03" label="APPROACH / 方案取舍" title={<>先把已有能力，<br />组织成可以开始的活动。</>}>
        <p className="section-lead">成长目标已经存在。方案试图让家长从具体内容进入任务，减少“先想清楚做什么，再去配置”的负担。</p>
        <figure className="path-comparison"><div className="path-row"><div className="path-label"><span>原有使用方式</span><small>依据项目回忆整理</small></div><ol><li>找到成长目标</li><li className="path-friction">自行构思培养内容<span>需要投入思考</span></li><li>手动配置计划</li><li>安排家庭活动</li></ol></div><div className="path-row path-proposed"><div className="path-label"><span>成长包规划</span><small>把内容与下一步关联</small></div><ol><li>观看主题内容</li><li className="path-highlight">获得对应任务模板<span>提供现成的起点</span></li><li>确认周期与时间</li><li>玩偶提醒与家庭参与</li></ol></div><figcaption>路径示意用于解释设计差异，不代表已测量的步骤、耗时或转化改善。</figcaption></figure>
        <div className="choice-heading"><h3>方案的价值与代价</h3><span>复盘对比</span></div><div className="choice-grid"><article><span className="choice-number">A / 简化设置</span><h4>只优化目标配置</h4><p>直接减少配置负担，儿童侧仍需要明确的内容与参与理由。</p><small>保留为基础能力</small></article><article className="choice-selected"><span className="choice-number">B / 内容关联</span><h4>主题动画 + 成长任务</h4><p>让家长与孩子有共同主题，复用已有提醒；需要验证内容吸引力与确认负担。</p><small><Icon name="check" size={14} /> 核心设计方向</small></article><article><span className="choice-number">C / 对话依赖</span><h4>自由对话自动判定</h4><p>互动形式灵活，但答非所问会影响任务理解和完成记录。</p><small>关键能力需先验证</small></article></div>
        <p className="approach-caption">这组比较为回顾后的分析。NFC 在规划中承担主题入口，其参与价值与对话判定能力分别验证。</p>
      </Section>
      <Section id="solution" number="04" label="DESIGN / 双端方案" title={<>把内容、任务和玩偶，<br />接成一条使用路径。</>}>
        <p className="section-lead">成长包规划包含玩偶、动画观看权益和主题 NFC 卡片。方案的核心，是关联已有成长目标能力，明确家长与儿童各自的下一步。</p>
        <JourneyExplorer />
        <div className="role-strip"><div><span>小程序</span><p>设置 · 时间 · 结果</p></div><Icon name="arrow" size={17} /><div><span>玩偶</span><p>提醒 · 引导 · 互动</p></div><Icon name="arrow" size={17} /><div><span>家长</span><p>陪伴 · 观察 · 核验</p></div></div>
      </Section>
      <Section id="decision" number="05" label="DECISION / 关键判断" title={<>“我完成了”，<br />能否直接算完成？</>}>
        <p className="section-lead">市场部负责动画制作。我参与选题与内容审核，检查内容中的任务能否由玩偶支持，以及系统凭什么记录结果。</p>
        <div className="decision-visual"><div className="speech-card"><div className="speech-label">孩子的表达</div><p>“我刷完牙了！”</p><span>设备可以接收到回应</span><Icon name="chat" size={36} /></div><div className="decision-arrow"><Icon name="arrow" size={26} /><span>需要另一种依据</span></div><div className="observation-card"><div className="speech-label">现实中的行为</div><p>刷牙是否实际发生？</p><span><Icon name="eye" size={17} /> 由家长观察与确认</span></div></div>
        <div className="decision-types"><div><span className="type-badge blue">对话练习</span><h3>记录一次练习</h3><p>原规划通过孩子与玩偶练习记录结果。一次练习记录，与现实中的能力表现分开理解。</p></div><div><span className="type-badge green">实际行为</span><h3>家长核验当次行为</h3><p>刷牙等任务由玩偶提醒，家长确认。口头自述不能直接替代对行为的观察。</p></div></div>
        <div className="decision-takeaway"><Icon name="target" size={26} /><div><span>我的产品判断</span><h3>完成依据，应与产品能获得的信息匹配。</h3><p>这项判断连接了内容审核、交互规则与结果呈现，也帮助家长理解何时需要参与。</p></div></div>
        <details className="evidence-details"><summary>回顾后的改进方向 <Icon name="chevron" size={17} /></summary><div><p>考虑到玩偶存在答非所问的问题，自动判断练习完成的稳定性需要验证。本次复盘建议使用预设引导与家长确认保障关键流程，再考虑自动化参与记录。</p><p>这是回顾提出的优化方向，在配套 PRD 重构稿中单独标记。</p></div></details>
      </Section>
      <Section id="delivery" number="06" label="DELIVERY / 阶段交付" title={<>把一个产品包方向，<br />具体化为需求与规则。</>}>
        <p className="section-lead">我参与至方案设计与定稿。这个案例以该阶段的产出呈现工作：研究输入、双端使用路径、PRD 与任务审核判断。</p>
        <div className="delivery-grid"><div><Icon name="chat" size={24} /><span>01 / 理解问题</span><h3>用户研究与需求</h3><p>围绕实际使用障碍，连接家长反馈与产品机会。</p></div><div><Icon name="book" size={24} /><span>02 / 表达方案</span><h3>成长包 PRD</h3><p>梳理动画、模板、周期提醒与结果回传的关系。</p></div><div><Icon name="eye" size={24} /><span>03 / 检查边界</span><h3>内容与任务审核</h3><p>检查任务要求、设备能力和完成依据的匹配。</p></div></div>
        <div className="project-timeline"><div><span className="timeline-dot" /><small>5 月</small><strong>产品包方向提出</strong></div><div><span className="timeline-dot" /><small>6 月 · 本人参与结束前</small><strong>完整方案确定</strong></div><div className="timeline-planned"><span className="timeline-dot" /><small>8 月 · 项目节点</small><strong>面向开学季推出</strong></div></div>
        <div className="reflection-note"><span className="eyebrow">WHAT I TAKE AWAY</span><h3>功能的价值，需要通过具体场景被使用。</h3><p>这段经历让我同时考虑家长的规划成本、孩子的参与方式与产品的能力边界。后续应继续观察首次活动能否顺利完成、家庭是否再次参与，以及确认负担是否可接受。</p></div>
      </Section>
      <Section id="materials" number="07" label="SUPPORTING MATERIALS / 支持材料" title="需要时，再看设计细节。">
        <p>正文呈现项目判断，附件提供研究摘录和规则说明。补写的材料明确标为重构稿。</p>
        <div className="resource-list">{[
          ['A01', '访谈摘录与产品启示', '原始转写的脱敏精选 · 保留时间戳', '/documents/case01-interview.pdf', '原文材料'],
          ['A02', 'MVP 产品需求文档', '依据项目回忆与讨论整理 · 含验收条件', '/documents/case01-prd.pdf', '重构稿'],
          ['A03', '需求与内容审核说明', '问题、依据、处理建议与待验证项', '/documents/case01-review.pdf', '重构整理'],
        ].map(([id, title, description, url, label]) => <a key={id} className="resource-item" href={url} target="_blank" rel="noreferrer"><span className="resource-id">{id}</span><div><h3>{title}<span>{label}</span></h3><p>{description}</p></div><Icon name="diagonal" size={20} /></a>)}</div>
      </Section>
    </article></div>
    <section className="case-end container"><Asterisk /><div><span className="eyebrow">THANK YOU FOR READING</span><h2>理解一个问题，<br />也把下一步想清楚。</h2></div><Link className="button button-dark" to="/#work">返回精选作品 <Icon name="back" size={18} /></Link></section>
  </main><Footer /><DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} /></>;
}

function NotFound() {
  return <main className="not-found container" id="main-content"><span className="eyebrow">404 / PAGE NOT FOUND</span><h1>这页暂时没有内容。</h1><p>可以回到首页，从精选作品重新开始。</p><Link className="button button-dark" to="/">回到首页 <Icon name="arrow" /></Link></main>;
}

function App() {
  const Router = isStandalonePreview() ? HashRouter : BrowserRouter;
  return <Router><a className="skip-link" href="#main-content" onClick={(e) => localSectionLink(e, 'main-content')}>跳至正文</a><ScrollManager /><Header /><Routes><Route path="/" element={<Home />} /><Route path={PROJECT} element={<Project />} /><Route path="*" element={<NotFound />} /></Routes></Router>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
