import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import FormField from '../components/common/FormField';
import AriaLive from '../components/common/AriaLive';
import useKeyboardShortcut from '../hooks/useKeyboardShortcut';
import { 
  ChevronRight, 
  ChevronLeft,
  Box,
  Truck,
  Calculator,
  User,
  Mail,
  Building2,
  Phone,
  Calendar,
  MessageSquare
} from 'lucide-react';

interface FormData {
  // Step 1: Basic Info
  name: string;
  email: string;
  company: string;
  phone: string;
  
  // Step 2: Box Details
  boxType: string;
  quantity: number;
  length: number;
  width: number;
  height: number;
  material: string;
  
  // Step 3: Additional Details
  printingRequired: boolean;
  deadline: string;
  specialRequirements: string;
}

const QUOTE_BG = 'https://images.unsplash.com/photo-1586528116493-d795f2095332?auto=format&fit=crop&q=80&w=2000';

type StepKey = 'basicInfo' | 'boxSpecs' | 'additionalDetails';

const steps = [
  {
    title: 'Basic Information',
    key: 'basicInfo' as StepKey,
    icon: <Box className="w-6 h-6" />,
  },
  {
    title: 'Box Specifications',
    key: 'boxSpecs' as StepKey,
    icon: <Calculator className="w-6 h-6" />,
  },
  {
    title: 'Additional Details',
    key: 'additionalDetails' as StepKey,
    icon: <Truck className="w-6 h-6" />,
  },
];

const stepImages: Record<StepKey, string> = {
  basicInfo: 'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800',
  boxSpecs: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=800',
  additionalDetails: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=800'
};

