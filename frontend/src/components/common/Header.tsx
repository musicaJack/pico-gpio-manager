import * as React from 'react';
import { Layout, Select, Button, Space, Tooltip, Dropdown } from 'antd';
import { 
  ImportOutlined, 
  ExportOutlined, 
  SettingOutlined, 
  GithubOutlined,
  QuestionCircleOutlined,
  MenuOutlined
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

  // 移动端菜单项
  const mobileMenuItems = [
    {
      key: 'guide',
      icon: <QuestionCircleOutlined />,
      label: '使用指南',
      onClick: () => setShowGuide(true)
    },
    {
      key: 'import',
      icon: <ImportOutlined />,
      label: '导入配置'
    },
    {
      key: 'export',
      icon: <ExportOutlined />,
      label: '导出配置'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置'
    },
    {
      key: 'github',
      icon: <GithubOutlined />,
      label: 'GitHub'
    }
  ];

  return (
    <>
      <AntHeader style={{ 
        background: '#fff', 
        padding: '0 24px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        minHeight: '64px',
        height: 'auto'
      }}>
        {/* 左侧：标题和主板选择 */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px',
          flexWrap: 'wrap',
          flex: 1,
          minWidth: 0
        }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#1890ff',
            whiteSpace: 'nowrap'
          }}>
            RP2040 GPIO Manager
          </h1>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <span style={{ 
              fontSize: '14px', 
              color: '#666',
              whiteSpace: 'nowrap'
            }}>主板版本:</span>
            <Select
              value={currentBoard}
              onChange={handleBoardChange}
              style={{ width: 120, minWidth: 120 }}
              options={[
                { value: BOARD_VERSIONS.BOARD_1, label: '1号板' },
                { value: BOARD_VERSIONS.BOARD_2, label: '2号板' },
                { value: BOARD_VERSIONS.BOARD_3, label: '3号板' }
              ]}
            />
          </div>
        </div>
        
        {/* 右侧：操作按钮 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* 桌面端按钮 */}
          <Space className="desktop-buttons" style={{ display: 'flex' }}>
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
          
          {/* 移动端下拉菜单 */}
          <Dropdown
            menu={{ items: mobileMenuItems }}
            placement="bottomRight"
            trigger={['click']}
            className="mobile-menu"
          >
            <Button 
              type="text" 
              icon={<MenuOutlined />} 
              style={{ display: 'none' }}
            />
          </Dropdown>
        </div>
      </AntHeader>
      
      <UsageGuide 
        visible={showGuide} 
        onClose={() => setShowGuide(false)} 
      />
    </>
  );
};

export default Header; 