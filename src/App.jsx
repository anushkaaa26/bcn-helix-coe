import React, { useState, useMemo, useEffect, useRef } from 'react';

const CASES = [
  {
    id: 'glp1-osa',
    code: 'BCN-HC-401',
    name: 'GLP-1 & Obstructive Sleep Apnea (OSA) MedTech Spillover',
    clientType: 'Global MedTech & Biopharma PE Consortium',
    geography: 'US & EU5',
    basePopM: 84.5,
    defaultDiagRate: 32,
    defaultTreatRate: 46,
    defaultGlp1Impact: -11,
    defaultCmsHaircut: -4,
    baseAspCommercial: 2450,
    baseAspMedicare: 1380,
    baseAspMedicaid: 980,
    commercialMix: 54,
    medicareMix: 34,
    medicaidMix: 12,
    valueChainPoolB: 68.4,
    valueChainShares: [
      { sector: 'Pharmaceuticals (GLP-1 / Incretins)', share: 38, margin: 34, color: '#111827', sub: 'Eli Lilly, Novo Nordisk, Amgen' },
      { sector: 'MedTech (PAP & Neuro-Implants)', share: 24, margin: 27, color: '#CC0000', sub: 'ResMed, Inspire Medical, Philips' },
      { sector: 'Providers (Sleep Labs & ASC)', share: 18, margin: 16, color: '#334155', sub: 'Outpatient Sleep Centers, IDNs' },
      { sector: 'Payers & PBMs', share: 12, margin: 9, color: '#64748B', sub: 'UnitedHealth, CVS Caremark' },
      { sector: 'Digital Health (Home Sleep Tests)', share: 8, margin: 41, color: '#0F766E', sub: 'WatchPAT, Wesper, Oura Clinical' },
    ],
    keyHypothesis: 'While GLP-1 adoption reduces mild-to-moderate OSA progression by ~11%, severe OSA diagnostic funnel awareness expands top-of-funnel sleep testing volume by +24%, creating net-positive tailwinds for connected PAP and hypoglossal nerve implants.'
  },
  {
    id: 'cardiac-rpm',
    code: 'BCN-HC-402',
    name: 'Next-Gen Ambulatory Cardiac Telemetry & AI Arrhythmia RPM',
    clientType: 'Megafund Healthcare Private Equity (Buyout CDD)',
    geography: 'North America & APAC',
    basePopM: 42.0,
    defaultDiagRate: 48,
    defaultTreatRate: 58,
    defaultGlp1Impact: 6,
    defaultCmsHaircut: -7,
    baseAspCommercial: 690,
    baseAspMedicare: 385,
    baseAspMedicaid: 275,
    commercialMix: 46,
    medicareMix: 44,
    medicaidMix: 10,
    valueChainPoolB: 29.5,
    valueChainShares: [
      { sector: 'MedTech (Wearable Biosensors)', share: 34, margin: 29, color: '#CC0000', sub: 'iRhythm, Boston Scientific, Abbott' },
      { sector: 'Digital Health (AI ECG Triage SaaS)', share: 22, margin: 44, color: '#0F766E', sub: 'Cardiologs, Biofourmis, HeartFlow' },
      { sector: 'Providers (Cardiology Groups & IDNs)', share: 24, margin: 19, color: '#111827', sub: 'HCA, Outpatient EP Clinics' },
      { sector: 'Payers (CMS & Commercial)', share: 14, margin: 11, color: '#64748B', sub: 'Medicare Part B, Elevance' },
      { sector: 'Pharma (Anticoagulant Pull-Through)', share: 6, margin: 36, color: '#334155', sub: 'BMS/Pfizer Eliquis Ecosystem' },
    ],
    keyHypothesis: 'Transition from legacy 48-hour Holter monitors to 14-day AI-enabled patch monitors captures 3.1x higher AFib detection yield, insulating market leaders against CMS CPT-code reimbursement compression through outpatient hospital cost avoidance.'
  },
  {
    id: 'ortho-asc',
    code: 'BCN-HC-403',
    name: 'Robotic Outpatient Orthopedic & Spine ASC Roll-Up Strategy',
    clientType: 'Global MedTech Strategics & Provider Roll-Up PE',
    geography: 'US Sunbelt & Western Europe',
    basePopM: 31.8,
    defaultDiagRate: 62,
    defaultTreatRate: 39,
    defaultGlp1Impact: 8,
    defaultCmsHaircut: -2,
    baseAspCommercial: 14200,
    baseAspMedicare: 8600,
    baseAspMedicaid: 6100,
    commercialMix: 58,
    medicareMix: 35,
    medicaidMix: 7,
    valueChainPoolB: 92.0,
    valueChainShares: [
      { sector: 'Providers (Outpatient ASCs)', share: 36, margin: 24, color: '#CC0000', sub: 'USPI / Tenet, SCA Health, Surgery Partners' },
      { sector: 'MedTech (Robotics & Ortho Implants)', share: 31, margin: 32, color: '#0F766E', sub: 'Stryker Mako, Zimmer Biomet, Globus' },
      { sector: 'Payers (Site-of-Care Redirection)', share: 17, margin: 13, color: '#111827', sub: 'Optum, Cigna, CMS Bundled Payments' },
      { sector: 'Digital Health (Pre/Post-Op Rehab)', share: 9, margin: 38, color: '#334155', sub: 'Hinge Health, Sword Health' },
      { sector: 'Specialty Biologics & Pain Pharma', share: 7, margin: 28, color: '#64748B', sub: 'Pacira BioSciences, Orthobiologics' },
    ],
    keyHypothesis: 'GLP-1 weight loss unlocks surgical eligibility for high-BMI osteoarthritic patients previously disqualified from outpatient total knee arthroplasty (TKA), accelerating inpatient-to-ASC migration and expanding ASC EBITDA margins by +420 bps.'
  },
  {
    id: 'oncology-adc',
    code: 'BCN-HC-404',
    name: 'Antibody-Drug Conjugates (ADC) & AI Companion Diagnostics CDD',
    clientType: 'Top-5 Global Biopharma Corporate M&A Team',
    geography: 'Global (US, EU, Japan, APAC)',
    basePopM: 14.2,
    defaultDiagRate: 71,
    defaultTreatRate: 52,
    defaultGlp1Impact: 2,
    defaultCmsHaircut: -5,
    baseAspCommercial: 48500,
    baseAspMedicare: 36200,
    baseAspMedicaid: 28900,
    commercialMix: 51,
    medicareMix: 41,
    medicaidMix: 8,
    valueChainPoolB: 118.5,
    valueChainShares: [
      { sector: 'Pharmaceuticals (ADC & Bispecifics)', share: 49, margin: 39, color: '#CC0000', sub: 'Daiichi Sankyo, AstraZeneca, Pfizer/Seagen' },
      { sector: 'MedTech / Diagnostics (Liquid Biopsy CDx)', share: 21, margin: 31, color: '#0F766E', sub: 'Guardant Health, Roche Diagnostics, Illumina' },
      { sector: 'Digital Health (AI Pathology Biomarkers)', share: 12, margin: 46, color: '#111827', sub: 'Tempus AI, PathAI, Paige' },
      { sector: 'Providers (NCI Cancer Centers & Infusion)', share: 11, margin: 15, color: '#334155', sub: 'McKesson US Oncology, Community Infusion' },
      { sector: 'Payers & Specialty Pharmacy', share: 7, margin: 8, color: '#64748B', sub: 'IRA Medicare Negotiation, Specialty PBMs' },
    ],
    keyHypothesis: 'Bundling AI-driven computational pathology biomarkers with TROP2/HER2-low Antibody-Drug Conjugates elevates Phase III trial Probability of Technical and Regulatory Success (PTRS) from 48% to 74%, justifying a 4.5x EV/Peak-Sales buyout premium.'
  }
];

