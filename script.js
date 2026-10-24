const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 36);
}, { passive: true });

navToggle?.addEventListener("click", () => {
  const open = nav?.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(Boolean(open)));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

document.querySelectorAll(".reveal").forEach((node, index) => {
  node.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
  revealObserver.observe(node);
});

const evidenceNotes = {
  process: {
    title: "7份连续活动记录",
    body: "时间范围为2026年4月21日至6月3日，记录地点包括军山绿野油菜田、草地、松树林、小河边及幼儿园雨后山坡。每份记录保留活动背景、儿童对话、教师提问、现场行为、投票结果和教师反思。网页引用只取与“注意生命—换位理解—行动修正”直接相关的片段。"
  },
  media: {
    title: "媒体与成果传播",
    body: "材料包括《南通日报》关于“顺发御园幼儿园课题成果入选省《成果要报》”的报道、南通电台采访视频、省课程成果要报页面截图、成果采用证明和区杂志封面材料。传播材料用于证明成果被看见，不替代过程数据和第三方效果评价。"
  },
  outreach: {
    title: "公开课、讲座与案例遴选",
    body: "目录记录市级公开课5次、讲座8次，以及2025年度南通市课程游戏化创新案例遴选材料和区项目合伙人项目材料。“触摸草木·聆听风声”从全市53个申报案例中入选30个创新案例；园所课程建设入选开发区星湖名师“115培养工程”成长合伙人首批实践项目。正式推广单位栏仍须由真实使用单位另行出具写明时间、使用方式、调整内容和效果的证明；本网站不把公开交流等同于整园采用。"
  },
  research: {
    title: "论文发表与获奖材料",
    body: "材料库按省级期刊发表、市级期刊发表、省级论文获奖和园本案例获奖分类保存。由于部分证书包含作者姓名及个人信息，公开网页仅呈现类别和件数，原件置于评审专用材料包。"
  },
  project: {
    title: "课题档案",
    body: "可核查材料包括：省级课题“基于国家森林公园‘军山绿野’的亲自然课程建设研究”结题证书；2025年度江苏省教育科学规划重点课题“国家森林公园‘军山绿野’多物种叙事课程建构研究”立项通知书；以及4组区级课题材料。"
  },
  source: {
    title: "原始案例文本",
    body: "原稿以触觉、嗅觉、视觉、味觉四条线索组织活动，并含家园协同、儿童作品、教师反思和活动视频资源。此次申报在此基础上增加听力经验、风险边界和生态情感连续证据，重新提炼为“亲近自然—生命共情—行动守护”的主线。"
  }
};

const drawer = document.querySelector("#evidence-drawer");
const drawerTitle = document.querySelector("#drawer-title");
const drawerBody = document.querySelector("#drawer-body");

document.querySelectorAll(".evidence-filter").forEach((button) => {
  button.addEventListener("click", () => {
    const note = evidenceNotes[button.dataset.filter];
    if (!note || !drawer) return;
    drawerTitle.textContent = note.title;
    drawerBody.textContent = note.body;
    drawer.hidden = false;
    drawer.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

document.querySelector(".drawer-close")?.addEventListener("click", () => {
  if (drawer) drawer.hidden = true;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && drawer) drawer.hidden = true;
});
