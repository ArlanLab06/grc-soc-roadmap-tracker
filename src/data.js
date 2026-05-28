export const STORAGE_KEY = "grc_soc_roadmap_tracker_v1";

export const LEVEL_TABLE = [
  { lv:1, title:"Security Novice",       min:0     },
  { lv:2, title:"Cyber Apprentice",      min:800   },
  { lv:3, title:"SOC/GRC Trainee",       min:2200  },
  { lv:4, title:"Cyber Lab Builder",     min:4500  },
  { lv:5, title:"Risk Analyst",          min:7500  },
  { lv:6, title:"Compliance Specialist", min:11500 },
  { lv:7, title:"SOC L1 Analyst",        min:16500 },
  { lv:8, title:"Junior GRC Analyst",    min:23000 },
  { lv:9, title:"InfoSec Analyst",       min:31000 },
];
export function getLevelInfo(xp) {
  let idx = 0;
  for (let i = 0; i < LEVEL_TABLE.length; i++) { if (xp >= LEVEL_TABLE[i].min) idx = i; else break; }
  const L = LEVEL_TABLE[idx];
  const nxt = LEVEL_TABLE[idx + 1];
  const pct = nxt ? Math.round(((xp - L.min) / (nxt.min - L.min)) * 100) : 100;
  return { ...L, next: nxt, pct: Math.min(100, pct) };
}

// ─────────────────────────────────────────────────────────────────────────────
// STATUS
// ─────────────────────────────────────────────────────────────────────────────
export const STATUS_META = {
  not_started: { label:"Not Started", color:"#737373", border:"rgba(115,115,115,0.35)" },
  in_progress:  { label:"In Progress", color:"#F59E0B", border:"rgba(245,158,11,0.35)"  },
  completed:    { label:"Completed",   color:"#22C55E", border:"rgba(34,197,94,0.35)"  },
};
export const STATUS_CYCLE = ["not_started","in_progress","completed"];
export const STATUS_OPTIONS = STATUS_META;

export const FILTERS = [
  {key:"All",label:"All"},
  {key:"Not Started",label:"Not Started"},
  {key:"In Progress",label:"In Progress"},
  {key:"Completed",label:"Completed"},
  {key:"GRC",label:"GRC"},
  {key:"SOC L1",label:"SOC L1"},
  {key:"Foundation",label:"Foundation"},
  {key:"Tools",label:"Tools"},
  {key:"Certification",label:"Certifications"},
  {key:"topic",label:"Topics"},
  {key:"course",label:"Courses"},
  {key:"practice",label:"Practice"},
];

