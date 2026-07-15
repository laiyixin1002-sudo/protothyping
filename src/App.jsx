import { useState } from "react";

const medicineItems = ["上市药品", "国家医保药品", "国家基本药物", "集采药品", "中医药物", "物质", "DDD", "中医方剂库"];
const chineseMedicineItems = [
  "中药经典方",
  "中药材",
  "中医临床诊疗方案",
  "中医临床路径",
];

const lowerMenus = [
  "疾病与分类",
  "企业",
  "合理用药",
  "常用工具",
  "市场信息",
  "系统管理",
  "我的",
];

const herbRecords = [
  { name: "麝香", pinyin: "Shexiang", sourceType: "动物药", efficacy: "开窍药" },
  { name: "冰片", pinyin: "Bingpian", sourceType: "植物药", efficacy: "开窍药" },
  { name: "石菖蒲", pinyin: "Shichangpu", sourceType: "植物药", efficacy: "开窍药" },
  { name: "苏合香", pinyin: "Suhexiang", sourceType: "植物药", efficacy: "开窍药" },
];

const muskSections = [
  { title: "药品名称", content: "中文名：麝香", extra: "汉语拼音：Shexiang　　拉丁名：MOSCHUS" },
  { title: "来源", content: "本品为鹿科动物林麝 Moschus berezovskii Flerov、马麝 Moschus sifanicus Przewalski 或原麝 Moschus moschiferus Linnaeus 成熟雄体香囊中的干燥分泌物。野麝多在冬季至次春猎取，猎获后割取香囊，阴干，习称“毛壳麝香”；剖开香囊，除去囊壳，习称“麝香仁”。家麝直接从其香囊中取出麝香仁，阴干或用干燥器密闭干燥。" },
  { title: "炮制", content: "取毛壳麝香，除去囊壳，取出麝香仁，除去杂质，用时研碎。" },
  { title: "性状", content: "麝香仁：野生者由当门子和散香组成。当门子呈不规则圆形或颗粒状，表面多呈紫黑色，油润光亮，微有麻纹；断面深棕色或黄棕色。散香呈粉末状，多呈棕褐色或黄棕色，质软，油润，疏松，有香气浓烈而特异，味微辣、微苦带咸。" },
  { title: "性味与归经", content: "辛，温。归心、脾经。" },
  { title: "功能主治", content: "开窍醒神，活血通经，消肿止痛。用于热病神昏，中风痰厥，气郁暴厥，中恶昏迷，经闭，癥瘕，难产死胎，胸痹心痛，心腹暴痛，跌扑伤痛，痹痛麻木，痈肿瘰疬，咽喉肿痛。" },
  { title: "用法用量", content: "0.03～0.1g，多入丸散用。外用适量。" },
  { title: "注意事项", content: "孕妇禁用。" },
  { title: "贮藏", content: "密闭，置阴凉干燥处，遮光。" },
];

const clinicalSchemes = [
  { title: "中风病（脑梗死）急性期诊疗方案", department: "脑病科", stage: "急性期", year: "2025" },
  { title: "眩晕病中医诊疗方案", department: "脑病科", stage: "恢复期", year: "2025" },
  { title: "胸痹心痛病中医诊疗方案", department: "心血管科", stage: "通用", year: "2025" },
  { title: "咳嗽病中医诊疗方案", department: "肺病科", stage: "通用", year: "2025" },
  { title: "腰痛病中医诊疗方案", department: "骨伤科", stage: "通用", year: "2024" },
  { title: "消渴病中医诊疗方案", department: "内分泌科", stage: "通用", year: "2024" },
  { title: "胃脘痛中医诊疗方案", department: "脾胃科", stage: "通用", year: "2024" },
  { title: "风湿痹病中医诊疗方案", department: "风湿科", stage: "通用", year: "2024" },
];

