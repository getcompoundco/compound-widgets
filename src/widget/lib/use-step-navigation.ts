import { useContext } from 'react';
import { WidgetContext } from './context';
import { TOTAL_STEPS } from '../types/form-data';

export function useStepNavigation() {
  const context = useContext(WidgetContext);
  
  if (!context) {
    throw new Error('useStepNavigation must be used within WidgetContext');
  }

  const {
    currentStep,
    goToStep,
    nextStep,
    prevStep,
    formData,
    updateFormData,
    resetForm,
    closeWidget,
  } = context;

  const isLoadingStep = currentStep === 0;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === TOTAL_STEPS - 1;
  const canGoNext = currentStep < TOTAL_STEPS - 1;
  const canGoPrev = currentStep > 0 && currentStep !== 0; // Can't go back from any step to loading

  const progressPercentage = currentStep === 0 ? 0 : ((currentStep) / (TOTAL_STEPS - 1)) * 100;

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    isLoadingStep,
    isFirstStep,
    isLastStep,
    canGoNext,
    canGoPrev,
    progressPercentage,
    goToStep,
    nextStep,
    prevStep,
    formData,
    updateFormData,
    resetForm,
    closeWidget,
  };
}