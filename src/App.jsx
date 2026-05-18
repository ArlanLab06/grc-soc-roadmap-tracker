import { useState, useEffect, useMemo, useRef } from "react";
import "./styles.css";
import {
  DEFAULT_SECTIONS,
  DEFAULT_PORTFOLIO,
  CERTIFICATIONS,
  GRC_SKILLS,
  SOC_SKILLS,
  TOOL_SKILLS,
  JOB_TASKS,
  JOB_ROLES,
  JOB_PLATFORMS,
  INTERVIEW_GRC,
  INTERVIEW_SOC,
  LINKEDIN_HEADLINE,
  LINKEDIN_ABOUT,
  LINKEDIN_SKILLS,
  MOTIVATIONAL_MSGS,
  STORAGE_KEY,
  STATUS_OPTIONS,
  STATUS_CYCLE,
  FILTERS,
  TABS,
  getLevelInfo,
  computeBadges
} from "./data";

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); }
  catch { return null; }
}
function saveProgress(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES — Professional dark SOC/GRC dashboard
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// LEVEL TABLE
// ─────────────────────────────────────────────────────────────────────────────

function validateImportData(data) {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return "Invalid import: root value must be an object.";
  }

  const objectFields = ["taskStatus", "certStatus", "portfolioStatus", "jobStatus", "skillStatus"];
  for (const field of objectFields) {
    if (field in data && (typeof data[field] !== "object" || data[field] === null || Array.isArray(data[field]))) {
      return `Invalid import: ${field} must be an object.`;
    }
  }

  if ("customSections" in data && !(Array.isArray(data.customSections) || data.customSections === null)) {
    return "Invalid import: customSections must be an array or null.";
  }

  if ("customPortfolio" in data && !(Array.isArray(data.customPortfolio) || data.customPortfolio === null)) {
    return "Invalid import: customPortfolio must be an array or null.";
  }

  const allowedFields = [...objectFields, "customSections", "customPortfolio"];
  const hasProgressField = allowedFields.some(field => field in data);
  if (!hasProgressField) {
    return "Invalid import: no supported progress fields were found.";
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────────────────────────────────────
function ProgressBar({ value, color = "#FFFFFF", height = 4 }) {
  return (
    <div className="pb">
      <div className="pb-fill" style={{ width:`${Math.min(100, Math.max(0, value))}%`, background:color, height }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color = "#E5E5E5" }) {
  return (
    <div className="panel" style={{ padding:"14px 16px" }}>
      <div className="label-upper" style={{ marginBottom:8 }}>{label}</div>
      <div style={{ fontSize:22, fontWeight:700, color, lineHeight:1 }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:"#737373", marginTop:5 }}>{sub}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BADGE CARD
// ─────────────────────────────────────────────────────────────────────────────
function BadgeCard({ badge }) {
  return (
    <div className={`badge-card ${badge.earned ? "earned" : "locked"}`}>
      <div style={{ fontSize:22, marginBottom:6 }}>{badge.icon}</div>
      <div style={{ fontSize:12, fontWeight:600, color:badge.earned?"#22C55E":"#737373", marginBottom:3 }}>{badge.title}</div>
      <div style={{ fontSize:11, color:"#737373", lineHeight:1.4 }}>{badge.desc}</div>
      <div style={{ fontSize:10, marginTop:6, color:badge.earned?"#22C55E":"#374151", fontWeight:600, letterSpacing:"0.04em", textTransform:"uppercase" }}>
        {badge.earned ? "✓ Unlocked" : "Locked"}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TASK CARD
// ─────────────────────────────────────────────────────────────────────────────
function TaskCard({ task, status, onToggle, onEdit, onDelete, isAdmin }) {
  const [expanded, setExpanded] = useState(false);
  const meta = STATUS_OPTIONS[status] || STATUS_OPTIONS.not_started;
  const nextStatus = STATUS_CYCLE[(STATUS_CYCLE.indexOf(status) + 1) % 3];
  const diffColor = { Easy:"#22C55E", Medium:"#F59E0B", Hard:"#EF4444" }[task.diff] || "#737373";
  const typeLabel = { topic:"Topic", course:"Course", practice:"Practice", tool:"Tool" }[task.type] || task.type;

  return (
    <div className="task-row" style={{ opacity:status==="completed" ? 0.6 : 1 }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, alignItems:"flex-start" }}>
            <span
              style={{ fontSize:13, fontWeight:500, color:status==="completed"?"#737373":"#E5E5E5", textDecoration:status==="completed"?"line-through":"none", cursor:"pointer", lineHeight:1.4 }}
              onClick={() => setExpanded(!expanded)}
            >
              {task.title}
            </span>
            <div style={{ display:"flex", gap:5, alignItems:"center", flexWrap:"wrap", flexShrink:0 }}>
              <span style={{ fontSize:10, color:diffColor, fontWeight:600, letterSpacing:"0.03em" }}>{task.diff}</span>
              <span style={{ fontSize:10, color:"#737373" }}>{task.hrs}h</span>
              <span style={{ fontSize:10, color:"#A3A3A3", fontWeight:500 }}>{task.xp} XP</span>
              <button
                onClick={() => onToggle(nextStatus)}
                className="status-pill"
                style={{ color:meta.color, borderColor:meta.border, fontSize:10 }}
              >
                {meta.label}
              </button>
              {isAdmin && onEdit && (
                <button onClick={onEdit} className="btn btn-cyan" style={{ fontSize:10, padding:"1px 7px" }}>Edit</button>
              )}
              {isAdmin && onDelete && (
                <button onClick={onDelete} className="btn btn-red" style={{ fontSize:10, padding:"1px 7px" }}>✕</button>
              )}
            </div>
          </div>
          {expanded && (
            <div style={{ marginTop:8, paddingTop:8, borderTop:"1px solid #1A1A1A" }}>
              <div style={{ fontSize:12, color:"#737373", marginBottom:5, lineHeight:1.6 }}>{task.desc}</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
                <span style={{ fontSize:10, color:"#374151", background:"#0A0A0A", border:"1px solid #1A1A1A", borderRadius:3, padding:"1px 7px" }}>{typeLabel}</span>
                <span style={{ fontSize:10, color:"#374151", background:"#0A0A0A", border:"1px solid #1A1A1A", borderRadius:3, padding:"1px 7px" }}>{task.cat}</span>
                {task.res?.length > 0 && (
                  <span style={{ fontSize:11, color:"#4B5563" }}>Resources: {task.res.join(", ")}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────────────────────
function EmptyState({ onStart }) {
  return (
    <div className="fade-up" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:400 }}>
      <div className="panel" style={{ padding:"48px 36px", textAlign:"center", maxWidth:480, borderColor:"rgba(34,211,238,0.15)" }}>
        <div style={{ fontSize:32, marginBottom:16, opacity:0.6 }}>◈</div>
        <div style={{ fontSize:20, fontWeight:700, color:"#FFFFFF", marginBottom:10, lineHeight:1.3 }}>
          GRC + SOC L1 Roadmap Tracker
        </div>
        <div style={{ fontSize:13, color:"#737373", marginBottom:24, lineHeight:1.7 }}>
          Start with Cybersecurity Foundation and track your progress toward GRC Intern, Junior GRC Analyst, and SOC L1 Analyst roles. Your progress saves automatically.
        </div>
        <button onClick={onStart} className="btn btn-primary" style={{ fontSize:13, padding:"8px 20px" }}>
          Begin Roadmap
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
function Dashboard({ sections, portfolio, taskStatus, setTaskStatus, certStatus, portfolioStatus, jobStatus, totalXP, levelInfo, allTasks, setView }) {
  const completed  = Object.values(taskStatus).filter(v => v === "completed").length;
  const inProgress = Object.values(taskStatus).filter(v => v === "in_progress").length;
  const total = allTasks.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const hoursLeft = allTasks.filter(t => (taskStatus[t.id]||"not_started") !== "completed").reduce((s,t) => s+t.hrs, 0);
  const certDone = Object.values(certStatus).filter(v => v === "completed").length;
  const portDone = Object.values(portfolioStatus).filter(Boolean).length;
  const jobDone  = Object.values(jobStatus).filter(Boolean).length;
  const hasProgress = completed > 0 || inProgress > 0 || certDone > 0 || portDone > 0;

  const currentQuest = allTasks.find(t => taskStatus[t.id] === "in_progress") ||
    allTasks.find(t => !taskStatus[t.id] || taskStatus[t.id] === "not_started") || null;

  const badges = computeBadges(sections, taskStatus, portfolioStatus, jobStatus);
  const [msgIdx] = useState(() => Math.floor(Math.random() * MOTIVATIONAL_MSGS.length));

  if (!hasProgress) {
    return <EmptyState onStart={() => {
      const firstTask = allTasks[0];
      if (firstTask) setTaskStatus(prev => ({...prev, [firstTask.id]: "in_progress"}));
    }} />;
  }

  const questSection = currentQuest ? sections.find(s => s.tasks.some(t => t.id === currentQuest.id)) : null;

  return (
    <div className="fade-up" style={{ display:"flex", flexDirection:"column", gap:16 }}>

      {/* Current Quest — primary card */}
      {currentQuest && (
        <div className="panel" style={{ padding:"20px 22px", borderColor:"rgba(255,255,255,0.18)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#FFFFFF" }}></div>
              <span className="label-upper">Current Quest</span>
            </div>
            {taskStatus[currentQuest.id] !== "in_progress" ? (
              <button
                onClick={() => setTaskStatus(prev => ({...prev, [currentQuest.id]: "in_progress"}))}
                className="btn btn-primary"
                style={{ fontSize:12 }}
              >
                Start Quest
              </button>
            ) : (
              <button
                onClick={() => setTaskStatus(prev => ({...prev, [currentQuest.id]: "completed"}))}
                className="btn btn-primary"
                style={{ fontSize:12 }}
              >
                Mark Completed
              </button>
            )}
          </div>
          <div style={{ fontSize:16, fontWeight:600, color:"#FFFFFF", marginBottom:6, lineHeight:1.4 }}>{currentQuest.title}</div>
          <div style={{ fontSize:12, color:"#737373", marginBottom:12, lineHeight:1.6 }}>{currentQuest.desc}</div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            {questSection && <span style={{ fontSize:11, color:"#A3A3A3" }}>{questSection.title}</span>}
            <span style={{ fontSize:11, color:"#737373" }}>
              <span style={{ color:{ Easy:"#22C55E", Medium:"#F59E0B", Hard:"#EF4444" }[currentQuest.diff] }}>{currentQuest.diff}</span>
            </span>
            <span style={{ fontSize:11, color:"#737373" }}>{currentQuest.hrs}h estimated</span>
            <span style={{ fontSize:11, color:"#A3A3A3" }}>{currentQuest.xp} XP</span>
            <span style={{ fontSize:11, color:"#737373" }}>{currentQuest.cat}</span>
            {taskStatus[currentQuest.id] === "in_progress" && (
              <span style={{ fontSize:11, color:"#F59E0B", fontWeight:600 }}>In Progress</span>
            )}
          </div>
        </div>
      )}

      {/* Level + Progress hero */}
      <div className="panel" style={{ padding:"18px 22px" }}>
        <div className="hero-flex" style={{ display:"flex", justifyContent:"space-between", gap:16, alignItems:"flex-start" }}>
          <div style={{ flex:1 }}>
            <div className="label-upper" style={{ marginBottom:6 }}>Level {levelInfo.lv}</div>
            <div style={{ fontSize:20, fontWeight:700, color:"#FFFFFF", lineHeight:1.2, marginBottom:6 }}>
              {levelInfo.title}
            </div>
            <div style={{ fontSize:12, color:"#737373", marginBottom:10 }}>
              {totalXP.toLocaleString()} XP · {levelInfo.pct}% to next level
              {levelInfo.next && <span style={{ color:"#4B5563" }}> ({levelInfo.next.title})</span>}
            </div>
            <div style={{ maxWidth:300 }}>
              <ProgressBar value={levelInfo.pct} color="#FFFFFF" height={5} />
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div className="label-upper" style={{ marginBottom:4 }}>Overall</div>
            <div style={{ fontSize:36, fontWeight:700, color:"#22C55E", lineHeight:1 }}>{pct}%</div>
            <div style={{ fontSize:11, color:"#737373", marginTop:4 }}>{completed} / {total} tasks</div>
          </div>
        </div>
        <div style={{ marginTop:12, padding:"10px 12px", background:"rgba(255,255,255,0.02)", borderRadius:5, borderLeft:"2px solid rgba(34,211,238,0.2)" }}>
          <span style={{ fontSize:12, color:"#737373" }}>{MOTIVATIONAL_MSGS[msgIdx]}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard label="Total XP"       value={totalXP.toLocaleString()} color="#FFFFFF" />
        <StatCard label="Completed"      value={completed}   color="#22C55E" sub={`of ${total} tasks`} />
        <StatCard label="In Progress"    value={inProgress}  color="#F59E0B" />
        <StatCard label="Remaining"      value={total - completed - inProgress} color="#737373" />
        <StatCard label="Hours Left"     value={`~${hoursLeft}h`} color="#A3A3A3" />
        <StatCard label="Certifications" value={certDone} color="#FFFFFF" sub={`of ${CERTIFICATIONS.length} earned`} />
        <StatCard label="Portfolio"      value={portDone} color="#F59E0B" sub={`of ${portfolio.length} built`} />
        <StatCard label="Job Tasks"      value={jobDone}  color="#22C55E" sub={`of ${JOB_TASKS.length} done`} />
      </div>

      {/* Section Progress */}
      <div className="panel" style={{ padding:"16px 20px" }}>
        <div className="label-upper" style={{ marginBottom:14 }}>Section Progress</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {sections.map(sec => {
            const done2 = sec.tasks.filter(t => taskStatus[t.id] === "completed").length;
            const p2 = sec.tasks.length > 0 ? Math.round((done2 / sec.tasks.length) * 100) : 0;
            return (
              <div key={sec.id} style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:130, flexShrink:0 }}>
                  <span style={{ fontSize:12, color:"#A3A3A3", fontWeight:500 }}>{sec.title}</span>
                </div>
                <div style={{ flex:1 }}>
                  <ProgressBar value={p2} color={sec.color} height={4} />
                </div>
                <span style={{ fontSize:11, color:"#737373", minWidth:52, textAlign:"right" }}>{done2}/{sec.tasks.length}</span>
                <span style={{ fontSize:11, color:sec.color, fontWeight:600, minWidth:34, textAlign:"right" }}>{p2}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div>
        <div className="label-upper" style={{ marginBottom:12 }}>Achievements</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:8 }}>
          {badges.map(b => <BadgeCard key={b.id} badge={b} />)}
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROADMAP VIEW
// ─────────────────────────────────────────────────────────────────────────────
function RoadmapView({ sections, taskStatus, setTaskStatus, isAdmin, onEditTask, onDeleteTask }) {
  const [expandedSections, setExpandedSections] = useState({s1:true});
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");


  const matchesFilter = (task, status) => {
    if (filter === "All") return true;
    if (filter === "Not Started") return status === "not_started";
    if (filter === "In Progress") return status === "in_progress";
    if (filter === "Completed")   return status === "completed";
    if (filter === "GRC")         return task.cat === "GRC";
    if (filter === "SOC L1")      return task.cat === "SOC L1";
    if (filter === "Foundation")  return task.cat === "Foundation";
    if (filter === "Tools")       return task.cat === "Tools" || task.type === "tool";
    if (filter === "Certification") return task.cat === "Certification";
    if (filter === "topic")   return task.type === "topic";
    if (filter === "course")  return task.type === "course";
    if (filter === "practice")return task.type === "practice";
    return true;
  };
  const matchesSearch = (task) => !search || task.title.toLowerCase().includes(search.toLowerCase()) || (task.desc||"").toLowerCase().includes(search.toLowerCase());

  return (
    <div className="fade-up" style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        <input
          className="c-input"
          placeholder="Search tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="filter-wrap" style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
          {FILTERS.map(f => (
            <button key={f.key} className={`filter-pill ${filter === f.key ? "active" : ""}`} onClick={() => setFilter(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {sections.map(sec => {
        const secTasks = sec.tasks.filter(t => {
          const st = taskStatus[t.id] || "not_started";
          return matchesFilter(t, st) && matchesSearch(t);
        });
        if (secTasks.length === 0) return null;
        const done = sec.tasks.filter(t => taskStatus[t.id] === "completed").length;
        const p = sec.tasks.length > 0 ? Math.round((done / sec.tasks.length) * 100) : 0;
        const isOpen = !!expandedSections[sec.id];

        return (
          <div key={sec.id} className="panel">
            <div style={{ padding:"14px 18px" }}>
              <button
                className="section-toggle"
                onClick={() => setExpandedSections(prev => ({...prev, [sec.id]:!prev[sec.id]}))}
              >
                <div style={{ flex:1, textAlign:"left" }}>
                  <div className="label-upper" style={{ marginBottom:2 }}>{sec.month}</div>
                  <div style={{ fontSize:14, fontWeight:600, color:"#E5E5E5" }}>{sec.title}</div>
                </div>
                <div className="sec-meta-hide" style={{ display:"flex", alignItems:"center", gap:12, marginRight:8 }}>
                  <span style={{ fontSize:11, color:"#737373" }}>{done}/{sec.tasks.length}</span>
                  <div style={{ width:80 }}><ProgressBar value={p} color={sec.color} height={3} /></div>
                  <span style={{ fontSize:11, fontWeight:600, color:sec.color, minWidth:32 }}>{p}%</span>
                </div>
                <span style={{ color:"#374151", fontSize:12, transform:isOpen?"rotate(180deg)":"none", transition:"transform 0.2s", flexShrink:0 }}>▼</span>
              </button>
            </div>
            {isOpen && (
              <div style={{ paddingBottom:14 }}>
                <div style={{ padding:"0 18px 10px", fontSize:12, color:"#4B5563", fontStyle:"italic" }}>{sec.goal}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:5, padding:"0 12px" }}>
                  {secTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      status={taskStatus[task.id] || "not_started"}
                      onToggle={ns => setTaskStatus(prev => ({...prev, [task.id]:ns}))}
                      isAdmin={isAdmin}
                      onEdit={isAdmin && onEditTask ? () => onEditTask(task, sec.id) : undefined}
                      onDelete={isAdmin && onDeleteTask ? () => onDeleteTask(task.id, sec.id) : undefined}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATIONS VIEW
// ─────────────────────────────────────────────────────────────────────────────
function CertificationsView({ certStatus, setCertStatus }) {
  const CERT_STATUSES = ["not_started","planned","in_progress","completed"];
  const CERT_META = {
    not_started:{ label:"Not Started", color:"#737373" },
    planned:    { label:"Planned",     color:"#E5E5E5" },
    in_progress:{ label:"In Progress", color:"#F59E0B" },
    completed:  { label:"Completed",   color:"#22C55E" },
  };
  const done = Object.values(certStatus).filter(v => v === "completed").length;
  return (
    <div className="fade-up" style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div className="panel" style={{ padding:"16px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
          <div className="label-upper">Certification Progress</div>
          <span style={{ fontSize:13, fontWeight:600, color:"#FFFFFF" }}>{done}/{CERTIFICATIONS.length} earned</span>
        </div>
        <ProgressBar value={Math.round((done/CERTIFICATIONS.length)*100)} color="#FFFFFF" height={4} />
      </div>
      <div className="panel" style={{ padding:"0 0 4px" }}>
        {CERTIFICATIONS.map((cert, i) => {
          const status = certStatus[cert.id] || "not_started";
          const meta = CERT_META[status];
          const nextStatus = CERT_STATUSES[(CERT_STATUSES.indexOf(status)+1)%4];
          return (
            <div key={cert.id} style={{ padding:"14px 20px", borderBottom:i<CERTIFICATIONS.length-1?"1px solid #1A1A1A":"none" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ fontSize:13, fontWeight:500, color:"#E5E5E5", marginBottom:3 }}>{cert.title}</div>
                  <div style={{ display:"flex", gap:12, fontSize:11, color:"#737373" }}>
                    <span>{cert.provider}</span>
                    <span>{cert.xp} XP</span>
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <span style={{ fontSize:11, fontWeight:600, color:cert.pColor, background:`${cert.pColor}14`, border:`1px solid ${cert.pColor}30`, borderRadius:4, padding:"2px 8px" }}>
                    {cert.priority}
                  </span>
                  <button
                    onClick={() => setCertStatus(prev => ({...prev, [cert.id]:nextStatus}))}
                    className="status-pill"
                    style={{ color:meta.color, borderColor:`${meta.color}50`, fontSize:11 }}
                  >
                    {meta.label}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS VIEW
// ─────────────────────────────────────────────────────────────────────────────
function SkillsView({ skillStatus, setSkillStatus }) {
  const toggle = (key) => setSkillStatus(prev => ({...prev, [key]:!prev[key]}));

  const SkillSection = ({ label, skills, color }) => {
    const done = skills.filter(s => skillStatus[s]).length;
    return (
      <div style={{ marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
          <span style={{ fontSize:12, fontWeight:600, color, letterSpacing:"0.04em" }}>{label}</span>
          <span style={{ fontSize:11, color:"#737373" }}>{done}/{skills.length}</span>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {skills.map(s => (
            <button key={s} className={`skill-tag ${skillStatus[s] ? "on" : ""}`} onClick={() => toggle(s)}>
              {skillStatus[s] ? "✓" : "○"} {s}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const total = GRC_SKILLS.length + SOC_SKILLS.length + TOOL_SKILLS.length;
  const done = Object.values(skillStatus).filter(Boolean).length;

  return (
    <div className="fade-up" style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div className="panel" style={{ padding:"16px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
          <div className="label-upper">Skills Checklist</div>
          <span style={{ fontSize:13, fontWeight:600, color:"#22C55E" }}>{done}/{total} skills</span>
        </div>
        <ProgressBar value={Math.round((done/total)*100)} color="#22C55E" height={4} />
      </div>
      <div className="panel" style={{ padding:"18px 20px" }}>
        <SkillSection label="GRC Skills"    skills={GRC_SKILLS}  color="#FFFFFF" />
        <SkillSection label="SOC L1 Skills" skills={SOC_SKILLS}  color="#F59E0B" />
        <SkillSection label="Tools"         skills={TOOL_SKILLS} color="#22C55E" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO VIEW
// ─────────────────────────────────────────────────────────────────────────────
function PortfolioView({ portfolio, portfolioStatus, setPortfolioStatus }) {
  const done = Object.values(portfolioStatus).filter(Boolean).length;
  return (
    <div className="fade-up" style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div className="panel" style={{ padding:"16px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
          <div className="label-upper">Portfolio Projects</div>
          <span style={{ fontSize:13, fontWeight:600, color:"#F59E0B" }}>{done}/{portfolio.length} built</span>
        </div>
        <ProgressBar value={Math.round((done/portfolio.length)*100)} color="#F59E0B" height={4} />
      </div>
      <div className="portfolio-grid">
        {portfolio.map(p => {
          const isDone = !!portfolioStatus[p.id];
          const diffColor = { Easy:"#22C55E", Medium:"#F59E0B", Hard:"#EF4444" }[p.diff];
          return (
            <div key={p.id} className="panel" style={{ padding:"16px 18px", opacity:isDone?0.7:1, borderColor:isDone?"rgba(16,185,129,0.2)":"#1A1A1A" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10, alignItems:"flex-start" }}>
                <span style={{ fontSize:20 }}>{p.icon}</span>
                <button
                  onClick={() => setPortfolioStatus(prev => ({...prev, [p.id]:!prev[p.id]}))}
                  className={`btn ${isDone?"btn-green":"btn-muted"}`}
                  style={{ fontSize:11 }}
                >
                  {isDone ? "✓ Complete" : "Mark Done"}
                </button>
              </div>
              <div style={{ fontSize:13, fontWeight:600, color:"#E5E5E5", marginBottom:6 }}>{p.title}</div>
              <div style={{ fontSize:12, color:"#737373", lineHeight:1.6, marginBottom:10 }}>{p.desc}</div>
              <div style={{ display:"flex", gap:10, fontSize:11, color:"#737373" }}>
                <span style={{ color:diffColor }}>{p.diff}</span>
                <span>{p.hrs}h</span>
                <span style={{ color:"#A3A3A3" }}>{p.xp} XP</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// JOB SEARCH VIEW
// ─────────────────────────────────────────────────────────────────────────────
function JobSearchView({ jobStatus, setJobStatus }) {
  const done = Object.values(jobStatus).filter(Boolean).length;
  return (
    <div className="fade-up" style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div className="panel" style={{ padding:"16px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
          <div className="label-upper">Job Search Progress</div>
          <span style={{ fontSize:13, fontWeight:600, color:"#22C55E" }}>{done}/{JOB_TASKS.length}</span>
        </div>
        <ProgressBar value={Math.round((done/JOB_TASKS.length)*100)} color="#22C55E" height={4} />
      </div>
      <div className="panel" style={{ padding:"16px 20px" }}>
        <div className="label-upper" style={{ marginBottom:12 }}>Job Prep Tasks</div>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {JOB_TASKS.map(jt => {
            const isDone = !!jobStatus[jt.id];
            return (
              <div key={jt.id} className="task-row" style={{ opacity:isDone?0.55:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:500, color:isDone?"#737373":"#E5E5E5", textDecoration:isDone?"line-through":"none", marginBottom:2 }}>{jt.title}</div>
                    <div style={{ fontSize:12, color:"#4B5563" }}>{jt.desc}</div>
                  </div>
                  <button
                    onClick={() => setJobStatus(prev => ({...prev, [jt.id]:!prev[jt.id]}))}
                    className={`btn ${isDone?"btn-green":"btn-muted"}`}
                    style={{ fontSize:11, flexShrink:0 }}
                  >
                    {isDone ? "✓ Done" : "Mark Done"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="two-col">
        <div className="panel" style={{ padding:"16px 18px" }}>
          <div className="label-upper" style={{ marginBottom:10 }}>Target Roles</div>
          <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
            {JOB_ROLES.map(r => (
              <div key={r} style={{ fontSize:12, color:"#737373", padding:"3px 0", borderBottom:"1px solid rgba(255,255,255,0.03)" }}>{r}</div>
            ))}
          </div>
        </div>
        <div className="panel" style={{ padding:"16px 18px" }}>
          <div className="label-upper" style={{ marginBottom:10 }}>Where to Apply</div>
          <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
            {JOB_PLATFORMS.map(p => (
              <div key={p} style={{ fontSize:12, color:"#737373", padding:"3px 0", borderBottom:"1px solid rgba(255,255,255,0.03)" }}>{p}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERVIEW PREP VIEW
// ─────────────────────────────────────────────────────────────────────────────
function InterviewPrepView() {
  const [openQ, setOpenQ] = useState({});
  const toggle = (id) => setOpenQ(prev => ({...prev, [id]:!prev[id]}));

  const QASection = ({ items, label, color }) => (
    <div className="panel" style={{ marginBottom:12 }}>
      <div style={{ padding:"14px 18px", borderBottom:"1px solid #1A1A1A" }}>
        <span style={{ fontSize:12, fontWeight:600, color, letterSpacing:"0.04em" }}>{label}</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:4, padding:"8px" }}>
        {items.map((item, i) => {
          const id = `${label}_${i}`;
          return (
            <div key={id} className="qa-card">
              <div className="qa-head" onClick={() => toggle(id)}>
                <span style={{ flex:1, paddingRight:12 }}>{item.q}</span>
                <span style={{ color:"#374151", fontSize:11, transform:openQ[id]?"rotate(180deg)":"none", transition:"transform 0.18s", flexShrink:0 }}>▼</span>
              </div>
              {openQ[id] && (
                <div style={{ padding:"12px 14px", borderTop:"1px solid #1A1A1A", background:"rgba(255,255,255,0.01)", fontSize:13, color:"#A3A3A3", lineHeight:1.7 }}>
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="fade-up">
      <QASection items={INTERVIEW_GRC} label="GRC Interview Questions" color="#FFFFFF" />
      <QASection items={INTERVIEW_SOC} label="SOC L1 Interview Questions" color="#F59E0B" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LINKEDIN BUILDER VIEW
// ─────────────────────────────────────────────────────────────────────────────
function LinkedInBuilderView() {
  const [copied, setCopied] = useState("");
  const copy = (text, key) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  const CopySection = ({ label, content, id }) => (
    <div className="panel" style={{ padding:"16px 18px", marginBottom:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <span className="label-upper" style={{ color:"#FFFFFF" }}>{label}</span>
        <button onClick={() => copy(content, id)} className={`btn ${copied===id?"btn-green":"btn-muted"}`} style={{ fontSize:11 }}>
          {copied===id ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <div style={{ fontSize:13, color:"#A3A3A3", lineHeight:1.7, whiteSpace:"pre-wrap" }}>{content}</div>
    </div>
  );

  return (
    <div className="fade-up">
      <CopySection label="LinkedIn Headline" content={LINKEDIN_HEADLINE} id="headline" />
      <CopySection label="About Section" content={LINKEDIN_ABOUT} id="about" />
      <div className="panel" style={{ padding:"16px 18px", marginBottom:10 }}>
        <div className="label-upper" style={{ color:"#FFFFFF", marginBottom:12 }}>Skills to Add on LinkedIn</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {LINKEDIN_SKILLS.map(s => (
            <span key={s} style={{ fontSize:12, color:"#A3A3A3", background:"rgba(255,255,255,0.03)", border:"1px solid #1A1A1A", borderRadius:4, padding:"3px 10px" }}>{s}</span>
          ))}
        </div>
      </div>
      <div className="panel" style={{ padding:"16px 18px" }}>
        <div className="label-upper" style={{ color:"#FFFFFF", marginBottom:12 }}>Post Ideas</div>
        {[
          "Just completed my GRC Risk Register with 15 real risks mapped to controls. Sharing it on GitHub.",
          "Learning MITRE ATT&CK – here are 5 techniques every SOC L1 analyst should know.",
          "Passed Microsoft SC-900! Here are the 3 things I focused on to prepare.",
          "Built my first ISO 27001 Control Matrix. Here's what I learned mapping Annex A controls.",
        ].map((post, i) => (
          <div key={i} style={{ padding:"10px 0", borderBottom:i<3?"1px solid #1A1A1A":"none", fontSize:12, color:"#737373", lineHeight:1.6, display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
            <span style={{ flex:1 }}>{post}</span>
            <button onClick={() => copy(post, `post_${i}`)} className={`btn ${copied===`post_${i}`?"btn-green":"btn-muted"}`} style={{ fontSize:10, flexShrink:0 }}>
              {copied===`post_${i}` ? "✓" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EDIT MODAL
// ─────────────────────────────────────────────────────────────────────────────
function EditModal({ mode, target, sections, onSave, onClose }) {
  const isTask    = mode === "add_task"    || mode === "edit_task";
  const isSection = mode === "add_section" || mode === "edit_section";
  const isProject = mode === "add_project" || mode === "edit_project";

  const blankTask    = {title:"",desc:"",cat:"GRC",type:"topic",diff:"Easy",hrs:1,xp:50,res:[]};
  const blankSection = {month:"Month X",title:"",goal:"",color:"#FFFFFF",icon:"📋"};
  const blankProject = {icon:"📊",title:"",diff:"Medium",hrs:4,xp:200,desc:""};

  const init = target || (isTask ? blankTask : isSection ? blankSection : blankProject);
  const [form, setForm] = useState({...init, res: Array.isArray(init.res) ? init.res.join(", ") : (init.res||"")});
  const [err, setErr] = useState("");

  const set = (k, v) => setForm(prev => ({...prev, [k]:v}));

  const handleSave = () => {
    if (!form.title.trim()) { setErr("Title is required."); return; }
    if (isTask) {
      const hrs = parseFloat(form.hrs);
      const xp  = parseInt(form.xp);
      if (isNaN(hrs)||hrs<=0) { setErr("Hours must be a positive number."); return; }
      if (isNaN(xp)||xp<=0)  { setErr("XP must be a positive number."); return; }
      const res = form.res ? form.res.split(",").map(r => r.trim()).filter(Boolean) : [];
      onSave({id:target?.id||`custom_${Date.now()}`, title:form.title.trim(), desc:form.desc||"", cat:form.cat, type:form.type, diff:form.diff, hrs, xp, res});
    } else if (isSection) {
      onSave({id:target?.id||`sec_${Date.now()}`, month:form.month, title:form.title.trim(), goal:form.goal||"", color:form.color||"#FFFFFF", icon:form.icon||"📋", tasks:target?.tasks||[]});
    } else if (isProject) {
      const hrs = parseFloat(form.hrs);
      const xp  = parseInt(form.xp);
      if (isNaN(hrs)||hrs<=0||isNaN(xp)||xp<=0) { setErr("Hours and XP must be positive numbers."); return; }
      onSave({id:target?.id||`proj_${Date.now()}`, icon:form.icon||"📊", title:form.title.trim(), diff:form.diff, hrs, xp, desc:form.desc||""});
    }
  };

  const titleMap = { add_task:"Add Task", edit_task:"Edit Task", add_section:"Add Section", edit_section:"Edit Section", add_project:"Add Portfolio Project", edit_project:"Edit Portfolio Project" };

  return (
    <div className="modal-bg" onClick={e => e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ fontSize:15, fontWeight:600, color:"#E5E5E5" }}>{titleMap[mode]||"Edit"}</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#737373", fontSize:20, cursor:"pointer", lineHeight:1 }}>×</button>
        </div>
        {err && (
          <div style={{ padding:"8px 12px", borderRadius:6, background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.25)", color:"#EF4444", fontSize:12, marginBottom:12 }}>{err}</div>
        )}
        <div className="form-row"><label className="form-label">Title *</label><input className="c-input" value={form.title} onChange={e => set("title",e.target.value)} placeholder="Title" /></div>
        {isTask && (<>
          <div className="form-row"><label className="form-label">Description</label><textarea className="c-input" style={{minHeight:68,resize:"vertical"}} value={form.desc} onChange={e => set("desc",e.target.value)} placeholder="What will you learn or build?" /></div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div className="form-row"><label className="form-label">Category</label>
              <select className="c-input" value={form.cat} onChange={e => set("cat",e.target.value)}>
                {["GRC","SOC L1","Foundation","Tools","Certification"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-row"><label className="form-label">Type</label>
              <select className="c-input" value={form.type} onChange={e => set("type",e.target.value)}>
                {["topic","course","practice","tool"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-row"><label className="form-label">Difficulty</label>
              <select className="c-input" value={form.diff} onChange={e => set("diff",e.target.value)}>
                {["Easy","Medium","Hard"].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              <div className="form-row"><label className="form-label">Hours</label><input className="c-input" type="number" min="0.5" step="0.5" value={form.hrs} onChange={e => set("hrs",e.target.value)} /></div>
              <div className="form-row"><label className="form-label">XP</label><input className="c-input" type="number" min="10" step="10" value={form.xp} onChange={e => set("xp",e.target.value)} /></div>
            </div>
          </div>
          <div className="form-row"><label className="form-label">Resources (comma-separated)</label><input className="c-input" value={form.res} onChange={e => set("res",e.target.value)} placeholder="e.g. NIST SP 800-30, Coursera" /></div>
        </>)}
        {isSection && (<>
          <div className="form-row"><label className="form-label">Month Label</label><input className="c-input" value={form.month} onChange={e => set("month",e.target.value)} placeholder="e.g. Month 7–8" /></div>
          <div className="form-row"><label className="form-label">Goal</label><textarea className="c-input" style={{minHeight:60,resize:"vertical"}} value={form.goal} onChange={e => set("goal",e.target.value)} /></div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div className="form-row"><label className="form-label">Icon (emoji)</label><input className="c-input" value={form.icon} onChange={e => set("icon",e.target.value)} placeholder="📋" /></div>
            <div className="form-row"><label className="form-label">Color (hex)</label><input className="c-input" value={form.color} onChange={e => set("color",e.target.value)} placeholder="#FFFFFF" /></div>
          </div>
        </>)}
        {isProject && (<>
          <div className="form-row"><label className="form-label">Description</label><textarea className="c-input" style={{minHeight:60,resize:"vertical"}} value={form.desc} onChange={e => set("desc",e.target.value)} /></div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            <div className="form-row"><label className="form-label">Icon</label><input className="c-input" value={form.icon} onChange={e => set("icon",e.target.value)} placeholder="📊" /></div>
            <div className="form-row"><label className="form-label">Hours</label><input className="c-input" type="number" min="1" value={form.hrs} onChange={e => set("hrs",e.target.value)} /></div>
            <div className="form-row"><label className="form-label">XP</label><input className="c-input" type="number" min="50" step="25" value={form.xp} onChange={e => set("xp",e.target.value)} /></div>
          </div>
          <div className="form-row"><label className="form-label">Difficulty</label>
            <select className="c-input" value={form.diff} onChange={e => set("diff",e.target.value)}>
              {["Easy","Medium","Hard"].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
        </>)}
        <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:18 }}>
          <button onClick={onClose} className="btn btn-muted">Cancel</button>
          <button onClick={handleSave} className="btn btn-green">Save</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN PANEL
// ─────────────────────────────────────────────────────────────────────────────
function AdminPanel({ sections, setSections, portfolio, setPortfolio, taskStatus, certStatus, portfolioStatus, jobStatus, skillStatus, onReset, onImport, isCustomRoadmap, onRestoreDefault }) {
  const [modal, setModal] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("ok");
  const [importText, setImportText] = useState("");
  const [expandedSec, setExpandedSec] = useState({});
  const fileInputRef = useRef(null);

  const notify = (text, type="ok") => { setMsg(text); setMsgType(type); setTimeout(() => setMsg(""), 4000); };

  const handleExport = () => {
    const data = {
      version: "1.0.0",
      exportedAt: new Date().toISOString(),
      taskStatus, certStatus, portfolioStatus, jobStatus, skillStatus,
      customSections: customSections !== null ? sections : null,
      customPortfolio: customPortfolio !== null ? portfolio : null,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cyberpath-progress-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify("Exported successfully.");
  };

  const applyImport = (data) => {
    const error = validateImportData(data);
    if (error) { notify(error, "err"); return; }
    onImport(data);
    notify("Progress imported successfully.");
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { try { applyImport(JSON.parse(ev.target.result)); } catch { notify("Could not parse JSON file.", "err"); } };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleTextImport = () => {
    try { applyImport(JSON.parse(importText)); setImportText(""); }
    catch { notify("Invalid JSON. Check your input.", "err"); }
  };

  const withSections = (fn) => setSections(prev => {
    const current = prev || JSON.parse(JSON.stringify(DEFAULT_SECTIONS));
    return fn(JSON.parse(JSON.stringify(current)));
  });
  const withPortfolio = (fn) => setPortfolio(prev => {
    const current = prev || JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO));
    return fn(JSON.parse(JSON.stringify(current)));
  });

  // Track custom state refs to fix export
  const customSections = sections !== DEFAULT_SECTIONS ? sections : null;
  const customPortfolio = portfolio !== DEFAULT_PORTFOLIO ? portfolio : null;

  const openModal = (mode, target=null, sectionId=null) => setModal({mode,target,sectionId});
  const closeModal = () => setModal(null);

  const handleModalSave = (saved) => {
    if (!modal) return;
    const {mode, sectionId} = modal;
    if (mode==="add_task") {
      withSections(secs => { const si=secs.findIndex(s=>s.id===sectionId); if(si>=0) secs[si].tasks.push(saved); return secs; });
      notify("Task added.");
    } else if (mode==="edit_task") {
      withSections(secs => { secs.forEach(sec => { const ti=sec.tasks.findIndex(t=>t.id===saved.id); if(ti>=0) sec.tasks[ti]=saved; }); return secs; });
      notify("Task updated.");
    } else if (mode==="add_section") {
      withSections(secs => { secs.push(saved); return secs; });
      notify("Section added.");
    } else if (mode==="edit_section") {
      withSections(secs => { const si=secs.findIndex(s=>s.id===saved.id); if(si>=0) secs[si]={...secs[si],...saved}; return secs; });
      notify("Section updated.");
    } else if (mode==="add_project") {
      withPortfolio(proj => { proj.push(saved); return proj; });
      notify("Project added.");
    } else if (mode==="edit_project") {
      withPortfolio(proj => { const pi=proj.findIndex(p=>p.id===saved.id); if(pi>=0) proj[pi]=saved; return proj; });
      notify("Project updated.");
    }
    closeModal();
  };

  const deleteTask = (taskId, sectionId) => {
    if (!window.confirm("Delete this task?")) return;
    withSections(secs => { const si=secs.findIndex(s=>s.id===sectionId); if(si>=0) secs[si].tasks=secs[si].tasks.filter(t=>t.id!==taskId); return secs; });
    notify("Task deleted.");
  };
  const deleteSection = (secId) => {
    if (!window.confirm("Delete this section and all its tasks?")) return;
    withSections(secs => secs.filter(s=>s.id!==secId));
    notify("Section deleted.");
  };
  const deleteProject = (projId) => {
    if (!window.confirm("Delete this portfolio project?")) return;
    withPortfolio(proj => proj.filter(p=>p.id!==projId));
    notify("Project deleted.");
  };

  return (
    <div className="fade-up" style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {modal && (
        <EditModal mode={modal.mode} target={modal.target} sectionId={modal.sectionId} sections={sections} onSave={handleModalSave} onClose={closeModal} />
      )}

      {msg && (
        <div style={{ padding:"10px 14px", borderRadius:6, background:msgType==="ok"?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)", border:`1px solid ${msgType==="ok"?"rgba(16,185,129,0.25)":"rgba(239,68,68,0.25)"}`, color:msgType==="ok"?"#22C55E":"#EF4444", fontSize:13 }}>
          {msg}
        </div>
      )}

      {/* Data Management */}
      <div className="panel" style={{ padding:"18px 20px" }}>
        <div className="label-upper" style={{ marginBottom:14 }}>Data Management</div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
          <button className="btn btn-cyan" onClick={handleExport}>Export JSON</button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileImport} style={{display:"none"}} />
          <button className="btn btn-green" onClick={() => fileInputRef.current?.click()}>Import from File</button>
          <button className="btn btn-red" onClick={onReset}>Reset All Progress</button>
        </div>
        <div className="label-upper" style={{ marginBottom:6 }}>Or Paste JSON</div>
        <textarea
          className="c-input"
          rows={4}
          style={{ resize:"vertical", fontFamily:"monospace", fontSize:12 }}
          placeholder='Paste exported JSON here...'
          value={importText}
          onChange={e => setImportText(e.target.value)}
        />
        <div style={{ marginTop:8 }}>
          <button className="btn btn-green" onClick={handleTextImport}>Import from Text</button>
        </div>
        <div style={{ marginTop:12, fontSize:12, color:"#4B5563" }}>
          Progress is automatically saved to localStorage. No manual save needed.
        </div>
      </div>

      {/* Roadmap Editor */}
      <div className="panel" style={{ padding:"18px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div>
            <div className="label-upper">Roadmap Editor</div>
            <div style={{ fontSize:11, color:"#4B5563", marginTop:2 }}>
              {isCustomRoadmap ? "Custom roadmap active" : "Using default roadmap"}
            </div>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            <button className="btn btn-cyan" onClick={() => openModal("add_section")}>+ Add Section</button>
            {isCustomRoadmap && (
              <button className="btn btn-muted" onClick={onRestoreDefault}>Restore Default</button>
            )}
          </div>
        </div>
        {sections.map(sec => (
          <div key={sec.id} style={{ marginBottom:6 }}>
            <div className="admin-row">
              <span style={{ fontSize:15 }}>{sec.icon}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:500, color:"#E5E5E5" }}>{sec.title}</div>
                <div style={{ fontSize:11, color:"#4B5563" }}>{sec.month} · {sec.tasks.length} tasks</div>
              </div>
              <button className="btn btn-muted" style={{ fontSize:10 }} onClick={() => setExpandedSec(p => ({...p,[sec.id]:!p[sec.id]}))}>
                {expandedSec[sec.id] ? "Hide ▲" : "Tasks ▼"}
              </button>
              <button className="btn btn-cyan" style={{ fontSize:10 }} onClick={() => openModal("edit_section", sec)}>Edit</button>
              <button className="btn btn-red" style={{ fontSize:10 }} onClick={() => deleteSection(sec.id)}>✕</button>
            </div>
            {expandedSec[sec.id] && (
              <div>
                {sec.tasks.map(task => (
                  <div key={task.id} className="admin-task-row">
                    <span style={{ fontSize:12, color:"#374151" }}>{task.type==="topic"?"T":task.type==="course"?"C":task.type==="practice"?"P":"L"}</span>
                    <span style={{ flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{task.title}</span>
                    <span style={{ fontSize:10, color:task.diff==="Easy"?"#22C55E":task.diff==="Hard"?"#EF4444":"#F59E0B" }}>{task.diff}</span>
                    <span style={{ fontSize:10, color:"#4B5563" }}>{task.xp} XP</span>
                    <button className="btn btn-cyan" style={{ fontSize:10, padding:"1px 6px" }} onClick={() => openModal("edit_task",task,sec.id)}>Edit</button>
                    <button className="btn btn-red" style={{ fontSize:10, padding:"1px 6px" }} onClick={() => deleteTask(task.id,sec.id)}>✕</button>
                  </div>
                ))}
                <div style={{ paddingLeft:24, marginTop:4 }}>
                  <button className="btn btn-green" style={{ fontSize:11 }} onClick={() => openModal("add_task",null,sec.id)}>+ Add Task</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Portfolio Editor */}
      <div className="panel" style={{ padding:"18px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div className="label-upper">Portfolio Editor</div>
          <button className="btn btn-amber" onClick={() => openModal("add_project")}>+ Add Project</button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
          {portfolio.map(p => (
            <div key={p.id} className="admin-row">
              <span style={{ fontSize:15 }}>{p.icon}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:500, color:"#E5E5E5" }}>{p.title}</div>
                <div style={{ fontSize:11, color:"#4B5563" }}>{p.diff} · {p.hrs}h · {p.xp} XP</div>
              </div>
              <button className="btn btn-cyan" style={{ fontSize:10 }} onClick={() => openModal("edit_project",p)}>Edit</button>
              <button className="btn btn-red" style={{ fontSize:10 }} onClick={() => deleteProject(p.id)}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────
function Sidebar({ view, setView, levelInfo, totalXP, totalPct, completedTasks, allTasksCount, onClose }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:2, width:"100%", height:"100%", overflow:"hidden auto" }}>
      {/* Logo */}
      <div style={{ marginBottom:18, paddingBottom:16, borderBottom:"1px solid #1A1A1A" }}>
        <div style={{ fontSize:13, fontWeight:700, color:"#FFFFFF", letterSpacing:"0.06em" }}>
          CYBER<span style={{ color:"#FFFFFF" }}>PATH</span>
        </div>
        <div style={{ fontSize:10, color:"#737373", marginTop:2 }}>GRC + SOC L1 Tracker</div>
        <div style={{ marginTop:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <span style={{ fontSize:10, color:"#737373" }}>Lv.{levelInfo.lv} · {levelInfo.title}</span>
            <span style={{ fontSize:10, color:"#A3A3A3", fontWeight:600 }}>{totalXP.toLocaleString()} XP</span>
          </div>
          <ProgressBar value={levelInfo.pct} color="#FFFFFF" height={3} />
        </div>
      </div>

      {/* Nav */}
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`nav-item ${view === tab.id ? "active" : ""}`}
          onClick={() => { setView(tab.id); onClose?.(); }}
        >
          <span style={{ fontSize:11, fontFamily:"monospace", color:"inherit" }}>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}

      {/* Footer */}
      <div style={{ marginTop:"auto", paddingTop:14, borderTop:"1px solid #1A1A1A" }}>
        <div style={{ fontSize:10, color:"#22C55E", fontWeight:600, letterSpacing:"0.04em", textTransform:"uppercase", marginBottom:2 }}>Progress</div>
        <div style={{ fontSize:20, fontWeight:700, color:"#22C55E" }}>{totalPct}%</div>
        <div style={{ fontSize:10, color:"#737373", marginBottom:6 }}>{completedTasks} / {allTasksCount} tasks</div>
        <ProgressBar value={totalPct} color="#22C55E" height={3} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {

  const saved = useMemo(() => loadProgress(), []);

  const [view, setView]                           = useState("dashboard");
  const [taskStatus, setTaskStatus]               = useState(saved?.taskStatus      || {});
  const [certStatus, setCertStatus]               = useState(saved?.certStatus      || {});
  const [portfolioStatus, setPortfolioStatus]     = useState(saved?.portfolioStatus || {});
  const [jobStatus, setJobStatus]                 = useState(saved?.jobStatus       || {});
  const [skillStatus, setSkillStatus]             = useState(saved?.skillStatus     || {});
  const [customSections, setCustomSections]       = useState(saved?.customSections  || null);
  const [customPortfolio, setCustomPortfolio]     = useState(saved?.customPortfolio || null);
  const [sidebarOpen, setSidebarOpen]             = useState(false);

  const activeSections  = useMemo(() => customSections  || DEFAULT_SECTIONS,  [customSections]);
  const activePortfolio = useMemo(() => customPortfolio || DEFAULT_PORTFOLIO, [customPortfolio]);
  const allTasks = useMemo(() => activeSections.flatMap(s => s.tasks), [activeSections]);

  const totalXP = useMemo(() => {
    const taskXP = allTasks.reduce((sum,t) => sum + (taskStatus[t.id]==="completed" ? t.xp : 0), 0);
    const certXP = CERTIFICATIONS.reduce((sum,c) => sum + (certStatus[c.id]==="completed" ? c.xp : 0), 0);
    const portXP = activePortfolio.reduce((sum,p) => sum + (portfolioStatus[p.id] ? p.xp : 0), 0);
    return taskXP + certXP + portXP;
  }, [taskStatus, certStatus, portfolioStatus, allTasks, activePortfolio]);

  const levelInfo = useMemo(() => getLevelInfo(totalXP), [totalXP]);
  const completedTasks = Object.values(taskStatus).filter(v => v==="completed").length;
  const totalPct = allTasks.length > 0 ? Math.round((completedTasks / allTasks.length) * 100) : 0;

  useEffect(() => {
    saveProgress({taskStatus, certStatus, portfolioStatus, jobStatus, skillStatus, customSections, customPortfolio});
  }, [taskStatus, certStatus, portfolioStatus, jobStatus, skillStatus, customSections, customPortfolio]);

  const handleReset = () => {
    if (!window.confirm("Reset ALL progress? This cannot be undone.")) return;
    setTaskStatus({}); setCertStatus({}); setPortfolioStatus({}); setJobStatus({}); setSkillStatus({});
  };

  const handleImport = (data) => {
    const error = validateImportData(data);
    if (error) {
      window.alert(error);
      return;
    }

    if ("taskStatus" in data)      setTaskStatus(data.taskStatus);
    if ("certStatus" in data)      setCertStatus(data.certStatus);
    if ("portfolioStatus" in data) setPortfolioStatus(data.portfolioStatus);
    if ("jobStatus" in data)       setJobStatus(data.jobStatus);
    if ("skillStatus" in data)     setSkillStatus(data.skillStatus);
    if ("customSections" in data)  setCustomSections(data.customSections);
    if ("customPortfolio" in data) setCustomPortfolio(data.customPortfolio);
  };

  const handleRestoreDefault = () => {
    if (!window.confirm("Restore default roadmap? Custom section/task edits will be lost.")) return;
    setCustomSections(null);
    setCustomPortfolio(null);
  };

  const currentTab = TABS.find(t => t.id === view);

  return (
    <div style={{ minHeight:"100vh", background:"#000000" }}>

      {/* Mobile topbar */}
      <div className="mob-topbar">
        <div style={{ fontSize:13, fontWeight:700, color:"#FFFFFF" }}>
          CYBER<span style={{ color:"#FFFFFF" }}>PATH</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:11, color:"#737373" }}>Lv.{levelInfo.lv}</span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background:"none", border:"1px solid #1A1A1A", borderRadius:5, color:"#737373", padding:"4px 10px", cursor:"pointer", fontSize:14 }}
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile sidebar dropdown */}
      {sidebarOpen && (
        <div style={{ background:"#030303", borderBottom:"1px solid #1A1A1A", padding:"8px 16px", display:"flex", flexDirection:"column", gap:2 }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`nav-item ${view === tab.id ? "active" : ""}`}
              onClick={() => { setView(tab.id); setSidebarOpen(false); }}
            >
              <span style={{ fontSize:11, fontFamily:"monospace" }}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main layout */}
      <div className="main-layout">
        {/* Desktop sidebar */}
        <div className="sidebar-wrap">
          <Sidebar
            view={view}
            setView={setView}
            levelInfo={levelInfo}
            totalXP={totalXP}
            totalPct={totalPct}
            completedTasks={completedTasks}
            allTasksCount={allTasks.length}
          />
        </div>

        {/* Content */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ marginBottom:18 }}>
            <div className="header-sub" style={{ fontSize:10, color:"#374151", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:3 }}>
              GRC + SOC L1 · Intern / Junior Analyst Roadmap
            </div>
            <div style={{ fontSize:18, fontWeight:600, color:"#FFFFFF" }}>
              {currentTab?.label}
            </div>
          </div>

          {/* Views */}
          {view === "dashboard" && (
            <Dashboard
              sections={activeSections}
              portfolio={activePortfolio}
              taskStatus={taskStatus}
              setTaskStatus={setTaskStatus}
              certStatus={certStatus}
              portfolioStatus={portfolioStatus}
              jobStatus={jobStatus}
              totalXP={totalXP}
              levelInfo={levelInfo}
              allTasks={allTasks}
              setView={setView}
            />
          )}
          {view === "roadmap" && (
            <RoadmapView
              sections={activeSections}
              taskStatus={taskStatus}
              setTaskStatus={setTaskStatus}
            />
          )}
          {view === "portfolio" && (
            <PortfolioView
              portfolio={activePortfolio}
              portfolioStatus={portfolioStatus}
              setPortfolioStatus={setPortfolioStatus}
            />
          )}
          {view === "certs" && (
            <CertificationsView certStatus={certStatus} setCertStatus={setCertStatus} />
          )}
          {view === "skills" && (
            <SkillsView skillStatus={skillStatus} setSkillStatus={setSkillStatus} />
          )}
          {view === "interview" && <InterviewPrepView />}
          {view === "jobs" && (
            <JobSearchView jobStatus={jobStatus} setJobStatus={setJobStatus} />
          )}
          {view === "linkedin" && <LinkedInBuilderView />}
          {view === "admin" && (
            <AdminPanel
              sections={activeSections}
              setSections={setCustomSections}
              portfolio={activePortfolio}
              setPortfolio={setCustomPortfolio}
              taskStatus={taskStatus}
              certStatus={certStatus}
              portfolioStatus={portfolioStatus}
              jobStatus={jobStatus}
              skillStatus={skillStatus}
              onReset={handleReset}
              onImport={handleImport}
              isCustomRoadmap={!!customSections}
              onRestoreDefault={handleRestoreDefault}
            />
          )}
        </div>
      </div>
    </div>
  );
}
