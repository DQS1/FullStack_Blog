import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center space-y-4 bg-gray-100 dark:bg-gray-900'>
      <Loader2 className='text-primary h-12 w-12 animate-spin opacity-55' />
      <p className='text-lg font-semibold text-gray-500 dark:text-gray-300'>
        Đang tải...
      </p>
    </div>
  );
};

export default Loading;