const TARGET_COMPANIES = [
  { id: 'RMD', name: 'ResMed Inc.', ticker: 'NYSE: RMD', domain: 'MedTech', subSector: 'Connected Sleep & Respiratory Care', evB: 34.2, revCagr: 11.4, ebitdaMargin: 33.8, rdIntensity: 7.2, evEbitda: 19.8, fdaCatalyst: 'AirSense 11 AI Cloud Compliance Suite + GLP-1 Co-Therapy Registry', ptrs: 92, patentLoE: 2033 },
  { id: 'INSP', name: 'Inspire Medical Systems', ticker: 'NYSE: INSP', domain: 'MedTech', subSector: 'Hypoglossal Nerve Stimulation (HGNS)', evB: 5.8, revCagr: 24.5, ebitdaMargin: 18.2, rdIntensity: 15.8, evEbitda: 34.5, fdaCatalyst: 'Inspire V Next-Gen Leadless Neurostimulator PMA Approval', ptrs: 84, patentLoE: 2036 },
  { id: 'IRTC', name: 'iRhythm Technologies', ticker: 'NASDAQ: IRTC', domain: 'Digital Health', subSector: 'Zio Ambulatory Cardiac Telemetry & AI', evB: 3.1, revCagr: 19.8, ebitdaMargin: 14.5, rdIntensity: 12.4, evEbitda: 31.2, fdaCatalyst: 'Zio Monitor Predictive Silent AFib AI Algorithm Clearance', ptrs: 81, patentLoE: 2034 },
  { id: 'DXCM', name: 'Dexcom, Inc.', ticker: 'NASDAQ: DXCM', domain: 'MedTech', subSector: 'Continuous Glucose & Metabolic Biosensors', evB: 31.5, revCagr: 16.2, ebitdaMargin: 28.4, rdIntensity: 11.9, evEbitda: 24.9, fdaCatalyst: 'Stelo OTC Basal & Non-Insulin GLP-1 Companion Sensor Expansion', ptrs: 94, patentLoE: 2035 },
  { id: 'SYK-ASC', name: 'Stryker Mako ASC Solutions', ticker: 'NYSE: SYK', domain: 'Providers', subSector: 'Robotic Ortho & Spine ASC Infrastructure', evB: 14.6, revCagr: 15.1, ebitdaMargin: 29.6, rdIntensity: 8.5, evEbitda: 17.3, fdaCatalyst: 'Mako Spine & Shoulder Autonomous Haptic Guidance 510(k)', ptrs: 89, patentLoE: 2034 },
  { id: 'TEM', name: 'Tempus AI Oncology & CDx', ticker: 'NASDAQ: TEM', domain: 'Digital Health', subSector: 'Multimodal Precision Oncology & Algorithmic CDx', evB: 7.4, revCagr: 28.4, ebitdaMargin: 12.1, rdIntensity: 21.0, evEbitda: 41.0, fdaCatalyst: 'xT CDx & Algorithmic ADC Companion Biomarker FDA IVD Approval', ptrs: 76, patentLoE: 2037 },
  { id: 'GH', name: 'Guardant Health', ticker: 'NASDAQ: GH', domain: 'Diagnostics', subSector: 'Liquid Biopsy MRD & Shield Colorectal Screening', evB: 4.3, revCagr: 22.0, ebitdaMargin: 11.4, rdIntensity: 24.5, evEbitda: 36.8, fdaCatalyst: 'Shield CMS National Coverage Determination (NCD) & Multi-Cancer Readout', ptrs: 82, patentLoE: 2035 },
  { id: 'SGRY', name: 'Surgery Partners Inc.', ticker: 'NASDAQ: SGRY', domain: 'Providers', subSector: 'Short-Stay Surgical Facilities & Ortho/Cardio ASCs', evB: 6.9, revCagr: 12.8, ebitdaMargin: 17.9, rdIntensity: 1.8, evEbitda: 11.9, fdaCatalyst: 'CMS Hospital Outpatient Prospective Payment (OPPS) Cardiology Expansion', ptrs: 95, patentLoE: 2038 }
];

// Smooth rAF number tween hook (from Kimi's design)
function useTweenNumber(value, decimals = 2, duration = 260) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const startVal = prevRef.current;
    const endVal = value;
    if (startVal === endVal) return;
    let startTime = null;
    let rafId = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (endVal - startVal) * eased;
      setDisplay(current);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        prevRef.current = endVal;
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [value, duration]);

  return Number(display).toFixed(decimals);
}