const strokeSections = [
  { title: "一、诊断", blocks: [
    { subtitle: "（一）疾病诊断", text: "中医诊断标准参照国家中医药管理局脑病急症科研协作组起草制订的《中风病中医诊断疗效评定标准》（试行，1995年）。主要症状：偏瘫、神识昏蒙、言语謇涩或不语、偏身感觉异常、口舌歪斜。次要症状：头痛、眩晕、瞳神变化、饮水发呛、目偏不瞬、共济失调。急性起病，发病前多有诱因，常有先兆症状，发病年龄多在40岁以上。具备2个主症以上，或1个主症、2个次症，结合起病、诱因、先兆症状、年龄即可确诊。西医诊断参照《中国急性缺血性脑卒中诊治指南2010》，并结合脑CT或MRI排除脑出血。" },
    { subtitle: "（二）疾病分期", text: "急性期：发病2周以内。恢复期：发病2周至6个月。后遗症期：发病6个月以后。" },
    { subtitle: "（三）病类诊断", text: "中经络：中风病无意识障碍者。中脏腑：中风病有意识障碍者。" },
  ]},
  { title: "二、证候诊断", blocks: [
    { subtitle: "1. 中脏腑", text: "痰蒙清窍证：意识障碍、半身不遂、口舌歪斜、言语謇涩或不语、痰鸣漉漉。痰热内闭证：意识障碍、半身不遂、口舌歪斜、言语謇涩或不语、鼻鼾痰鸣、肢体拘急或躁扰不宁。元气败脱证：昏愦不知、目合口开、四肢松懈瘫软、肢冷汗多、二便自遗。" },
    { subtitle: "2. 中经络", text: "风火上扰证：眩晕头痛、面红耳赤、口苦咽干、心烦易怒。风痰阻络证：头晕目眩、痰多而黏、舌质暗淡。痰热腑实证：腹胀便干便秘、头痛目眩、咯痰或痰多。阴虚风动证：眩晕耳鸣、手足心热、咽干口燥。气虚血瘀证：面色晄白、气短乏力、口角流涎、自汗出、心悸便溏。" },
  ]},
  { title: "三、治疗方案", blocks: [
    { subtitle: "（一）辨证选择口服中药汤剂、中成药", text: "中风病（脑梗死）急性期治疗重在祛邪，佐以扶正，以醒神开窍、化痰通腑、平肝息风、化痰通络为主要治法。" },
    { subtitle: "1. 中脏腑", text: "痰热内闭证：清热化痰，醒神开窍。推荐方药：羚羊角汤加减；中成药可选灌服或鼻饲安宫牛黄丸、牛黄清心丸等。痰蒙清窍证：燥湿化痰，醒神开窍。推荐方药：涤痰汤加减；中成药可选灌服或鼻饲苏合香丸等。元气败脱证：益气回阳固脱。推荐方药：急予参附汤加减频频服用。" },
    { subtitle: "2. 中经络", text: "风火上扰证：清热平肝，潜阳息风，推荐天麻钩藤饮加减。风痰阻络证：息风化痰通络，推荐化痰通络方加减或半夏白术天麻汤合桃红四物汤加减。痰热腑实证：化痰通腑，推荐星蒌承气汤加减。阴虚风动证：滋阴息风，推荐育阴通络汤加减。" },
    { subtitle: "（二）其他治法", text: "根据患者病情，可结合针刺、艾灸、推拿及康复训练等非药物疗法。治疗过程中应动态评估神经功能、吞咽功能与并发症风险。" },
  ]},
];

const clinicalPathways = [
  { title: "颤病（帕金森病）中医临床路径（试行）", department: "脑病科", version: "试行", days: "≤30天" },
  { title: "中风病中医临床路径（试行）", department: "脑病科", version: "试行", days: "≤21天" },
  { title: "胸痹心痛病中医临床路径（试行）", department: "心血管科", version: "试行", days: "≤14天" },
  { title: "咳嗽病中医临床路径（试行）", department: "肺病科", version: "试行", days: "≤14天" },
  { title: "腰痛病中医临床路径（试行）", department: "骨伤科", version: "试行", days: "≤21天" },
  { title: "消渴病中医临床路径（试行）", department: "内分泌科", version: "试行", days: "≤14天" },
  { title: "胃脘痛中医临床路径（试行）", department: "脾胃科", version: "试行", days: "≤14天" },
  { title: "风湿痹病中医临床路径（试行）", department: "风湿科", version: "试行", days: "≤21天" },
  { title: "眼科中医临床路径（试行）", department: "眼科", version: "试行", days: "≤14天" },
];