// ─────────────────────────────────────────────────────────────────────────────
// DATA — OPTIMIZED 6-PHASE ROADMAP
// Focus: Junior GRC / SOC L1 with portfolio evidence after every phase.
// ─────────────────────────────────────────────────────────────────────────────
export const DEFAULT_SECTIONS = [
  {
    id:"s1", month:"Phase 1", title:"Cybersecurity Foundation",
    goal:"Build the core cybersecurity language first. Do not go deep yet: learn the basics, then create one small incident/risk artifact.",
    color:"#FFFFFF", icon:"◇",
    tasks:[
      {id:"s1_01",title:"Threat / Vulnerability / Risk / Control",cat:"Foundation",type:"topic",diff:"Easy",hrs:2,xp:90,desc:"Learn the core vocabulary used in both SOC and GRC: threat, vulnerability, risk, control, impact, likelihood, and mitigation.",res:["Google Cybersecurity"]},
      {id:"s1_02",title:"CIA Triad and Security Principles",cat:"Foundation",type:"topic",diff:"Easy",hrs:1,xp:60,desc:"Understand confidentiality, integrity, availability, least privilege, defense in depth, and why security controls exist.",res:["Google Cybersecurity"]},
      {id:"s1_03",title:"Linux, SQL, SIEM and IDS Basics",cat:"Foundation",type:"topic",diff:"Medium",hrs:5,xp:160,desc:"Focus only on job-useful basics: commands, queries, log sources, alerts, and what analysts use these tools for.",res:["Google Cybersecurity"]},
      {id:"s1_04",title:"Incident Response Basics",cat:"SOC L1",type:"topic",diff:"Easy",hrs:2,xp:90,desc:"Learn the basic IR flow: preparation, detection, analysis, containment, eradication, recovery, lessons learned.",res:["Google Cybersecurity"]},
      {id:"s1_c1",title:"Google Cybersecurity Professional Certificate",cat:"Certification",type:"course",diff:"Medium",hrs:60,xp:650,desc:"Main foundation certificate. Covers cybersecurity concepts, Linux, SQL, SIEM, IDS, risk, and incident response. Finish this before adding more theory.",res:["Coursera"]},
      {id:"s1_p1",title:"Project: Basic Security Incident Report",cat:"SOC L1",type:"practice",diff:"Medium",hrs:4,xp:220,desc:"Write a clean incident report: summary, timeline, affected asset, evidence, impact, containment, and recommendations.",res:["Portfolio Project #1"]},
      {id:"s1_p2",title:"Project: Mini Risk Register",cat:"GRC",type:"practice",diff:"Easy",hrs:3,xp:180,desc:"Create 8–10 beginner risks with asset, threat, vulnerability, likelihood, impact, control, owner, and treatment.",res:["Portfolio Project #2"]},
    ]
  },
  {
    id:"s2", month:"Phase 2", title:"Hands-on Security Fundamentals",
    goal:"Use TryHackMe to turn basic theory into hands-on familiarity with Linux, Windows, networking, web, and identity basics.",
    color:"#E5E5E5", icon:"◈",
    tasks:[
      {id:"s2_01",title:"Networking for Analysts",cat:"Foundation",type:"topic",diff:"Medium",hrs:4,xp:150,desc:"Focus on TCP/IP, DNS, HTTP/HTTPS, ports, protocols, VPN, firewalls, and what these look like in logs.",res:["TryHackMe Cyber Security 101"]},
      {id:"s2_02",title:"Linux and Windows Security Basics",cat:"Foundation",type:"topic",diff:"Medium",hrs:5,xp:170,desc:"Learn users, permissions, processes, services, Windows Event Logs, Linux logs, and common admin/security checks.",res:["TryHackMe Cyber Security 101"]},
      {id:"s2_03",title:"Web and Active Directory Basics",cat:"Foundation",type:"topic",diff:"Medium",hrs:5,xp:170,desc:"Learn enough web and AD fundamentals to understand common alerts, authentication issues, and access-control risks.",res:["TryHackMe Cyber Security 101"]},
      {id:"s2_c1",title:"TryHackMe Cyber Security 101",cat:"Certification",type:"course",diff:"Medium",hrs:35,xp:450,desc:"Main hands-on fundamentals path. Use it to avoid wasting time on passive videos. Skip Pre Security unless you feel weak in absolute basics.",res:["TryHackMe"]},
      {id:"s2_o1",title:"Optional: TryHackMe Pre Security",cat:"Foundation",type:"course",diff:"Easy",hrs:10,xp:100,desc:"Optional support path only. Use it if networking, web, Linux, or computer basics feel unclear. Do not treat it as a main certificate.",res:["TryHackMe"]},
      {id:"s2_p1",title:"Project: Linux/Windows Hardening Checklist",cat:"SOC L1",type:"practice",diff:"Medium",hrs:5,xp:240,desc:"Create a practical checklist: users, MFA, permissions, updates, logging, services, firewall, backups, and evidence screenshots/placeholders.",res:["Portfolio Project #3"]},
      {id:"s2_p2",title:"Project: Networking Notes for SOC/GRC",cat:"Foundation",type:"practice",diff:"Easy",hrs:3,xp:160,desc:"Create a short reference: common ports, protocols, suspicious patterns, and what evidence to collect for each case.",res:["Portfolio Project #4"]},
    ]
  },
  {
    id:"s3", month:"Phase 3", title:"SOC Level 1 Practice",
    goal:"Learn how a junior SOC analyst thinks: triage alerts, read evidence, document clearly, and escalate correctly.",
    color:"#F59E0B", icon:"◉",
    tasks:[
      {id:"s3_01",title:"SIEM and Alert Triage",cat:"SOC L1",type:"topic",diff:"Medium",hrs:5,xp:180,desc:"Understand alert queues, severity, false positives, correlation, and what first-level investigation looks like.",res:["TryHackMe SOC Level 1"]},
      {id:"s3_02",title:"Phishing Investigation",cat:"SOC L1",type:"topic",diff:"Medium",hrs:4,xp:160,desc:"Practice reading sender data, URLs, domains, attachments, IOCs, and writing a verdict.",res:["TryHackMe SOC Level 1"]},
      {id:"s3_03",title:"Endpoint and Network Monitoring",cat:"SOC L1",type:"topic",diff:"Medium",hrs:5,xp:180,desc:"Learn how endpoint events, network events, authentication logs, and web alerts connect during an investigation.",res:["TryHackMe SOC Level 1"]},
      {id:"s3_04",title:"MITRE ATT&CK Basics",cat:"SOC L1",type:"topic",diff:"Medium",hrs:3,xp:130,desc:"Learn tactics and techniques enough to map simple alerts to attacker behavior without overcomplicating it.",res:["TryHackMe SOC Level 1"]},
      {id:"s3_c1",title:"TryHackMe SOC Level 1 Learning Path",cat:"Certification",type:"course",diff:"Medium",hrs:45,xp:600,desc:"Main SOC practice path. This is the strongest hands-on block in the roadmap. Finish it with reports, not only badges.",res:["TryHackMe"]},
      {id:"s3_p1",title:"Project: SOC Alert Investigation Report",cat:"SOC L1",type:"practice",diff:"Medium",hrs:6,xp:330,desc:"Document one simulated alert: alert summary, data sources, evidence, timeline, true/false positive decision, severity, escalation, recommendation.",res:["Portfolio Project #5"]},
      {id:"s3_p2",title:"Project: Phishing Analysis Report",cat:"SOC L1",type:"practice",diff:"Medium",hrs:4,xp:240,desc:"Analyze a safe sample/scenario: sender, headers, domain, URL reputation, indicators, verdict, and user-facing recommendation.",res:["Portfolio Project #6"]},
    ]
  },
  {
    id:"s4", month:"Phase 4", title:"Microsoft Security, Compliance & Identity",
    goal:"Use SC-900 to understand identity, access, compliance, and Microsoft security tools used in real companies.",
    color:"#EF4444", icon:"◎",
    tasks:[
      {id:"s4_01",title:"Identity and Access Concepts",cat:"GRC",type:"topic",diff:"Medium",hrs:4,xp:160,desc:"Learn IAM, MFA, conditional access, identity governance, privileged access, and why access control is a major audit topic.",res:["Microsoft Learn SC-900"]},
      {id:"s4_02",title:"Microsoft Entra ID Basics",cat:"Tools",type:"tool",diff:"Medium",hrs:3,xp:140,desc:"Understand users, groups, roles, authentication, conditional access, and sign-in logs at a beginner level.",res:["Microsoft Learn SC-900"]},
      {id:"s4_03",title:"Microsoft Defender and Sentinel Overview",cat:"Tools",type:"tool",diff:"Medium",hrs:3,xp:140,desc:"Understand what Defender and Sentinel are used for. Do not go deep yet; focus on use cases and analyst language.",res:["Microsoft Learn SC-900"]},
      {id:"s4_04",title:"Microsoft Purview and Compliance Concepts",cat:"GRC",type:"topic",diff:"Medium",hrs:3,xp:140,desc:"Learn information protection, compliance management, data governance, and how these connect to GRC work.",res:["Microsoft Learn SC-900"]},
      {id:"s4_c1",title:"Microsoft SC-900",cat:"Certification",type:"course",diff:"Medium",hrs:25,xp:550,desc:"Official Microsoft fundamentals exam for security, compliance, and identity. Study free first; pay only when ready for the exam.",res:["Microsoft Learn"]},
      {id:"s4_p1",title:"Project: Microsoft Security & Compliance Map",cat:"GRC",type:"practice",diff:"Medium",hrs:5,xp:280,desc:"Create a diagram/table mapping Entra ID, Defender, Sentinel, Purview, Compliance Manager, MFA, and Conditional Access to GRC/SOC use cases.",res:["Portfolio Project #7"]},
      {id:"s4_p2",title:"Project: Access Review Evidence Pack",cat:"GRC",type:"practice",diff:"Medium",hrs:4,xp:240,desc:"Create a mock access review pack: user list, role, access level, reviewer decision, evidence field, finding, and remediation action.",res:["Portfolio Project #8"]},
    ]
  },
  {
    id:"s5", month:"Phase 5", title:"GRC / Risk / Compliance",
    goal:"Build job-ready GRC artifacts: risk register, control matrix, evidence tracker, and mini audit report.",
    color:"#22C55E", icon:"■",
    tasks:[
      {id:"s5_01",title:"Governance, Policies and Control Ownership",cat:"GRC",type:"topic",diff:"Medium",hrs:4,xp:160,desc:"Learn how governance works: policy, standard, procedure, control owner, risk owner, approval, and accountability.",res:["GRC Specialization"]},
      {id:"s5_02",title:"Risk Register and Risk Treatment",cat:"GRC",type:"topic",diff:"Medium",hrs:5,xp:190,desc:"Learn inherent risk, residual risk, likelihood, impact, controls, treatment plan, acceptance, and risk reporting.",res:["GRC Specialization"]},
      {id:"s5_03",title:"Compliance Evidence and Control Testing",cat:"GRC",type:"topic",diff:"Medium",hrs:5,xp:190,desc:"Learn evidence types, control design, control operation, test procedure, finding, gap, recommendation, and remediation tracking.",res:["GRC Specialization"]},
      {id:"s5_04",title:"Framework Basics: ISO 27001, NIST CSF, SOC 2, PCI DSS",cat:"GRC",type:"topic",diff:"Medium",hrs:5,xp:190,desc:"Learn what each framework is used for and how a junior GRC analyst maps controls and evidence. Do not memorize every clause.",res:["GRC Specialization"]},
      {id:"s5_c1",title:"Cyber Security: Essentials for Governance, Risk & Compliance Specialization",cat:"Certification",type:"course",diff:"Medium",hrs:45,xp:600,desc:"Main GRC course. Replaces weaker scattered compliance courses. Focus on artifacts and interview-ready explanations.",res:["Coursera"]},
      {id:"s5_o1",title:"Optional: Foundations of Governance, Risk, and Compliance",cat:"GRC",type:"course",diff:"Easy",hrs:8,xp:120,desc:"Optional extra if available in Coursera. Use it as revision, not as a main roadmap blocker.",res:["Coursera / ISC2"]},
      {id:"s5_p1",title:"Project: GRC Control Matrix",cat:"GRC",type:"practice",diff:"Medium",hrs:6,xp:350,desc:"Build a control matrix with framework, control, risk, evidence required, owner, current status, gap, and remediation.",res:["Portfolio Project #9"]},
      {id:"s5_p2",title:"Project: Mini Audit Report",cat:"GRC",type:"practice",diff:"Medium",hrs:5,xp:320,desc:"Write a simple audit-style report: scope, tested controls, evidence, findings, risk rating, recommendations, owner, due date.",res:["Portfolio Project #10"]},
    ]
  },
  {
    id:"s6", month:"Phase 6", title:"Python for Security Automation",
    goal:"Use Python only for practical security work: logs, CSV/JSON, simple reports, and automation. No endless theory.",
    color:"#60A5FA", icon:"◌",
    tasks:[
      {id:"s6_01",title:"Python Basics for Analysts",cat:"Tools",type:"topic",diff:"Medium",hrs:8,xp:220,desc:"Variables, conditions, loops, functions, dictionaries, lists. Learn enough to build security utilities.",res:["Python 3 Michigan"]},
      {id:"s6_02",title:"Files, CSV and JSON",cat:"Tools",type:"topic",diff:"Medium",hrs:6,xp:190,desc:"Read and write files, CSV reports, JSON logs, and structured outputs for analyst workflows.",res:["Python 3 Michigan"]},
      {id:"s6_03",title:"Parsing Security Logs",cat:"SOC L1",type:"topic",diff:"Medium",hrs:6,xp:210,desc:"Parse failed logins, IP addresses, usernames, timestamps, event counts, and suspicious patterns from sample logs.",res:["Python 3 Michigan"]},
      {id:"s6_04",title:"Simple Report Automation",cat:"GRC",type:"topic",diff:"Medium",hrs:5,xp:190,desc:"Generate simple CSV/Markdown summaries for failed logins, high-risk findings, or control status.",res:["Python 3 Michigan"]},
      {id:"s6_c1",title:"Python 3 Programming Specialization — University of Michigan",cat:"Certification",type:"course",diff:"Medium",hrs:55,xp:600,desc:"Main Python course. Use it to build automation projects, not to drift away from GRC/SOC goals.",res:["Coursera"]},
      {id:"s6_p1",title:"Project: Python Security Log Analyzer",cat:"SOC L1",type:"practice",diff:"Hard",hrs:10,xp:500,desc:"Build a script that reads logs, counts failed logins, extracts suspicious IPs, creates CSV/JSON output, and writes a short analyst summary.",res:["Portfolio Project #11"]},
      {id:"s6_p2",title:"Project: Risk Register CSV Reporter",cat:"GRC",type:"practice",diff:"Medium",hrs:6,xp:320,desc:"Build a small Python script that reads a risk register CSV and outputs top risks, overdue remediation items, and owner summary.",res:["Portfolio Project #12"]},
    ]
  },
];

