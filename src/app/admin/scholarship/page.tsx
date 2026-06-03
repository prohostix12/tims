'use client';

import React, { useState, useEffect } from 'react';
import styles from '../admin.module.css';
import {
  Award, Plus, Trash2, Edit2, Save, X, CheckCircle,
  Loader2, AlertTriangle, Users,
} from 'lucide-react';

/* ── Types ──────────────────────────────────────────────────── */
interface ContentForm {
  badge: string; heading: string; subheading: string;
  description: string; buttonText: string; termsAndConditions: string;
}

type QuestionCategory = 'Online UG' | 'Online PG' | 'Credit Transfer' | 'General';

interface OptionForm { text: string; isCorrect: boolean }
interface QuestionForm {
  _id?: string; question: string; options: OptionForm[];
  order: number; isActive: boolean; category: QuestionCategory;
}

interface ScoreTier { minScore: number; amount: number; label: string }
interface PartnerCompany { name: string; description: string }
interface ConfigForm {
  tiers: ScoreTier[];
  voucherValidityDays: number;
  eligibleCourses: string[];
  partnerCompanies: PartnerCompany[];
  passingScore: number;
  totalQuestionsForScore: number;
}

type Tab = 'content' | 'questions' | 'config' | 'applications';
const QUESTION_CATEGORIES: QuestionCategory[] = ['Online UG', 'Online PG', 'Credit Transfer', 'General'];

const BLANK_Q: QuestionForm = {
  question: '', order: 1, isActive: true, category: 'General',
  options: [
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ],
};

