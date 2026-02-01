import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const initializeEmailJS = () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
};

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      to_email: 'ankitkumar1990asap@gmail.com', // Your email address
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      };
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again later or contact me directly via email.'
    };
  }
};

// Fallback function for development/testing
export const sendEmailFallback = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  // Simulate email sending for development
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Log the form data for testing
  console.log('Form submission data:', data);
  
  return {
    success: true,
    message: 'Message sent successfully! I\'ll get back to you soon.'
  };
};