export const DEFAULT_PORTFOLIO = [
  {id:"pp1",icon:"■",title:"Security Incident Report",diff:"Medium",hrs:4,xp:260,desc:"Incident summary, timeline, affected asset, evidence, impact, containment, eradication, recovery, recommendations."},
  {id:"pp2",icon:"■",title:"Mini Risk Register",diff:"Easy",hrs:3,xp:220,desc:"8–10 risks with asset, threat, vulnerability, likelihood, impact, current control, owner, and treatment plan."},
  {id:"pp3",icon:"■",title:"Linux/Windows Hardening Checklist",diff:"Medium",hrs:5,xp:300,desc:"Checklist for users, permissions, updates, logging, firewall, services, backups, and evidence collection."},
  {id:"pp4",icon:"■",title:"Networking Notes for SOC/GRC",diff:"Easy",hrs:3,xp:180,desc:"Common ports, protocols, suspicious patterns, evidence to collect, and how each topic appears in logs."},
  {id:"pp5",icon:"■",title:"SOC Alert Investigation Report",diff:"Hard",hrs:6,xp:380,desc:"Alert summary, data sources, evidence, timeline, severity, true/false positive decision, escalation, recommendations."},
  {id:"pp6",icon:"■",title:"Phishing Analysis Report",diff:"Medium",hrs:4,xp:280,desc:"Sender, headers, domain, URL reputation, indicators, verdict, recommended actions, and user-awareness note."},
  {id:"pp7",icon:"■",title:"Microsoft Security & Compliance Map",diff:"Medium",hrs:5,xp:320,desc:"Map Entra ID, Defender, Sentinel, Purview, Compliance Manager, MFA, and Conditional Access to GRC/SOC use cases."},
  {id:"pp8",icon:"■",title:"Access Review Evidence Pack",diff:"Medium",hrs:4,xp:280,desc:"Mock user access review with role, access level, reviewer decision, evidence field, finding, and remediation."},
  {id:"pp9",icon:"■",title:"GRC Control Matrix",diff:"Medium",hrs:6,xp:380,desc:"Framework, control, risk, required evidence, owner, current status, gap, and remediation action."},
  {id:"pp10",icon:"■",title:"Mini Audit Report",diff:"Medium",hrs:5,xp:350,desc:"Scope, tested controls, evidence, findings, risk rating, recommendations, owner, and due date."},
  {id:"pp11",icon:"■",title:"Python Security Log Analyzer",diff:"Hard",hrs:10,xp:550,desc:"Python tool that reads logs, counts failed logins, extracts suspicious IPs, exports CSV/JSON, and writes analyst summary."},
  {id:"pp12",icon:"■",title:"Risk Register CSV Reporter",diff:"Medium",hrs:6,xp:360,desc:"Python script that reads a risk register CSV and outputs top risks, overdue remediation, and owner summary."},
];

