import { createContext } from 'react';
import { FormData } from '../types/form-data';

interface WidgetContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  clientKey: string;
  currentStep: number;
  formData: Partial<FormData>;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  closeWidget: () => void;
}

export const WidgetContext = createContext<WidgetContextType>({
  isOpen: false,
  setIsOpen: () => undefined,
  clientKey: '',
  currentStep: 1,
  formData: {},
  goToStep: () => undefined,
  nextStep: () => undefined,
  prevStep: () => undefined,
  updateFormData: () => undefined,
  resetForm: () => undefined,
  closeWidget: () => undefined,
});
