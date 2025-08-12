import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useStepNavigation } from '../../lib/use-step-navigation';
import { BudgetInput } from '../../types/form-data';
import { WidgetButton } from '../widget-button';
import { StepLayout } from '../step-layout';

// Suggested budget amounts
const SUGGESTED_AMOUNTS = [1000, 5000, 10000];

export function Step08BudgetInput() {
  const { formData, updateFormData, nextStep } = useStepNavigation();

  const [budgetInput, setBudgetInput] = useState<BudgetInput>({
    amount: null,
    selectedBrand: null,
    contributionPercentage: 10,
    userSavePercentage: 90,
    ...formData.budgetInput,
  });

  const [inputValue, setInputValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the selected brand from previous step
  useEffect(() => {
    if (
      formData.brandSelection?.selectedBrands &&
      formData.brandSelection.selectedBrands.length > 0
    ) {
      const selectedBrandId = formData.brandSelection.selectedBrands[0];
      const selectedBrand = formData.brandSelection.availableBrands?.find(
        (brand) => brand.id === selectedBrandId,
      );

      if (selectedBrand) {
        setBudgetInput((prev) => ({
          ...prev,
          selectedBrand,
          contributionPercentage: selectedBrand.discountPercentage || 10,
          userSavePercentage: 100 - (selectedBrand.discountPercentage || 10),
        }));
      }
    }
  }, [formData.brandSelection]);

  useEffect(() => {
    updateFormData({ budgetInput });
  }, [budgetInput, updateFormData]);

  const handleAmountChange = (value: string) => {
    setInputValue(value);

    // Remove any non-numeric characters except decimal points
    const numericValue = value.replace(/[^\d.]/g, '');
    const amount = numericValue ? parseFloat(numericValue) : null;

    setBudgetInput((prev) => ({
      ...prev,
      amount,
    }));
  };

  const handleSuggestedAmount = (amount: number) => {
    setInputValue(amount.toLocaleString());
    setBudgetInput((prev) => ({
      ...prev,
      amount,
    }));
  };

  const handleContinue = async () => {
    if (!budgetInput.amount || budgetInput.amount <= 0) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);

    // Navigate to next step
    nextStep();
    console.log('Budget set:', budgetInput);
  };

  const hasValidAmount = budgetInput.amount && budgetInput.amount > 0;

  return (
    <StepLayout showLogo={false}>
      <div className='h-full flex flex-col'>
        {/* Main Content */}
        <div className='flex-1 flex flex-col pb-6 min-h-0'>
          {/* Selected Brand Display */}
          {budgetInput.selectedBrand && (
            <div className='flex justify-center mb-8'>
              <div className='relative'>
                <div
                  className='w-20 h-20 rounded-full flex items-center justify-center text-white'
                  style={{ backgroundColor: budgetInput.selectedBrand.color }}
                >
                  <span
                    className={`
                      font-bold text-center leading-tight
                      ${
                        budgetInput.selectedBrand.logo.length > 4
                          ? 'text-[10px]'
                          : budgetInput.selectedBrand.logo.length > 2
                            ? 'text-sm'
                            : 'text-xl'
                      }
                    `}
                  >
                    {budgetInput.selectedBrand.logo}
                  </span>
                </div>

                {/* Discount Badge */}
                {budgetInput.selectedBrand.discountPercentage > 0 && (
                  <div className='absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
                    {budgetInput.selectedBrand.discountPercentage}%
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Title and Description */}
          <div className='mb-8 text-center'>
            <h1 className="text-2xl font-medium text-gray-700 leading-[30px] mb-4 font-['General_Sans_Variable:Medium',_sans-serif]">
              What's your budget for
              <br />
              this purchase?
            </h1>
            <p className="text-gray-600 text-base leading-[22px] font-['Satoshi_Variable:Regular',_sans-serif]">
              We'll chip in {budgetInput.contributionPercentage}%, you save the
              rest.
            </p>
          </div>

          {/* Amount Input */}
          <div className='mb-8'>
            <div className='relative flex justify-center'>
              <div className='bg-gray-100 rounded-full px-4  min-w-[150px] text-center'>
                <Input
                  type='text'
                  value={inputValue}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder='10,000'
                  className='border-0 bg-transparent focus:ring-0 focus:outline-none shadow-none p-0 h-auto placeholder:text-gray-500'
                  style={{
                    color: '#4C4C4C',
                    textAlign: 'center',
                    fontSize: '65.574px',
                    fontStyle: 'normal',
                    fontWeight: '900',
                    lineHeight: '0',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Suggested Amounts */}
          <div className='mb-12'>
            <div className='flex justify-center gap-3'>
              {SUGGESTED_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleSuggestedAmount(amount)}
                  className={`
                      px-6 py-2 rounded-full border transition-all duration-200 font-medium
                      ${
                        budgetInput.amount === amount
                          ? 'border-[#683DFF] bg-[#683DFF] text-white'
                          : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                      }
                    `}
                >
                  {amount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Flexible spacer */}
          <div className='flex-1 min-h-2'></div>

          {/* Continue Button */}
          <div className='flex flex-col items-center shrink-0'>
            <WidgetButton
              onClick={handleContinue}
              width={145}
              variant='primary'
              disabled={!hasValidAmount}
              isLoading={isSubmitting}
            >
              Continue
            </WidgetButton>
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
