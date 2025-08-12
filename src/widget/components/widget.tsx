import { useContext } from 'react';
import { WidgetContext } from '../lib/context';
import { WidgetButton } from '@/widget/components/widget-button';
import { StepContainer } from './step-container';

export function Widget() {
  const { isOpen, setIsOpen } = useContext(WidgetContext);

  if (!isOpen) {
    return (
      <WidgetButton
        onClick={() => setIsOpen(true)}
        className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 z-50'
        size='md'
        variant='primary'
      >
        Widget Button
      </WidgetButton>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'
        onClick={() => setIsOpen(false)}
      >
        {/* Modal */}
        <div
          className='relative bg-white rounded-3xl shadow-2xl overflow-hidden'
          style={{ width: '390px', height: '619px' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Step Content */}
          <div className='h-full flex flex-col'>
            <StepContainer />
          </div>
        </div>
      </div>
    </>
  );
}