export const CERTIFICATIONS = [
  {id:"c1",title:"Google Cybersecurity Professional Certificate",                          priority:"Very High",pColor:"#EF4444",provider:"Coursera",        xp:650},
  {id:"c2",title:"TryHackMe Cyber Security 101",                                         priority:"High",     pColor:"#F59E0B",provider:"TryHackMe",       xp:450},
  {id:"c3",title:"TryHackMe SOC Level 1 Learning Path",                                  priority:"Very High",pColor:"#EF4444",provider:"TryHackMe",       xp:600},
  {id:"c4",title:"Microsoft SC-900",                                                     priority:"Very High",pColor:"#EF4444",provider:"Microsoft Learn", xp:550},
  {id:"c5",title:"Cyber Security: Essentials for Governance, Risk & Compliance Specialization",priority:"Very High",pColor:"#EF4444",provider:"Coursera", xp:600},
  {id:"c6",title:"Python 3 Programming Specialization — University of Michigan",          priority:"High",     pColor:"#F59E0B",provider:"Coursera",        xp:600},
  {id:"c7",title:"TryHackMe Pre Security",                                               priority:"Optional", pColor:"#64748B",provider:"TryHackMe",       xp:100},
  {id:"c8",title:"Foundations of Governance, Risk, and Compliance",                       priority:"Optional", pColor:"#64748B",provider:"Coursera / ISC2", xp:120},
];

