import { createContext, useContext, useState } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { email } from './content';
import { createEmailDraft, emptyDraft } from './inquiry-model';
import type { InquiryDraft } from './inquiry-model';

const InquiryContext = createContext<{ draft: InquiryDraft; setDraft: Dispatch<SetStateAction<InquiryDraft>> } | null>(null);
export function InquiryProvider({ children }: { children: ReactNode }) {
  const [draft,setDraft] = useState<InquiryDraft>({ ...emptyDraft, topics: [] });
  return <InquiryContext.Provider value={{draft,setDraft}}>{children}</InquiryContext.Provider>;
}

const kinds = ['Project inquiry','Internship','Full-time opportunity','Collaboration','Speaking / workshop','Feedback','Other'];
const topics = ['Backend systems','Database design','API integrations','Serverless workflows','Web applications','Data engineering','Other'];
export function InquiryForm({ instance }: { instance: 'contact' | 'menu' }) {
  const { draft,setDraft } = useContext(InquiryContext)!;
  const [prepared,setPrepared] = useState(false);
  const [copyStatus,setCopyStatus] = useState('');
  const [manualCopy,setManualCopy] = useState(false);
  const set = <K extends keyof InquiryDraft>(key: K, value: InquiryDraft[K]) => { setDraft(d => ({...d,[key]:value})); setPrepared(false); setCopyStatus(''); };
  const ready = createEmailDraft(draft,email);
  const copy = async () => {
    try { await navigator.clipboard.writeText(ready.copy); setCopyStatus('Draft copied. Paste it into your email app.'); }
    catch { setManualCopy(true); setCopyStatus('Clipboard unavailable. Select and copy the draft below.'); }
  };
  return <form className="inquiry-form" id={instance === 'contact' ? 'inquiry' : 'menu-inquiry'} tabIndex={-1} onSubmit={e => { e.preventDefault(); setPrepared(true); }}>
    <p className="form-eyebrow">A CONVERSATION STARTS HERE ↙</p>
    <a className="form-email" href={`mailto:${email}`}>Say <span>hello</span> ↗</a>
    <div><label htmlFor={`${instance}-name`}>Your <span className="accent">name *</span></label><input id={`${instance}-name`} name="name" autoComplete="name" value={draft.name} onChange={e=>set('name',e.target.value)} required maxLength={100} /></div>
    <div><label htmlFor={`${instance}-email`}>Your <span className="accent">email *</span></label><input id={`${instance}-email`} name="email" type="email" autoComplete="email" value={draft.email} onChange={e=>set('email',e.target.value)} required maxLength={254} /></div>
    <div><label htmlFor={`${instance}-website`}>Existing website <span className="muted">(optional)</span></label><input id={`${instance}-website`} name="website" autoComplete="url" placeholder="www." value={draft.website} onChange={e=>set('website',e.target.value)} maxLength={500} /></div>
    <fieldset><legend>What brings you here?</legend><div className="choice-group">{kinds.map(kind=><label className="choice" key={kind}><input type="radio" name={`${instance}-kind`} value={kind} checked={draft.kind===kind} onChange={()=>set('kind',kind)}/><span>{kind}</span></label>)}</div></fieldset>
    <fieldset><legend>Let’s talk about <span className="muted">(choose any)</span></legend><div className="choice-group">{topics.map(topic=><label className="choice" key={topic}><input type="checkbox" checked={draft.topics.includes(topic)} onChange={()=>set('topics',draft.topics.includes(topic)?draft.topics.filter(t=>t!==topic):[...draft.topics,topic])}/><span>{topic}</span></label>)}</div></fieldset>
    <div><label htmlFor={`${instance}-message`}>Anything else on your mind? <span className="muted">(optional)</span></label><textarea id={`${instance}-message`} name="message" rows={3} value={draft.message} onChange={e=>set('message',e.target.value)} maxLength={5000}/></div>
    <div className="form-actions"><button className="text-link" type="submit">Prepare email <span>↗</span></button><p className="form-note">This creates a draft in your email app.<br />Nothing is stored or sent by this website.</p></div>
    {prepared && <div className="draft-result" role="status"><p>Your draft is ready. Nothing has been sent.</p><div className="draft-links"><a className="text-link" href={ready.href}>Open email app ↗</a><button type="button" className="text-link" onClick={copy}>Copy draft ⧉</button></div><p className="form-note">{copyStatus || 'No email app? Copy the draft and send it however you prefer.'}</p><details open={manualCopy || undefined}><summary>Preview draft</summary><textarea aria-label="Prepared email draft" readOnly value={ready.copy} rows={8} onFocus={e=>e.currentTarget.select()}/></details></div>}
  </form>;
}
