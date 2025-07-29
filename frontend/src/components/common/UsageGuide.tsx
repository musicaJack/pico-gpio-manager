import * as React from 'react';
import { Card, Typography, List, Tag, Space, Button } from 'antd';
import { InfoCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

interface UsageGuideProps {
  visible: boolean;
  onClose: () => void;
}

const UsageGuide: React.FC<UsageGuideProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  const features = [
    {
      title: '引脚可视化',
      description: '直观显示RP2040的40个引脚，支持点击选择和状态查看',
      icon: '🔌'
    },
    {
      title: '模块管理',
      description: '添加、配置和管理各种外设模块（TFT显示屏、SD卡等）',
      icon: '📦'
    },
    {
      title: '冲突检测',
      description: '自动检测引脚冲突和资源占用问题',
      icon: '⚠️'
    },
    {
      title: '功耗计算',
      description: '实时计算系统总功耗，确保电源供应充足',
      icon: '⚡'
    },
    {
      title: '代码生成',
      description: '自动生成初始化代码（C、Python、JavaScript）',
      icon: '💻'
    }
  ];

  const quickStart = [
    '1. 点击"添加模块"按钮添加外设模块',
    '2. 选择模块类型（TFT显示屏、SD卡等）',
    '3. 系统自动分配引脚并检测冲突',
    '4. 查看实时功耗和引脚使用情况',
    '5. 导出配置或生成初始化代码'
  ];

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', 
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Card 
        title={
          <Space>
            <InfoCircleOutlined />
            <span>RP2040 GPIO管理器使用指南</span>
          </Space>
        }
        style={{ width: 800, maxHeight: '80vh', overflow: 'auto' }}
        extra={
          <Button type="text" onClick={onClose}>
            ✕
          </Button>
        }
      >
        <div style={{ marginBottom: 24 }}>
          <Title level={4}>🎯 主要功能</Title>
          <List
            dataSource={features}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<span style={{ fontSize: '24px' }}>{item.icon}</span>}
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <Title level={4}>🚀 快速开始</Title>
          <List
            dataSource={quickStart}
            renderItem={item => (
              <List.Item>
                <Text>{item}</Text>
              </List.Item>
            )}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <Title level={4}>📊 界面说明</Title>
          <Paragraph>
            <Text strong>顶部仪表板：</Text>显示总引脚数、已用引脚、模块数量和总功耗
          </Paragraph>
          <Paragraph>
            <Text strong>左侧引脚矩阵：</Text>可视化RP2040芯片引脚，不同颜色表示不同状态
          </Paragraph>
          <Paragraph>
            <Text strong>右侧模块配置：</Text>管理已添加的模块，支持配置和删除
          </Paragraph>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Title level={4}>🎨 引脚状态说明</Title>
          <Space wrap>
            <Tag color="green">绿色 - 可用引脚</Tag>
            <Tag color="blue">蓝色 - 已用引脚</Tag>
            <Tag color="orange">橙色 - 冲突引脚</Tag>
            <Tag color="red">红色 - 关键错误</Tag>
          </Space>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Button 
            type="primary" 
            size="large" 
            icon={<PlayCircleOutlined />}
            onClick={onClose}
          >
            开始使用
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UsageGuide; 