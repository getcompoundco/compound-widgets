import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from '@/components/ui/input';
import { useStepNavigation } from '../../lib/use-step-navigation';
import { PhoneVerification } from '../../types/form-data';
import { WidgetButton } from '../widget-button';
import { StepLayout } from '../step-layout';
import {
  fadeVariants,
  inputVariants,
  successVariants,
  springTransition,
} from '../../lib/animation-variants';

export function Step03PhoneVerification() {
  const { formData, updateFormData, nextStep } = useStepNavigation();

  const [phoneVerification, setPhoneVerification] = useState<PhoneVerification>(
    {
      phoneNumber: '50 123 4567',
      countryCode: '+971',
      otpSent: false,
      otpCode: '',
      verified: false,
      ...formData.phoneVerification,
    },
  );
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    updateFormData({ phoneVerification });
  }, [phoneVerification, updateFormData]);

  const handleSendOTP = () => {
    setPhoneVerification((prev) => ({ ...prev, otpSent: true }));
    setShowSuccess(true);
    // Navigate to OTP verification step
    setTimeout(() => {
      nextStep();
    }, 1000);
  };

  const handleRetryOTP = () => {
    setPhoneVerification((prev) => ({
      ...prev,
      otpSent: false,
      otpCode: '',
    }));
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
          {/* Title and Description */}
          <motion.div
            className='mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...springTransition }}
          >
            <motion.h1
              className='text-2xl font-medium text-gray-700 leading-[30px] mb-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Enter your
              <br />
              phone number.
            </motion.h1>
            <motion.div
              className='text-gray-600 text-base leading-[22px]'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className='mb-0'>We'll send you an OTP.</p>
              <p>No promos, just progress.</p>
            </motion.div>
          </motion.div>

          {/* Phone Input */}
          <motion.div
            className='mb-8'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, ...springTransition }}
          >
              <motion.div
                className='relative bg-white border border-gray-300 rounded-full shadow-sm p-1 flex items-center'
                variants={inputVariants}
              >
                {/* Country Code */}
                <div className=' flex items-center px-3 py-2'>
                  <div className='flex items-center space-x-2'>
                    <motion.div className='w-5 h-5 rounded-full  flex items-center justify-center'>
                      <svg
                        width='23'
                        height='23'
                        viewBox='0 0 23 23'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <mask
                          id='mask0_5532_9903'
                          maskUnits='userSpaceOnUse'
                          x='0'
                          y='0'
                          width='22'
                          height='22'
                        >
                          <rect
                            x='0.725586'
                            y='0.722656'
                            width='21.0484'
                            height='21.0484'
                            rx='10.5242'
                            fill='#D9D9D9'
                          />
                        </mask>
                        <g mask='url(#mask0_5532_9903)'>
                          <path
                            d='M0 -0.00390625H22.5V7.49756H0V-0.00390625Z'
                            fill='#00732F'
                          />
                          <path d='M0 7.5H22.5V14.9971H0V7.5Z' fill='white' />
                          <path
                            d='M0 14.9961H22.5V22.4976H0V14.9961Z'
                            fill='black'
                          />
                          <path
                            d='M0 -0.00390625H7.91016V22.4961H0V-0.00390625Z'
                            fill='#FF0000'
                          />
                        </g>
                      </svg>
                    </motion.div>
                    <span className='text-sm font-medium text-black'>
                      {phoneVerification.countryCode}
                    </span>
                  </div>
                </div>

                {/* Phone Number Input */}
                <Input
                  type='tel'
                  value={phoneVerification.phoneNumber}
                  onChange={(e) =>
                    setPhoneVerification((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  className='border-0 bg-transparent flex-1 text-gray-700 focus:ring-0  outline-none shadow-none px-3'
                  placeholder='50 123 4567'
                />

                {/* Success indicator */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      className='mr-3'
                      variants={successVariants}
                      initial='initial'
                      animate='animate'
                      exit='initial'
                    >
                      <div className='w-5 h-5 bg-green-500 rounded-full flex items-center justify-center'>
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
                            transition={{ delay: 0.2, duration: 0.4 }}
                          />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
          </motion.div>

          {/* Flexible spacer */}
          <div className='flex-1 min-h-8'></div>

          {/* Bottom section - Send OTP Button and Retry Link */}
          <motion.div
            className='flex flex-col items-center space-y-4 shrink-0'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, ...springTransition }}
          >
            <WidgetButton
              onClick={handleSendOTP}
              width={145}
              variant='primary'
              disabled={showSuccess}
            >
              {showSuccess ? 'Sending...' : 'Send OTP'}
            </WidgetButton>

            {/* Retry Link */}
            <motion.button
              onClick={handleRetryOTP}
              className='text-sm text-gray-600 underline font-medium'
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              Retry sending OTP
            </motion.button>
          </motion.div>
      </motion.div>
    </StepLayout>
  );
}
