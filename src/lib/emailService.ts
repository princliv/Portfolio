import emailjs from '@emailjs/browser';

/**
 * Email integration via EmailJS (https://www.emailjs.com/).
 *
 * You need TWO templates in EmailJS:
 *
 * 1) NOTIFY YOU (VITE_EMAILJS_TEMPLATE_ID) – so you receive the visitor's message
 *    - To Email: {{to_email}}
 *    - Subject: e.g. "Portfolio: {{subject}}" or "New message from {{from_name}}"
 *    - Body: include {{from_name}}, {{from_email}}, {{subject}}, {{message}}
 *
 * 2) FOLLOW-UP TO VISITOR (optional, VITE_EMAILJS_TEMPLATE_ID_FOLLOWUP) – thank-you to sender
 *    - To Email: {{to_email}} (we pass the visitor's email here for this template)
 *    - Body: your "Thanks for reaching out" text
 *
 * .env:
 *   VITE_EMAILJS_PUBLIC_KEY=...
 *   VITE_EMAILJS_SERVICE_ID=...
 *   VITE_EMAILJS_TEMPLATE_ID=...          ← template that sends YOU the visitor's message
 *   VITE_EMAILJS_TEMPLATE_ID_FOLLOWUP=...  ← optional; thank-you email to visitor
 *   VITE_EMAILJS_RECEIVER_EMAIL=...        ← optional; your email (or set in template as {{to_email}})
 */

const PUBLIC_KEY = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '').trim();
const SERVICE_ID = (import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '').trim();
const TEMPLATE_ID = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '').trim();
const TEMPLATE_ID_FOLLOWUP = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID_FOLLOWUP ?? '').trim();
const RECEIVER_EMAIL = (import.meta.env.VITE_EMAILJS_RECEIVER_EMAIL ?? '').trim();

/** Fallback recipient so "To" is never empty (must match EmailJS template variable e.g. {{to_email}}) */
const DEFAULT_RECEIVER_EMAIL = 'ankitkumar1990asap@gmail.com';

export const isEmailConfigured = () =>
  Boolean(PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID);

export const initializeEmailJS = () => {
  if (PUBLIC_KEY) emailjs.init({ publicKey: PUBLIC_KEY });
};

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  if (!isEmailConfigured()) {
    return {
      success: false,
      message: 'Email is not configured. Add VITE_EMAILJS_* keys to .env (see emailService.ts).',
    };
  }

  try {
  const opts = { publicKey: PUBLIC_KEY };
  const ownerEmail = RECEIVER_EMAIL || DEFAULT_RECEIVER_EMAIL;

  // 1) Send visitor's message TO YOU (owner). Template must have To: {{to_email}} and body with from_name, message, etc.
  const paramsToOwner: Record<string, string> = {
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: data.message,
    reply_to: data.email,
    to_email: ownerEmail,
    user_email: ownerEmail,
    send_to: ownerEmail,
    email: ownerEmail,
    recipient: ownerEmail,
    to: ownerEmail,
  };

  const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, paramsToOwner, opts);
  if (response.status !== 200) throw new Error('Failed to send message');

  // 2) Optional: send follow-up (thank-you) TO THE VISITOR so they get the reply, not you
  if (TEMPLATE_ID_FOLLOWUP.trim()) {
    const paramsToVisitor: Record<string, string> = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      reply_to: data.email,
      to_email: data.email,
      user_email: data.email,
      send_to: data.email,
      email: data.email,
      recipient: data.email,
      to: data.email,
    };
    await emailjs.send(SERVICE_ID, TEMPLATE_ID_FOLLOWUP, paramsToVisitor, opts);
  }

  return {
    success: true,
    message: "Message sent successfully! I'll get back to you soon.",
  };
  } catch (error: unknown) {
    console.error('Email service error:', error);
    const msg =
      error && typeof error === 'object' && 'text' in error
        ? String((error as { text: string }).text)
        : error instanceof Error
          ? error.message
          : '';
    const isRecipientEmpty =
      msg.toLowerCase().includes('recipient') && msg.toLowerCase().includes('empty');
    const friendly =
      isRecipientEmpty
        ? 'In EmailJS: set "To Email" to {{to_email}}. Use one template to notify you (visitor message) and optionally a second (VITE_EMAILJS_TEMPLATE_ID_FOLLOWUP) for thank-you to visitor.'
        : msg.toLowerCase().includes('template') || msg.includes('404')
          ? 'Email template or service ID may be wrong. Check .env and EmailJS dashboard.'
          : msg.toLowerCase().includes('network') || msg.includes('Failed to fetch')
            ? 'Network error. Check your connection and try again.'
            : msg
              ? `Could not send: ${msg.slice(0, 120)}${msg.length > 120 ? '…' : ''}`
              : 'Failed to send message. Please try again later or contact me directly via email.';
    return {
      success: false,
      message: friendly,
    };
  }
};

/** Fallback when EmailJS is not configured (e.g. dev); only logs to console. */
export const sendEmailFallback = async (
  data: EmailData
): Promise<{ success: boolean; message: string }> => {
  await new Promise((r) => setTimeout(r, 800));
  console.log('Contact form (fallback):', data);
  return {
    success: true,
    message: "Message sent successfully! I'll get back to you soon.",
  };
};