const Icons = {
  Linechart: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 3.085C4.552 3.085 5 3.533 5 4.085V18.036H19.994C20.6 18.092 20.994 18.518 20.994 19.036C20.994 19.554 20.6 19.98 19.994 20.036H5C3.895 20.036 3 19.141 3 18.036V4.085C3 3.533 3.448 3.085 4 3.085ZM18.263 6.517C18.632 6.106 19.264 6.072 19.675 6.44C20.086 6.809 20.12 7.442 19.751 7.853L15.868 12.179C15.155 12.973 13.944 13.068 13.116 12.394L10.912 10.597L7.451 14.66C7.093 15.081 6.461 15.132 6.041 14.773C5.621 14.415 5.57 13.784 5.928 13.363L9.39 9.3C10.095 8.472 11.332 8.36 12.175 9.047L14.38 10.843L18.263 6.517Z" fill="currentColor"/>
    </svg>
  ),
  Histogram: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 3.332C4.552 3.332 5 3.78 5 4.332V18.091H20.067C20.62 18.091 21.067 18.539 21.067 19.091C21.067 19.643 20.62 20.091 20.067 20.091H5C3.895 20.091 3 19.195 3 18.091V4.332C3 3.78 3.448 3.332 4 3.332ZM8.199 9.284C8.752 9.284 9.199 9.732 9.199 10.284V15.605C9.199 16.157 8.751 16.605 8.199 16.605C7.647 16.604 7.199 16.157 7.199 15.605V10.284C7.199 9.732 7.647 9.284 8.199 9.284ZM17.223 6.856C17.775 6.857 18.223 7.304 18.223 7.856V15.605C18.223 16.157 17.775 16.604 17.223 16.605C16.671 16.605 16.223 16.157 16.223 15.605V7.856C16.223 7.304 16.67 6.856 17.223 6.856ZM12.711 3.964C13.263 3.964 13.711 4.412 13.711 4.964V15.604C13.711 16.156 13.263 16.604 12.711 16.604C12.159 16.604 11.711 16.156 11.711 15.604V4.964C11.711 4.412 12.159 3.964 12.711 3.964Z" fill="currentColor"/>
    </svg>
  ),
  Download: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2.9C12.497 2.9 12.9 3.303 12.9 3.8V12.294L15.808 9.386C16.16 9.034 16.729 9.034 17.081 9.386C17.432 9.737 17.432 10.307 17.081 10.659L12.636 15.103C12.285 15.455 11.715 15.455 11.364 15.103L6.919 10.659C6.568 10.307 6.568 9.737 6.919 9.386C7.271 9.034 7.84 9.034 8.192 9.386L11.1 12.294V3.8C11.1 3.303 11.503 2.9 12 2.9ZM4 13.587C4.497 13.587 4.9 13.99 4.9 14.487V18.043C4.9 18.528 5.293 18.921 5.778 18.921H18.222C18.707 18.921 19.1 18.528 19.1 18.043V14.487C19.1 13.99 19.503 13.587 20 13.587C20.497 13.587 20.9 13.99 20.9 14.487V18.043C20.9 19.522 19.701 20.721 18.222 20.721H5.778C4.299 20.721 3.1 19.522 3.1 18.043V14.487C3.1 13.99 3.503 13.587 4 13.587Z" fill="currentColor"/>
    </svg>
  ),
  Check: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M19.303 5.905C19.654 5.554 20.225 5.554 20.576 5.905C20.927 6.257 20.927 6.827 20.576 7.179L9.659 18.095C9.308 18.446 8.738 18.446 8.387 18.095L3.424 13.133C3.073 12.781 3.073 12.212 3.424 11.86C3.775 11.509 4.346 11.509 4.697 11.86L9.022 16.186L19.303 5.905Z" fill="currentColor"/>
    </svg>
  ),
  Document: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M15.48 15.497H8.52C8.023 15.497 7.62 15.9 7.62 16.398C7.62 16.895 8.023 17.298 8.52 17.298H15.48C15.977 17.298 16.38 16.895 16.38 16.398C16.38 15.9 15.977 15.497 15.48 15.497ZM12.336 11.1H8.52C8.023 11.1 7.62 11.503 7.62 12C7.62 12.497 8.023 12.9 8.52 12.9H12.336C12.833 12.9 13.235 12.497 13.235 12C13.235 11.503 12.833 11.1 12.336 11.1Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M13.172 2.1C13.941 2.1 14.679 2.406 15.223 2.949L19.051 6.777C19.595 7.321 19.9 8.059 19.9 8.828V18C19.9 20.154 18.154 21.9 16 21.9H8C5.846 21.9 4.1 20.154 4.1 18V6C4.1 3.846 5.846 2.1 8 2.1H13.172ZM8 3.9C6.84 3.901 5.9 4.84 5.9 6V18C5.9 19.16 6.84 20.099 8 20.1H16C17.16 20.1 18.1 19.16 18.1 18V9.9H15C13.399 9.9 12.1 8.602 12.1 7V3.9H8Z" fill="currentColor"/>
    </svg>
  )
};

