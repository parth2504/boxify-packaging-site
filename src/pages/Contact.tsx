import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import FormField from '../components/common/FormField';
import AriaLive from '../components/common/AriaLive';
import useKeyboardShortcut from '../hooks/useKeyboardShortcut';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  User,
  MessageSquare
} from 'lucide-react';
import emailjs from '@emailjs/browser'; // Import EmailJS

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Phone',
    details: [
      '+1 (555) 123-4567',
      '+1 (555) 987-6543'
    ]
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Email',
    details: [
      'info@boxify.com',
      'support@boxify.com'
    ]
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Location',
    details: [
      '123 Packaging Street',
      'Box City, BC 12345'
    ]
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Business Hours',
    details: [
      'Mon - Fri: 9:00 AM - 6:00 PM',
      'Sat: 10:00 AM - 2:00 PM'
    ]
  }
];

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm<ContactFormData>();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ariaMessage, setAriaMessage] = useState('');

  // Initialize EmailJS with your User ID
  useEffect(() => {
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;
    if (userId) {
      emailjs.init(userId); 
    } else {
      console.error('EmailJS User ID is not defined in environment variables.');
    }
  }, []);

  // Focus management
  useEffect(() => {
    const form = formRef.current;
    if (form) {
      const firstInput = form.querySelector('input, textarea') as HTMLElement;
      firstInput?.focus();
    }
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcut('Enter', () => {
    if (document.activeElement instanceof HTMLTextAreaElement) return;
    formRef.current?.requestSubmit();
  }, {
    modifiers: ['ctrlKey'],
    targetElement: formRef.current
  });

  useKeyboardShortcut('Escape', () => {
    const confirmed = window.confirm('Are you sure you want to reset the form?');
    if (confirmed) {
      reset();
      setAriaMessage('Form has been reset');
      showToast('Form has been reset', 'info');
      
      setTimeout(() => {
        const firstInput = formRef.current?.querySelector('input') as HTMLElement;
        firstInput?.focus();
      }, 0);
    }
  }, {
    targetElement: formRef.current
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setAriaMessage('Sending your message...');

    try {
      // Send email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || '', // Replace with your EmailJS Service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '', // Replace with your EmailJS Template ID
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        }
      );

      showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
      setAriaMessage('Message sent successfully! We\'ll get back to you soon.');
      reset();

      setTimeout(() => {
        const firstInput = formRef.current?.querySelector('input') as HTMLElement;
        firstInput?.focus();
      }, 0);
    } catch (error) {
      console.error('EmailJS error:', error);
      showToast('Failed to send message. Please try again.', 'error');
      setAriaMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20" role="main">
      <AriaLive message={ariaMessage} />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-primary-900 text-white overflow-hidden" aria-label="Contact Header">
        <div className="absolute inset-0 bg-[url('/src/assets/images/pattern.svg')] opacity-10" aria-hidden="true" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-primary-100">
              Have questions about our packaging solutions? We're here to help!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20" aria-label="Contact Information and Form">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Keyboard Shortcuts:</h3>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Ctrl + Enter: Submit form</li>
                  <li>• Esc: Reset form</li>
                </ul>
              </div>
              
              <form 
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)} 
                className="space-y-6"
                aria-label="Contact Form"
              >
                <FormField
                  label="Full Name"
                  {...register('name', { required: 'Name is required' })}
                  error={errors.name?.message}
                  success={!errors.name && dirtyFields.name}
                  icon={<User className="w-5 h-5" />}
                  required
                  isLoading={isSubmitting}
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
                />

                <FormField
                  label="Message"
                  {...register('message', { required: 'Message is required' })}
                  error={errors.message?.message}
                  success={!errors.message && dirtyFields.message}
                  textarea
                  rows={6}
                  icon={<MessageSquare className="w-5 h-5" />}
                  required
                  isLoading={isSubmitting}
                />

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  rightIcon={<Send />}
                  className="w-full"
                  aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                >
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                role="list"
                aria-label="Contact Information"
              >
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                    role="listitem"
                  >
                    <div 
                      className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mb-4"
                      aria-hidden="true"
                    >
                      {info.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">{detail}</p>
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-2 h-[300px] overflow-hidden"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.2922926156743965!3d48.858373079287475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1647951865992!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                  title="Company Location Map"
                  aria-label="Interactive map showing our company location"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;