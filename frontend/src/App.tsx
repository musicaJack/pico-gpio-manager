import * as React from 'react';
import { Layout, ConfigProvider } from 'antd';
import Header from './components/common/Header';
import MainLayout from './components/layout/MainLayout';
import { APP_CONFIG } from './services/config';
import './App.css';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: APP_CONFIG.theme.primaryColor,
          borderRadius: APP_CONFIG.theme.borderRadius,
        },
      }}
    >
      <Layout className="app-layout" style={{ minHeight: '100vh' }}>
        <Header />
        <MainLayout />
      </Layout>
    </ConfigProvider>
  );
};

export default App; 