export const GRC_SKILLS = ["Risk Management","Risk Register","Control Matrix","IT Governance","Compliance","Security Policies","Audit Evidence","Access Review","Third-Party Risk","Control Testing","Gap Analysis","Remediation Tracking","Management Reporting","Microsoft Compliance Concepts"];
export const SOC_SKILLS = ["Alert Triage","SIEM Basics","Log Analysis","Windows Event Logs","Linux Logs","Phishing Analysis","Suspicious Login Investigation","Brute Force Detection","Malware Alert Basics","Incident Escalation","IOC Analysis","MITRE ATT&CK Basics","Ticket Documentation","Incident Timeline"];
export const TOOL_SKILLS = ["Excel / Google Sheets","Google Docs / Word","PowerPoint / Slides","Notion","Draw.io / Lucidchart","Microsoft Entra ID","Microsoft Purview","Microsoft Defender","Microsoft Sentinel basics","Splunk basics","Wazuh basics","Python","CSV / JSON","VirusTotal","AbuseIPDB","URLScan.io","GitHub","Jira / ServiceNow basics"];

export const JOB_TASKS = [
  {id:"jt1",title:"Create cybersecurity CV",desc:"One-page CV focused on GRC/SOC L1, 6 main certificates, and portfolio projects."},
  {id:"jt2",title:"Build LinkedIn profile",desc:"Headline, About section, featured roadmap tracker, certificates, and 3 portfolio posts."},
  {id:"jt3",title:"Upload 6 portfolio projects to GitHub",desc:"Incident report, hardening checklist, SOC report, Microsoft map, control matrix, Python log analyzer."},
  {id:"jt4",title:"Create GitHub README template for projects",desc:"Problem, tools, evidence, screenshots, findings, lessons learned, and next steps."},
  {id:"jt5",title:"Apply to 20 internships",desc:"Track company, role, date, source, status, contact, and follow-up date."},
  {id:"jt6",title:"Apply to 20 junior/part-time analyst roles",desc:"GRC Intern, IT Risk Intern, SOC L1, Security Monitoring, InfoSec Intern."},
  {id:"jt7",title:"Prepare HR interview answers",desc:"Tell me about yourself, why cybersecurity, strengths, weakness, availability, expected salary."},
  {id:"jt8",title:"Prepare technical interview answers",desc:"GRC controls, risk, evidence, SIEM, phishing, suspicious login, escalation, and ticket documentation."},
  {id:"jt9",title:"Prepare 3 STAR stories",desc:"Use your roadmap tracker, student organization leadership, and one portfolio project as STAR stories."},
  {id:"jt10",title:"Create target companies list",desc:"Banks, fintech, telecom, Big 4, IT consulting, MSSPs, cybersecurity vendors, university IT offices."},
];
export const JOB_ROLES = ["GRC Intern","Junior GRC Analyst","Information Security Intern","IT Risk Intern","Technology Risk Intern","IT Audit Intern","Risk Advisory Intern","Compliance Analyst Intern","Cybersecurity Compliance Intern","Junior Information Security Analyst","SOC L1 Analyst","Junior SOC Analyst","Security Monitoring Analyst","Cyber Defense Analyst Intern","Security Operations Intern","IT Operations + Security Intern"];
export const JOB_PLATFORMS = ["LinkedIn","hh.kz","Enbek.kz","KPMG Careers","Deloitte Careers","PwC Careers","EY Careers","Banks","Fintech","Telecom","IT Consulting","MSSP / SOC providers","Cybersecurity Companies","University IT / Security teams"];

