import { useState } from 'react';
import Toast from '~/components/global/toast';
import { ToastContext } from '~/context/toast';

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning' | 'lock';
    duration: number;
  }>({
    visible: false,
    message: '',
    type: 'info',
    duration: 2000,
  });

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' | 'lock' = 'info',
    duration: number = 3000
  ) => {
    setToast({ visible: true, message, type, duration });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onDismiss={hideToast}
      />
    </ToastContext.Provider>
  );
};
