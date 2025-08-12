import { ReactNode } from 'react';
import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';
import { buttonVariants, springTransition } from '../lib/animation-variants';

interface WidgetButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  textColor?: string;
  className?: string;
  isLoading?: boolean;
}

export function WidgetButton({
  children,
  variant = 'primary',
  size = 'md',
  width,
  backgroundColor,
  hoverBackgroundColor,
  textColor,
  className,
  isLoading = false,
  disabled,
  style,
  ...props
}: WidgetButtonProps) {
  // Base styles matching Figma design with balanced bottom drop shadow
  const baseStyles =
    'relative font-bold rounded-[32px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-[0px_4px_6px_0px_rgba(0,0,0,0.3)]';

  const variantStyles = {
    primary:
      'bg-[#683dff] hover:bg-[#5a33e6] text-[#ffffff] focus:ring-[#683DFF]',
    secondary:
      'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500',
    outline:
      'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-gray-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500',
  };

  const sizeStyles = {
    sm: 'h-8 px-4 text-sm',
    md: 'h-[42px] px-6 text-[16px]',
    lg: 'h-12 px-8 text-lg',
  };

  // Font family matching Figma
  const fontStyles =
    "font-['Satoshi_Variable:Bold',_sans-serif] leading-[41.821px] whitespace-nowrap";

  const customStyles = {
    ...(backgroundColor && { backgroundColor }),
    ...(textColor && { color: textColor }),
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...style,
  };

  return (
    <motion.button
      className={cn(
        baseStyles,
        fontStyles,
        !backgroundColor && variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      style={customStyles}
      disabled={disabled || isLoading}
      variants={buttonVariants}
      initial='idle'
      whileHover={disabled || isLoading ? 'idle' : 'hover'}
      whileTap={disabled || isLoading ? 'idle' : 'tap'}
      transition={springTransition}
      onMouseEnter={(e) => {
        if (hoverBackgroundColor && e.currentTarget) {
          e.currentTarget.style.backgroundColor = hoverBackgroundColor;
        }
      }}
      onMouseLeave={(e) => {
        if (backgroundColor && e.currentTarget) {
          e.currentTarget.style.backgroundColor = backgroundColor;
        }
      }}
      {...props}
    >
      {isLoading ? (
        <motion.div
          className='flex items-center justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className='rounded-full h-4 w-4 border-b-2 border-current'
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <span className='ml-2'>Loading...</span>
        </motion.div>
      ) : (
        <motion.span
          className='text-center text-nowrap'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      )}
    </motion.button>
  );
}
