import { useState, useEffect } from 'react';
import { useStepNavigation } from '../../lib/use-step-navigation';
import { CategorySelection, Category } from '../../types/form-data';
import { WidgetButton } from '../widget-button';
import { StepLayout } from '../step-layout';

// Default categories based on Figma design
const DEFAULT_CATEGORIES: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: '💻' },
  { id: 'dream-trip', name: 'Dream Trip', icon: '✈️' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'home-setup', name: 'Home Setup', icon: '🏠' },
  { id: 'car-upgrade', name: 'Car Upgrade', icon: '🚗' },
  { id: 'healthcare', name: 'Healthcare', icon: '❤️' },
  { id: 'fitness', name: 'Fitness', icon: '💪' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'food', name: 'Food', icon: '🍔' },
  { id: 'books', name: 'Books', icon: '📚' },
  { id: 'pets', name: 'Pets', icon: '🐕' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'art', name: 'Art', icon: '🎨' },
];

export function Step06CategorySelection() {
  const { formData, updateFormData, nextStep } = useStepNavigation();

  const [categorySelection, setCategorySelection] = useState<CategorySelection>(
    {
      selectedCategories: [],
      availableCategories: DEFAULT_CATEGORIES,
      ...formData.categorySelection,
    },
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    updateFormData({ categorySelection });
  }, [categorySelection, updateFormData]);

  const handleCategoryToggle = (categoryId: string) => {
    setCategorySelection((prev) => {
      const isSelected = prev.selectedCategories.includes(categoryId);
      const newSelectedCategories = isSelected
        ? prev.selectedCategories.filter((id) => id !== categoryId)
        : [...prev.selectedCategories, categoryId];

      return {
        ...prev,
        selectedCategories: newSelectedCategories,
      };
    });
  };

  const handleContinue = async () => {
    if (categorySelection.selectedCategories.length === 0) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);

    // Navigate to next step
    nextStep();
    console.log('Categories selected:', categorySelection.selectedCategories);
  };

  const hasSelection = categorySelection.selectedCategories.length > 0;

  return (
    <StepLayout>
      <div className='h-full flex flex-col'>
        {/* Main Content - scrollable */}
        <div className='flex-1 flex flex-col pb-6 min-h-0 overflow-hidden'>
          {/* Title and Description */}
          <div className='mb-8 shrink-0'>
            <h1 className="text-2xl font-medium text-gray-700 leading-[30px] mb-4 font-['General_Sans_Variable:Medium',_sans-serif]">
              What are you looking
              <br />
              to purchase (for less)?
            </h1>
            <p className="text-gray-600 text-base leading-[22px] font-['Satoshi_Variable:Regular',_sans-serif]">
              From tech and travel to school fees,
              <br />
              we got you covered.
            </p>
          </div>

          {/* Scrollable Categories Grid - Full Height */}
          <div className='absolute inset-x-0 top-[285px] bottom-0'>
            <div className='h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
              <div className='grid grid-cols-3 gap-1 mx-3 pb-24'>
                {/* All categories */}
                {categorySelection.availableCategories.map((category) => {
                  const isSelected =
                    categorySelection.selectedCategories.includes(category.id);
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryToggle(category.id)}
                      className='relative flex flex-col items-center justify-center transition-all duration-200 group'
                    >
                      {/* Category Image Placeholder - circular */}
                      <div
                        className={`
                          relative w-24 h-24 rounded-full flex items-center justify-center mb-2
                          text-2xl transition-all duration-200 overflow-hidden
                          ${
                            isSelected
                              ? 'border-4 border-[#683DFF]'
                              : 'border-2 border-transparent'
                          }
                        `}
                      >
                        {/* Category background with grayscale/color effect */}
                        <div
                          className={`
                            w-full h-full rounded-full bg-gray-400 flex items-center justify-center
                            transition-all duration-200
                            ${isSelected ? '' : 'grayscale'}
                          `}
                        >
                          <span className='text-white text-2xl'>
                            {category.icon}
                          </span>
                        </div>

                        {/* Selection indicator */}
                        {isSelected && (
                          <div className='absolute -top-1 -right-1 w-6 h-6 bg-[#683DFF] rounded-full flex items-center justify-center border-2 border-white'>
                            <svg
                              width='12'
                              height='9'
                              viewBox='0 0 12 9'
                              fill='none'
                            >
                              <path
                                d='M1 4.5L4.5 8L11 1.5'
                                stroke='white'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Category Name */}
                      <span
                        className={`
                          text-xs font-medium text-center leading-tight
                          ${isSelected ? 'text-purple-700' : 'text-gray-700'}
                        `}
                      >
                        {category.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Fade Overlay - 40% from bottom */}
          <div className='absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none'>
            <div
              className='absolute inset-0'
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)',
              }}
            />
          </div>

          {/* Fixed "Let's go!" Button */}
          <div className='absolute bottom-6 left-0 right-0 flex justify-center z-20'>
            <WidgetButton
              onClick={handleContinue}
              width={145}
              variant='primary'
              disabled={!hasSelection}
              isLoading={isSubmitting}
            >
              Let's go!
            </WidgetButton>
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