const pathwaySections = [
  { title: "一、标准住院流程", blocks: [
    { subtitle: "（一）适用对象", text: "中医诊断：第一诊断为颤病（TCD编码：BNV130）。西医诊断：第一诊断为帕金森病（ICD-10编码：G20.02）。" },
    { subtitle: "（二）诊断依据", text: "疾病诊断参照新世纪全国高等中医药院校规划教材《中医内科学》中“颤病”的诊断，并参照2006年中华医学会神经病学分会制定的《帕金森病的诊断》。证候诊断包括肝肾亏虚、风内动证，痰热动风、风内动证，血脉瘀滞、筋急风动证等。" },
    { subtitle: "（三）治疗方案的选择", text: "诊断明确，第一诊断为颤病（帕金森病）；患者适合并接受中医治疗，依据不同证候选择中药汤剂、中成药，并可结合针灸、康复训练等治疗方法。" },
    { subtitle: "（四）标准住院日", text: "标准住院日≤30天。" },
    { subtitle: "（五）进入路径标准", text: "第一诊断必须符合颤病（帕金森病）。患者同时具有其他疾病，但在住院期间不需特殊处理，也不影响第一诊断临床路径流程实施时，可以进入本路径。出现严重肺部感染、尿路感染、严重共济失调、延髓麻痹、痴呆、体位性低血压或二便失禁等情况者不进入本路径。" },
    { subtitle: "（六）中医证候观察", text: "四诊合参，收集该病不同证候的主症、次症、体征、舌、脉特点，注意证候的动态变化。" },
    { subtitle: "（七）住院检查项目", text: "必需检查包括血常规、尿常规、便常规与潜血，肝肾功能、血糖、血脂、电解质，凝血功能，心电图，胸部X线片，颅脑影像学检查（CT或MRI），帕金森病评定量表（UPDRS）。可根据病情选择经颅多普勒、颈动脉超声、脑电图、PET及相关神经心理学量表。" },
    { subtitle: "（八）治疗方法", text: "辨证选择口服中药汤剂或中成药；根据辨证选择针灸治疗；结合内科基础治疗、康复训练、护理调摄及健康指导。" },
    { subtitle: "（九）出院标准", text: "头部及肢体颤抖、四肢强急、姿势不稳等主要症状改善；没有需要住院治疗的并发症。" },
    { subtitle: "（十）变异及原因分析", text: "治疗期间并其他疾病需要延长住院时间、治疗过程中发生病情变化或患者及家属意愿影响路径执行时，应退出或调整本路径。" },
  ]},
];

const pathwayTimeline = [
  { period: "第1天", work: "询问病史与体格检查；中医四诊信息采集；完成病历书写；开具检查检验单；初步拟定中医治疗方案", orders: "护理常规；分级护理；中药汤剂；中成药；针灸；康复训练；完成入院检查", care: "完成护理记录；观察并记录病情变化；静脉采血" },
  { period: "第2～7天", work: "采集中医四诊信息；进行中医证候判断；上级医师查房；评估治疗效果；完成必要检查", orders: "继续专科常规；中药汤剂或中成药；针灸；康复训练；评估检查异常", care: "制定规范护理方案；生活与心理护理；根据患者病情指导康复锻炼" },
  { period: "第8～21天", work: "上级医师查房与诊疗评估；完成病程记录；采集中医四诊信息；进行证候再评估", orders: "继续辨证治疗；调整中药与针灸方案；康复训练；必要时复查", care: "生活与心理护理；持续康复训练；配合健康宣教" },
  { period: "第22～29天", work: "评估治疗效果；调整治疗方案；完成阶段记录；准备出院评估", orders: "继续中药、针灸及康复治疗；安排出院前复查", care: "出院准备；健康宣教；康复指导" },
  { period: "第30天（出院日）", work: "初步形成康复方案；交代出院后注意事项和随访计划；完成出院记录", orders: "出院医嘱；出院带药；门诊随访", care: "协助患者办理出院手续；出院指导" },
];

