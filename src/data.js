export const STORAGE_KEY = "grc_soc_roadmap_tracker_v1";

export const LEVEL_TABLE = [
  { lv:1, title:"Security Novice",       min:0     },
  { lv:2, title:"Cyber Apprentice",      min:800   },
  { lv:3, title:"GRC Initiate",          min:2200  },
  { lv:4, title:"SOC Cadet",             min:4500  },
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
// DATA — ROADMAP SECTIONS
// ─────────────────────────────────────────────────────────────────────────────
export const DEFAULT_SECTIONS = [
  {
    id:"s1", month:"Month 0–1", title:"Cybersecurity Foundation",
    goal:"Understand the basic language of cybersecurity for GRC and SOC tasks.",
    color:"#FFFFFF", icon:"◇",
    tasks:[
      {id:"s1_01",title:"CIA Triad",cat:"Foundation",type:"topic",diff:"Easy",hrs:1,xp:50,desc:"Confidentiality, Integrity, Availability – the three core security principles.",res:["Google Cybersecurity Certificate","NIST Glossary"]},
      {id:"s1_02",title:"Threat / Vulnerability / Risk / Control",cat:"Foundation",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"Core GRC vocabulary: what threatens assets, weaknesses, risk levels, and mitigating controls.",res:["NIST SP 800-30"]},
      {id:"s1_03",title:"Authentication vs Authorization",cat:"Foundation",type:"topic",diff:"Easy",hrs:1,xp:40,desc:"Who you are (authn) vs what you're allowed to do (authz).",res:[]},
      {id:"s1_04",title:"Multi-Factor Authentication (MFA)",cat:"Foundation",type:"topic",diff:"Easy",hrs:1,xp:40,desc:"Something you know, have, or are – layered identity verification.",res:[]},
      {id:"s1_05",title:"Basic Networking: TCP/IP, DNS, HTTP/HTTPS",cat:"Foundation",type:"topic",diff:"Easy",hrs:3,xp:100,desc:"How networks work – essential for log analysis and incident response.",res:["TryHackMe Pre Security"]},
      {id:"s1_06",title:"Ports and Protocols",cat:"Foundation",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"Common ports (22,80,443,3389) and their services.",res:[]},
      {id:"s1_07",title:"Linux Basics",cat:"Foundation",type:"topic",diff:"Easy",hrs:3,xp:100,desc:"CLI navigation, file permissions, log locations, process management.",res:["TryHackMe Pre Security"]},
      {id:"s1_08",title:"Windows Basics",cat:"Foundation",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"Windows Event Logs, user accounts, registry overview.",res:[]},
      {id:"s1_09",title:"Security Logs Basics",cat:"SOC L1",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"What logs are, why they matter, and the types of security logs.",res:[]},
      {id:"s1_10",title:"Incident Response Basics",cat:"SOC L1",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"Preparation, Detection, Analysis, Containment, Eradication, Recovery.",res:[]},
      {id:"s1_11",title:"Phishing Basics",cat:"SOC L1",type:"topic",diff:"Easy",hrs:1,xp:50,desc:"How phishing works, red flags, spoofed senders, malicious URLs.",res:[]},
      {id:"s1_12",title:"Malware Basics",cat:"SOC L1",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"Ransomware, trojans, worms, spyware – what they do and how they spread.",res:[]},
      {id:"s1_c1",title:"Google Cybersecurity Certificate",cat:"Certification",type:"course",diff:"Easy",hrs:40,xp:400,desc:"Foundational certificate covering security concepts, risk, tools, and incident response.",res:["Coursera"]},
      {id:"s1_c2",title:"TryHackMe Pre Security",cat:"Foundation",type:"course",diff:"Easy",hrs:20,xp:200,desc:"Interactive learning path covering networking, OS, and web fundamentals.",res:["tryhackme.com"]},
      {id:"s1_c3",title:"TryHackMe Cyber Security 101",cat:"Foundation",type:"course",diff:"Easy",hrs:20,xp:200,desc:"Core security concepts in hands-on labs.",res:["tryhackme.com"]},
      {id:"s1_p1",title:"Explain CIA Triad in your own words",cat:"Foundation",type:"practice",diff:"Easy",hrs:1,xp:75,desc:"Write a 1-page explanation with real-world examples for each pillar.",res:[]},
      {id:"s1_p2",title:"Create a simple risk example document",cat:"GRC",type:"practice",diff:"Easy",hrs:1,xp:75,desc:"Asset → Threat → Vulnerability → Risk → Control. One complete documented cycle.",res:[]},
      {id:"s1_p3",title:"Capture basic traffic in Wireshark",cat:"Tools",type:"practice",diff:"Easy",hrs:2,xp:100,desc:"Capture HTTP/HTTPS traffic and identify protocols, ports, and payloads.",res:["Wireshark docs"]},
      {id:"s1_p4",title:"Run basic Nmap scan in a legal lab",cat:"Tools",type:"practice",diff:"Easy",hrs:1,xp:75,desc:"Use nmap -sV on your local machine or a TryHackMe lab target.",res:[]},
      {id:"s1_p5",title:"Create cybersecurity notes database in Notion",cat:"Tools",type:"practice",diff:"Easy",hrs:2,xp:75,desc:"Structured Notion workspace: topics, glossary, tools, resources.",res:["notion.so"]},
    ]
  },
  {
    id:"s2", month:"Month 1–2", title:"GRC Foundation",
    goal:"Understand what a GRC specialist does and master core governance, risk, and compliance concepts.",
    color:"#E5E5E5", icon:"◈",
    tasks:[
      {id:"s2_01",title:"GRC Overview (Governance, Risk, Compliance)",cat:"GRC",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"What GRC is, why it exists, and what GRC teams do daily.",res:[]},
      {id:"s2_02",title:"Security Policies and Standards",cat:"GRC",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"What policies are, how standards differ from procedures.",res:[]},
      {id:"s2_03",title:"Policy vs Standard vs Procedure",cat:"GRC",type:"topic",diff:"Easy",hrs:1,xp:50,desc:"Critical hierarchy every GRC analyst must know.",res:[]},
      {id:"s2_04",title:"Audit Evidence and Control Testing",cat:"GRC",type:"topic",diff:"Medium",hrs:3,xp:100,desc:"What auditors look for, how to gather evidence, control testing procedures.",res:[]},
      {id:"s2_05",title:"Risk Register",cat:"GRC",type:"topic",diff:"Medium",hrs:2,xp:100,desc:"What a risk register is, how to create and maintain one.",res:[]},
      {id:"s2_06",title:"Access Review",cat:"GRC",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"Periodic review of user access rights – process, evidence, decisions.",res:[]},
      {id:"s2_07",title:"Third-Party Risk Management",cat:"GRC",type:"topic",diff:"Medium",hrs:2,xp:100,desc:"How to assess vendor risk, due diligence, and ongoing monitoring.",res:[]},
      {id:"s2_08",title:"Inherent Risk vs Residual Risk",cat:"GRC",type:"topic",diff:"Easy",hrs:1,xp:50,desc:"Before controls vs after controls – critical distinction for risk reporting.",res:[]},
      {id:"s2_09",title:"Risk Owner vs Control Owner",cat:"GRC",type:"topic",diff:"Easy",hrs:1,xp:50,desc:"Who is accountable for risk vs who implements and maintains controls.",res:[]},
      {id:"s2_10",title:"NIST CSF 2.0 Overview",cat:"GRC",type:"topic",diff:"Medium",hrs:4,xp:150,desc:"Govern, Identify, Protect, Detect, Respond, Recover – 6 functions.",res:["NIST CSF 2.0 official PDF"]},
      {id:"s2_11",title:"ISO 27001 Basics",cat:"GRC",type:"topic",diff:"Medium",hrs:4,xp:150,desc:"Information Security Management System structure and requirements.",res:[]},
      {id:"s2_12",title:"ISO 27002, SOC 2, PCI DSS, GDPR Basics",cat:"GRC",type:"topic",diff:"Medium",hrs:5,xp:175,desc:"Overview of key compliance frameworks every GRC analyst should know.",res:[]},
      {id:"s2_c1",title:"Cybersecurity Compliance Framework, Standards & Regulations",cat:"Certification",type:"course",diff:"Medium",hrs:20,xp:250,desc:"Coursera course covering major compliance frameworks.",res:["Coursera"]},
      {id:"s2_c2",title:"Information Security Risk Management for ISO 27001/27002",cat:"Certification",type:"course",diff:"Medium",hrs:20,xp:250,desc:"Udemy course on ISO 27001 risk management.",res:["Udemy"]},
      {id:"s2_p1",title:"Create a Risk Register in Excel (15 risks)",cat:"GRC",type:"practice",diff:"Medium",hrs:3,xp:150,desc:"Asset, threat, vulnerability, impact, likelihood, score, controls, treatment.",res:[]},
      {id:"s2_p2",title:"Create an Acceptable Use Policy template",cat:"GRC",type:"practice",diff:"Easy",hrs:2,xp:100,desc:"Purpose, scope, policy statements, responsibilities, enforcement.",res:[]},
      {id:"s2_p3",title:"Create an access review checklist",cat:"GRC",type:"practice",diff:"Easy",hrs:2,xp:100,desc:"Step-by-step checklist for quarterly user access review process.",res:[]},
      {id:"s2_p4",title:"Create a control matrix for 10 security controls",cat:"GRC",type:"practice",diff:"Medium",hrs:3,xp:150,desc:"Control ID, name, objective, owner, frequency, evidence, status.",res:[]},
      {id:"s2_p5",title:"Write a short report: What is GRC?",cat:"GRC",type:"practice",diff:"Easy",hrs:2,xp:100,desc:"1-2 page explainer suitable for a business stakeholder audience.",res:[]},
    ]
  },
  {
    id:"s3", month:"Month 2–3", title:"ISO 27001 + NIST CSF Deep Dive",
    goal:"Master the two most important standards for GRC roles.",
    color:"#FFFFFF", icon:"◎",
    tasks:[
      {id:"s3_01",title:"ISMS Scope and Leadership",cat:"GRC",type:"topic",diff:"Medium",hrs:2,xp:100,desc:"Defining ISMS scope, leadership commitment, information security objectives.",res:["ISO 27001"]},
      {id:"s3_02",title:"ISO 27001 Risk Assessment Process",cat:"GRC",type:"topic",diff:"Medium",hrs:3,xp:125,desc:"Asset identification, threat analysis, vulnerability assessment, risk scoring methodology.",res:[]},
      {id:"s3_03",title:"Risk Treatment and Statement of Applicability",cat:"GRC",type:"topic",diff:"Medium",hrs:2,xp:125,desc:"Treat, tolerate, transfer, terminate – and documenting SoA.",res:[]},
      {id:"s3_04",title:"ISO 27001 Annex A Controls (93 controls)",cat:"GRC",type:"topic",diff:"Medium",hrs:4,xp:175,desc:"4 themes: Organizational, People, Physical, Technological controls.",res:[]},
      {id:"s3_05",title:"Internal Audit and Management Review",cat:"GRC",type:"topic",diff:"Medium",hrs:2,xp:100,desc:"How internal audits are planned and executed, management review cycle.",res:[]},
      {id:"s3_06",title:"NIST CSF 2.0: Govern",cat:"GRC",type:"topic",diff:"Medium",hrs:2,xp:100,desc:"New in CSF 2.0 – organizational context, risk management strategy, supply chain.",res:["NIST CSF 2.0 PDF"]},
      {id:"s3_07",title:"NIST CSF 2.0: Identify + Protect",cat:"GRC",type:"topic",diff:"Medium",hrs:3,xp:125,desc:"Asset management, risk assessment, identity management, data security, awareness.",res:[]},
      {id:"s3_08",title:"NIST CSF 2.0: Detect + Respond + Recover",cat:"SOC L1",type:"topic",diff:"Medium",hrs:3,xp:125,desc:"Continuous monitoring, adverse event analysis, incident response, recovery.",res:[]},
      {id:"s3_p1",title:"Map 10 controls to NIST CSF functions",cat:"GRC",type:"practice",diff:"Medium",hrs:3,xp:150,desc:"Map each control to Govern/Identify/Protect/Detect/Respond/Recover with rationale.",res:[]},
      {id:"s3_p2",title:"Create a mini Statement of Applicability",cat:"GRC",type:"practice",diff:"Medium",hrs:3,xp:175,desc:"Select 20 Annex A controls, justify inclusion/exclusion for a small company.",res:[]},
      {id:"s3_p3",title:"Create a simple risk treatment plan",cat:"GRC",type:"practice",diff:"Medium",hrs:2,xp:125,desc:"Document treatment decisions for 5 risks with rationale, owner, timeline.",res:[]},
      {id:"s3_p4",title:"Create an internal audit checklist",cat:"GRC",type:"practice",diff:"Medium",hrs:2,xp:125,desc:"20-item checklist for auditing information security controls.",res:[]},
      {id:"s3_p5",title:"Explain ISO 27001 vs NIST CSF comparison",cat:"GRC",type:"practice",diff:"Easy",hrs:2,xp:100,desc:"One-page comparison for a business stakeholder – purpose, scope, certification.",res:[]},
    ]
  },
  {
    id:"s4", month:"Month 3–4", title:"SOC L1 Foundation",
    goal:"Understand what a SOC L1 Analyst does and how security monitoring works.",
    color:"#A3A3A3", icon:"◉",
    tasks:[
      {id:"s4_01",title:"What is SOC? Tier 1/2/3 Structure",cat:"SOC L1",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"Security Operations Center structure, roles, responsibilities at each tier.",res:[]},
      {id:"s4_02",title:"Alert Triage Process",cat:"SOC L1",type:"topic",diff:"Medium",hrs:3,xp:125,desc:"How to investigate, prioritize, and respond to security alerts systematically.",res:[]},
      {id:"s4_03",title:"False Positive vs True Positive",cat:"SOC L1",type:"topic",diff:"Easy",hrs:1,xp:50,desc:"Critical concept: distinguishing real threats from noise in SIEM alerts.",res:[]},
      {id:"s4_04",title:"Incident Severity Levels",cat:"SOC L1",type:"topic",diff:"Easy",hrs:1,xp:50,desc:"P1/Critical through P4/Low – how to classify incidents by impact.",res:[]},
      {id:"s4_05",title:"SIEM Basics",cat:"SOC L1",type:"topic",diff:"Medium",hrs:3,xp:125,desc:"Log aggregation, correlation rules, alert generation, dashboard monitoring.",res:["Splunk docs"]},
      {id:"s4_06",title:"Windows Event Logs (Key Event IDs)",cat:"SOC L1",type:"topic",diff:"Medium",hrs:2,xp:100,desc:"4624 logon, 4625 failed logon, 4648 explicit creds, 4688 process creation, 4720 user created.",res:[]},
      {id:"s4_07",title:"Linux, Firewall, and Auth Logs",cat:"SOC L1",type:"topic",diff:"Medium",hrs:3,xp:125,desc:"/var/log/auth.log, syslog, firewall deny logs – what each tells you.",res:[]},
      {id:"s4_08",title:"Phishing Investigation",cat:"SOC L1",type:"topic",diff:"Medium",hrs:3,xp:125,desc:"Email headers, sender analysis, URL inspection, attachment analysis, IOCs.",res:["PhishTool"]},
      {id:"s4_09",title:"Malware Alert Basics",cat:"SOC L1",type:"topic",diff:"Medium",hrs:2,xp:100,desc:"How malware alerts appear in SIEM, initial triage steps, containment triggers.",res:[]},
      {id:"s4_10",title:"Brute Force and Suspicious Login Detection",cat:"SOC L1",type:"topic",diff:"Medium",hrs:2,xp:100,desc:"Failed login patterns, account lockouts, impossible travel scenarios.",res:[]},
      {id:"s4_11",title:"Basic Incident Escalation",cat:"SOC L1",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"When to escalate, how to escalate, what information Tier 2 needs.",res:[]},
      {id:"s4_12",title:"MITRE ATT&CK Framework",cat:"SOC L1",type:"topic",diff:"Medium",hrs:3,xp:150,desc:"Tactics, techniques, procedures – essential reference for SOC analysts.",res:["attack.mitre.org"]},
      {id:"s4_t1",title:"Splunk Basics",cat:"Tools",type:"tool",diff:"Medium",hrs:6,xp:200,desc:"SPL searches, index exploration, creating basic dashboards and alerts.",res:["Splunk Free Training"]},
      {id:"s4_t2",title:"Microsoft Sentinel Basics",cat:"Tools",type:"tool",diff:"Medium",hrs:5,xp:175,desc:"Azure-native SIEM – KQL basics, analytic rules, workbooks.",res:["Microsoft Learn"]},
      {id:"s4_t3",title:"Wazuh Basics",cat:"Tools",type:"tool",diff:"Medium",hrs:4,xp:150,desc:"Open source SIEM/XDR – rules, decoders, active response, dashboards.",res:["Wazuh docs"]},
      {id:"s4_t4",title:"VirusTotal + AbuseIPDB + URLScan.io",cat:"Tools",type:"tool",diff:"Easy",hrs:2,xp:100,desc:"OSINT tools for investigating suspicious files, IPs, and URLs.",res:["virustotal.com","abuseipdb.com","urlscan.io"]},
      {id:"s4_c1",title:"TryHackMe SOC Level 1",cat:"Certification",type:"course",diff:"Medium",hrs:40,xp:350,desc:"Hands-on SOC analyst training: phishing, SIEM, endpoint security, threat intel.",res:["tryhackme.com"]},
      {id:"s4_p1",title:"Investigate 5 sample alerts (TryHackMe labs)",cat:"SOC L1",type:"practice",diff:"Medium",hrs:3,xp:200,desc:"Use TryHackMe SOC L1 or Blue Team Labs Online to investigate real scenarios.",res:["TryHackMe SOC Level 1"]},
      {id:"s4_p2",title:"Create alert triage checklist",cat:"SOC L1",type:"practice",diff:"Easy",hrs:2,xp:100,desc:"Step-by-step checklist for triaging any new security alert.",res:[]},
      {id:"s4_p3",title:"Analyze suspicious IP using OSINT tools",cat:"SOC L1",type:"practice",diff:"Easy",hrs:1,xp:75,desc:"Use AbuseIPDB, VirusTotal, and Shodan to investigate an IP address.",res:[]},
      {id:"s4_p4",title:"Create an incident ticket template",cat:"SOC L1",type:"practice",diff:"Easy",hrs:2,xp:100,desc:"Template: severity, timeline, affected systems, IOCs, actions taken.",res:[]},
    ]
  },
  {
    id:"s5", month:"Month 4–5", title:"Microsoft Security + Identity (SC-900)",
    goal:"Understand identity, compliance, and cloud security at the foundational level.",
    color:"#E5E5E5", icon:"◐",
    tasks:[
      {id:"s5_01",title:"Zero Trust Model",cat:"GRC",type:"topic",diff:"Easy",hrs:2,xp:100,desc:"Never trust, always verify – principles, pillars, and implementation approach.",res:["Microsoft Learn"]},
      {id:"s5_02",title:"Identity and Access Management (IAM)",cat:"GRC",type:"topic",diff:"Medium",hrs:3,xp:125,desc:"Authentication, authorization, SSO, federation, identity lifecycle management.",res:[]},
      {id:"s5_03",title:"Conditional Access Policies",cat:"GRC",type:"topic",diff:"Medium",hrs:2,xp:100,desc:"Policy-based access control – signals, conditions, grant controls in Entra ID.",res:["Microsoft Entra ID"]},
      {id:"s5_04",title:"Microsoft Entra ID Basics",cat:"Tools",type:"topic",diff:"Easy",hrs:3,xp:100,desc:"Users, groups, roles, enterprise applications, app registrations overview.",res:["Microsoft Learn"]},
      {id:"s5_05",title:"Microsoft Purview Basics",cat:"GRC",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"Data governance, compliance, sensitivity labels, DLP policies.",res:[]},
      {id:"s5_06",title:"Microsoft Defender Overview",cat:"SOC L1",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"Defender for Endpoint, Identity, Office 365 – what each product protects.",res:[]},
      {id:"s5_07",title:"Microsoft Compliance Manager",cat:"GRC",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"Compliance score, assessments, improvement actions, regulatory templates.",res:[]},
      {id:"s5_08",title:"Role-Based Access Control (RBAC)",cat:"GRC",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"Least privilege principle, built-in Azure roles, Privileged Identity Management.",res:[]},
      {id:"s5_c1",title:"Microsoft SC-900 Certification",cat:"Certification",type:"course",diff:"Medium",hrs:30,xp:500,desc:"Microsoft Security, Compliance, and Identity Fundamentals exam.",res:["Microsoft Learn SC-900"]},
      {id:"s5_p1",title:"Create IAM glossary (20+ terms)",cat:"GRC",type:"practice",diff:"Easy",hrs:2,xp:75,desc:"IAM terms with clear definitions suitable for a junior security analyst.",res:[]},
      {id:"s5_p2",title:"Create conditional access policy scenario",cat:"GRC",type:"practice",diff:"Medium",hrs:2,xp:125,desc:"Document a realistic CA policy: who, when, conditions, grant/block decision.",res:[]},
      {id:"s5_p3",title:"Microsoft security tools comparison table",cat:"GRC",type:"practice",diff:"Easy",hrs:2,xp:75,desc:"Compare Purview, Defender, Sentinel, Entra ID, Compliance Manager.",res:[]},
    ]
  },
  {
    id:"s6", month:"Month 5–6", title:"Cloud Governance + Azure Fundamentals (AZ-900)",
    goal:"Understand cloud risk, Azure basics, and cloud governance for GRC roles.",
    color:"#A3A3A3", icon:"◌",
    tasks:[
      {id:"s6_01",title:"Cloud Shared Responsibility Model",cat:"GRC",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"Who is responsible for what in IaaS, PaaS, SaaS cloud environments.",res:[]},
      {id:"s6_02",title:"Azure Governance Basics",cat:"GRC",type:"topic",diff:"Medium",hrs:3,xp:100,desc:"Management groups, subscriptions, resource groups, naming conventions.",res:["Microsoft Learn AZ-900"]},
      {id:"s6_03",title:"Azure Policy and Resource Locks",cat:"GRC",type:"topic",diff:"Medium",hrs:2,xp:100,desc:"Enforce organization standards and prevent resource changes with policy.",res:[]},
      {id:"s6_04",title:"Cloud Compliance and Data Residency",cat:"GRC",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"Where data lives, compliance certifications, sovereign cloud regions.",res:[]},
      {id:"s6_05",title:"Cloud Misconfiguration Risks",cat:"GRC",type:"topic",diff:"Medium",hrs:2,xp:100,desc:"Open storage buckets, overpermissioned roles, exposed keys – top cloud risks.",res:[]},
      {id:"s6_06",title:"Azure Monitor Basics",cat:"SOC L1",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"Metrics, alerts, diagnostic logs, Log Analytics workspace basics.",res:[]},
      {id:"s6_c1",title:"Microsoft AZ-900 Certification",cat:"Certification",type:"course",diff:"Easy",hrs:25,xp:400,desc:"Azure Fundamentals – cloud concepts, services, security, pricing, governance.",res:["Microsoft Learn AZ-900"]},
      {id:"s6_p1",title:"Create cloud risk register (10 cloud risks)",cat:"GRC",type:"practice",diff:"Medium",hrs:3,xp:150,desc:"Cloud-specific risks with likelihood, impact, controls, treatment actions.",res:[]},
      {id:"s6_p2",title:"Create Azure governance checklist",cat:"GRC",type:"practice",diff:"Medium",hrs:2,xp:125,desc:"30-item governance checklist for a new Azure environment setup.",res:[]},
      {id:"s6_p3",title:"Document 5 cloud misconfiguration examples",cat:"GRC",type:"practice",diff:"Medium",hrs:2,xp:125,desc:"Each with: description, risk, detection method, remediation steps.",res:[]},
    ]
  },
  {
    id:"s7", month:"Month 6", title:"Audit + Evidence + Reporting",
    goal:"Think and report like a GRC analyst and SOC analyst simultaneously.",
    color:"#FFFFFF", icon:"◆",
    tasks:[
      {id:"s7_01",title:"Audit Evidence Collection",cat:"GRC",type:"topic",diff:"Medium",hrs:3,xp:125,desc:"Types of evidence, screenshots, policies, logs – what auditors require for SOC 2 / ISO.",res:[]},
      {id:"s7_02",title:"Control Testing Procedures",cat:"GRC",type:"topic",diff:"Medium",hrs:3,xp:125,desc:"Walkthrough, sample testing, test of operating effectiveness explained.",res:[]},
      {id:"s7_03",title:"Findings, Gaps, and Recommendations",cat:"GRC",type:"topic",diff:"Medium",hrs:2,xp:100,desc:"How to document audit findings clearly: observation, risk, recommendation.",res:[]},
      {id:"s7_04",title:"Remediation Tracking",cat:"GRC",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"Tracking open findings to closure with owners, due dates, evidence.",res:[]},
      {id:"s7_05",title:"Alert Documentation Best Practices",cat:"SOC L1",type:"topic",diff:"Easy",hrs:2,xp:75,desc:"How SOC analysts document investigation steps and findings clearly.",res:[]},
      {id:"s7_06",title:"Incident Timeline Creation",cat:"SOC L1",type:"topic",diff:"Medium",hrs:2,xp:100,desc:"Building a chronological incident timeline from log data.",res:[]},
      {id:"s7_07",title:"Security Reporting for Management",cat:"GRC",type:"topic",diff:"Medium",hrs:2,xp:100,desc:"Dashboard KPIs, metrics, executive summaries – communicating risk to leadership.",res:[]},
      {id:"s7_p1",title:"Create audit evidence tracker",cat:"GRC",type:"practice",diff:"Medium",hrs:3,xp:150,desc:"Excel tracker: control ID, evidence type, status, owner, date collected.",res:[]},
      {id:"s7_p2",title:"Create remediation tracker",cat:"GRC",type:"practice",diff:"Medium",hrs:2,xp:125,desc:"Track findings from open to closed with owner, target date, evidence.",res:[]},
      {id:"s7_p3",title:"Write a SOC alert investigation report",cat:"SOC L1",type:"practice",diff:"Medium",hrs:2,xp:125,desc:"Document a simulated alert investigation with full analysis and timeline.",res:[]},
      {id:"s7_p4",title:"Create weekly security summary report",cat:"SOC L1",type:"practice",diff:"Medium",hrs:2,xp:125,desc:"Weekly summary: alerts triaged, incidents opened/closed, open items, trends.",res:[]},
      {id:"s7_p5",title:"Create 5-slide management security summary",cat:"GRC",type:"practice",diff:"Medium",hrs:3,xp:150,desc:"Executive deck: risk posture, top risks, compliance status, key actions.",res:[]},
    ]
  },
];

export const DEFAULT_PORTFOLIO = [
  {id:"pp1",icon:"■",title:"GRC Risk Register",diff:"Medium",hrs:6,xp:350,desc:"Excel/Google Sheets – 15+ risks, risk owner, impact, likelihood, score, controls, residual risk, treatment plan."},
  {id:"pp2",icon:"■",title:"ISO 27001 Control Matrix",diff:"Medium",hrs:8,xp:400,desc:"Control ID, name, objective, evidence required, owner, status, gap, recommendation."},
  {id:"pp3",icon:"■",title:"NIST CSF Mapping Project",diff:"Medium",hrs:5,xp:300,desc:"Map sample controls to all 6 NIST CSF 2.0 functions with justification and evidence."},
  {id:"pp4",icon:"■",title:"Access Review Project",diff:"Easy",hrs:4,xp:225,desc:"User list, roles, access level, review status, remove/keep decision, evidence screenshot."},
  {id:"pp5",icon:"■",title:"SOC Alert Triage Playbook",diff:"Hard",hrs:8,xp:450,desc:"5 alert types – description, data sources, investigation steps, escalation criteria, false positive reasons."},
  {id:"pp6",icon:"■",title:"Phishing Investigation Report",diff:"Medium",hrs:4,xp:275,desc:"Sender analysis, domain lookup, URL inspection, attachment IOCs, verdict, recommended actions."},
  {id:"pp7",icon:"■",title:"Security Dashboard Mockup",diff:"Hard",hrs:6,xp:400,desc:"KPIs, open/closed incidents, high-risk findings, compliance status, remediation progress."},
  {id:"pp8",icon:"■",title:"LinkedIn Cybersecurity Profile",diff:"Easy",hrs:3,xp:175,desc:"Headline, about section, featured posts, skills endorsements, project highlights."},
];

export const CERTIFICATIONS = [
  {id:"c1",title:"Google Cybersecurity Certificate",                                priority:"High",     pColor:"#F59E0B",provider:"Coursera",      xp:500},
  {id:"c2",title:"Microsoft SC-900",                                               priority:"Very High",pColor:"#EF4444",provider:"Microsoft Learn",xp:600},
  {id:"c3",title:"Microsoft AZ-900",                                               priority:"High",     pColor:"#F59E0B",provider:"Microsoft Learn",xp:500},
  {id:"c4",title:"Cybersecurity Compliance Framework, Standards & Regulations",    priority:"High",     pColor:"#F59E0B",provider:"Coursera",      xp:400},
  {id:"c5",title:"Information Security Risk Management for ISO 27001/ISO 27002",   priority:"High",     pColor:"#F59E0B",provider:"Udemy",         xp:400},
  {id:"c6",title:"TryHackMe Pre Security",                                         priority:"Medium",   pColor:"#10B981",provider:"TryHackMe",     xp:250},
  {id:"c7",title:"TryHackMe Cyber Security 101",                                   priority:"Medium",   pColor:"#10B981",provider:"TryHackMe",     xp:250},
  {id:"c8",title:"TryHackMe SOC Level 1",                                          priority:"Medium",   pColor:"#10B981",provider:"TryHackMe",     xp:350},
  {id:"c9",title:"ISO 27001 Foundation",                                           priority:"Optional", pColor:"#64748B",provider:"PECB / IRCA",  xp:450},
  {id:"c10",title:"CompTIA Security+",                                             priority:"Optional", pColor:"#64748B",provider:"CompTIA",      xp:700},
];

export const GRC_SKILLS = ["Risk Management","ISO 27001","NIST CSF","IT Governance","Compliance","Security Policies","Audit Evidence","Access Review","Third-Party Risk","Control Testing","Gap Analysis","Remediation Tracking","Management Reporting"];
export const SOC_SKILLS = ["Alert Triage","SIEM Basics","Log Analysis","Windows Event Logs","Linux Logs","Phishing Analysis","Suspicious Login Investigation","Brute Force Detection","Malware Alert Basics","Incident Escalation","IOC Analysis","MITRE ATT&CK Basics","Ticket Documentation"];
export const TOOL_SKILLS = ["Excel / Google Sheets","Google Docs / Word","PowerPoint / Slides","Notion","Draw.io / Lucidchart","Microsoft Entra ID","Microsoft Purview","Microsoft Defender","Compliance Manager","Azure Policy","Splunk basics","Microsoft Sentinel","Wazuh basics","VirusTotal","AbuseIPDB","URLScan.io","Jira","ServiceNow GRC"];

export const JOB_TASKS = [
  {id:"jt1",title:"Create cybersecurity CV",desc:"Tailored CV with skills, projects, certifications, and education."},
  {id:"jt2",title:"Build LinkedIn profile",desc:"Professional headline, about section, featured posts, skills."},
  {id:"jt3",title:"Upload 3 portfolio projects to GitHub",desc:"GRC Risk Register, NIST CSF Mapping, SOC Playbook."},
  {id:"jt4",title:"Apply to 10 internships",desc:"Track applications: company, role, date, status, contacts."},
  {id:"jt5",title:"Apply to 10 junior analyst roles",desc:"SOC L1, Junior GRC, InfoSec roles on LinkedIn, hh.kz, Enbek.kz."},
  {id:"jt6",title:"Prepare answers for HR interview",desc:"Tell me about yourself, why cybersecurity, strengths/weaknesses."},
  {id:"jt7",title:"Prepare technical interview answers",desc:"GRC and SOC L1 technical questions with clear structured answers."},
  {id:"jt8",title:"Prepare 3 STAR stories",desc:"Problem solved, project built, challenge overcome – using STAR format."},
  {id:"jt9",title:"Create target companies list",desc:"KPMG, Deloitte, PwC, EY, banks, telco, fintech, IT consulting in KZ."},
];
export const JOB_ROLES = ["GRC Intern","Junior GRC Analyst","Information Security Intern","IT Risk Intern","Technology Risk Intern","IT Audit Intern","Risk Advisory Intern","Compliance Analyst Intern","Cybersecurity Compliance Intern","Junior Information Security Analyst","Third Party Risk Intern","Security Governance Intern","SOC L1 Analyst","Junior SOC Analyst","Security Monitoring Analyst","Cyber Defense Analyst Intern"];
export const JOB_PLATFORMS = ["LinkedIn","hh.kz","Enbek.kz","KPMG Careers","Deloitte Careers","PwC Careers","EY Careers","Banks","Fintech","Telecom","IT Consulting","Cybersecurity Companies"];

export const INTERVIEW_GRC = [
  {q:"What is a control?",a:"A control is a safeguard or countermeasure that reduces risk to an acceptable level. Controls can be preventive (stop something from happening), detective (identify when it happens), or corrective (fix it after it occurs)."},
  {q:"What is audit evidence?",a:"Documentation collected to prove a control exists and operates effectively. Examples: policy documents, screenshots of system configurations, access logs, and periodic review records."},
  {q:"What is a risk owner?",a:"The person accountable for ensuring a risk is monitored, treated, and reported. They are responsible for the risk outcome even if a control owner implements the actual safeguards."},
  {q:"What is residual risk?",a:"The risk remaining after controls are applied. It represents the accepted level of exposure after all reasonable mitigations are in place. Organizations explicitly accept residual risk."},
  {q:"What is inherent risk?",a:"The level of risk that exists before any controls are applied. It represents the raw exposure – what would happen if you did nothing to mitigate the threat."},
  {q:"What is Policy vs Standard vs Procedure?",a:"Policy: high-level intent and direction. Standard: specific mandatory requirements that must be met. Procedure: step-by-step operational instructions for implementing the standard."},
  {q:"What is the difference between ISO 27001 and NIST CSF?",a:"ISO 27001 is a certifiable standard requiring an ISMS with formal audits. NIST CSF is a voluntary framework for improving cybersecurity posture. ISO is prescriptive and compliance-focused; NIST CSF is flexible and risk-focused."},
  {q:"What is an access review?",a:"A periodic process where user access rights are validated to ensure users only retain access appropriate to their current role. Reviewers confirm, modify, or revoke access, documenting their decisions as audit evidence."},
  {q:"What is third-party risk?",a:"Risk from vendors, partners, or service providers who have access to your organization's data or systems. Requires initial due diligence and ongoing monitoring throughout the relationship."},
  {q:"What is Statement of Applicability (SoA)?",a:"An ISO 27001 document listing all Annex A controls with justification for inclusion or exclusion for the specific ISMS scope. It links the risk treatment plan to selected controls."},
];
export const INTERVIEW_SOC = [
  {q:"What is SIEM?",a:"Security Information and Event Management – a platform that aggregates logs from multiple sources, correlates events using rules, and generates alerts for analysts to investigate. Examples: Splunk, Microsoft Sentinel, Elastic SIEM."},
  {q:"What is alert triage?",a:"The process of reviewing, prioritizing, and investigating security alerts to determine if they are real threats (true positives) or benign activity (false positives), then taking appropriate action."},
  {q:"What is a false positive?",a:"An alert that fires for a benign event – the SIEM incorrectly flags normal activity as a threat. Example: a backup script triggering a mass data access alert. Reducing false positives improves SOC efficiency."},
  {q:"What is an IOC?",a:"Indicator of Compromise – evidence that a system may have been breached. Examples: malicious IP addresses, file hashes (MD5/SHA256), domains, registry keys, or network signatures."},
  {q:"What is phishing?",a:"A social engineering attack where attackers send deceptive emails to trick users into revealing credentials, clicking malicious links, or executing malware attachments. It remains the #1 initial access vector."},
  {q:"What logs would you check for a suspicious login?",a:"Windows Security Event Log (IDs 4624, 4625, 4648), Azure AD/Entra sign-in logs, VPN authentication logs, and firewall logs – looking for unusual IPs, times, locations, or repeated failures."},
  {q:"When would you escalate an alert?",a:"Escalate when: the alert is a confirmed true positive, severity is high or critical, data exfiltration is suspected, the scope is unclear, you've exhausted your L1 playbook, or the ticket SLA is about to breach."},
  {q:"What is a brute force attack?",a:"An attack that attempts to guess credentials by trying many password combinations rapidly. In logs, visible as many failed authentication events (4625) from the same source IP in a short timeframe."},
  {q:"What is MITRE ATT&CK?",a:"A knowledge base of adversary tactics, techniques, and procedures (TTPs) based on real-world threat intelligence. Used for detection engineering, threat hunting, and mapping alert coverage to known attacker behaviors."},
  {q:"What is incident severity?",a:"P1/Critical: business-stopping breach. P2/High: major impact on core systems. P3/Medium: moderate impact, workaround exists. P4/Low: minimal impact or informational. Severity guides response speed and escalation."},
];

export const LINKEDIN_HEADLINE = "Aspiring Cybersecurity GRC / SOC Analyst | Risk Management | ISO 27001 | NIST CSF | SC-900 | SIEM | Security Monitoring";
export const LINKEDIN_ABOUT = `Aspiring Cybersecurity professional focused on GRC (Governance, Risk, and Compliance) and SOC (Security Operations) roles. Currently building hands-on skills in ISO 27001, NIST CSF 2.0, Microsoft security tools (SC-900, AZ-900), SIEM platforms, and alert triage.

Building a portfolio of GRC deliverables: Risk Registers, Control Matrices, NIST CSF mappings, and SOC Playbooks that demonstrate job-ready skills.

Target roles: GRC Intern, Junior GRC Analyst, SOC L1 Analyst, Information Security Intern, IT Risk Intern.

Do not learn forever. Build, document, apply.`;
export const LINKEDIN_SKILLS = ["GRC","Risk Management","ISO 27001","NIST CSF","IT Governance","Compliance","Security Policies","Access Control","Audit Evidence","Microsoft Security","Azure Fundamentals","Cloud Governance","SIEM","SOC Analysis","Alert Triage","Incident Response","Log Analysis","Phishing Analysis","Information Security","Third-Party Risk"];

export const MOTIVATIONAL_MSGS = [
  "Building job-ready cybersecurity skills.",
  "Junior roles need proof, not perfection.",
  "Do not learn forever. Build, document, apply.",
  "Every completed task is evidence on your resume.",
  "GRC + SOC L1 = the most in-demand combo for juniors.",
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
  const s4 = sections.find(s => s.id === "s4");
  const siemTools = s4 ? s4.tasks.filter(t => t.type === "tool") : [];
  const siemDone = siemTools.length ? siemTools.filter(t => taskStatus[t.id] === "completed").length / siemTools.length : 0;
  const jobPct = Object.values(jobStatus).filter(Boolean).length / Math.max(JOB_TASKS.length, 1);
  const allSectionIds = ["s1","s2","s3","s4","s5","s6","s7"];
  return [
    {id:"b1",icon:"◇",title:"GRC Beginner",       desc:"Complete 50%+ of GRC Foundation",           earned:sectionPct("s2")>=0.5},
    {id:"b2",icon:"◉",title:"SOC Rookie",          desc:"Complete 50%+ of SOC L1 Foundation",        earned:sectionPct("s4")>=0.5},
    {id:"b3",icon:"■",title:"Risk Register Builder",desc:"Complete GRC Risk Register project",       earned:!!portfolioStatus["pp1"]},
    {id:"b4",icon:"■",title:"ISO 27001 Explorer",  desc:"Complete 70%+ of ISO + NIST section",       earned:sectionPct("s3")>=0.7},
    {id:"b5",icon:"◌",title:"SIEM Starter",        desc:"Complete all SOC L1 tool tasks",             earned:siemDone>=1.0&&siemTools.length>0},
    {id:"b6",icon:"■",title:"Job Search Ready",    desc:"Complete 70%+ of job search tasks",          earned:jobPct>=0.7},
    {id:"b7",icon:"◆",title:"Foundation Master",   desc:"Complete 80%+ of Cybersecurity Foundation", earned:sectionPct("s1")>=0.8},
    {id:"b8",icon:"◆",title:"Full Stack Analyst",  desc:"All 7 sections at 80%+",                     earned:allSectionIds.every(id=>sectionPct(id)>=0.8)},
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