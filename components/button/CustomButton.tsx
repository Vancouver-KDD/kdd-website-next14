import React, { ReactNode } from 'react';

interface CustomButtonProps {
  href?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bg?: string;
  hoverBg?: string;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  target?: string;
  children?: ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  href,
  disabled,
  size,
  bg,
  hoverBg,
  loading,
  onClick,
  className,
  target,
  children,
  ...restProps
}) => {
  const Element = href && !disabled ? 'a' : 'button';

  return (
    <Element
      onClick={onClick}
      {...restProps}
        className={`flex-center rounded px-4 font-medium text-white transition-colors cursor-pointer 
            ${size === 'sm' ? 'py-2 text-sm' : size === 'md' ? 'py-3 text-base' : size === 'lg' ? 'py-4 text-lg' : size === 'xl' ? 'py-5 text-xl' : ''} 
            ${disabled ? 'bg-gray-400 text-gray-100 cursor-not-allowed' : bg ? `bg-[${bg}]` : 'bg-radicalRed-500'} 
            ${hoverBg ? `hover:bg-[${hoverBg}]` : 'hover:bg-radicalRed-600'} 
            ${className || ''}
        `}
        target={target || '_self'}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </Element>
  );
};

export default CustomButton;
