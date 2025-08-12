import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStepNavigation } from '../lib/use-step-navigation';
import { slideVariants, springTransition } from '../lib/animation-variants';
import { Step00Loading } from './steps/step-00-loading';
import { Step03PhoneVerification } from './steps/step-03-phone-verification';
import { Step04OtpVerification } from './steps/step-04-otp-verification';
import { Step05EmailAddress } from './steps/step-05-email-address';
import { Step06CategorySelection } from './steps/step-06-category-selection';
import { Step07BrandSelection } from './steps/step-07-brand-selection';
import { Step08BudgetInput } from './steps/step-08-budget-input';

function renderStep(step: number) {
  switch (step) {
    case 0:
      return <Step00Loading />;
    case 1:
      return <Step03PhoneVerification />;
    case 2:
      return <Step04OtpVerification />;
    case 3:
      return <Step05EmailAddress />;
    case 4:
      return <Step06CategorySelection />;
    case 5:
      return <Step07BrandSelection />;
    case 6:
      return <Step08BudgetInput />;
    default:
      return (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">Step {step}</h2>
            <p className="text-gray-600 mt-2">This step is coming soon!</p>
          </div>
        </div>
      );
  }
}

export function StepContainer() {
  const { currentStep } = useStepNavigation();
  const [direction, setDirection] = useState<1 | -1>(1);
  const [prevStep, setPrevStep] = useState<number>(currentStep);

  // Track direction of step change
  if (currentStep !== prevStep) {
    setDirection(currentStep > prevStep ? 1 : -1);
    setPrevStep(currentStep);
  }

  return (
    <div className="relative h-full overflow-hidden">
      <AnimatePresence 
        mode="wait"
        custom={direction}
        onExitComplete={() => {
          // Reset any cleanup needed after animation
        }}
      >
        <motion.div
          key={currentStep}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={springTransition}
          className="absolute inset-0"
          style={{
            willChange: 'transform, opacity',
          }}
        >
          {renderStep(currentStep)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