export const INTERVIEW_GRC = [
  {q:"What is GRC?",a:"GRC stands for Governance, Risk, and Compliance. Governance sets direction and accountability, risk management identifies and treats risks, and compliance ensures the organization meets laws, standards, policies, and contractual requirements."},
  {q:"What is a control?",a:"A control is a safeguard or countermeasure that reduces risk to an acceptable level. Controls can be preventive, detective, or corrective."},
  {q:"What is audit evidence?",a:"Audit evidence is documentation proving that a control exists and works. Examples include policies, screenshots, access review records, configuration exports, logs, tickets, and approval records."},
  {q:"What is a risk register?",a:"A risk register is a structured list of risks with asset, threat, vulnerability, likelihood, impact, owner, existing controls, residual risk, and treatment plan."},
  {q:"What is residual risk?",a:"Residual risk is the risk remaining after controls are applied. It should be accepted, treated further, transferred, or avoided depending on the organization's risk appetite."},
  {q:"What is inherent risk?",a:"Inherent risk is the raw risk before controls are applied. It shows what exposure exists if the organization does nothing to mitigate it."},
  {q:"What is Policy vs Standard vs Procedure?",a:"Policy gives high-level direction. A standard defines mandatory requirements. A procedure gives step-by-step instructions for implementing the requirement."},
  {q:"What is an access review?",a:"An access review is a periodic check that users only have access required for their current role. Decisions to keep, modify, or remove access are documented as audit evidence."},
  {q:"What is a control matrix?",a:"A control matrix maps controls to risks, frameworks, owners, evidence, status, gaps, and remediation. It helps organize compliance and audit work."},
  {q:"What is third-party risk?",a:"Third-party risk is risk introduced by vendors, partners, and service providers that access company data, systems, or processes. It requires due diligence and ongoing monitoring."},
];
export const INTERVIEW_SOC = [
  {q:"What is SIEM?",a:"Security Information and Event Management — a platform that collects logs, correlates events, and generates alerts for analysts. Examples include Splunk, Microsoft Sentinel, Elastic, and Wazuh."},
  {q:"What is alert triage?",a:"Alert triage is the process of reviewing an alert, checking evidence, deciding severity, identifying true or false positive, documenting findings, and escalating when needed."},
  {q:"What is a false positive?",a:"A false positive is an alert that looks suspicious but is actually benign. Good documentation explains why it is benign and what evidence supports that decision."},
  {q:"What is an IOC?",a:"An Indicator of Compromise is evidence that a system or account may be compromised. Examples include malicious IPs, domains, file hashes, suspicious logins, and unusual processes."},
  {q:"What logs would you check for a suspicious login?",a:"Check Windows Security Event Logs, Entra ID sign-in logs, VPN logs, firewall logs, endpoint logs, and any SIEM correlation events for time, IP, user, device, and location anomalies."},
  {q:"When would you escalate an alert?",a:"Escalate when there is confirmed malicious activity, high severity, unclear scope, sensitive systems involved, possible data exposure, or when the L1 playbook is not enough."},
  {q:"What is phishing?",a:"Phishing is a social engineering attack that uses emails or messages to trick users into clicking links, opening attachments, or giving credentials."},
  {q:"What is MITRE ATT&CK?",a:"MITRE ATT&CK is a knowledge base of attacker tactics, techniques, and procedures. Analysts use it to describe attacker behavior and map detections."},
  {q:"What should a good SOC ticket include?",a:"A good ticket includes alert summary, time, affected user/host, data sources checked, evidence, timeline, verdict, severity, action taken, and escalation or closure reason."},
  {q:"What is incident severity?",a:"Incident severity ranks business/security impact. It guides response urgency, escalation, communication, and remediation priority."},
];

