import { ReactNode } from 'react';
import { useStepNavigation } from '../lib/use-step-navigation';

interface StepLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  showLogo?: boolean;
  onClose?: () => void;
}

export function StepLayout({
  children,
  showBackButton = true,
  showLogo = true,
  onClose,
}: StepLayoutProps) {
  const { currentStep, prevStep, closeWidget } = useStepNavigation();

  const handleBackClick = () => {
    if (currentStep > 0) {
      prevStep();
    }
  };

  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    } else {
      closeWidget();
    }
  };

  return (
    <div className='h-full bg-white flex flex-col'>
      {/* Progress Bar - 7 Equal Segments */}
      <div className='px-6 pt-6 pb-1'>
        <div className='flex gap-1 w-full'>
          {Array.from({ length: 7 }, (_, index) => {
            const stepNumber = index + 1;
            const isActive = currentStep >= stepNumber;
            const isCurrent = currentStep === stepNumber;

            return (
              <div
                key={stepNumber}
                className={`h-1.5 rounded-full flex-1 transition-all duration-500 ease-out ${
                  isActive ? 'bg-[#683DFF]' : 'bg-gray-200'
                } ${
                  isCurrent
                    ? 'opacity-100'
                    : isActive
                      ? 'opacity-90'
                      : 'opacity-50'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Navigation Header */}
      <div className='flex items-center justify-between px-4 py-3'>
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
            showBackButton && currentStep > 0
              ? 'text-gray-600 hover:bg-gray-100'
              : 'text-transparent cursor-not-allowed'
          }`}
          disabled={!showBackButton || currentStep <= 0}
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            className='text-gray-600'
          >
            <path
              d='M19 12H5m0 0l7 7m-7-7l7-7'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        {/* Close Button */}
        <button
          onClick={handleCloseClick}
          className='flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:bg-gray-100 transition-colors'
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            className='text-gray-400'
          >
            <path
              d='M18 6L6 18M6 6l12 12'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>

      {/* Logo */}
      {showLogo && (
        <div className='flex justify-start px-6 pb-5'>
          <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='26.8309' cy='5.1551' r='5.1551' fill='#683DFF' />
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M15.7313 7.06346C11.0749 7.06346 7.06448 11.0304 7.06448 16.2202H0C0 7.39476 6.91302 0 15.7313 0V7.06346Z'
              fill='#683DFF'
            />
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M7.07599 16.2155C7.07599 20.8804 11.0499 24.8982 16.249 24.8982L16.249 31.9756C7.40787 31.9756 -3.0273e-07 25.0499 -6.88895e-07 16.2155L7.07599 16.2155Z'
              fill='url(#paint0_linear_5532_9917)'
            />
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M16.2399 24.8996C20.9049 24.8996 24.9226 20.9256 24.9226 15.7266L32 15.7266C32 24.5677 25.0743 31.9756 16.2399 31.9756L16.2399 24.8996Z'
              fill='#683DFF'
            />
            <defs>
              <linearGradient
                id='paint0_linear_5532_9917'
                x1='14.9545'
                y1='26.3687'
                x2='3.53599'
                y2='16.2177'
                gradientUnits='userSpaceOnUse'
              >
                <stop stop-color='#683DFF' />
                <stop offset='1' stop-color='#683DFF' stop-opacity='0' />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* Content Area */}
      <div className='flex-1 px-6'>{children}</div>
    </div>
  );
}
