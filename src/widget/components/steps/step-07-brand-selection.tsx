import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useStepNavigation } from '../../lib/use-step-navigation';
import { BrandSelection, Brand } from '../../types/form-data';
import { WidgetButton } from '../widget-button';
import { StepLayout } from '../step-layout';

// Default brands based on Figma design
const DEFAULT_BRANDS: Brand[] = [
  {
    id: 'apple',
    name: 'Apple',
    logo: 'Apple',
    discountPercentage: 10,
    color: '#000000',
  },
  {
    id: 'samsung',
    name: 'Samsung',
    logo: 'SAMSUNG',
    discountPercentage: 5,
    color: '#1f4e96',
  },
  {
    id: 'nothing',
    name: 'Nothing',
    logo: 'NOTHING',
    discountPercentage: 8,
    color: '#000000',
  },
  {
    id: 'oppo',
    name: 'OPPO',
    logo: 'OPPO',
    discountPercentage: 5,
    color: '#1c7947',
  },
  {
    id: 'oneplus',
    name: 'OnePlus',
    logo: '1+',
    discountPercentage: 10,
    color: '#e74c3c',
  },
  {
    id: 'vivo',
    name: 'vivo',
    logo: 'vivo',
    discountPercentage: 5,
    color: '#4a90e2',
  },
  {
    id: 'sharaf-dg',
    name: 'Sharaf DG',
    logo: 'Sharaf DG',
    discountPercentage: 8,
    color: '#f39c12',
  },
  {
    id: 'plug-ins',
    name: 'Plug Ins',
    logo: 'PLUG INS',
    discountPercentage: 5,
    color: '#2c3e50',
  },
  {
    id: 'lmax',
    name: 'Lmax',
    logo: 'Lmax',
    discountPercentage: 0,
    color: '#bcc2c7',
  },
];

export function Step07BrandSelection() {
  const { formData, updateFormData, nextStep } = useStepNavigation();

  const [brandSelection, setBrandSelection] = useState<BrandSelection>({
    selectedBrands: [],
    availableBrands: DEFAULT_BRANDS,
    searchQuery: '',
    ...formData.brandSelection,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    updateFormData({ brandSelection });
  }, [brandSelection, updateFormData]);

  const handleBrandToggle = (brandId: string) => {
    setBrandSelection((prev) => {
      const isSelected = prev.selectedBrands.includes(brandId);
      const newSelectedBrands = isSelected
        ? prev.selectedBrands.filter((id) => id !== brandId)
        : [...prev.selectedBrands, brandId];

      return {
        ...prev,
        selectedBrands: newSelectedBrands,
      };
    });
  };

  const handleSearchChange = (query: string) => {
    setBrandSelection((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  };

  const handleContinue = async () => {
    if (brandSelection.selectedBrands.length === 0) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);

    // Navigate to next step
    nextStep();
    console.log('Brands selected:', brandSelection.selectedBrands);
  };

  const hasSelection = brandSelection.selectedBrands.length > 0;

  // Filter brands based on search query
  const filteredBrands = brandSelection.availableBrands.filter((brand) =>
    brand.name.toLowerCase().includes(brandSelection.searchQuery.toLowerCase()),
  );

  return (
    <StepLayout>
      <div className='h-full flex flex-col'>
        {/* Main Content */}
        <div className='flex-1 flex flex-col pb-6 min-h-0 overflow-hidden'>
          {/* Title and Description */}
          <div className='mb-6 shrink-0'>
            <h1 className="text-2xl font-medium text-gray-700 leading-[30px] mb-4 font-['General_Sans_Variable:Medium',_sans-serif]">
              Choose a brand
              <br />
              you've been eyeing.
            </h1>
            <p className="text-gray-600 text-base leading-[22px] font-['Satoshi_Variable:Regular',_sans-serif]">
              Create a savings plan with them,
              <br />
              we'll chip in weekly or monthly.
            </p>
          </div>

          {/* Search Bar */}
          <div className='mb-4 shrink-0'>
            <div className='relative'>
              <Input
                type='text'
                value={brandSelection.searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder='Search brands or products'
                className='h-12 px-4 pr-12 bg-gray-50 border border-gray-200 rounded-full text-gray-700 placeholder:text-gray-400 focus:border-[#683DFF] focus:ring-1 focus:ring-purple-200 focus:outline-none transition-colors'
              />
              {/* Search Icon */}
              <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  className='text-gray-400'
                >
                  <path
                    d='M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Suggested for you label */}
          <div className='mb-4 shrink-0'>
            <p className="text-sm text-gray-600 font-['Satoshi_Variable:Regular',_sans-serif]">
              Suggested for you
            </p>
          </div>

          {/* Scrollable Brands Grid - Full Height */}
          <div className='absolute inset-x-9 top-[375px] bottom-0'>
            <div className='h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
              <div className='grid grid-cols-4 gap-4 mt-2 mx-2 pb-24'>
                {/* All brands */}
                {filteredBrands.map((brand) => {
                  const isSelected = brandSelection.selectedBrands.includes(
                    brand.id,
                  );
                  return (
                    <button
                      key={brand.id}
                      onClick={() => handleBrandToggle(brand.id)}
                      className='relative flex flex-col items-center justify-center transition-all duration-200 group'
                    >
                      {/* Discount Badge - positioned at top-right of entire element */}
                      {brand.discountPercentage > 0 && (
                        <div className='absolute top-1.5 -right-0.5 bg-green-500 text-white text-xs font-bold px-1 py-0.5 rounded-full min-w-[24px] text-center z-20'>
                          {brand.discountPercentage}%
                        </div>
                      )}

                      {/* Brand Logo - circular */}
                      <div
                        className={`
                            relative w-16 h-16 rounded-full flex items-center justify-center
                            text-white transition-all duration-200 overflow-hidden
                            ${
                              isSelected
                                ? 'ring-4 ring-[#683DFF] ring-offset-2'
                                : ''
                            }
                          `}
                        style={{ backgroundColor: brand.color }}
                      >
                        {/* Brand logo/text with responsive sizing */}
                        <span
                          className={`
                            font-bold text-center leading-tight
                            ${
                              brand.logo.length > 4
                                ? 'text-[8px]'
                                : brand.logo.length > 2
                                  ? 'text-xs'
                                  : 'text-lg'
                            }
                          `}
                        >
                          {brand.logo}
                        </span>

                        {/* Selection indicator - checkmark overlay */}
                        {isSelected && (
                          <div className='absolute inset-0 bg-[#683DFF] bg-opacity-80 rounded-full flex items-center justify-center'>
                            <svg
                              width='24'
                              height='18'
                              viewBox='0 0 24 18'
                              fill='none'
                            >
                              <path
                                d='M2 9L8.5 15.5L22 2'
                                stroke='white'
                                strokeWidth='3'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}

                {/* Add more brands placeholder */}
                <button className='relative flex flex-col items-center justify-center transition-all duration-200 group'>
                  <div className='w-16 h-16 rounded-full flex items-center justify-center mb-2 border-2 border-dashed border-gray-300 text-gray-400 hover:border-gray-400 transition-colors'>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M12 5V19M5 12H19'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Fade Overlay - 40% from bottom */}
          <div className='absolute bottom-0 left-0 right-0 h-[25%] pointer-events-none'>
            <div
              className='absolute inset-0'
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)',
              }}
            />
          </div>

          {/* Fixed "Continue" Button */}
          <div className='absolute bottom-6 left-0 right-0 flex justify-center z-20'>
            <WidgetButton
              onClick={handleContinue}
              width={145}
              variant='primary'
              disabled={!hasSelection}
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
