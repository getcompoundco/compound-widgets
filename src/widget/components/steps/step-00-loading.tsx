import { useEffect, useState } from 'react';
import { useStepNavigation } from '../../lib/use-step-navigation';
import { WidgetButton } from '../widget-button';

export function Step00Loading() {
  const { nextStep } = useStepNavigation();
  const [showText, setShowText] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Define the three different slides with images and text
  const slides = [
    {
      image: '/firstloading.png',
      texts: {
        line1: "Let's help you",
        line2: 'pay less',
        line3: 'for your next big purchase.',
      },
    },
    {
      image: '/secondloading.png',
      texts: {
        line1: 'Just save',
        line2: 'towards it. We will',
        line3: 'cover 10%.',
      },
    },
    {
      image: '/thirdloading.png',
      texts: {
        line1: "It's smarter way",
        line2: 'to shop.',
        line3: '',
      },
    },
  ];

  useEffect(() => {
    // Simple fade in animation for text
    const textTimer = setTimeout(() => setShowText(true), 300);
    return () => clearTimeout(textTimer);
  }, []);

  useEffect(() => {
    // Auto-cycle through slides every 4 seconds to allow for animations
    const slideTimer = setInterval(() => {
      setShowText(false); // Fade out text first
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        // Small delay before showing text to allow background to transition
        setTimeout(() => {
          setShowText(true); // Fade in new text with staggered animation
        }, 200);
      }, 400);
    }, 4000);

    return () => clearInterval(slideTimer);
  }, [slides.length]);

  const handleBuildPlan = () => {
    // Navigate to phone verification step
    nextStep();
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className='relative h-full w-full overflow-hidden'>
      {/* Dynamic background image that changes with slides */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000'
        style={{
          backgroundImage: `url("${currentSlide.image}")`,
        }}
      />

      {/* Dark overlay for text readability */}
      <div className='absolute inset-0 bg-black/20' />

      {/* Content */}
      <div className='relative z-10 h-full flex flex-col justify-between p-6'>
        {/* Main text content */}
        <div className='flex-1 flex flex-col justify-start mt-16 ml-4'>
          <div>
            <h1 
              className={`text-white text-4xl font-light leading-tight mb-2 transition-all duration-700 ${
                showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: showText ? '0ms' : '0ms' }}
            >
              {currentSlide.texts.line1}
            </h1>
            <h2 
              className={`text-white/90 text-4xl italic font-extralight leading-tight mb-2 transition-all duration-700 ${
                showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: showText ? '150ms' : '0ms' }}
            >
              {currentSlide.texts.line2}
            </h2>
            <h3 
              className={`text-white text-4xl font-light leading-tight transition-all duration-700 ${
                showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: showText ? '300ms' : '0ms' }}
            >
              {currentSlide.texts.line3}
            </h3>
          </div>
        </div>

        {/* Bottom button */}
        <div className='flex flex-col items-center'>
          <WidgetButton
            onClick={handleBuildPlan}
            variant='primary'
            backgroundColor='#683DFF'
            hoverBackgroundColor='#5a33e6'
            textColor='#ffffff'
          >
            Build your plan
          </WidgetButton>
        </div>
      </div>
    </div>
  );
}