const RequestQuote = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ariaMessage, setAriaMessage] = useState('');
  const { register, handleSubmit, formState: { errors, dirtyFields }, trigger, reset } = useForm<FormData>();
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  // Focus management
  useEffect(() => {
    const form = formRef.current;
    if (form) {
      const firstInput = form.querySelector('input, select, textarea') as HTMLElement;
      firstInput?.focus();
    }
  }, [currentStep]);

  // Keyboard shortcuts
  useKeyboardShortcut('Enter', async (e) => {
    if (e.target instanceof HTMLButtonElement) return;
    if (currentStep === steps.length - 1) {
      formRef.current?.requestSubmit();
    } else {
      await nextStep();
    }
  }, {
    modifiers: ['ctrlKey'],
    targetElement: formRef.current
  });

  useKeyboardShortcut('ArrowRight', async () => {
    await nextStep();
  }, {
    modifiers: ['altKey'],
    enabled: currentStep < steps.length - 1
  });

  useKeyboardShortcut('ArrowLeft', () => {
    prevStep();
  }, {
    modifiers: ['altKey'],
    enabled: currentStep > 0
  });

  useKeyboardShortcut('Escape', () => {
    const confirmed = window.confirm('Are you sure you want to reset the form?');
    if (confirmed) {
      reset();
      setCurrentStep(0);
      setAriaMessage('Form has been reset');
      showToast('Form has been reset', 'info');
    }
  }, {
    targetElement: formRef.current
  });

  const validateStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    switch (currentStep) {
      case 0:
        fieldsToValidate = ['name', 'email', 'company', 'phone'];
        break;
      case 1:
        fieldsToValidate = ['boxType', 'quantity', 'length', 'width', 'height', 'material'];
        break;
      case 2:
        fieldsToValidate = ['deadline', 'specialRequirements'];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (!isValid) {
      setAriaMessage('Please correct the errors before proceeding');
    }
    return isValid;
  };

  const nextStep = async () => {
    const isValid = await validateStep();
    if (isValid && currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setAriaMessage(`Step ${nextStep + 1} of ${steps.length}: ${steps[nextStep].title}`);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setAriaMessage(`Step ${prevStep + 1} of ${steps.length}: ${steps[prevStep].title}`);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setAriaMessage('Submitting your quote request...');
    
    try {
      // Here you would typically send the data to your backend
      console.log(data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('Quote request submitted successfully! We\'ll be in touch soon.', 'success');
      setAriaMessage('Quote request submitted successfully! We\'ll be in touch soon.');
      reset();
    } catch (err) {
      console.error('Failed to submit quote request:', err);
      showToast('Failed to submit quote request. Please try again.', 'error');
      setAriaMessage('Failed to submit quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-950 text-gray-100">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${QUOTE_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/90 to-gray-950 opacity-90" />
      </div>

      {/* Quote Form Content */}
      <div className="container mx-auto px-6 py-24 relative z-10">
        <AriaLive message={ariaMessage} />
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-center mb-8">Request a Quote</h1>
            
            <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
              <h2 className="text-sm font-medium text-gray-600 mb-2">Keyboard Shortcuts:</h2>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Ctrl + Enter: Proceed to next step or submit form</li>
                <li>• Alt + ←/→: Navigate between steps</li>
                <li>• Esc: Reset form</li>
              </ul>
            </div>
            
            {/* Progress Steps */}
            <nav aria-label="Progress" className="mb-12">
              <ol role="list" className="flex justify-between">
                {steps.map((step, index) => (
                  <li 
                    key={step.title}
                    className="flex-1 relative"
                    aria-current={currentStep === index ? 'step' : undefined}
                  >
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2
                          ${index <= currentStep ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                        role="img"
                        aria-label={`Step ${index + 1}: ${step.title}`}
                      >
                        {step.icon}
                      </motion.div>
                      <span 
                        className="text-sm text-center"
                        aria-hidden="true"
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div 
                        className={`absolute top-6 left-1/2 w-full h-0.5 
                          ${index < currentStep ? 'bg-primary-600' : 'bg-gray-200'}`}
                        aria-hidden="true"
                      />
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            {/* Form Steps */}
            <form 
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)} 
              className="bg-white rounded-2xl shadow-lg p-8"
              aria-label="Quote Request Form"
            >
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
                      label="Full Name"
                      {...register('name', { required: 'Name is required' })}
                      error={errors.name?.message}
                      success={!errors.name && dirtyFields.name}
                      icon={<User className="w-5 h-5" />}
                      required
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
                    />

                    <FormField
                      label="Company Name"
                      {...register('company', { required: 'Company name is required' })}
                      error={errors.company?.message}
                      success={!errors.company && dirtyFields.company}
                      icon={<Building2 className="w-5 h-5" />}
                      required
                    />

                    <FormField
                      label="Phone Number"
                      {...register('phone', {
                        pattern: {
                          value: /^[0-9+-]+$/,
                          message: 'Invalid phone number'
                        }
                      })}
                      type="tel"
                      error={errors.phone?.message}
                      success={!errors.phone && dirtyFields.phone}
                      icon={<Phone className="w-5 h-5" />}
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
                      label="Box Type"
                      {...register('boxType', { 
                        required: 'Please select a box type'
                      })}
                      error={errors.boxType?.message}
                      success={!errors.boxType && dirtyFields.boxType}
                      as="select"
                      required
                    >
                      <option value="">Select a box type</option>
                      <option value="shipping">Shipping Boxes</option>
                      <option value="retail">Retail Boxes</option>
                      <option value="food">Food Service Boxes</option>
                      <option value="custom">Custom Design</option>
                    </FormField>

                    <FormField
                      label="Quantity"
                      {...register('quantity', {
                        required: 'Quantity is required',
                        min: { value: 1, message: 'Minimum quantity is 1' }
                      })}
                      type="number"
                      error={errors.quantity?.message}
                      success={!errors.quantity && dirtyFields.quantity}
                      required
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        label="Length (inches)"
                        {...register('length', { required: 'Length is required' })}
                        type="number"
                        step="0.1"
                        error={errors.length?.message}
                        success={!errors.length && dirtyFields.length}
                        required
                      />
                      <FormField
                        label="Width (inches)"
                        {...register('width', { required: 'Width is required' })}
                        type="number"
                        step="0.1"
                        error={errors.width?.message}
                        success={!errors.width && dirtyFields.width}
                        required
                      />
                      <FormField
                        label="Height (inches)"
                        {...register('height', { required: 'Height is required' })}
                        type="number"
                        step="0.1"
                        error={errors.height?.message}
                        success={!errors.height && dirtyFields.height}
                        required
                      />
                    </div>

                    <FormField
                      label="Material Preference"
                      {...register('material')}
                      as="select"
                      error={errors.material?.message}
                      success={!errors.material && dirtyFields.material}
                    >
                      <option value="">Select a material</option>
                      <option value="corrugated">Corrugated Cardboard</option>
                      <option value="rigid">Rigid Boxes</option>
                      <option value="kraft">Kraft Paper</option>
                      <option value="eco">Eco-Friendly Materials</option>
                    </FormField>
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
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Do you need printing on the boxes?
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            {...register('printingRequired')}
                            type="radio"
                            value="true"
                            className="mr-2"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            {...register('printingRequired')}
                            type="radio"
                            value="false"
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    </div>

                    <FormField
                      label="Deadline"
                      {...register('deadline')}
                      type="date"
                      error={errors.deadline?.message}
                      success={!errors.deadline && dirtyFields.deadline}
                      icon={<Calendar className="w-5 h-5" />}
                    />

                    <FormField
                      label="Special Requirements"
                      {...register('specialRequirements')}
                      textarea
                      rows={4}
                      error={errors.specialRequirements?.message}
                      success={!errors.specialRequirements && dirtyFields.specialRequirements}
                      icon={<MessageSquare className="w-5 h-5" />}
                      placeholder="Any special requirements or additional information..."
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8" role="navigation">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  leftIcon={<ChevronLeft />}
                  className={currentStep === 0 ? 'invisible' : ''}
                  aria-label="Go to previous step"
                >
                  Previous
                </Button>

                {currentStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    rightIcon={<Truck />}
                    aria-label={isSubmitting ? 'Submitting quote request...' : 'Submit quote request'}
                  >
                    Submit Quote Request
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    rightIcon={<ChevronRight />}
                    aria-label="Go to next step"
                  >
                    Next
                  </Button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RequestQuote;