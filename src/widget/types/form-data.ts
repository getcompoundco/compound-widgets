export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ContactDetails {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Preferences {
  newsletter: boolean;
  notifications: boolean;
  theme: 'light' | 'dark';
  language: string;
}

export interface BusinessInfo {
  companyName: string;
  industry: string;
  companySize: string;
  role: string;
}

export interface PhoneVerification {
  phoneNumber: string;
  countryCode: string;
  otpSent: boolean;
  otpCode: string;
  verified: boolean;
}

export interface OTPVerification {
  code: string;
  phoneNumber: string;
  attempts: number;
  timeRemaining: number;
  verified: boolean;
  canResend: boolean;
}

export interface EmailAddress {
  email: string;
  isValid: boolean;
}

export interface CategorySelection {
  selectedCategories: string[];
  availableCategories: Category[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  imageUrl?: string;
}

export interface BrandSelection {
  selectedBrands: string[];
  availableBrands: Brand[];
  searchQuery: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  discountPercentage: number;
  color: string;
}

export interface BudgetInput {
  amount: number | null;
  selectedBrand: Brand | null;
  contributionPercentage: number;
  userSavePercentage: number;
}

export interface PurchaseTimeline {
  selectedTimeframe: string | null;
  customMonths?: number;
}

export interface FormData {
  personalInfo: PersonalInfo;
  contactDetails: ContactDetails;
  preferences: Preferences;
  businessInfo: BusinessInfo;
  phoneVerification: PhoneVerification;
  otpVerification: OTPVerification;
  emailAddress: EmailAddress;
  categorySelection: CategorySelection;
  brandSelection: BrandSelection;
  budgetInput: BudgetInput;
  purchaseTimeline: PurchaseTimeline;
  // Additional steps can be added here as needed
}

export interface StepData {
  stepId: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  isActive: boolean;
}

export const TOTAL_STEPS = 8;

export const STEP_TITLES = [
  'Loading',
  'Phone Verification',
  'OTP Verification',
  'Email Address',
  'Category Selection',
  'Brand Selection',
  'Budget Input',
  'Purchase Timeline'
] as const;