export type InquiryDraft = { name: string; email: string; website: string; kind: string; topics: string[]; message: string };
export const emptyDraft: InquiryDraft = { name: '', email: '', website: '', kind: '', topics: [], message: '' };
export function createEmailDraft(draft: InquiryDraft, recipient: string) {
  const name = draft.name.trim().replace(/[\r\n]+/g, ' ');
  const subject = `${draft.kind || 'Portfolio inquiry'} — ${name}`;
  const body = [`Hi Rey,`, '', draft.message.trim(), '', `Name: ${name}`, `Email: ${draft.email.trim()}`, `Website: ${draft.website.trim() || 'Not provided'}`, `Inquiry: ${draft.kind || 'Not specified'}`, `Topics: ${draft.topics.join(', ') || 'Not specified'}`].join('\n');
  return { subject, body, copy: `To: ${recipient}\nSubject: ${subject}\n\n${body}`, href: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
}
