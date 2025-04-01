import { toast } from 'sonner';

const notificationProps = {
  duration: 3000,
  closeButton: true
};

export const showToast = (
  message: string,
  type: 'success' | 'error' | 'info' = 'info'
) => {
  toast[type](message, { ...notificationProps });
};
