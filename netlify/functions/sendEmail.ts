import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const EMAILJS_SEND_URL = 'https://api.emailjs.com/api/v1.0/email/send';

interface EmailBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function buildParamsToOwner(ownerEmail: string, data: EmailBody): Record<string, string> {
  return {
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
}

function buildParamsToVisitor(data: EmailBody): Record<string, string> {
  return {
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
}

async function sendEmailJS(
  serviceId: string,
  templateId: string,
  userId: string,
  templateParams: Record<string, string>
): Promise<{ ok: boolean; text: string }> {
  const res = await fetch(EMAILJS_SEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: userId,
      template_params: templateParams,
    }),
  });
  const text = await res.text();
  return { ok: res.ok, text };
}

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID?.trim();
  const templateId = process.env.EMAILJS_TEMPLATE_ID?.trim();
  const userId = process.env.EMAILJS_PUBLIC_KEY?.trim();
  const receiverEmail = process.env.EMAILJS_RECEIVER_EMAIL?.trim();
  const templateIdFollowup = process.env.EMAILJS_TEMPLATE_ID_FOLLOWUP?.trim();

  if (!serviceId || !templateId || !userId || !receiverEmail) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Email service not configured. Set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_RECEIVER_EMAIL in Netlify environment.',
      }),
    };
  }

  let body: EmailBody;
  try {
    body = JSON.parse(event.body || '{}') as EmailBody;
  } catch {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Invalid JSON body' }) };
  }

  const { name, email, subject, message } = body;
  if (!name || !email || !subject || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: 'Missing name, email, subject, or message' }),
    };
  }

  const data: EmailBody = { name, email, subject, message };
  const ownerEmail = receiverEmail;

  // 1) Send visitor's message to owner
  const paramsToOwner = buildParamsToOwner(ownerEmail, data);
  const result1 = await sendEmailJS(serviceId, templateId, userId, paramsToOwner);
  if (!result1.ok) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: result1.text || 'Failed to send email' }),
    };
  }

  // 2) Optional: send follow-up (thank-you) to visitor
  if (templateIdFollowup) {
    const paramsToVisitor = buildParamsToVisitor(data);
    await sendEmailJS(serviceId, templateIdFollowup, userId, paramsToVisitor);
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true, message: "Message sent successfully! I'll get back to you soon." }),
  };
};
