import React from 'react';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { CallProvider } from './call';
import { MessageProvider } from './message';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <CallProvider>
        <ToastProvider>
          <MessageProvider>{children}</MessageProvider>
        </ToastProvider>
      </CallProvider>
    </AuthProvider>
  );
};

export default AppProvider;
