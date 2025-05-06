import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FieldValues } from 'react-hook-form';
import { 
  User, Mail, Phone, Package, Ruler,
  Hash, FileText, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import FormField from '../components/common/FormField';
import AriaLive from '../components/common/AriaLive';

// Background image for the quote page
const QUOTE_BG = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000';

interface QuoteFormData extends FieldValues {
  name: string;
  email: string;
  phone?: string;
  material: string;
  dimensions: string;
  quantity: number;
  printing: string;
  additionalInfo?: string;
}

const RequestQuote = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ariaMessage, setAriaMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const { showToast } = useToast();

  const steps = useMemo(() => ['Personal Details', 'Product Details', 'Customization'], []);

  // Add step descriptions for better UX
  const stepDescriptions = useMemo(() => ({
    'Personal Details': 'Help us know who you are',
    'Product Details': 'Tell us about your packaging needs',
    'Customization': 'Customize your packaging solution'
  }), []);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset
  } = useForm<QuoteFormData>({
    mode: 'onChange'
  });

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setAriaMessage(`Step ${currentStep + 2} of ${steps.length}: ${steps[currentStep + 1]}`);
    }
  }, [currentStep, steps]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setAriaMessage(`Step ${currentStep} of ${steps.length}: ${steps[currentStep - 1]}`);
    }
  }, [currentStep, steps]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow keyboard navigation between steps
      if (e.key === 'ArrowRight' && !isSubmitting && currentStep < steps.length - 1) {
        e.preventDefault();
        nextStep();
      } else if (e.key === 'ArrowLeft' && currentStep > 0) {
        e.preventDefault();
        prevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, isSubmitting, nextStep, prevStep, steps.length]);

  useEffect(() => {
    // Focus first input of each step
    const firstInput = formRef.current?.querySelector('input, select, textarea') as HTMLElement;
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 300); // Wait for animation
    }
  }, [currentStep]);

  const validateStep = () => {
    switch (currentStep) {
      case 0:
        if (!dirtyFields.name || !dirtyFields.email) {
          showToast('Please fill in all required fields', 'error');
          setAriaMessage('Please fill in all required fields');
          return false;
        }
        break;
      case 1:
        if (!dirtyFields.material || !dirtyFields.dimensions || !dirtyFields.quantity) {
          showToast('Please fill in all required fields', 'error');
          setAriaMessage('Please fill in all required fields');
          return false;
        }
        break;
      case 2:
        if (!dirtyFields.printing) {
          showToast('Please select printing requirements', 'error');
          setAriaMessage('Please select printing requirements');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      nextStep();
    }
  };

  const onSubmit = async (formData: QuoteFormData) => {
    try {
      setIsSubmitting(true);
      // Add the data usage here
      console.log('Submitting form data:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      showToast('Quote request submitted successfully! We\'ll get back to you soon.', 'success');
      setAriaMessage('Form submitted successfully. We will contact you soon.');
      reset();
      setCurrentStep(0);
    } catch (error) {
      console.error('Error submitting form:', error);
      showToast('Failed to submit quote request. Please try again.', 'error');
      setAriaMessage('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-950 text-gray-100 relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-50"
          style={{ backgroundImage: `url(${QUOTE_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/90 to-gray-950 opacity-90" />
        <motion.div
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] opacity-[0.03]"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 0.5, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Quote Form Content */}
      <div className="container mx-auto px-6 py-24 relative z-10">
        <AriaLive message={ariaMessage} />
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-teal-400">Request a Quote</h1>
            <p className="text-xl text-gray-300">
              Fill out the form below to get a custom quote for your packaging needs.
              Our team will get back to you within 24 hours.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center relative z-10"
                initial={false}
                animate={{
                  scale: currentStep >= index ? 1.1 : 1,
                  opacity: currentStep >= index ? 1 : 0.5
                }}
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-3
                    ${currentStep >= index ? 'bg-teal-500 text-gray-900' : 'bg-gray-800 text-gray-400'}
                    transition-all duration-300 ease-in-out transform
                    ${currentStep === index ? 'ring-4 ring-teal-500/30' : ''}`}
                >
                  {index + 1}
                </div>
                <span className="text-sm font-medium mb-1">{step}</span>
                <span className="text-xs text-gray-400">{stepDescriptions[step]}</span>
              </motion.div>
            ))}
            
            {/* Progress Line */}
            <div className="absolute top-6 left-0 h-0.5 bg-gray-800 w-full -z-10" />
            <motion.div
              className="absolute top-6 left-0 h-0.5 bg-teal-500"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Form Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-800 shadow-2xl"
          >
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <FormField
                      {...register('name', { required: 'Full Name is required' })}
                      label="Full Name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      icon={<User className="w-5 h-5" />}
                      error={errors.name?.message?.toString()}
                      success={!errors.name && dirtyFields.name}
                      className="bg-gray-900/50 border-gray-600 text-gray-100 placeholder-gray-400"
                    />
                    
                    <FormField
                      {...register('email', { required: 'Email Address is required' })}
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      icon={<Mail className="w-5 h-5" />}
                      error={errors.email?.message?.toString()}
                      success={!errors.email && dirtyFields.email}
                      className="bg-gray-900/50 border-gray-600 text-gray-100 placeholder-gray-400"
                    />

                    <FormField
                      {...register('phone')}
                      label="Phone Number"
                      type="tel"
                      placeholder="Enter your phone number"
                      icon={<Phone className="w-5 h-5" />}
                      error={errors.phone?.message}
                      success={!errors.phone && dirtyFields.phone}
                      className="bg-gray-900/50 border-gray-600 text-gray-100 placeholder-gray-400"
                    />
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <FormField
                      {...register('material', { required: 'Packaging Material is required' })}
                      label="Packaging Material"
                      as="select"
                      icon={<Package className="w-5 h-5" />}
                      required
                      error={errors.material?.message}
                      success={!errors.material && dirtyFields.material}
                      className="bg-gray-900/50 border-gray-600 text-gray-100"
                    >
                      <option value="" className="bg-gray-900">Select a material</option>
                      <option value="corrugated" className="bg-gray-900">Corrugated Cardboard</option>
                      <option value="rigid" className="bg-gray-900">Rigid Boxes</option>
                      <option value="kraft" className="bg-gray-900">Kraft Paper</option>
                      <option value="eco" className="bg-gray-900">Eco-Friendly Materials</option>
                    </FormField>

                    <FormField
                      {...register('dimensions', { required: 'Box Dimensions are required' })}
                      label="Box Dimensions (L x W x H)"
                      placeholder="e.g., 12 x 8 x 6 inches"
                      icon={<Ruler className="w-5 h-5" />}
                      required
                      error={errors.dimensions?.message?.toString()}
                      success={!errors.dimensions && dirtyFields.dimensions}
                      className="bg-gray-900/50 border-gray-600 text-gray-100 placeholder-gray-400"
                    />

                    <FormField
                      {...register('quantity', { required: 'Quantity is required' })}
                      label="Quantity Needed"
                      type="number"
                      placeholder="Enter quantity"
                      min="1"
                      icon={<Hash className="w-5 h-5" />}
                      required
                      error={errors.quantity?.message}
                      success={!errors.quantity && dirtyFields.quantity}
                      className="bg-gray-900/50 border-gray-600 text-gray-100 placeholder-gray-400"
                    />
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-200">
                        Printing Requirements
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['No Printing', 'Single Color', 'Full Color', 'Custom Design'].map((option) => (
                          <motion.div
                            key={option}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative"
                          >
                            <input
                              type="radio"
                              {...register('printing')}
                              value={option.toLowerCase().replace(' ', '-')}
                              className="peer hidden"
                              id={`printing-${option.toLowerCase()}`}
                            />
                            <label
                              htmlFor={`printing-${option.toLowerCase()}`}
                              className="block p-4 rounded-lg border border-gray-600 cursor-pointer bg-gray-900/50
                                peer-checked:border-teal-500 peer-checked:text-teal-500 peer-checked:bg-teal-500/10
                                hover:bg-gray-800/50 transition-all duration-200"
                            >
                              {option}
                            </label>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <FormField
                      {...register('additionalInfo')}
                      label="Additional Requirements"
                      as="textarea"
                      rows={4}
                      placeholder="Any specific requirements or details you'd like to share..."
                      icon={<FileText className="w-5 h-5" />}
                      error={errors.additionalInfo?.message}
                      success={!errors.additionalInfo && dirtyFields.additionalInfo}
                      className="bg-gray-900/50 border-gray-600 text-gray-100 placeholder-gray-400"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  leftIcon={<ChevronLeft />}
                  className={`${currentStep === 0 ? 'invisible' : ''} border-teal-500 text-teal-500 hover:bg-teal-500/10`}
                  aria-label="Go to previous step"
                >
                  Previous
                </Button>
                <Button
                  type={currentStep === steps.length - 1 ? 'submit' : 'button'}
                  onClick={currentStep === steps.length - 1 ? undefined : handleNext}
                  rightIcon={<ChevronRight />}
                  className="bg-teal-500 text-gray-900 hover:bg-teal-600"
                  disabled={isSubmitting}
                  aria-label={currentStep === steps.length - 1 ? 'Submit form' : 'Go to next step'}
                >
                  {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RequestQuote;