export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Sends contact form data to the Google Sheets Web App URL.
 */
export const sendContactMessage = async (
  data: ContactData
): Promise<{ success: boolean; message: string }> => {
  const googleScriptUrl = (import.meta.env.VITE_GOOGLE_SCRIPT_URL ?? '').trim();

  if (!googleScriptUrl) {
    // Fallback/Warning in development when URL is not configured
    console.warn('VITE_GOOGLE_SCRIPT_URL is not configured in .env. Falling back to local logging.');
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('Contact form submitted (local fallback):', data);
    return {
      success: true,
      message: 'VITE_GOOGLE_SCRIPT_URL not configured. Form details logged in browser console.',
    };
  }

  try {
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script to bypass CORS preflight limitations
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // With mode: 'no-cors', the response status is 0 (opaque) and we cannot access headers or body.
    // However, if the fetch does not throw, the request was successfully sent.
    return {
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    };
  } catch (error) {
    console.error('Google Sheets form submission error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
    };
  }
};
