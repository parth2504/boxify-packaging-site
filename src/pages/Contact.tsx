import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Dialog } from '@reach/dialog';
import { useToast } from '../context/ToastContext';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';
import FormField from '../components/common/FormField';
import AriaLive from '../components/common/AriaLive';
import {
  MessageCircle,
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  MessageSquare,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [ariaMessage, setAriaMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields }
  } = useForm<ContactFormData>();

  useKeyboardShortcut(['Control', 'Enter'], () => {
    if (document.activeElement instanceof HTMLTextAreaElement) return;
    formRef.current?.requestSubmit();
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setAriaMessage('Sending your message...');

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use form data
      console.log('Sending message:', data);
      
      showToast('Message sent successfully!', 'success');
      setAriaMessage('Message sent successfully!');
      setShowSuccessDialog(true);
      reset();
    } catch (error) {
      console.error('Error:', error);
      showToast('Failed to send message. Please try again.', 'error');
      setAriaMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Call us',
      primary: '+1 (555) 123-4567',
      secondary: 'Mon-Fri from 8am to 6pm',
      action: 'tel:+15551234567'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email us',
      primary: 'contact@boxify.com',
      secondary: "We'll get back to you within 24h",
      action: 'mailto:contact@boxify.com'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: 'Live chat',
      primary: 'Chat with our team',
      secondary: 'Available 24/7',
      action: '#chat'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden pt-24 sm:pt-32">
        <div className="absolute inset-0 -z-10 opacity-20">
          <svg
            className="h-full w-full"
            viewBox="0 0 1097 845"
            aria-hidden="true"
            fill="none"
          >
            <path
              d="M213.5 384.7c-50.9-37.4-86.8-92.4-97.9-155.3-11.1-62.9 6.3-126.7 47.6-174.6 41.3-47.9 102.2-75.1 167.1-74.5 64.9.6 125.1 28.9 165.4 77.6 24.8 30 41.1 66.5 46.8 105.1 5.7 38.6.8 78.1-14.2 114-15 35.9-39.4 67.4-70.6 91.3-31.2 23.9-68.3 39.4-107.1 44.8-38.8 5.4-78.4.9-114.3-13.1-35.9-14-67.4-38.4-91.3-69.6-18.3-24-31.2-51.7-37.8-81.2"
              stroke="url(#0995647f-f297-4713-9df9-a0595fd5620b)"
              strokeWidth="2"
            />
            <path
              d="M896.5 678.3c-50.9-37.4-86.8-92.4-97.9-155.3-11.1-62.9 6.3-126.7 47.6-174.6 41.3-47.9 102.2-75.1 167.1-74.5 64.9.6 125.1 28.9 165.4 77.6 24.8 30 41.1 66.5 46.8 105.1 5.7 38.6.8 78.1-14.2 114-15 35.9-39.4 67.4-70.6 91.3-31.2 23.9-68.3 39.4-107.1 44.8-38.8 5.4-78.4.9-114.3-13.1-35.9-14-67.4-38.4-91.3-69.6-18.3-24-31.2-51.7-37.8-81.2"
              stroke="url(#1095647f-f297-4713-9df9-a0595fd5620b)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient
                id="0995647f-f297-4713-9df9-a0595fd5620b"
                x1="0"
                y1="0"
                x2="1097"
                y2="845"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0EA5E9" />
                <stop offset="1" stopColor="#22D3EE" />
              </linearGradient>
              <linearGradient
                id="1095647f-f297-4713-9df9-a0595fd5620b"
                x1="1097"
                y1="845"
                x2="0"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0EA5E9" />
                <stop offset="1" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
              Get in touch
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Have questions about our packaging solutions? We'd love to hear from you. 
              Choose your preferred way to reach us below.
            </p>
          </motion.div>
        </div>

        {/* Contact Methods Grid */}
        <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative flex flex-col gap-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm p-8 ring-1 ring-white/10 hover:ring-cyan-400/50 transition-all duration-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 ring-1 ring-cyan-500/30">
                  {method.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-7 text-white">{method.label}</h3>
                  <p className="mt-2 text-base leading-7 text-gray-300">{method.secondary}</p>
                  <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-cyan-400">
                    {method.primary}
                    <ArrowRight className="w-4 h-4" />
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <AriaLive message={ariaMessage} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <div className="rounded-2xl bg-slate-800/50 backdrop-blur-sm p-8 ring-1 ring-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
            
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                label="Full Name"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
                success={!errors.name && dirtyFields.name}
                icon={<User className="w-5 h-5" />}
                required
                isLoading={isSubmitting}
                className="bg-slate-900/50"
              />

              <FormField
                label="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                error={errors.email?.message}
                success={!errors.email && dirtyFields.email}
                icon={<Mail className="w-5 h-5" />}
                required
                isLoading={isSubmitting}
                className="bg-slate-900/50"
              />

              <FormField
                label="Subject"
                {...register('subject', { required: 'Subject is required' })}
                error={errors.subject?.message}
                success={!errors.subject && dirtyFields.subject}
                icon={<MessageSquare className="w-5 h-5" />}
                required
                isLoading={isSubmitting}
                className="bg-slate-900/50"
              />

              <FormField
                label="Message"
                {...register('message', { required: 'Message is required' })}
                error={errors.message?.message}
                success={!errors.message && dirtyFields.message}
                as="textarea"
                icon={<MessageSquare className="w-5 h-5" />}
                required
                isLoading={isSubmitting}
                className="bg-slate-900/50 min-h-[150px] resize-y"
              />

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold
                  flex items-center justify-center gap-2 hover:from-cyan-600 hover:to-blue-600 
                  focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900
                  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Business Hours */}
              <div className="rounded-2xl bg-slate-800/50 backdrop-blur-sm p-6 ring-1 ring-white/10 hover:ring-cyan-400/50 transition-all duration-300">
                <Clock className="w-6 h-6 text-cyan-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-400">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Saturday</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                  <p className="text-cyan-400 text-sm mt-4">* All times in PST</p>
                </div>
              </div>

              {/* Office Location */}
              <div className="rounded-2xl bg-slate-800/50 backdrop-blur-sm p-6 ring-1 ring-white/10 hover:ring-cyan-400/50 transition-all duration-300">
                <MapPin className="w-6 h-6 text-cyan-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Office Location</h3>
                <div className="space-y-2">
                  <p className="text-gray-400">123 Packaging Street</p>
                  <p className="text-gray-400">Suite 456</p>
                  <p className="text-gray-400">Box City, BC 12345</p>
                  <p className="text-gray-400">United States</p>
                  <a 
                    href="https://maps.google.com/?q=123+Packaging+Street+Box+City+BC+12345" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mt-4 text-sm"
                  >
                    Get Directions
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Support Hours */}
              <div className="rounded-2xl bg-slate-800/50 backdrop-blur-sm p-6 ring-1 ring-white/10 hover:ring-cyan-400/50 transition-all duration-300">
                <MessageCircle className="w-6 h-6 text-cyan-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Customer Support</h3>
                <div className="space-y-2">
                  <p className="text-gray-400">24/7 Live Chat Support</p>
                  <p className="text-gray-400">Email Response: Within 24 hours</p>
                  <p className="text-gray-400">Phone Support: Business Hours</p>
                  <a 
                    href="#support" 
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mt-4 text-sm"
                  >
                    Visit Help Center
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Sales Inquiries */}
              <div className="rounded-2xl bg-slate-800/50 backdrop-blur-sm p-6 ring-1 ring-white/10 hover:ring-cyan-400/50 transition-all duration-300">
                <Mail className="w-6 h-6 text-cyan-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Sales Inquiries</h3>
                <div className="space-y-2">
                  <p className="text-gray-400">For Custom Orders & Quotes</p>
                  <p className="text-gray-400">sales@boxify.com</p>
                  <p className="text-gray-400">+1 (555) 987-6543</p>
                  <a 
                    href="/request-quote" 
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mt-4 text-sm"
                  >
                    Request a Quote
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="rounded-2xl bg-slate-800/50 backdrop-blur-sm p-6 ring-1 ring-white/10"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://linkedin.com/company/boxify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com/boxify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </a>
                <a
                  href="https://facebook.com/boxify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                  </svg>
                  Facebook
                </a>
                <a
                  href="https://instagram.com/boxify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                  </svg>
                  Instagram
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Success Dialog */}
      <AnimatePresence>
        {showSuccessDialog && (
          <Dialog 
            isOpen={showSuccessDialog}
            onDismiss={() => setShowSuccessDialog(false)}
            aria-label="Success message"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-auto ring-1 ring-white/10"
            >
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">Message sent successfully!</h3>
                <p className="mt-2 text-gray-400">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setShowSuccessDialog(false)}
                  className="mt-6 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 
                    text-white font-semibold hover:from-cyan-600 hover:to-blue-600 
                    focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 
                    focus:ring-offset-slate-900 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;