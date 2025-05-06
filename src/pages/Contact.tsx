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
            {/* Office Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="rounded-2xl overflow-hidden ring-1 ring-white/10 relative aspect-video"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d-122.3320708!3d47.6062095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM47CsDM2JzIyLjQiTiAxMjLCsDE5JzU1LjUiVw!5e0!3m2!1sen!2sus!4v1647951865992!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                title="Office Location"
              />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl" />
            </motion.div>

            {/* Additional Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="rounded-2xl bg-slate-800/50 backdrop-blur-sm p-6 ring-1 ring-white/10">
                <Clock className="w-6 h-6 text-cyan-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Business Hours</h3>
                <p className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-400">Sat: 10:00 AM - 2:00 PM</p>
              </div>

              <div className="rounded-2xl bg-slate-800/50 backdrop-blur-sm p-6 ring-1 ring-white/10">
                <MapPin className="w-6 h-6 text-cyan-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Office Location</h3>
                <p className="text-gray-400">123 Packaging Street</p>
                <p className="text-gray-400">Box City, BC 12345</p>
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