const classicFormulas = [
  { name: "小青龙汤", category: "解表剂", source: "伤寒论", effect: "解表散寒，温肺化饮" },
  { name: "麻黄汤", category: "解表剂", source: "伤寒论", effect: "发汗解表，宣肺平喘" },
  { name: "桂枝汤", category: "解表剂", source: "伤寒论", effect: "解肌发表，调和营卫" },
  { name: "四逆汤", category: "温里剂", source: "伤寒论", effect: "回阳救逆" },
  { name: "小柴胡汤", category: "和解剂", source: "伤寒论", effect: "和解少阳" },
  { name: "白虎汤", category: "清热剂", source: "伤寒论", effect: "清热生津" },
  { name: "肾气丸", category: "补益剂", source: "金匮要略", effect: "温补肾阳" },
  { name: "苓桂术甘汤", category: "祛湿剂", source: "金匮要略", effect: "温阳化饮，健脾利湿" },
];

const xiaoqinglongSections = [
  { title: "来源", content: "小青龙汤来源于汉代张仲景所著《伤寒论》，功效解表散寒、温肺化饮。主治外感风寒、内停水饮。《伤寒论》第40条记载：伤寒表不解，心下有水气，干呕、发热而咳，或渴，或利，或噎，或小便不利、少腹满，或喘者，小青龙汤主之。小青龙汤主治太阳表里俱寒，名曰青龙，取方大神伏邪之义。" },
  { title: "组成及用法", content: "麻黄（去节）、芍药、细辛、干姜、甘草（炙）、桂枝（去皮）各9g，五味子6g，半夏9g（洗），共八味。以水煎服，先煮麻黄，减去浮沫，再纳诸药，煮取汤液，去滓，温服。" },
  { title: "功效与主治", content: "解表散寒，温肺化饮。用于外感风寒、内停水饮所致恶寒发热、无汗、咳喘、痰多清稀、胸痞，或干呕、口渴等。" },
];

const formulaHerbs = [
  { name: "麻黄", nature: "辛、微苦，温。归肺、膀胱经。", effect: "发汗解表，宣肺平喘，利水消肿。", use: "本方中发散风寒、宣肺平喘，为君药。" },
  { name: "桂枝", nature: "辛、甘，温。归心、肺、膀胱经。", effect: "发汗解肌，温通经脉，助阳化气。", use: "与麻黄相须为用，增强解表散寒之力。" },
  { name: "干姜", nature: "辛，热。归脾、胃、肾、心、肺经。", effect: "温中散寒，回阳通脉，温肺化饮。", use: "与细辛温肺化饮，散寒止咳。" },
  { name: "细辛", nature: "辛，温。归心、肺、肾经。", effect: "解表散寒，祛风止痛，通窍，温肺化饮。", use: "温肺散寒，帮助消除停饮。" },
  { name: "五味子", nature: "酸、甘，温。归肺、心、肾经。", effect: "收敛固涩，益气生津，补肾宁心。", use: "敛肺止咳，防止辛散太过。" },
  { name: "半夏", nature: "辛，温。归脾、胃、肺经。", effect: "燥湿化痰，降逆止呕，消痞散结。", use: "燥湿化痰，和胃降逆。" },
];

