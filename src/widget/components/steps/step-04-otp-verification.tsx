import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStepNavigation } from '../../lib/use-step-navigation';
import { OTPVerification } from '../../types/form-data';
import { WidgetButton } from '../widget-button';
import { StepLayout } from '../step-layout';
import {
  fadeVariants,
  containerVariants,
  itemVariants,
  springTransition,
} from '../../lib/animation-variants';

export function Step04OtpVerification() {
  const { formData, updateFormData, nextStep } = useStepNavigation();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [otpVerification, setOtpVerification] = useState<OTPVerification>({
    code: '',
    phoneNumber: formData.phoneVerification?.phoneNumber || '50 123 4567',
    attempts: 0,
    timeRemaining: 30,
    verified: false,
    canResend: false,
    ...formData.otpVerification,
  });

  const [otpDigits, setOtpDigits] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    updateFormData({ otpVerification });
  }, [otpVerification, updateFormData]);

  // Timer countdown
  useEffect(() => {
    if (otpVerification.timeRemaining > 0 && !otpVerification.canResend) {
      const timer = setTimeout(() => {
        setOtpVerification((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
          canResend: prev.timeRemaining <= 1,
        }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [otpVerification.timeRemaining, otpVerification.canResend]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digits
    if (value.length > 1) {
      value = value.slice(-1);
    }

    // Only allow numeric values
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    // Update the combined OTP code
    const newCode = newOtpDigits.join('');
    setOtpVerification((prev) => ({
      ...prev,
      code: newCode,
    }));

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const digits = pastedText.replace(/\D/g, '').slice(0, 6).split('');

    if (digits.length > 0) {
      const newOtpDigits = Array(6).fill('');
      digits.forEach((digit, index) => {
        if (index < 6) {
          newOtpDigits[index] = digit;
        }
      });
      setOtpDigits(newOtpDigits);

      const newCode = newOtpDigits.join('');
      setOtpVerification((prev) => ({
        ...prev,
        code: newCode,
      }));

      // Focus the next empty input or the last one
      const nextIndex = Math.min(digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleVerify = async () => {
    if (otpVerification.code.length !== 6) return;

    setIsVerifying(true);
    setHasError(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success/error (90% success rate for demo)
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      setShowSuccess(true);
      setOtpVerification((prev) => ({
        ...prev,
        verified: true,
        attempts: prev.attempts + 1,
      }));

      setIsVerifying(false);

      // Navigate to email step after success animation
      setTimeout(() => {
        nextStep();
      }, 1000);
    } else {
      setHasError(true);
      setIsVerifying(false);
      // Clear inputs on error
      setOtpDigits(['', '', '', '', '', '']);
      // Focus first input
      setTimeout(() => {
        inputRefs.current[0]?.focus();
        setFocusedIndex(0);
      }, 500);
    }

    console.log('OTP Verified:', otpVerification.code);
  };

  const handleResend = () => {
    setOtpVerification((prev) => ({
      ...prev,
      timeRemaining: 30,
      canResend: false,
      attempts: prev.attempts + 1,
    }));

    // Clear current OTP
    setOtpDigits(['', '', '', '', '', '']);

    // Focus first input
    inputRefs.current[0]?.focus();

    console.log('Resending OTP...');
  };

  const isCodeComplete = otpVerification.code.length === 6;

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
              className="text-2xl font-medium text-gray-700 leading-[30px] mb-4 font-['General_Sans_Variable:Medium',_sans-serif]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Enter the OTP sent
              <br />
              to your phone.
            </motion.h1>
            <motion.p
              className="text-gray-600 text-base leading-[22px] font-['Satoshi_Variable:Regular',_sans-serif]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              A one-time password has been
              <br />
              sent to +971 50 *** **67.
            </motion.p>
          </motion.div>

          {/* OTP Input Fields */}
          <motion.div
            className='mb-12'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, ...springTransition }}
          >
            <motion.div
              className='flex justify-center gap-3 max-w-[300px] mx-auto'
              variants={containerVariants}
              initial='hidden'
              animate='visible'
            >
              {Array.from({ length: 6 }, (_, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <motion.input
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type='text'
                    inputMode='numeric'
                    maxLength={1}
                    value={otpDigits[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                    className='w-11 h-[53px] text-center text-xl font-bold border border-gray-300 rounded-full focus:border-[#683DFF] focus:ring-1 focus:ring-purple-200 focus:outline-none transition-colors bg-white shadow-sm'
                    style={{ borderRadius: '102px' }}
                    aria-label={`OTP digit ${index + 1}`}
                    animate={{
                      scale: focusedIndex === index ? 1.05 : 1,
                      borderColor: hasError
                        ? '#ef4444'
                        : focusedIndex === index
                          ? '#683DFF'
                          : otpDigits[index]
                            ? '#10b981'
                            : '#d1d5db',
                      boxShadow:
                        focusedIndex === index
                          ? '0 0 0 3px rgba(104,61,255,0.1)'
                          : hasError
                            ? '0 0 0 3px rgba(239,68,68,0.1)'
                            : 'none',
                      x: hasError ? [0, -2, 2, -2, 2, 0] : 0,
                    }}
                    transition={
                      hasError
                        ? {
                            x: {
                              duration: 0.4,
                              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                            },
                            ...springTransition,
                          }
                        : springTransition
                    }
                    whileHover={{
                      scale: focusedIndex === index ? 1.05 : 1.02,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Error message */}
            <AnimatePresence>
              {hasError && (
                <motion.p
                  className='text-center text-red-500 text-sm mt-4'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={springTransition}
                >
                  Invalid OTP. Please try again.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Timer Display */}
          <motion.div
            className='flex justify-center mb-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <div className='text-gray-500 text-sm'>
              {otpVerification.timeRemaining > 0 ? (
                <motion.span
                  key={otpVerification.timeRemaining}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Resend OTP in {otpVerification.timeRemaining}s
                </motion.span>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='text-purple-600'
                >
                  You can resend OTP now
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* Flexible spacer */}
          <div className='flex-1 min-h-8'></div>

          {/* Continue Button and Retry */}
          <motion.div
            className='flex flex-col items-center space-y-6 shrink-0'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, ...springTransition }}
          >
            <WidgetButton
              onClick={handleVerify}
              width={200}
              variant='primary'
              disabled={!isCodeComplete || showSuccess}
              isLoading={isVerifying}
            >
              {showSuccess ? 'Verified!' : 'Continue'}
            </WidgetButton>

            {/* Retry Link */}
            <motion.button
              onClick={handleResend}
              className="text-sm text-gray-600 underline font-['Satoshi_Variable:Medium',_sans-serif] hover:text-gray-700"
              disabled={!otpVerification.canResend}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                opacity: otpVerification.canResend ? 1 : 0.5,
                y: otpVerification.canResend ? 0 : 2,
              }}
            >
              Retry sending OTP
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </StepLayout>
  );
}
