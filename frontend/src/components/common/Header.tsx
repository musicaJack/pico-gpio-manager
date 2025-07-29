import * as React from 'react';
import { Layout, Select, Button, Space, Tooltip } from 'antd';
import { 
  ImportOutlined, 
  ExportOutlined, 
  SettingOutlined, 
  GithubOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { useAppStore } from '../../stores/appStore';
import { BOARD_VERSIONS } from '../../services/config';
import UsageGuide from './UsageGuide';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const { currentBoard, actions } = useAppStore();
  const [showGuide, setShowGuide] = React.useState(false);

  const handleBoardChange = (value: string) => {
    actions.setCurrentBoard(value as any);
  };

  return (
    <>
      <AntHeader style={{ 
        background: '#fff', 
        padding: '0 24px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
            RP2040 GPIO Manager
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>主板版本:</span>
            <Select
              value={currentBoard}
              onChange={handleBoardChange}
              style={{ width: 120 }}
              options={[
                { value: BOARD_VERSIONS.BOARD_1, label: '1号板' },
                { value: BOARD_VERSIONS.BOARD_2, label: '2号板' },
                { value: BOARD_VERSIONS.BOARD_3, label: '3号板' }
              ]}
            />
          </div>
        </div>
        
        <Space>
          <Tooltip title="使用指南">
            <Button 
              type="text" 
              icon={<QuestionCircleOutlined />} 
              onClick={() => setShowGuide(true)}
            />
          </Tooltip>
          <Tooltip title="导入配置">
            <Button type="text" icon={<ImportOutlined />} />
          </Tooltip>
          <Tooltip title="导出配置">
            <Button type="text" icon={<ExportOutlined />} />
          </Tooltip>
          <Tooltip title="设置">
            <Button type="text" icon={<SettingOutlined />} />
          </Tooltip>
          <Tooltip title="GitHub">
            <Button type="text" icon={<GithubOutlined />} />
          </Tooltip>
        </Space>
      </AntHeader>
      
      <UsageGuide 
        visible={showGuide} 
        onClose={() => setShowGuide(false)} 
      />
    </>
  );
};

export default Header; 