export const LINKEDIN_HEADLINE = "Aspiring Junior GRC / SOC L1 Analyst | Google Cybersecurity | SC-900 | TryHackMe SOC L1 | Risk Management | SIEM | Python Automation";
export const LINKEDIN_ABOUT = `Aspiring cybersecurity professional focused on Junior GRC and SOC L1 roles.

I am building a focused 6-phase roadmap covering cybersecurity foundations, hands-on security labs, SOC L1 practice, Microsoft security/compliance/identity, GRC fundamentals, and Python security automation.

Portfolio focus:
• Security incident reports
• Risk registers
• Access review evidence packs
• GRC control matrices
• SOC alert investigation reports
• Python security log analyzer

Target roles: GRC Intern, Junior GRC Analyst, SOC L1 Analyst, Information Security Intern, IT Risk Intern, and Security Operations Intern.

Do not learn forever. Build, document, apply.`;
export const LINKEDIN_SKILLS = ["GRC","Risk Management","Control Matrix","Audit Evidence","Access Review","Security Policies","Compliance","Microsoft Security","SC-900","Microsoft Entra ID","Microsoft Purview","SIEM","SOC Analysis","Alert Triage","Incident Response","Log Analysis","Phishing Analysis","MITRE ATT&CK Basics","Python","CSV / JSON","Information Security","Third-Party Risk"];

