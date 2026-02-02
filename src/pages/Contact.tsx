import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { toast } from '@/components/ui/sonner';
import { Send, Github, Linkedin, Twitter, Mail, MapPin, Download } from 'lucide-react';
import contactData from '@/data/contact.json';
import { sendEmail } from '@/lib/emailService';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
} as const;

const socialLinks = contactData.socialLinks.map((link) => ({
  ...link,
  icon: iconMap[link.id as keyof typeof iconMap],
}));

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendEmail(formState);

      if (result.success) {
        setFormState({ name: '', email: '', subject: '', message: '' });
        toast.success("Message sent successfully! I'll get back to you soon.");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Layout>
      <section className="pt-32 pb-12">
        <div className="container-custom">
          <SectionHeader
            eyebrow={contactData.header.eyebrow}
            title={contactData.header.title}
            description={contactData.header.description}
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="heading-3 mb-6">Get in Touch</h3>
              <p className="body-large text-muted-foreground mb-8">
                Whether you're looking for a full-time developer, a freelance collaborator, 
                or just want to say hi, I'd love to hear from you.
              </p>

              {/* Location */}
              <div className="flex items-center gap-3 mb-8 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{contactData.location.full}</span>
              </div>

              {/* Social Links */}
              <div className="space-y-4 mb-8">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <link.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium">{link.label}</div>
                      <div className="text-sm text-muted-foreground">{link.username}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Resume Download */}
              <MagneticButton className="btn-outline w-full justify-center">
                <a href={contactData.resume.url} className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  {contactData.resume.label}
                </a>
              </MagneticButton>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="card-premium">
                <h3 className="heading-4 text-xl mb-6">Send a Message</h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="">Select a topic</option>
                      <option value="project">Project Inquiry</option>
                      <option value="job">Job Opportunity</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your project or idea..."
                    />
                  </div>

                  {/* Submit Button (MagneticButton removed) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      w-full flex items-center justify-center gap-2
                      px-6 py-3 rounded-xl
                      bg-primary text-primary-foreground
                      transition-all duration-300 ease-out
                      hover:bg-primary/90 hover:scale-[1.02]
                      active:scale-[0.98]
                      disabled:opacity-60 disabled:cursor-not-allowed
                    "
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
