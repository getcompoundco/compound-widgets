import { useStepNavigation } from '../lib/use-step-navigation';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function NavigationButtons() {
  const { canGoNext, canGoPrev, nextStep, prevStep, isLastStep } =
    useStepNavigation();

  return (
    <div className='flex justify-between gap-3'>
      {/* Previous Button */}
      <Button
        variant='outline'
        onClick={prevStep}
        disabled={!canGoPrev}
        className='flex-1 max-w-[120px]'
      >
        <svg
          width='18'
          height='18'
          viewBox='0 0 18 18'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M4.61343 9.96107L10.5027 15.8504L9.00413 17.3227L0.59082 8.9094L9.00413 0.496094L10.5027 1.96842L4.61343 7.85774H17.4174V9.96107H4.61343Z'
            fill='#4C4C4C'
            fill-opacity='0.25'
          />
        </svg>
      </Button>

      {/* Next/Finish Button */}
      <Button onClick={nextStep} disabled={!canGoNext} className='flex-1'>
        {isLastStep ? 'Finish' : 'Next'}
        {!isLastStep && <ChevronRight className='h-4 w-4 ml-1' />}
      </Button>
    </div>
  );
}