export const MOTIVATIONAL_MSGS = [
  "Learn only what supports the target role.",
  "One certificate must create one portfolio artifact.",
  "Junior roles need proof, not perfection.",
  "Do not learn forever. Build, document, apply.",
  "GRC + SOC L1 + Python automation = a strong student profile.",
];

// ─────────────────────────────────────────────────────────────────────────────
// BADGES
// ─────────────────────────────────────────────────────────────────────────────
export function computeBadges(sections, taskStatus, portfolioStatus, jobStatus) {
  const sectionPct = (id) => {
    const sec = sections.find(s => s.id === id);
    if (!sec || !sec.tasks.length) return 0;
    return sec.tasks.filter(t => taskStatus[t.id] === "completed").length / sec.tasks.length;
  };
  const s3 = sections.find(s => s.id === "s3");
  const socPractice = s3 ? s3.tasks.filter(t => t.cat === "SOC L1") : [];
  const socDone = socPractice.length ? socPractice.filter(t => taskStatus[t.id] === "completed").length / socPractice.length : 0;
  const jobPct = Object.values(jobStatus).filter(Boolean).length / Math.max(JOB_TASKS.length, 1);
  const allSectionIds = ["s1","s2","s3","s4","s5","s6"];
  return [
    {id:"b1",icon:"◇",title:"Foundation Builder",      desc:"Complete 70%+ of Cybersecurity Foundation",         earned:sectionPct("s1")>=0.7},
    {id:"b2",icon:"◉",title:"SOC Rookie",              desc:"Complete 70%+ of SOC Level 1 Practice",             earned:socDone>=0.7},
    {id:"b3",icon:"■",title:"Risk Register Builder",   desc:"Complete Mini Risk Register portfolio project",     earned:!!portfolioStatus["pp2"]},
    {id:"b4",icon:"◎",title:"Microsoft Security Ready", desc:"Complete 70%+ of SC-900 phase",                     earned:sectionPct("s4")>=0.7},
    {id:"b5",icon:"■",title:"GRC Evidence Builder",     desc:"Complete Control Matrix and Mini Audit projects",    earned:!!portfolioStatus["pp9"] && !!portfolioStatus["pp10"]},
    {id:"b6",icon:"◌",title:"Python Automation Builder",desc:"Complete Python Security Log Analyzer project",      earned:!!portfolioStatus["pp11"]},
    {id:"b7",icon:"◆",title:"Job Search Ready",        desc:"Complete 70%+ of job search tasks",                 earned:jobPct>=0.7},
    {id:"b8",icon:"◆",title:"Portfolio-Ready Analyst", desc:"All 6 roadmap phases at 80%+",                      earned:allSectionIds.every(id=>sectionPct(id)>=0.8)},
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// TABS
// ─────────────────────────────────────────────────────────────────────────────
export const TABS = [
  {id:"dashboard", label:"Dashboard",    icon:"◼"},
  {id:"roadmap",   label:"Roadmap",      icon:"◈"},
  {id:"portfolio", label:"Portfolio",    icon:"◧"},
  {id:"certs",     label:"Certifications",icon:"◎"},
  {id:"skills",    label:"Skills",       icon:"◇"},
  {id:"interview", label:"Interview Prep",icon:"◑"},
  {id:"jobs",      label:"Job Search",   icon:"◉"},
  {id:"linkedin",  label:"LinkedIn",     icon:"◈"},
  {id:"admin",     label:"Editor",       icon:"◐"},
];
