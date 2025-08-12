import { useState, useEffect, useCallback } from 'react';
import { WidgetContext } from '../lib/context';
import { Widget } from './widget';
import { FormData, TOTAL_STEPS } from '../types/form-data';

interface WidgetContainerProps {
  clientKey: string;
}

export function WidgetContainer({ clientKey }: WidgetContainerProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step <= TOTAL_STEPS - 1) {
      setCurrentStep(step);
    }
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS - 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({});
    setCurrentStep(0);
  }, []);

  const closeWidget = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!mounted) {
    return null;
  }

  const contextValue = {
    isOpen,
    setIsOpen,
    clientKey,
    currentStep,
    formData,
    goToStep,
    nextStep,
    prevStep,
    updateFormData,
    resetForm,
    closeWidget,
  };

  return (
    <WidgetContext.Provider value={contextValue}>
      <Widget />
    </WidgetContext.Provider>
  );
}