export default function App() {
  const [selectedCaseId, setSelectedCaseId] = useState('glp1-osa');
  const [activeTab, setActiveTab] = useState('funnel');
  const [selectedTargetId, setSelectedTargetId] = useState('INSP');
  const [domainFilter, setDomainFilter] = useState('All');
  const [presetMode, setPresetMode] = useState('base');
  const [hoveredSector, setHoveredSector] = useState(null);
  const [copiedBlurb, setCopiedBlurb] = useState(false);

  const activeCase = useMemo(
    () => CASES.find((c) => c.id === selectedCaseId) || CASES[0],
    [selectedCaseId]
  );

  const [diagRate, setDiagRate] = useState(activeCase.defaultDiagRate);
  const [treatRate, setTreatRate] = useState(activeCase.defaultTreatRate);
  const [glp1Impact, setGlp1Impact] = useState(activeCase.defaultGlp1Impact);
  const [cmsHaircut, setCmsHaircut] = useState(activeCase.defaultCmsHaircut);
  const [commercialMixShift, setCommercialMixShift] = useState(0);
  const [targetShare2031, setTargetShare2031] = useState(24);
  const [waccDiscount, setWaccDiscount] = useState(9.5);

  const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

  const applyPreset = (mode, caseObj = activeCase) => {
    setPresetMode(mode);
    if (mode === 'base') {
      setDiagRate(caseObj.defaultDiagRate);
      setTreatRate(caseObj.defaultTreatRate);
      setGlp1Impact(caseObj.defaultGlp1Impact);
      setCmsHaircut(caseObj.defaultCmsHaircut);
      setCommercialMixShift(0);
      setTargetShare2031(24);
      setWaccDiscount(9.5);
    } else if (mode === 'conservative') {
      setDiagRate(clamp(caseObj.defaultDiagRate - 10, 15, 85));
      setTreatRate(clamp(caseObj.defaultTreatRate - 6, 20, 85));
      setGlp1Impact(clamp(caseObj.defaultGlp1Impact - 10, -25, 25));
      setCmsHaircut(clamp(caseObj.defaultCmsHaircut - 8, -20, 10));
      setCommercialMixShift(-5);
      setTargetShare2031(16);
      setWaccDiscount(11.0);
    } else if (mode === 'aggressive') {
      setDiagRate(clamp(caseObj.defaultDiagRate + 8, 15, 85));
      setTreatRate(clamp(caseObj.defaultTreatRate + 7, 20, 85));
      setGlp1Impact(clamp(caseObj.defaultGlp1Impact + 6, -25, 25));
      setCmsHaircut(clamp(caseObj.defaultCmsHaircut + 2, -20, 10));
      setCommercialMixShift(6);
      setTargetShare2031(34);
      setWaccDiscount(8.5);
    }
  };

  const handleSelectCase = (caseId) => {
    const found = CASES.find((c) => c.id === caseId);
    if (!found) return;
    setSelectedCaseId(caseId);
    applyPreset('base', found);
  };

  const selectedTarget = useMemo(
    () => TARGET_COMPANIES.find((t) => t.id === selectedTargetId) || TARGET_COMPANIES[0],
    [selectedTargetId]
  );

  const modelMetrics = useMemo(() => {
    const popM = activeCase.basePopM;
    const diagnosedM = +(popM * (diagRate / 100)).toFixed(2);
    const treatedBaseM = +(diagnosedM * (treatRate / 100)).toFixed(2);
    const glp1AdjustedTreatedM = +(treatedBaseM * (1 + glp1Impact / 100)).toFixed(2);

    const commShare = clamp(activeCase.commercialMix + commercialMixShift, 20, 80);
    const medShare = Math.max(10, activeCase.medicareMix - Math.round(commercialMixShift * 0.7));
    const caidShare = Math.max(5, 100 - commShare - medShare);

    const effectiveMedicareAsp = activeCase.baseAspMedicare * (1 + cmsHaircut / 100);
    const blendedAsp =
      (commShare / 100) * activeCase.baseAspCommercial +
      (medShare / 100) * effectiveMedicareAsp +
      (caidShare / 100) * activeCase.baseAspMedicaid;

    const tam2026B = +((popM * blendedAsp) / 1000).toFixed(2);
    const sam2026B = +((diagnosedM * blendedAsp) / 1000).toFixed(2);
    const addressableMarket2026B = +((treatedBaseM * blendedAsp) / 1000).toFixed(2);

    const demographicEffectB = +(addressableMarket2026B * 0.19).toFixed(2);
    const diagnosisExpansionB = +(addressableMarket2026B * ((diagRate - activeCase.defaultDiagRate + 14) / 100)).toFixed(2);
    const glp1SpilloverEffectB = +(addressableMarket2026B * (glp1Impact / 100)).toFixed(2);
    const payerMixReimbEffectB = +(
      addressableMarket2026B *
      ((cmsHaircut * (medShare / 100) + commercialMixShift * 0.45) / 100)
    ).toFixed(2);

    const serviceable2031B = Math.max(
      1.2,
      +(
        addressableMarket2026B +
        demographicEffectB +
        diagnosisExpansionB +
        glp1SpilloverEffectB +
        payerMixReimbEffectB
      ).toFixed(2)
    );

    const som2031B = +((serviceable2031B * targetShare2031) / 100).toFixed(2);
    const impliedCagr = +(
      (Math.pow(serviceable2031B / Math.max(0.5, addressableMarket2026B), 1 / 5) - 1) *
      100
    ).toFixed(1);

    const ptrsFactor = selectedTarget.ptrs / 100;
    const discountFactor = Math.pow(1 + waccDiscount / 100, 5);
    const terminalEbitdaB = som2031B * (selectedTarget.ebitdaMargin / 100);
    const unadjustedExitEvB = terminalEbitdaB * selectedTarget.evEbitda;
    const rNpvB = +((unadjustedExitEvB * ptrsFactor) / discountFactor).toFixed(2);
    const impliedMoic = +(Math.max(1.1, (unadjustedExitEvB * ptrsFactor) / Math.max(2.2, selectedTarget.evB * 0.45))).toFixed(2);

    const dynamicVerdict =
      impliedMoic >= 2.5
        ? 'Proceed to Confirmatory Diligence'
        : impliedMoic >= 1.8
        ? 'Price-Sensitive / Structure Earnout'
        : 'Pass — Valuation / Reimbursement Headwind';

    return {
      popM,
      diagnosedM,
      treatedBaseM,
      glp1AdjustedTreatedM,
      commShare,
      medShare,
      caidShare,
      blendedAsp: Math.round(blendedAsp),
      tam2026B,
      sam2026B,
      addressableMarket2026B,
      demographicEffectB,
      diagnosisExpansionB,
      glp1SpilloverEffectB,
      payerMixReimbEffectB,
      serviceable2031B,
      som2031B,
      impliedCagr,
      rNpvB,
      impliedMoic,
      dynamicVerdict
    };
  }, [
    activeCase,
    diagRate,
    treatRate,
    glp1Impact,
    cmsHaircut,
    commercialMixShift,
    targetShare2031,
    waccDiscount,
    selectedTarget
  ]);

  // Animated KPI numbers
  const animSam = useTweenNumber(modelMetrics.serviceable2031B, 2);
  const animAsp = useTweenNumber(modelMetrics.blendedAsp, 0);
  const animSom = useTweenNumber(modelMetrics.som2031B, 2);
  const animRnpv = useTweenNumber(modelMetrics.rNpvB, 2);
  const animMoic = useTweenNumber(modelMetrics.impliedMoic, 2);

  const filteredTargets = useMemo(() => {
    if (domainFilter === 'All') return TARGET_COMPANIES;
    return TARGET_COMPANIES.filter((t) => t.domain === domainFilter);
  }, [domainFilter]);

  const copyDealBlurb = () => {
    const blurb = `[${activeCase.code} // BCN Healthcare COE Synthesis]
Mandate: ${activeCase.name} (${activeCase.geography})
Governing Thought: Serviceable market expands from $${modelMetrics.addressableMarket2026B}B (2026E) to $${modelMetrics.serviceable2031B}B (2031E, ${modelMetrics.impliedCagr}% CAGR) at $${modelMetrics.blendedAsp.toLocaleString()} blended ASP.
Target Recommendation: ${selectedTarget.name} (${selectedTarget.ticker}) captures $${modelMetrics.som2031B}B SOM (${targetShare2031}% share), yielding $${modelMetrics.rNpvB}B risk-adjusted NPV (${modelMetrics.impliedMoic}x MOIC at ${waccDiscount}% WACC; FDA PTRS ${selectedTarget.ptrs}%).
IC Verdict: ${modelMetrics.dynamicVerdict}.`;

    navigator.clipboard.writeText(blurb);
    setCopiedBlurb(true);
    setTimeout(() => setCopiedBlurb(false), 2200);
  };

  const exportCsvDatabook = () => {
    const headers = ['Parameter', 'Case Code', '2026 Baseline', '2031 Scenario Output', 'Notes'];
    const rows = [
      ['Mandate Name', activeCase.code, activeCase.name, activeCase.clientType, activeCase.geography],
      ['Prevalent Patient Pool', activeCase.code, modelMetrics.popM, (modelMetrics.popM * 1.09).toFixed(2), 'Million Patients'],
      ['Diagnosed Patient Funnel', activeCase.code, modelMetrics.diagnosedM, (modelMetrics.diagnosedM * 1.18).toFixed(2), `${diagRate}% Diagnosis Rate`],
      ['Treated & Adherent Cohort', activeCase.code, modelMetrics.treatedBaseM, modelMetrics.glp1AdjustedTreatedM, `${treatRate}% Treatment Rate`],
      ['Blended Realized ASP', activeCase.code, `$${modelMetrics.blendedAsp}`, `$${modelMetrics.blendedAsp}`, `Comm ${modelMetrics.commShare}% / Med ${modelMetrics.medShare}%`],
      ['Serviceable Market (SAM)', activeCase.code, `$${modelMetrics.addressableMarket2026B}B`, `$${modelMetrics.serviceable2031B}B`, `${modelMetrics.impliedCagr}% CAGR`],
      ['Target Capturable SOM', activeCase.code, `${targetShare2031}% Share`, `$${modelMetrics.som2031B}B`, selectedTarget.name],
      ['Risk-Adjusted NPV (rNPV)', selectedTarget.ticker, `PTRS ${selectedTarget.ptrs}%`, `$${modelMetrics.rNpvB}B`, `${modelMetrics.impliedMoic}x MOIC (${modelMetrics.dynamicVerdict})`]
    ];
    const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.map((v) => `"${v}"`).join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csv);
    link.download = `${activeCase.code}_${selectedTarget.id}_BCN_Databook.csv`;
    link.click();
  };

  // Compute SVG waterfall steps
  const waterfallSteps = useMemo(() => {
    const s0 = modelMetrics.addressableMarket2026B;
    const d1 = modelMetrics.demographicEffectB;
    const d2 = modelMetrics.diagnosisExpansionB;
    const d3 = modelMetrics.glp1SpilloverEffectB;
    const d4 = modelMetrics.payerMixReimbEffectB;
    const sEnd = modelMetrics.serviceable2031B;

    const c1 = s0 + d1;
    const c2 = c1 + d2;
    const c3 = c2 + d3;

    return [
      { label: '2026E Base', start: 0, end: s0, val: s0, isTotal: true },
      { label: 'Demographics', start: s0, end: c1, val: d1, isTotal: false },
      { label: 'Dx Funnel', start: c1, end: c2, val: d2, isTotal: false },
      { label: 'GLP-1 Net', start: c2, end: c3, val: d3, isTotal: false },
      { label: 'CMS / Payer', start: c3, end: sEnd, val: d4, isTotal: false },
      { label: '2031E SAM', start: 0, end: sEnd, val: sEnd, isTotal: true }
    ];
  }, [modelMetrics]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111827] font-sans antialiased selection:bg-[#CC0000] selection:text-white">
      <style>{`
        .tabular-nums { font-variant-numeric: tabular-nums; }
        .tick-rule { position: relative; border-top: 1px solid #D1D5DB; }
        .tick-rule::before, .tick-rule::after {
          content: ''; position: absolute; top: -4px; width: 1px; height: 7px; background: #111827;
        }
        .tick-rule::before { left: 0; }
        .tick-rule::after { right: 0; }
        input[type="range"] {
          -webkit-appearance: none; appearance: none; height: 3px; background: #E5E7EB; outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none; width: 13px; height: 13px; background: #111827; border: 2px solid #FAF9F6; cursor: pointer;
        }
        input[type="range"]::-webkit-slider-thumb:hover { background: #CC0000; }
      `}</style>

      {/* Top Confidential Strip */}
      <div className="bg-[#111827] text-neutral-300 text-[11px] px-6 py-1.5 flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <span className="text-[#CC0000] font-bold tracking-widest uppercase">BCN // ECD</span>
          <span>Bain Capability Network — Healthcare Center of Excellence (New Delhi Node)</span>
        </div>
        <div className="font-mono text-[10px] text-neutral-400">
          CLIENT CONFIDENTIAL // ZERO-DEFECT ANALYTICAL WORKBENCH // JOB ID 111437
        </div>
      </div>

      {/* Editorial Header */}
      <header className="bg-[#FAF9F6] border-b border-neutral-300 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 bg-[#111827] text-white flex items-center justify-center font-semibold text-xs tracking-widest border-l-4 border-[#CC0000]">
              BCN
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-neutral-500 font-medium">
                Commercial Due Diligence & Epidemiological Valuation Desk
              </div>
              <h1 className="text-base font-semibold tracking-tight text-neutral-900">
                {activeCase.code}: {activeCase.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="border border-neutral-300 bg-white px-2.5 py-1 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500">Mandate</span>
              <select
                value={selectedCaseId}
                onChange={(e) => handleSelectCase(e.target.value)}
                className="text-xs font-medium text-neutral-900 bg-transparent focus:outline-none cursor-pointer"
              >
                {CASES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} — {c.name.slice(0, 42)}...
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={copyDealBlurb}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-neutral-300 bg-white hover:border-neutral-900 transition cursor-pointer"
            >
              {copiedBlurb ? <Icons.Check /> : <Icons.Document />}
              {copiedBlurb ? 'Copied IC Summary' : 'Copy Summary'}
            </button>

            <button
              onClick={exportCsvDatabook}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#111827] text-white hover:bg-[#CC0000] transition cursor-pointer"
            >
              <Icons.Download />
              Export CSV Databook
            </button>
          </div>
        </div>

        {/* Answer-First Governing Thought Bar */}
        <div className="border-t border-neutral-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
            <div className="flex items-baseline gap-2.5">
              <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[#CC0000] shrink-0">
                Governing Thought
              </span>
              <p className="text-neutral-800 leading-relaxed">
                Addressable pool scales from{' '}
                <strong className="tabular-nums font-semibold">${modelMetrics.addressableMarket2026B}B</strong> (2026E) to{' '}
                <strong className="tabular-nums font-semibold text-[#CC0000]">${animSam}B</strong> (2031E,{' '}
                <span className="tabular-nums font-medium">{modelMetrics.impliedCagr}% CAGR</span>); target{' '}
                <strong className="underline decoration-[#CC0000] underline-offset-2">{selectedTarget.name}</strong> captures{' '}
                <strong className="tabular-nums">${animSom}B SOM</strong> with{' '}
                <strong className="tabular-nums">${animRnpv}B rNPV ({animMoic}x MOIC)</strong> —{' '}
                <span className="font-medium text-neutral-900">{modelMetrics.dynamicVerdict}</span>.
              </p>
            </div>
            <span className="text-[11px] text-neutral-500 shrink-0 tabular-nums">
              {activeCase.geography}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* 4 Editorial KPI Cards with Hairline Rules */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-neutral-300 bg-white divide-y sm:divide-y-0 sm:divide-x divide-neutral-300">
          <div className="p-4">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-neutral-500">
              <span>01 / 2031E Serviceable Pool</span>
              <span className="text-[#CC0000] font-semibold tabular-nums">
                {modelMetrics.impliedCagr > 0 ? `+${modelMetrics.impliedCagr}%` : `${modelMetrics.impliedCagr}%`} CAGR
              </span>
            </div>
            <div className="mt-2 text-2xl font-medium tracking-tight tabular-nums text-neutral-900">
              ${animSam}B
            </div>
            <div className="mt-1 text-[11px] text-neutral-500 tabular-nums">
              2026E base: ${modelMetrics.addressableMarket2026B}B ({modelMetrics.glp1AdjustedTreatedM}M treated pts)
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-neutral-500">
              <span>02 / Blended Realized ASP</span>
              <span>Payer-Weighted</span>
            </div>
            <div className="mt-2 text-2xl font-medium tracking-tight tabular-nums text-neutral-900">
              ${Number(animAsp).toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] text-neutral-500 tabular-nums">
              Comm {modelMetrics.commShare}% · Med {modelMetrics.medShare}% · Caid {modelMetrics.caidShare}%
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-neutral-500">
              <span>03 / Target 2031E SOM</span>
              <span className="tabular-nums">{targetShare2031}% Share</span>
            </div>
            <div className="mt-2 text-2xl font-medium tracking-tight tabular-nums text-neutral-900">
              ${animSom}B
            </div>
            <div className="mt-1 text-[11px] text-neutral-500 truncate">
              {selectedTarget.name} ({selectedTarget.ticker})
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-neutral-500">
              <span>04 / Risk-Adjusted rNPV</span>
              <span className="text-[#CC0000] font-semibold tabular-nums">{animMoic}x MOIC</span>
            </div>
            <div className="mt-2 text-2xl font-medium tracking-tight tabular-nums text-neutral-900">
              ${animRnpv}B
            </div>
            <div className="mt-1 text-[11px] text-neutral-500 tabular-nums">
              FDA PTRS {selectedTarget.ptrs}% · {selectedTarget.evEbitda}x Exit EV/EBITDA
            </div>
          </div>
        </section>

        {/* Main Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sensitivity & Scenario Presets Panel */}
          <aside className="lg:col-span-4 border border-neutral-300 bg-white p-5 space-y-5 h-fit">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-neutral-500">
                  Scenario Calibration
                </div>
                <h2 className="text-sm font-semibold text-neutral-900 mt-0.5">
                  7-Lever Operating Assumptions
                </h2>
              </div>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-neutral-100 border border-neutral-300">
                {presetMode}
              </span>
            </div>

            {/* Kimi's 3 Scenario Preset Chips */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'conservative', label: 'Conservative' },
                { id: 'base', label: 'Base Case' },
                { id: 'aggressive', label: 'Aggressive' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p.id)}
                  className={`py-1.5 text-[11px] font-medium border transition cursor-pointer ${
                    presetMode === p.id
                      ? 'bg-[#111827] text-white border-[#111827]'
                      : 'bg-[#FAF9F6] text-neutral-700 border-neutral-300 hover:border-neutral-900'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="space-y-3.5 text-xs">
              {[
                { label: '01. Clinical Diagnosis Rate', val: `${diagRate}%`, min: 15, max: 85, step: 1, state: diagRate, setter: setDiagRate },
                { label: '02. Therapy Adoption & Adherence', val: `${treatRate}%`, min: 20, max: 85, step: 1, state: treatRate, setter: setTreatRate },
                { label: '03. GLP-1 Comorbidity Spillover', val: `${glp1Impact > 0 ? '+' : ''}${glp1Impact}%`, min: -25, max: 25, step: 1, state: glp1Impact, setter: setGlp1Impact },
                { label: '04. CMS Medicare Fee Haircut', val: `${cmsHaircut}%`, min: -20, max: 10, step: 1, state: cmsHaircut, setter: setCmsHaircut },
                { label: '05. Commercial Payer Mix Shift', val: `${commercialMixShift > 0 ? '+' : ''}${commercialMixShift}%`, min: -15, max: 15, step: 1, state: commercialMixShift, setter: setCommercialMixShift },
                { label: '06. Target 2031E SOM Capture', val: `${targetShare2031}%`, min: 5, max: 55, step: 1, state: targetShare2031, setter: setTargetShare2031 },
                { label: '07. PE Deal WACC Discount Rate', val: `${waccDiscount}%`, min: 7, max: 15, step: 0.5, state: waccDiscount, setter: setWaccDiscount }
              ].map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">{s.label}</span>
                    <span className="font-mono font-medium tabular-nums text-neutral-900">{s.val}</span>
                  </div>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={s.state}
                    onChange={(e) => {
                      setPresetMode('custom');
                      s.setter(Number(e.target.value));
                    }}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <div className="tick-rule pt-3 text-[11px] text-neutral-600 leading-relaxed">
              <div className="text-[10px] uppercase tracking-[0.14em] text-[#CC0000] font-semibold mb-1">
                Case Team Note
              </div>
              {activeCase.keyHypothesis}
            </div>
          </aside>

          {/* Right Exhibits Area */}
          <section className="lg:col-span-8 space-y-5">
            {/* Exhibit Navigation Bar */}
            <div className="border-b border-neutral-300 flex flex-wrap gap-6 bg-white px-5 pt-3">
              {[
                { id: 'funnel', label: 'Exhibit 1 — Patient Funnel & Revenue Bridge' },
                { id: 'valuechain', label: 'Exhibit 2 — Value Chain Marimekko' },
                { id: 'comps', label: 'Exhibit 3 — Comps & IC Verdict' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`pb-3 text-xs font-medium border-b-2 transition cursor-pointer ${
                    activeTab === t.id
                      ? 'border-[#111827] text-neutral-900 font-semibold'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {activeTab === 'funnel' && (
              <div className="space-y-5">
                {/* Epidemiological Funnel */}
                <div className="border border-neutral-300 bg-white p-5 space-y-4">
                  <div className="flex items-baseline justify-between border-b border-neutral-200 pb-2.5">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                        Exhibit 1A · Epidemiological Patient Conversion
                      </div>
                      <h3 className="text-sm font-semibold text-neutral-900">
                        Prevalence to Capturable Target SOM (Millions of Patients & $B Value)
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-500 tabular-nums">
                      n = {modelMetrics.popM}M Base
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {[
                      { label: 'Total Prevalent Population (TAM)', pts: modelMetrics.popM, val: modelMetrics.tam2026B, pct: 100, color: '#111827' },
                      { label: `Clinically Diagnosed Cohort (${diagRate}%)`, pts: modelMetrics.diagnosedM, val: modelMetrics.sam2026B, pct: diagRate, color: '#334155' },
                      { label: `Treated & GLP-1 Adjusted Pool (${treatRate}% Tx)`, pts: modelMetrics.glp1AdjustedTreatedM, val: modelMetrics.serviceable2031B, pct: Math.min(100, Math.round((modelMetrics.glp1AdjustedTreatedM / modelMetrics.popM) * 100)), color: '#0F766E' },
                      { label: `${selectedTarget.name} Capturable SOM (${targetShare2031}%)`, pts: +((modelMetrics.glp1AdjustedTreatedM * targetShare2031) / 100).toFixed(2), val: modelMetrics.som2031B, pct: Math.max(4, Math.round(((modelMetrics.glp1AdjustedTreatedM * targetShare2031) / 100 / modelMetrics.popM) * 100)), color: '#CC0000' }
                    ].map((r, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-neutral-800">{r.label}</span>
                          <span className="font-mono tabular-nums text-neutral-700">
                            {r.pts}M pts · <strong>${r.val}B</strong>
                          </span>
                        </div>
                        <div className="h-4 bg-neutral-100 border border-neutral-200 overflow-hidden">
                          <div
                            className="h-full transition-all duration-300"
                            style={{ width: `${Math.max(3, r.pct)}%`, backgroundColor: r.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SVG Revenue Bridge Waterfall with Connectors */}
                <div className="border border-neutral-300 bg-white p-5 space-y-3">
                  <div className="flex items-baseline justify-between border-b border-neutral-200 pb-2.5">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                        Exhibit 1B · 5-Year Addressable Revenue Bridge
                      </div>
                      <h3 className="text-sm font-semibold text-neutral-900">
                        2026E Baseline to 2031E Serviceable Market Waterfall ($B)
                      </h3>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-[#CC0000] font-semibold">
                      Δ {(modelMetrics.serviceable2031B - modelMetrics.addressableMarket2026B) >= 0 ? '+' : ''}
                      ${(modelMetrics.serviceable2031B - modelMetrics.addressableMarket2026B).toFixed(2)}B
                    </span>
                  </div>

                  <div className="w-full overflow-x-auto">
                    <svg viewBox="0 0 640 220" className="w-full h-52">
                      <line x1="30" y1="185" x2="610" y2="185" stroke="#111827" strokeWidth="1" />
                      {(() => {
                        const maxVal = Math.max(
                          ...waterfallSteps.map((s) => Math.max(s.start, s.end)),
                          modelMetrics.serviceable2031B,
                          10
                        ) * 1.2;
                        const scaleY = (v) => 185 - (Math.max(0, v) / maxVal) * 145;

                        return waterfallSteps.map((step, idx) => {
                          const x = 48 + idx * 92;
                          const barW = 54;
                          const yTop = scaleY(Math.max(step.start, step.end));
                          const yBot = scaleY(Math.min(step.start, step.end));
                          const barH = Math.max(4, yBot - yTop);
                          const fill = step.isTotal
                            ? '#111827'
                            : step.val >= 0
                            ? '#0F766E'
                            : '#CC0000';

                          const nextStep = waterfallSteps[idx + 1];
                          const connectorY = scaleY(step.end);

                          return (
                            <g key={idx}>
                              <rect
                                x={x}
                                y={yTop}
                                width={barW}
                                height={barH}
                                fill={fill}
                                className="transition-all duration-300"
                              />
                              {nextStep && (
                                <line
                                  x1={x + barW}
                                  y1={connectorY}
                                  x2={x + 92}
                                  y2={connectorY}
                                  stroke="#9CA3AF"
                                  strokeDasharray="2 2"
                                  strokeWidth="1"
                                />
                              )}
                              <text
                                x={x + barW / 2}
                                y={yTop - 6}
                                textAnchor="middle"
                                className="text-[10px] font-mono fill-neutral-900 font-semibold"
                              >
                                {step.isTotal
                                  ? `$${step.val.toFixed(1)}B`
                                  : `${step.val >= 0 ? '+' : ''}$${step.val.toFixed(1)}B`}
                              </text>
                              <text
                                x={x + barW / 2}
                                y={202}
                                textAnchor="middle"
                                className="text-[10px] fill-neutral-600"
                              >
                                {step.label}
                              </text>
                            </g>
                          );
                        });
                      })()}
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'valuechain' && (
              <div className="border border-neutral-300 bg-white p-5 space-y-4">
                <div className="flex items-baseline justify-between border-b border-neutral-200 pb-2.5">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                      Exhibit 2 · Profit Pool Marimekko (${activeCase.valueChainPoolB}B Total Value Chain)
                    </div>
                    <h3 className="text-sm font-semibold text-neutral-900">
                      Revenue Share (Width) vs. EBITDA Margin (Height) — Hover Any Segment for Details
                    </h3>
                  </div>
                </div>

                <div className="h-64 border border-neutral-300 bg-[#FAF9F6] p-3 flex items-end gap-1">
                  {activeCase.valueChainShares.map((s, idx) => {
                    const hPct = Math.min(100, Math.max(28, s.margin * 2.1));
                    const isHovered = hoveredSector?.sector === s.sector;
                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredSector(s)}
                        onMouseLeave={() => setHoveredSector(null)}
                        style={{
                          width: `${s.share}%`,
                          height: `${hPct}%`,
                          backgroundColor: s.color,
                          opacity: hoveredSector && !isHovered ? 0.65 : 1
                        }}
                        className="p-2.5 text-white flex flex-col justify-between cursor-pointer transition-all duration-200 overflow-hidden"
                      >
                        <div>
                          <div className="text-[10px] font-mono opacity-80">{s.share}% Share</div>
                          <div className="text-xs font-semibold leading-snug mt-0.5">{s.sector}</div>
                        </div>
                        <div className="text-[11px] font-mono border-t border-white/25 pt-1">
                          {s.margin}% EBITDA
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Hover Detail Readout Bar */}
                <div className="border border-neutral-200 bg-[#FAF9F6] p-3.5 text-xs flex flex-wrap items-center justify-between gap-2">
                  {hoveredSector ? (
                    <>
                      <div>
                        <span className="font-semibold text-neutral-900">{hoveredSector.sector}</span>
                        <span className="text-neutral-500 ml-2">Representative Players: {hoveredSector.sub}</span>
                      </div>
                      <div className="font-mono tabular-nums text-neutral-900">
                        Segment Pool: <strong>${((activeCase.valueChainPoolB * hoveredSector.share) / 100).toFixed(1)}B</strong> · Margin: <strong>{hoveredSector.margin}%</strong>
                      </div>
                    </>
                  ) : (
                    <span className="text-neutral-500">
                      Hover over any Marimekko column above to inspect segment profit pool and representative companies.
                    </span>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'comps' && (
              <div className="space-y-5">
                <div className="border border-neutral-300 bg-white p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-2.5">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                        Exhibit 3A · Public & Buyout Benchmark Comps
                      </div>
                      <h3 className="text-sm font-semibold text-neutral-900">
                        Click Any Target Row to Recalculate SOM & Risk-Adjusted NPV
                      </h3>
                    </div>
                    <div className="flex gap-1">
                      {['All', 'MedTech', 'Digital Health', 'Providers', 'Diagnostics'].map((d) => (
                        <button
                          key={d}
                          onClick={() => setDomainFilter(d)}
                          className={`px-2.5 py-1 text-[11px] font-medium border cursor-pointer ${
                            domainFilter === d
                              ? 'bg-[#111827] text-white border-[#111827]'
                              : 'bg-white text-neutral-700 border-neutral-300'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs tabular-nums">
                      <thead>
                        <tr className="border-b border-neutral-900 text-[10px] uppercase tracking-wider text-neutral-500">
                          <th className="py-2 pr-3">Target</th>
                          <th className="py-2 px-2">Domain</th>
                          <th className="py-2 px-2">EV ($B)</th>
                          <th className="py-2 px-2">CAGR</th>
                          <th className="py-2 px-2">EBITDA</th>
                          <th className="py-2 px-2">Multiple</th>
                          <th className="py-2 px-2">PTRS</th>
                          <th className="py-2 pl-2">FDA / CMS Catalyst</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {filteredTargets.map((t) => {
                          const active = t.id === selectedTargetId;
                          return (
                            <tr
                              key={t.id}
                              onClick={() => setSelectedTargetId(t.id)}
                              className={`cursor-pointer transition ${
                                active ? 'bg-red-50/70 font-medium' : 'hover:bg-neutral-50'
                              }`}
                            >
                              <td className="py-2.5 pr-3">
                                <div className="text-neutral-900 flex items-center gap-1.5">
                                  {active && <span className="w-1.5 h-1.5 bg-[#CC0000] inline-block" />}
                                  {t.name}
                                </div>
                                <div className="text-[10px] font-mono text-neutral-500">{t.ticker}</div>
                              </td>
                              <td className="py-2.5 px-2 text-neutral-600">{t.domain}</td>
                              <td className="py-2.5 px-2 font-mono">${t.evB}B</td>
                              <td className="py-2.5 px-2 font-mono text-emerald-800">+{t.revCagr}%</td>
                              <td className="py-2.5 px-2 font-mono">{t.ebitdaMargin}%</td>
                              <td className="py-2.5 px-2 font-mono">{t.evEbitda}x</td>
                              <td className="py-2.5 px-2 font-mono font-semibold">{t.ptrs}%</td>
                              <td className="py-2.5 pl-2 text-neutral-600 max-w-xs">{t.fdaCatalyst}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Reactive IC Verdict Memo */}
                <div className="border border-neutral-300 bg-white p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-900 pb-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-[#CC0000] font-semibold">
                        Exhibit 3B · Investment Committee (IC) Synthesis
                      </div>
                      <h3 className="text-sm font-semibold text-neutral-900">
                        {selectedTarget.name} ({selectedTarget.ticker}) — {selectedTarget.subSector}
                      </h3>
                    </div>
                    <span
                      className={`px-2.5 py-1 text-xs font-mono font-semibold border ${
                        modelMetrics.impliedMoic >= 2.5
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                          : modelMetrics.impliedMoic >= 1.8
                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                          : 'bg-red-50 text-red-900 border-red-300'
                      }`}
                    >
                      Verdict: {modelMetrics.dynamicVerdict}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="border-l-2 border-[#111827] pl-3 space-y-1">
                      <div className="font-semibold text-neutral-900">1. Commercial Funnel Thesis</div>
                      <p className="text-neutral-600 leading-relaxed">
                        At {diagRate}% diagnosis and {glp1Impact}% GLP-1 spillover, 2031E SAM reaches ${modelMetrics.serviceable2031B}B ({modelMetrics.impliedCagr}% CAGR).
                      </p>
                    </div>
                    <div className="border-l-2 border-[#0F766E] pl-3 space-y-1">
                      <div className="font-semibold text-neutral-900">2. Regulatory & IP Moat</div>
                      <p className="text-neutral-600 leading-relaxed">
                        {selectedTarget.ptrs}% PTRS on {selectedTarget.fdaCatalyst}; LOE protected through {selectedTarget.patentLoE} ({selectedTarget.rdIntensity}% R&D/Rev).
                      </p>
                    </div>
                    <div className="border-l-2 border-[#CC0000] pl-3 space-y-1">
                      <div className="font-semibold text-neutral-900">3. Return Sensitivity</div>
                      <p className="text-neutral-600 leading-relaxed">
                        Delivers ${modelMetrics.rNpvB}B rNPV ({modelMetrics.impliedMoic}x MOIC) at {waccDiscount}% WACC and {cmsHaircut}% CMS fee stress.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footnote Bar */}
            <div className="tick-rule pt-2.5 flex flex-wrap items-center justify-between text-[11px] text-neutral-500">
              <span>
                Source: BCN Healthcare COE internal analysis; CMS Part B National Summary Data; ClinicalTrials.gov; CapitalIQ consensus comps.
              </span>
              <span className="font-mono">Exhibit Pack v4.2</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
