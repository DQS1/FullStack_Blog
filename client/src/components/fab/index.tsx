import React from 'react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const FloatingActionBUtton = ({
  icon,
  onClick,
  className
}: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        'fixed right-6 bottom-6 cursor-pointer rounded-full bg-blue-600 p-4 text-white shadow-lg hover:bg-blue-700',
        className
      )}
      size={'icon'}
    >
      {icon}
    </Button>
  );
};

export default FloatingActionBUtton;
