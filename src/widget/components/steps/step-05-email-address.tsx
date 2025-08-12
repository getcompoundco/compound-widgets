import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from '@/components/ui/input';
import { useStepNavigation } from '../../lib/use-step-navigation';
import { EmailAddress } from '../../types/form-data';
import { WidgetButton } from '../widget-button';
import { StepLayout } from '../step-layout';
import {
  fadeVariants,
  successVariants,
  springTransition,
} from '../../lib/animation-variants';

export function Step05EmailAddress() {
  const { formData, updateFormData, nextStep } = useStepNavigation();

  const [emailAddress, setEmailAddress] = useState<EmailAddress>({
    email: '',
    isValid: false,
    ...formData.emailAddress,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    updateFormData({ emailAddress });
  }, [emailAddress, updateFormData]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (value: string) => {
    const isValid = validateEmail(value);
    setHasTyped(true);
    setEmailAddress({
      email: value,
      isValid: isValid,
    });
  };

  const handleContinue = async () => {
    if (!emailAddress.isValid || !emailAddress.email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setShowSuccess(true);
    setIsSubmitting(false);

    // Navigate to next step after success animation
    setTimeout(() => {
      nextStep();
    }, 800);
    console.log('Email saved:', emailAddress.email);
  };

  const isEmailValid = emailAddress.email && emailAddress.isValid;

  const getInputStatus = () => {
    if (!hasTyped || !emailAddress.email) return 'idle';
    return emailAddress.isValid ? 'valid' : 'error';
  };

  return (
    <StepLayout>
      <motion.div
        className='h-full flex flex-col'
        variants={fadeVariants}
        initial='enter'
        animate='center'
        exit='exit'
      >
        {/* Main Content - flexible height */}
        <div className='flex-1 flex flex-col pb-6 min-h-0'>
          {/* Title and Description */}
          <motion.div
            className='mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...springTransition }}
          >
            <motion.h1
              className="text-2xl font-medium text-gray-700 leading-[30px] mb-4 font-['SF_Pro_Display:Medium',_sans-serif]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Enter your
              <br />
              email address.
            </motion.h1>
            <motion.p
              className="text-gray-600 text-base leading-[24px] font-['Satoshi_Variable:Regular',_sans-serif] tracking-[-0.176px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              We'll only use this to save
              <br />
              your progress.
            </motion.p>
          </motion.div>

          {/* Email Input Field */}
          <motion.div
            className='mb-8'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, ...springTransition }}
          >
            <div className='relative'>
              <motion.div
                className='relative'
                animate={{
                  scale: isInputFocused ? 1.02 : 1,
                }}
                transition={springTransition}
              >
                <Input
                  type='email'
                  value={emailAddress.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder='Enter your email'
                  className='h-[43px] px-5 bg-white border border-gray-300 rounded-[21.5px] text-gray-700 placeholder:text-gray-400 placeholder:text-xs focus:border-[#683DFF] focus:ring-1 focus:ring-purple-200 focus:outline-none transition-colors font-medium'
                  style={{
                    fontSize: '12px',
                    fontFamily: 'Satoshi:Medium, sans-serif',
                    borderColor:
                      getInputStatus() === 'valid'
                        ? '#10b981'
                        : getInputStatus() === 'error'
                          ? '#ef4444'
                          : isInputFocused
                            ? '#683DFF'
                            : '#d1d5db',
                  }}
                />

                {/* Validation indicators */}
                <AnimatePresence>
                  {hasTyped && emailAddress.email && (
                    <motion.div
                      className='absolute right-4 top-1/2 transform -translate-y-1/2'
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={springTransition}
                    >
                      {emailAddress.isValid ? (
                        <motion.div
                          className='w-5 h-5 -mt-3 bg-green-500 rounded-full flex items-center justify-center'
                          variants={successVariants}
                          initial='initial'
                          animate='animate'
                        >
                          <svg
                            width='12'
                            height='9'
                            viewBox='0 0 12 9'
                            fill='none'
                          >
                            <motion.path
                              d='M1 4.5L4.5 8L11 1.5'
                              stroke='white'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </svg>
                        </motion.div>
                      ) : (
                        <motion.div
                          className='w-5 h-5 -mt-3 bg-red-500 rounded-full flex items-center justify-center'
                          animate={{ x: [0, -2, 2, -2, 2, 0] }}
                          transition={{ duration: 0.4 }}
                        >
                          <svg
                            width='10'
                            height='10'
                            viewBox='0 0 10 10'
                            fill='none'
                          >
                            <path
                              d='M2 2L8 8M8 2L2 8'
                              stroke='white'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                            />
                          </svg>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Validation message */}
              <AnimatePresence>
                {hasTyped && emailAddress.email && !emailAddress.isValid && (
                  <motion.p
                    className='text-red-500 text-xs mt-2 ml-5'
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={springTransition}
                  >
                    Please enter a valid email address
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Flexible spacer */}
          <div className='flex-1 min-h-8'></div>

          {/* Continue Button */}
          <motion.div
            className='flex flex-col items-center shrink-0'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, ...springTransition }}
          >
            <WidgetButton
              onClick={handleContinue}
              width={145}
              variant='primary'
              disabled={!isEmailValid || showSuccess}
              isLoading={isSubmitting}
            >
              {showSuccess ? 'Saved!' : 'Continue'}
            </WidgetButton>
          </motion.div>
        </div>
      </motion.div>
    </StepLayout>
  );
}