export function App() {
  const [activeItem, setActiveItem] = useState(chineseMedicineItems[0]);
  const [keyword, setKeyword] = useState("");
  const [sourceType, setSourceType] = useState("全部");
  const [efficacy, setEfficacy] = useState("全部");
  const [appliedFilters, setAppliedFilters] = useState({ keyword: "", sourceType: "全部", efficacy: "全部" });
  const [selectedHerb, setSelectedHerb] = useState("麝香");
  const [schemeKeyword, setSchemeKeyword] = useState("");
  const [schemeDepartment, setSchemeDepartment] = useState("全部");
  const [schemeStage, setSchemeStage] = useState("全部");
  const [appliedSchemeFilters, setAppliedSchemeFilters] = useState({ keyword: "", department: "全部", stage: "全部" });
  const [selectedScheme, setSelectedScheme] = useState(clinicalSchemes[0].title);
  const [pathwayKeyword, setPathwayKeyword] = useState("");
  const [pathwayDepartment, setPathwayDepartment] = useState("全部");
  const [pathwayVersion, setPathwayVersion] = useState("全部");
  const [appliedPathwayFilters, setAppliedPathwayFilters] = useState({ keyword: "", department: "全部", version: "全部" });
  const [selectedPathway, setSelectedPathway] = useState(clinicalPathways[0].title);
  const [formulaKeyword, setFormulaKeyword] = useState("");
  const [formulaCategory, setFormulaCategory] = useState("全部");
  const [formulaSource, setFormulaSource] = useState("全部");
  const [appliedFormulaFilters, setAppliedFormulaFilters] = useState({ keyword: "", category: "全部", source: "全部" });
  const [selectedFormula, setSelectedFormula] = useState(classicFormulas[0].name);

  const filteredHerbs = herbRecords.filter((herb) => {
    const keywordMatch = !appliedFilters.keyword || herb.name.includes(appliedFilters.keyword) || herb.pinyin.toLowerCase().includes(appliedFilters.keyword.toLowerCase());
    const sourceMatch = appliedFilters.sourceType === "全部" || herb.sourceType === appliedFilters.sourceType;
    const efficacyMatch = appliedFilters.efficacy === "全部" || herb.efficacy === appliedFilters.efficacy;
    return keywordMatch && sourceMatch && efficacyMatch;
  });

  const resetFilters = () => {
    setKeyword("");
    setSourceType("全部");
    setEfficacy("全部");
    setAppliedFilters({ keyword: "", sourceType: "全部", efficacy: "全部" });
  };

  const filteredSchemes = clinicalSchemes.filter((scheme) => {
    const keywordMatch = !appliedSchemeFilters.keyword || scheme.title.includes(appliedSchemeFilters.keyword);
    const departmentMatch = appliedSchemeFilters.department === "全部" || scheme.department === appliedSchemeFilters.department;
    const stageMatch = appliedSchemeFilters.stage === "全部" || scheme.stage === appliedSchemeFilters.stage;
    return keywordMatch && departmentMatch && stageMatch;
  });

  const resetSchemeFilters = () => {
    setSchemeKeyword("");
    setSchemeDepartment("全部");
    setSchemeStage("全部");
    setAppliedSchemeFilters({ keyword: "", department: "全部", stage: "全部" });
  };

  const filteredPathways = clinicalPathways.filter((pathway) => {
    const keywordMatch = !appliedPathwayFilters.keyword || pathway.title.includes(appliedPathwayFilters.keyword);
    const departmentMatch = appliedPathwayFilters.department === "全部" || pathway.department === appliedPathwayFilters.department;
    const versionMatch = appliedPathwayFilters.version === "全部" || pathway.version === appliedPathwayFilters.version;
    return keywordMatch && departmentMatch && versionMatch;
  });

  const resetPathwayFilters = () => {
    setPathwayKeyword("");
    setPathwayDepartment("全部");
    setPathwayVersion("全部");
    setAppliedPathwayFilters({ keyword: "", department: "全部", version: "全部" });
  };

  const filteredFormulas = classicFormulas.filter((formula) => {
    const keywordMatch = !appliedFormulaFilters.keyword || formula.name.includes(appliedFormulaFilters.keyword) || formula.effect.includes(appliedFormulaFilters.keyword);
    const categoryMatch = appliedFormulaFilters.category === "全部" || formula.category === appliedFormulaFilters.category;
    const sourceMatch = appliedFormulaFilters.source === "全部" || formula.source === appliedFormulaFilters.source;
    return keywordMatch && categoryMatch && sourceMatch;
  });

  const resetFormulaFilters = () => {
    setFormulaKeyword("");
    setFormulaCategory("全部");
    setFormulaSource("全部");
    setAppliedFormulaFilters({ keyword: "", category: "全部", source: "全部" });
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-mark">智</div>
          <div className="brand-name">智慧药管</div>
          <button className="collapse-button" aria-label="收起菜单">☰</button>
        </div>

        <nav className="primary-nav" aria-label="主菜单">
          <button className="nav-row"><span>首页</span></button>
          <section className="nav-section">
            <div className="nav-row section-title"><span>药品</span><span>⌃</span></div>
            <div className="nested-list">
              {medicineItems.map((item) => (
                <button
                  key={item}
                  className={item === "中医药物" ? "active-main" : ""}
                  onClick={item === "中医药物" ? () => setActiveItem(chineseMedicineItems[0]) : undefined}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {lowerMenus.map((item) => (
            <button className="nav-row" key={item}><span>{item}</span><span className="chevron">⌄</span></button>
          ))}
        </nav>
        <div className="sidebar-footer">药学智库 <span>＝</span></div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="hospital"><span>演</span> 演示医院</div>
          <div className="tabs">
            <button>首页 ×</button>
            <button className="selected">中医药物 ×</button>
          </div>
          <div className="account">admin(管理员) ▾</div>
        </header>

        <div className="crumbbar">
          <span>首页</span><i>›</i><strong>中医药物</strong><i>›</i><strong>{activeItem}</strong>
          <div className="actions">收藏　反馈</div>
        </div>

        <div className="content-layout">
          <aside className="catalog-card">
            <div className="catalog-title">目录</div>
            <div className="catalog-items">
              {chineseMedicineItems.map((item) => (
                <button
                  key={item}
                  className={activeItem === item ? "active" : ""}
                  onClick={() => setActiveItem(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </aside>

          <section className="empty-panel" aria-label={`${activeItem}内容区`}>
            <div className="panel-heading">{activeItem}</div>
            {activeItem === "中药经典方" ? (
              <div className="herb-content formula-content">
                <form className="filter-bar" onSubmit={(event) => { event.preventDefault(); setAppliedFormulaFilters({ keyword: formulaKeyword, category: formulaCategory, source: formulaSource }); }}>
                  <label>方剂名称<input value={formulaKeyword} onChange={(event) => setFormulaKeyword(event.target.value)} placeholder="请输入方剂名称或功效" /></label>
                  <label>功效分类<select value={formulaCategory} onChange={(event) => setFormulaCategory(event.target.value)}><option>全部</option><option>解表剂</option><option>温里剂</option><option>和解剂</option><option>清热剂</option><option>补益剂</option><option>祛湿剂</option></select></label>
                  <label>典籍来源<select value={formulaSource} onChange={(event) => setFormulaSource(event.target.value)}><option>全部</option><option>伤寒论</option><option>金匮要略</option></select></label>
                  <div className="filter-actions"><button type="submit" className="primary-button">查询</button><button type="button" onClick={resetFormulaFilters}>重置</button></div>
                </form>

                <div className="herb-workbench scheme-workbench">
                  <aside className="result-pane">
                    <div className="result-heading"><strong>经典方</strong><span>共 {filteredFormulas.length} 条</span></div>
                    <div className="result-list scheme-list formula-list">
                      {filteredFormulas.length ? filteredFormulas.map((formula) => (
                        <button key={formula.name} className={selectedFormula === formula.name ? "active" : ""} onClick={() => setSelectedFormula(formula.name)}>
                          <strong>{formula.name}</strong><span>{formula.category} · 《{formula.source}》</span><small>{formula.effect}</small>
                        </button>
                      )) : <div className="no-results">暂无匹配方剂</div>}
                    </div>
                  </aside>

                  <article className="herb-detail formula-detail">
                    <div className="detail-title"><div><strong>{selectedFormula}</strong><span>中药经典方 · 典籍与方药解析</span></div><em>{classicFormulas.find((item) => item.name === selectedFormula)?.category || "经典方"}</em></div>
                    {selectedFormula === classicFormulas[0].name ? <>
                      {xiaoqinglongSections.map((section) => <section className="scheme-section formula-section" key={section.title}><h2>{section.title}</h2><p>{section.content}</p></section>)}
                      <section className="scheme-section formula-section"><h2>方中药物解析</h2><div className="formula-herb-grid">{formulaHerbs.map((herb) => <article key={herb.name}><h3>{herb.name}</h3><p><strong>性味归经：</strong>{herb.nature}</p><p><strong>功效：</strong>{herb.effect}</p><p><strong>方中作用：</strong>{herb.use}</p></article>)}</div></section>
                    </> : <div className="pending-detail"><strong>{selectedFormula}</strong><span>详细方剂资料待补充</span></div>}
                  </article>
                </div>
              </div>
            ) : activeItem === "中药材" ? (
              <div className="herb-content">
                <form className="filter-bar" onSubmit={(event) => { event.preventDefault(); setAppliedFilters({ keyword, sourceType, efficacy }); }}>
                  <label>药材名称<input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="请输入名称或拼音" /></label>
                  <label>来源分类<select value={sourceType} onChange={(event) => setSourceType(event.target.value)}><option>全部</option><option>动物药</option><option>植物药</option></select></label>
                  <label>功效分类<select value={efficacy} onChange={(event) => setEfficacy(event.target.value)}><option>全部</option><option>开窍药</option></select></label>
                  <div className="filter-actions"><button type="submit" className="primary-button">查询</button><button type="button" onClick={resetFilters}>重置</button></div>
                </form>

                <div className="herb-workbench">
                  <aside className="result-pane">
                    <div className="result-heading"><strong>查询结果</strong><span>共 {filteredHerbs.length} 条</span></div>
                    <div className="result-list">
                      {filteredHerbs.length ? filteredHerbs.map((herb) => (
                        <button key={herb.name} className={selectedHerb === herb.name ? "active" : ""} onClick={() => setSelectedHerb(herb.name)}>
                          <strong>{herb.name}</strong><span>{herb.pinyin}</span><small>{herb.sourceType} · {herb.efficacy}</small>
                        </button>
                      )) : <div className="no-results">暂无匹配药材</div>}
                    </div>
                  </aside>

                  <article className="herb-detail">
                    <div className="detail-title"><div><strong>{selectedHerb}</strong><span>《中国药典》2025年版</span></div><em>{selectedHerb === "麝香" ? "动物药" : "中药材"}</em></div>
                    {selectedHerb === "麝香" ? muskSections.map((section) => (
                      <section className="detail-section" key={section.title}>
                        <h3>{section.title}</h3><p>{section.content}</p>{section.extra && <p>{section.extra}</p>}
                      </section>
                    )) : <div className="pending-detail"><strong>{selectedHerb}</strong><span>详细资料待补充</span></div>}
                  </article>
                </div>
              </div>
            ) : activeItem === "中医临床诊疗方案" ? (
              <div className="herb-content scheme-content">
                <form className="filter-bar" onSubmit={(event) => { event.preventDefault(); setAppliedSchemeFilters({ keyword: schemeKeyword, department: schemeDepartment, stage: schemeStage }); }}>
                  <label>方案名称<input value={schemeKeyword} onChange={(event) => setSchemeKeyword(event.target.value)} placeholder="请输入疾病或方案名称" /></label>
                  <label>临床科室<select value={schemeDepartment} onChange={(event) => setSchemeDepartment(event.target.value)}><option>全部</option><option>脑病科</option><option>心血管科</option><option>肺病科</option><option>骨伤科</option><option>内分泌科</option><option>脾胃科</option><option>风湿科</option></select></label>
                  <label>疾病阶段<select value={schemeStage} onChange={(event) => setSchemeStage(event.target.value)}><option>全部</option><option>急性期</option><option>恢复期</option><option>通用</option></select></label>
                  <div className="filter-actions"><button type="submit" className="primary-button">查询</button><button type="button" onClick={resetSchemeFilters}>重置</button></div>
                </form>

                <div className="herb-workbench scheme-workbench">
                  <aside className="result-pane">
                    <div className="result-heading"><strong>诊疗方案</strong><span>共 {filteredSchemes.length} 条</span></div>
                    <div className="result-list scheme-list">
                      {filteredSchemes.length ? filteredSchemes.map((scheme) => (
                        <button key={scheme.title} className={selectedScheme === scheme.title ? "active" : ""} onClick={() => setSelectedScheme(scheme.title)}>
                          <strong>{scheme.title}</strong><span>{scheme.department} · {scheme.stage}</span><small>{scheme.year}年版</small>
                        </button>
                      )) : <div className="no-results">暂无匹配方案</div>}
                    </div>
                  </aside>

                  <article className="herb-detail scheme-detail">
                    <div className="detail-title"><div><strong>{selectedScheme}</strong><span>中医临床诊疗方案 · 参考资料</span></div><em>{clinicalSchemes.find((item) => item.title === selectedScheme)?.department || "临床方案"}</em></div>
                    {selectedScheme === clinicalSchemes[0].title ? strokeSections.map((section) => (
                      <section className="scheme-section" key={section.title}>
                        <h2>{section.title}</h2>
                        {section.blocks.map((block) => <div className="scheme-block" key={block.subtitle}><h3>{block.subtitle}</h3><p>{block.text}</p></div>)}
                      </section>
                    )) : <div className="pending-detail"><strong>{selectedScheme}</strong><span>详细诊疗内容待补充</span></div>}
                  </article>
                </div>
              </div>
            ) : activeItem === "中医临床路径" ? (
              <div className="herb-content pathway-content">
                <form className="filter-bar" onSubmit={(event) => { event.preventDefault(); setAppliedPathwayFilters({ keyword: pathwayKeyword, department: pathwayDepartment, version: pathwayVersion }); }}>
                  <label>路径名称<input value={pathwayKeyword} onChange={(event) => setPathwayKeyword(event.target.value)} placeholder="请输入疾病或路径名称" /></label>
                  <label>临床科室<select value={pathwayDepartment} onChange={(event) => setPathwayDepartment(event.target.value)}><option>全部</option><option>脑病科</option><option>心血管科</option><option>肺病科</option><option>骨伤科</option><option>内分泌科</option><option>脾胃科</option><option>风湿科</option><option>眼科</option></select></label>
                  <label>路径版本<select value={pathwayVersion} onChange={(event) => setPathwayVersion(event.target.value)}><option>全部</option><option>试行</option></select></label>
                  <div className="filter-actions"><button type="submit" className="primary-button">查询</button><button type="button" onClick={resetPathwayFilters}>重置</button></div>
                </form>

                <div className="herb-workbench scheme-workbench">
                  <aside className="result-pane">
                    <div className="result-heading"><strong>临床路径</strong><span>共 {filteredPathways.length} 条</span></div>
                    <div className="result-list scheme-list">
                      {filteredPathways.length ? filteredPathways.map((pathway) => (
                        <button key={pathway.title} className={selectedPathway === pathway.title ? "active" : ""} onClick={() => setSelectedPathway(pathway.title)}>
                          <strong>{pathway.title}</strong><span>{pathway.department} · {pathway.version}</span><small>标准住院日 {pathway.days}</small>
                        </button>
                      )) : <div className="no-results">暂无匹配路径</div>}
                    </div>
                  </aside>

                  <article className="herb-detail pathway-detail">
                    <div className="detail-title"><div><strong>{selectedPathway}</strong><span>中医临床路径 · 住院流程与执行表</span></div><em>{clinicalPathways.find((item) => item.title === selectedPathway)?.department || "临床路径"}</em></div>
                    {selectedPathway === clinicalPathways[0].title ? <>
                      {pathwaySections.map((section) => (
                        <section className="scheme-section" key={section.title}>
                          <h2>{section.title}</h2>
                          {section.blocks.map((block) => <div className="scheme-block" key={block.subtitle}><h3>{block.subtitle}</h3><p>{block.text}</p></div>)}
                        </section>
                      ))}
                      <section className="scheme-section pathway-form-section">
                        <h2>二、颤病（帕金森病）中医临床路径住院表单</h2>
                        <div className="pathway-meta"><span>适用对象：第一诊断为颤病（帕金森病）</span><span>标准住院日：≤30天</span></div>
                        <div className="pathway-table-wrap"><table className="pathway-table"><thead><tr><th>时间</th><th>主要诊疗工作</th><th>重点医嘱</th><th>主要护理工作</th></tr></thead><tbody>{pathwayTimeline.map((row) => <tr key={row.period}><th>{row.period}</th><td>{row.work}</td><td>{row.orders}</td><td>{row.care}</td></tr>)}</tbody></table></div>
                      </section>
                    </> : <div className="pending-detail"><strong>{selectedPathway}</strong><span>详细临床路径待补充</span></div>}
                  </article>
                </div>
              </div>
            ) : <div className="blank-content" />}
          </section>
        </div>

        <footer className="footer"><span>©2026 上海卫心科技有限公司</span><b>172.16.7.86演示环境</b></footer>
      </section>
    </main>
  );
}