/* ── Component ──────────────────────────────────────────────── */
export default function AdminScholarshipPage() {
  const [tab, setTab] = useState<Tab>('content');

  /* Content */
  const [content, setContent] = useState<ContentForm>({
    badge: '', heading: '', subheading: '', description: '', buttonText: '', termsAndConditions: '',
  });
  const [contentSaving, setContentSaving] = useState(false);
  const [contentMsg, setContentMsg] = useState('');

  /* Questions */
  const [questions, setQuestions] = useState<QuestionForm[]>([]);
  const [qLoading, setQLoading] = useState(false);
  const [editQ, setEditQ] = useState<QuestionForm | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [qSaving, setQSaving] = useState(false);
  const [deleteQId, setDeleteQId] = useState<string | null>(null);
  const [qMsg, setQMsg] = useState('');
  const [activeQCategory, setActiveQCategory] = useState<QuestionCategory>('Online UG');

  /* Config */
  const [config, setConfig] = useState<ConfigForm>({
    tiers: [], voucherValidityDays: 90, eligibleCourses: [],
    partnerCompanies: [], passingScore: 50, totalQuestionsForScore: 5,
  });
  const [configSaving, setConfigSaving] = useState(false);
  const [configMsg, setConfigMsg] = useState('');
  const [newCourse, setNewCourse] = useState('');

  /* Applications */
  const [applications, setApplications] = useState<any[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [deleteAppId, setDeleteAppId] = useState<string | null>(null);
  const [deletingApp, setDeletingApp] = useState(false);

  /* ── Load ─────────────────────────────────────────────────── */
  useEffect(() => {
    if (tab === 'applications') {
      setAppsLoading(true);
      fetch('/api/admin/scholarship/applications').then(r => r.json())
        .then(d => setApplications(Array.isArray(d) ? d : []))
        .finally(() => setAppsLoading(false));
    }
  }, [tab]);

  useEffect(() => {
    fetch('/api/admin/scholarship/content').then(r => r.json()).then(d => setContent({
      badge: d.badge || '', heading: d.heading || '', subheading: d.subheading || '',
      description: d.description || '', buttonText: d.buttonText || '',
      termsAndConditions: d.termsAndConditions || '',
    }));
    fetchQuestions();
    fetch('/api/admin/scholarship/config').then(r => r.json()).then(d => setConfig({
      tiers: d.tiers || [],
      voucherValidityDays: d.voucherValidityDays ?? 90,
      eligibleCourses: d.eligibleCourses || [],
      partnerCompanies: d.partnerCompanies || [],
      passingScore: d.passingScore ?? 50,
      totalQuestionsForScore: d.totalQuestionsForScore ?? 5,
    }));
  }, []);

  function fetchQuestions() {
    setQLoading(true);
    fetch('/api/admin/scholarship/questions').then(r => r.json())
      .then(d => setQuestions(Array.isArray(d) ? d : []))
      .finally(() => setQLoading(false));
  }

  /* ── Content save ────────────────────────────────────────── */
  async function saveContent() {
    setContentSaving(true); setContentMsg('');
    try {
      await fetch('/api/admin/scholarship/content', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      setContentMsg('Saved successfully!');
    } catch { setContentMsg('Error saving.'); }
    finally { setContentSaving(false); setTimeout(() => setContentMsg(''), 3000); }
  }

  /* ── Question helpers ────────────────────────────────────── */
  function openNew() {
    setEditingId(null);
    const qCount = questions.filter(q => (q.category || 'General') === activeQCategory).length;
    setEditQ({ 
      question: '', 
      order: qCount + 1, 
      isActive: true, 
      category: activeQCategory,
      options: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ],
    });
    setQMsg('');
  }

  function openEdit(q: QuestionForm) {
    setEditingId(q._id || null);
    setEditQ({ 
      ...q, 
      category: q.category || 'General',
      options: q.options.map(o => ({ ...o })) 
    });
    setQMsg('');
  }

  function setOptionText(i: number, val: string) {
    if (!editQ) return;
    const opts = [...editQ.options];
    opts[i] = { ...opts[i], text: val };
    setEditQ({ ...editQ, options: opts });
  }

  function setCorrect(i: number) {
    if (!editQ) return;
    const opts = editQ.options.map((o, idx) => ({ ...o, isCorrect: idx === i }));
    setEditQ({ ...editQ, options: opts });
  }

  function addOption() {
    if (!editQ || editQ.options.length >= 6) return;
    setEditQ({ ...editQ, options: [...editQ.options, { text: '', isCorrect: false }] });
  }

  function removeOption(i: number) {
    if (!editQ || editQ.options.length <= 2) return;
    const opts = editQ.options.filter((_, idx) => idx !== i);
    setEditQ({ ...editQ, options: opts });
  }

  async function saveQuestion() {
    if (!editQ) return;
    if (!editQ.question.trim()) { setQMsg('Question text is required.'); return; }
    if (editQ.options.some(o => !o.text.trim())) { setQMsg('All options must have text.'); return; }
    if (!editQ.options.some(o => o.isCorrect)) { setQMsg('Mark at least one option as correct.'); return; }
    if (!editQ.category) { setQMsg('Please select a question bank/category.'); return; }
    
    setQSaving(true); 
    setQMsg('');
    try {
      const questionData = {
        question: editQ.question.trim(),
        options: editQ.options,
        order: Number(editQ.order),
        isActive: editQ.isActive,
        category: editQ.category,
      };
      
      const url = editingId
        ? `/api/admin/scholarship/questions/${editingId}`
        : '/api/admin/scholarship/questions';
      
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionData),
      });
      
      if (!res.ok) {
        const errData = await res.json();
        setQMsg(`Error: ${errData.error || 'Failed to save'}`);
        return;
      }
      
      setEditQ(null); 
      setEditingId(null);
      fetchQuestions();
      setQMsg('Question saved successfully!');
      setTimeout(() => setQMsg(''), 2000);
    } catch (e: any) { 
      setQMsg(`Error saving question: ${e.message}`); 
    }
    finally { setQSaving(false); }
  }

  async function deleteQuestion() {
    if (!deleteQId) return;
    await fetch(`/api/admin/scholarship/questions/${deleteQId}`, { method: 'DELETE' });
    setDeleteQId(null);
    fetchQuestions();
  }

  async function deleteApplication() {
    if (!deleteAppId) return;
    setDeletingApp(true);
    try {
      await fetch(`/api/admin/scholarship/applications/${deleteAppId}`, { method: 'DELETE' });
      setApplications(prev => prev.filter((a: any) => a._id !== deleteAppId));
    } finally {
      setDeletingApp(false);
      setDeleteAppId(null);
    }
  }

  /* ── Config helpers ──────────────────────────────────────── */
  function addTier() {
    setConfig(c => ({ ...c, tiers: [...c.tiers, { minScore: 0, amount: 0, label: '' }] }));
  }
  function removeTier(i: number) {
    setConfig(c => ({ ...c, tiers: c.tiers.filter((_, idx) => idx !== i) }));
  }
  function updateTier(i: number, field: keyof ScoreTier, val: any) {
    setConfig(c => {
      const tiers = [...c.tiers];
      tiers[i] = { ...tiers[i], [field]: field === 'label' ? val : Number(val) };
      return { ...c, tiers };
    });
  }
  function addCourse() {
    if (!newCourse.trim()) return;
    setConfig(c => ({ ...c, eligibleCourses: [...c.eligibleCourses, newCourse.trim()] }));
    setNewCourse('');
  }
  function removeCourse(i: number) {
    setConfig(c => ({ ...c, eligibleCourses: c.eligibleCourses.filter((_, idx) => idx !== i) }));
  }
  function addPartner() {
    setConfig(c => ({ ...c, partnerCompanies: [...c.partnerCompanies, { name: '', description: '' }] }));
  }
  function removePartner(i: number) {
    setConfig(c => ({ ...c, partnerCompanies: c.partnerCompanies.filter((_, idx) => idx !== i) }));
  }
  function updatePartner(i: number, field: 'name' | 'description', val: string) {
    setConfig(c => {
      const arr = [...c.partnerCompanies];
      arr[i] = { ...arr[i], [field]: val };
      return { ...c, partnerCompanies: arr };
    });
  }
  async function saveConfig() {
    setConfigSaving(true); setConfigMsg('');
    try {
      await fetch('/api/admin/scholarship/config', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      setConfigMsg('Saved successfully!');
    } catch { setConfigMsg('Error saving.'); }
    finally { setConfigSaving(false); setTimeout(() => setConfigMsg(''), 3000); }
  }

  const visibleQuestions = questions.filter(q => (q.category || 'General') === activeQCategory);
  const categoryColor: Record<QuestionCategory, string> = {
    'Online UG': '#3b82f6',
    'Online PG': '#8b5cf6',
    'Credit Transfer': '#059669',
    'General': '#64748b',
  };

  /* ── Render ────────────────────────────────────────────────── */
  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <Award size={28} style={{ color: '#E8502A' }} />
        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: '#1e293b' }}>Scholarship Program</h1>
      </div>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', marginTop: 0 }}>
        Manage the scholarship page content, exam questions, and reward configuration.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0' }}>
        {(['content', 'questions', 'config', 'applications'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '0.6rem 1.4rem', border: 'none', background: 'none', cursor: 'pointer',
            fontWeight: 700, fontSize: '0.92rem', borderBottom: tab === t ? '3px solid #E8502A' : '3px solid transparent',
            color: tab === t ? '#E8502A' : '#64748b', marginBottom: '-2px', textTransform: 'capitalize',
            transition: 'color 0.15s',
          }}>
            {t === 'content' ? 'Page Content' : t === 'questions' ? 'Exam Questions' : t === 'config' ? 'Config & Rewards' : 'Applications'}
          </button>
        ))}
      </div>

      {/* ── CONTENT TAB ─────────────────────────────────────── */}
      {tab === 'content' && (
        <div style={{ background: '#fff', borderRadius: '12px', padding: '2rem', border: '1px solid #e2e8f0', maxWidth: 720 }}>
          <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.1rem', fontWeight: 700 }}>Page Content</h2>
          {[
            { label: 'Badge Text', key: 'badge' },
            { label: 'Main Heading', key: 'heading' },
            { label: 'Sub Heading', key: 'subheading' },
            { label: 'Start Button Text', key: 'buttonText' },
          ].map(({ label, key }) => (
            <div key={key} style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>{label}</label>
              <input type="text" value={(content as any)[key]} onChange={e => setContent(c => ({ ...c, [key]: e.target.value }))} className={styles.input} style={{ width: '100%' }} />
            </div>
          ))}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Description</label>
            <textarea value={content.description} onChange={e => setContent(c => ({ ...c, description: e.target.value }))} rows={5} className={styles.input} style={{ width: '100%', resize: 'vertical' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
              Terms &amp; Conditions
              <span style={{ fontWeight: 400, color: '#94a3b8', marginLeft: '0.5rem', fontSize: '0.78rem' }}>(one rule per line)</span>
            </label>
            <textarea value={content.termsAndConditions} onChange={e => setContent(c => ({ ...c, termsAndConditions: e.target.value }))} rows={10} className={styles.input} style={{ width: '100%', resize: 'vertical', fontFamily: 'inherit', fontSize: '0.88rem' }} placeholder="1. The voucher is valid for 90 days..." />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={saveContent} disabled={contentSaving} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#E8502A', color: '#fff', border: 'none', padding: '0.7rem 1.6rem', borderRadius: '8px', fontWeight: 700, cursor: contentSaving ? 'not-allowed' : 'pointer', opacity: contentSaving ? 0.7 : 1 }}>
              {contentSaving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
              Save Content
            </button>
            {contentMsg && <span style={{ color: contentMsg.includes('Error') ? '#ef4444' : '#22c55e', fontWeight: 600 }}>{contentMsg}</span>}
          </div>
        </div>
      )}

      {/* ── QUESTIONS TAB ───────────────────────────────────── */}
      {tab === 'questions' && (
        <div>
          {/* Category bank tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {QUESTION_CATEGORIES.map(cat => {
              const count = questions.filter(q => (q.category || 'General') === cat).length;
              const active = activeQCategory === cat;
              return (
                <button key={cat} onClick={() => setActiveQCategory(cat)} style={{
                  padding: '0.5rem 1.1rem', border: `2px solid ${active ? categoryColor[cat] : '#e2e8f0'}`,
                  borderRadius: '999px', background: active ? categoryColor[cat] : '#fff',
                  color: active ? '#fff' : '#475569', fontWeight: 700, fontSize: '0.83rem',
                  cursor: 'pointer', transition: 'all .15s', display: 'flex', alignItems: 'center', gap: '0.4rem',
                }}>
                  {cat}
                  <span style={{ background: active ? 'rgba(255,255,255,0.25)' : '#f1f5f9', color: active ? '#fff' : '#64748b', borderRadius: '999px', padding: '0.1rem 0.5rem', fontSize: '0.75rem', fontWeight: 800 }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: categoryColor[activeQCategory], marginRight: 8, verticalAlign: 'middle' }} />
              {activeQCategory} Questions ({visibleQuestions.length})
            </h2>
            <button onClick={openNew} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#E8502A', color: '#fff', border: 'none', padding: '0.65rem 1.3rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
              <Plus size={16} /> Add Question
            </button>
          </div>

          {qLoading && <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}><Loader2 size={28} style={{ animation: 'spin 1s linear infinite' }} /></div>}

          {!qLoading && visibleQuestions.map((q, qi) => (
            <div key={q._id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.1rem 1.3rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ minWidth: 28, height: 28, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.82rem', color: '#64748b', flexShrink: 0 }}>{qi + 1}</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 0.5rem', fontWeight: 600, color: '#1e293b' }}>{q.question}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {q.options.map((o: any, oi: number) => (
                    <span key={oi} style={{ padding: '0.2rem 0.7rem', borderRadius: '999px', fontSize: '0.78rem', background: o.isCorrect ? 'rgba(34,197,94,0.12)' : '#f8fafc', border: `1px solid ${o.isCorrect ? 'rgba(34,197,94,0.4)' : '#e2e8f0'}`, color: o.isCorrect ? '#16a34a' : '#64748b', fontWeight: o.isCorrect ? 700 : 400 }}>
                      {o.isCorrect && '✓ '}{o.text}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                <button onClick={() => openEdit(q)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '0.45rem', cursor: 'pointer', color: '#475569' }}><Edit2 size={15} /></button>
                <button onClick={() => setDeleteQId(q._id!)} style={{ background: '#fef2f2', border: 'none', borderRadius: '6px', padding: '0.45rem', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={15} /></button>
              </div>
            </div>
          ))}

          {!qLoading && visibleQuestions.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #e2e8f0' }}>
              No questions in the <strong>{activeQCategory}</strong> bank yet. Click "Add Question" to create the first one.
            </div>
          )}

          {/* Question Edit Modal */}
          {editQ && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
              <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: 600, maxHeight: '90vh', overflow: 'auto', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ margin: 0, fontWeight: 800 }}>{editingId ? 'Edit Question' : 'New Question'}</h3>
                  <button onClick={() => setEditQ(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
                </div>

                {/* Category selector */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#374151' }}>Question Bank (Category)</label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {QUESTION_CATEGORIES.map(cat => (
                      <button key={cat} onClick={() => setEditQ(q => q ? { ...q, category: cat } : q)} style={{
                        padding: '0.4rem 1rem', borderRadius: '999px', border: `2px solid ${editQ.category === cat ? categoryColor[cat] : '#e2e8f0'}`,
                        background: editQ.category === cat ? categoryColor[cat] : '#fff',
                        color: editQ.category === cat ? '#fff' : '#64748b', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
                      }}>{cat}</button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#374151' }}>Question</label>
                  <textarea value={editQ.question} onChange={e => setEditQ(q => q ? { ...q, question: e.target.value } : q)} rows={3} className={styles.input} style={{ width: '100%', resize: 'vertical' }} placeholder="Enter question text…" />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#374151' }}>Order</label>
                  <input type="number" value={editQ.order} onChange={e => setEditQ(q => q ? { ...q, order: Number(e.target.value) } : q)} className={styles.input} style={{ width: 100 }} />
                </div>

                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151' }}>
                  Options — click the circle to mark the correct answer
                </label>
                {editQ.options.map((opt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <button onClick={() => setCorrect(i)} style={{ width: 26, height: 26, minWidth: 26, borderRadius: '50%', border: '2px solid', borderColor: opt.isCorrect ? '#22c55e' : '#cbd5e1', background: opt.isCorrect ? '#22c55e' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Mark as correct">
                      {opt.isCorrect && <CheckCircle size={14} color="#fff" />}
                    </button>
                    <input type="text" value={opt.text} onChange={e => setOptionText(i, e.target.value)} className={styles.input} style={{ flex: 1 }} placeholder={`Option ${String.fromCharCode(65 + i)}`} />
                    <button onClick={() => removeOption(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '0.2rem' }} disabled={editQ.options.length <= 2}><X size={16} /></button>
                  </div>
                ))}
                {editQ.options.length < 6 && (
                  <button onClick={addOption} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '0.45rem 1rem', cursor: 'pointer', color: '#64748b', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                    <Plus size={14} /> Add Option
                  </button>
                )}

                {qMsg && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', gap: '0.4rem', alignItems: 'center' }}><AlertTriangle size={14} /> {qMsg}</div>}

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button onClick={() => setEditQ(null)} style={{ padding: '0.65rem 1.3rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontWeight: 600, color: '#64748b' }}>Cancel</button>
                  <button onClick={saveQuestion} disabled={qSaving} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#E8502A', color: '#fff', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: qSaving ? 'not-allowed' : 'pointer', opacity: qSaving ? 0.7 : 1 }}>
                    {qSaving ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={15} />}
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete question confirm */}
          {deleteQId && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: '#fff', borderRadius: '14px', padding: '2rem', maxWidth: 380, width: '90%' }}>
                <AlertTriangle size={28} style={{ color: '#ef4444', marginBottom: '1rem' }} />
                <h3 style={{ margin: '0 0 0.5rem' }}>Delete Question?</h3>
                <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>This cannot be undone.</p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button onClick={() => setDeleteQId(null)} style={{ padding: '0.6rem 1.2rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={deleteQuestion} style={{ padding: '0.6rem 1.2rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── CONFIG TAB ───────────────────────────────────────── */}
      {tab === 'config' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 780 }}>
          {/* Score Tiers */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '1.75rem', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontWeight: 700 }}>Score → Voucher Tiers</h3>
              <button onClick={addTier} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.45rem 0.9rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}><Plus size={14} /> Add Tier</button>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1rem', marginTop: 0 }}>Set minimum score % thresholds. Users get the highest tier they qualify for.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr auto', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              {['#', 'Label', 'Min Score %', 'Voucher ₹', ''].map((h, i) => (
                <span key={i} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
              ))}
            </div>
            {config.tiers.map((t, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr auto', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', minWidth: 20 }}>{i + 1}</span>
                <input type="text" value={t.label} onChange={e => updateTier(i, 'label', e.target.value)} className={styles.input} placeholder="e.g. Gold Scholar" />
                <input type="number" value={t.minScore} onChange={e => updateTier(i, 'minScore', e.target.value)} className={styles.input} placeholder="50" min={0} max={100} />
                <input type="number" value={t.amount} onChange={e => updateTier(i, 'amount', e.target.value)} className={styles.input} placeholder="1000" min={0} />
                <button onClick={() => removeTier(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={15} /></button>
              </div>
            ))}
            {config.tiers.length === 0 && <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No tiers set. Add at least one.</p>}
          </div>

          {/* Voucher & Exam Settings */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '1.75rem', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 1rem', fontWeight: 700 }}>Voucher &amp; Exam Settings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#374151' }}>Voucher Validity (days)</label>
                <input type="number" value={config.voucherValidityDays} onChange={e => setConfig(c => ({ ...c, voucherValidityDays: Number(e.target.value) }))} className={styles.input} style={{ width: '100%' }} min={1} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#374151' }}>Passing Score %</label>
                <input type="number" value={config.passingScore} onChange={e => setConfig(c => ({ ...c, passingScore: Number(e.target.value) }))} className={styles.input} style={{ width: '100%' }} min={0} max={100} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#374151' }}>Questions per Exam</label>
                <input type="number" value={config.totalQuestionsForScore} onChange={e => setConfig(c => ({ ...c, totalQuestionsForScore: Number(e.target.value) }))} className={styles.input} style={{ width: '100%' }} min={1} />
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>Random subset from matching question bank</p>
              </div>
            </div>
          </div>

          {/* Eligible Courses */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '1.75rem', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 0.75rem', fontWeight: 700 }}>Eligible Courses</h3>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input type="text" value={newCourse} onChange={e => setNewCourse(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCourse()} className={styles.input} style={{ flex: 1 }} placeholder="Course name" />
              <button onClick={addCourse} style={{ background: '#E8502A', color: '#fff', border: 'none', borderRadius: '8px', padding: '0 1rem', cursor: 'pointer', fontWeight: 700 }}>Add</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {config.eligibleCourses.map((c, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '999px', padding: '0.3rem 0.8rem', fontSize: '0.85rem' }}>
                  {c}
                  <button onClick={() => removeCourse(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 0, display: 'flex' }}><X size={13} /></button>
                </span>
              ))}
              {config.eligibleCourses.length === 0 && <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No courses added yet.</span>}
            </div>
          </div>

          {/* Save */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={saveConfig} disabled={configSaving} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#E8502A', color: '#fff', border: 'none', padding: '0.75rem 1.8rem', borderRadius: '8px', fontWeight: 700, cursor: configSaving ? 'not-allowed' : 'pointer', opacity: configSaving ? 0.7 : 1 }}>
              {configSaving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
              Save Configuration
            </button>
            {configMsg && <span style={{ color: configMsg.includes('Error') ? '#ef4444' : '#22c55e', fontWeight: 600 }}>{configMsg}</span>}
          </div>
        </div>
      )}

      {/* ── APPLICATIONS TAB ────────────────────────────────── */}
      {tab === 'applications' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>
              <Users size={18} style={{ verticalAlign: 'middle', marginRight: '0.4rem', color: '#E8502A' }} />
              Applicants ({applications.length})
            </h2>
          </div>
          {appsLoading && <div style={{ textAlign: 'center', padding: '3rem' }}><Loader2 size={28} style={{ animation: 'spin 1s linear infinite', color: '#E8502A' }} /></div>}
          {!appsLoading && applications.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #e2e8f0' }}>No applications yet.</div>
          )}
          {!appsLoading && applications.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    {['Name', 'Phone', 'Email', 'Course', 'Program', 'Status', 'Score', 'Voucher', 'Date', ''].map(h => (
                      <th key={h} style={{ padding: '0.65rem 0.9rem', textAlign: 'left', fontWeight: 700, color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {applications.map((a: any, i: number) => (
                    <tr key={a._id} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                      <td style={{ padding: '0.65rem 0.9rem', fontWeight: 600, color: '#002060' }}>{a.name}</td>
                      <td style={{ padding: '0.65rem 0.9rem', color: '#475569' }}>{a.phone}</td>
                      <td style={{ padding: '0.65rem 0.9rem', color: '#475569' }}>{a.email}</td>
                      <td style={{ padding: '0.65rem 0.9rem', color: '#475569' }}>{a.course}</td>
                      <td style={{ padding: '0.65rem 0.9rem', color: '#475569' }}>{a.university}</td>
                      <td style={{ padding: '0.65rem 0.9rem' }}>
                        <span style={{ display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: a.examCompleted ? '#dcfce7' : '#fef9c3', color: a.examCompleted ? '#16a34a' : '#854d0e' }}>
                          {a.examCompleted ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                      <td style={{ padding: '0.65rem 0.9rem', fontWeight: 700, color: '#002060' }}>{a.examCompleted ? `${a.score} / ${a.totalQuestions}` : '—'}</td>
                      <td style={{ padding: '0.65rem 0.9rem' }}>
                        {a.voucherCode
                          ? <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', background: '#fff5f0', border: '1px solid rgba(232,80,42,.3)', padding: '0.15rem 0.5rem', borderRadius: '6px', color: '#E8502A', fontWeight: 700 }}>₹{a.voucherAmount?.toLocaleString('en-IN')}</span>
                          : '—'}
                      </td>
                      <td style={{ padding: '0.65rem 0.9rem', color: '#94a3b8', fontSize: '0.78rem' }}>{new Date(a.createdAt).toLocaleDateString('en-IN')}</td>
                      <td style={{ padding: '0.65rem 0.9rem' }}>
                        <button onClick={() => setDeleteAppId(a._id)} style={{ background: '#fef2f2', border: 'none', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer', color: '#ef4444', display: 'flex' }} title="Delete application">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Delete application confirm */}
          {deleteAppId && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: '#fff', borderRadius: '14px', padding: '2rem', maxWidth: 380, width: '90%' }}>
                <AlertTriangle size={28} style={{ color: '#ef4444', marginBottom: '1rem' }} />
                <h3 style={{ margin: '0 0 0.5rem' }}>Delete Application?</h3>
                <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>This will permanently remove the applicant record. This cannot be undone.</p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button onClick={() => setDeleteAppId(null)} disabled={deletingApp} style={{ padding: '0.6rem 1.2rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={deleteApplication} disabled={deletingApp} style={{ padding: '0.6rem 1.2rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {deletingApp ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={14} />}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
