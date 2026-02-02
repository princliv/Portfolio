/**
 * Contact form email via Netlify Function (server-side EmailJS).
 *
 * The client POSTs form data to /.netlify/functions/sendEmail. Secrets (receiver
 * email, API keys) stay in Netlify env vars (EMAILJS_*) and are never in the
 * client bundle.
 *
 * On Netlify: set in Site Settings → Environment variables (no VITE_ prefix):
 *   EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
 *   EMAILJS_RECEIVER_EMAIL, EMAILJS_TEMPLATE_ID_FOLLOWUP (optional)
 *
 * For local testing: run `netlify dev` and set the same vars in .env (no VITE_).
 */

const SEND_EMAIL_ENDPOINT = '/.netlify/functions/sendEmail';

export const isEmailConfigured = () => true;

export const initializeEmailJS = () => {};

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch(SEND_EMAIL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({}));
    const message = (json?.message as string) || res.statusText || 'Failed to send';

    if (res.ok) {
      return { success: true, message };
    }

    if (res.status === 404) {
      return {
        success: false,
        message: 'Email service not available. Deploy to Netlify and set EMAILJS_* environment variables.',
      };
    }

    return { success: false, message };
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Network error';
    return {
      success: false,
      message: msg.includes('fetch') || msg.includes('Failed to fetch')
        ? 'Network error. Check your connection and try again.'
        : `Could not send: ${msg.slice(0, 80)}`,
    };
  }
};

/** Fallback when running without Netlify (e.g. plain Vite dev); only logs. */
export const sendEmailFallback = async (
  data: EmailData
): Promise<{ success: boolean; message: string }> => {
  await new Promise((r) => setTimeout(r, 800));
  console.log('Contact form (fallback, no Netlify function):', data);
  return {
    success: true,
    message: "Message sent successfully! I'll get back to you soon.",
  };
};
