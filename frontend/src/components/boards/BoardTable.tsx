import * as React from 'react';
import { Table, Card, Tag } from 'antd';
import { BoardPin } from '../../services/boardDataService';
import './BoardTable.css';

interface BoardTableProps {
  boardData: BoardPin[];
  boardName: string;
}

const BoardTable: React.FC<BoardTableProps> = ({ boardData, boardName }) => {
  const [tableHeight, setTableHeight] = React.useState<string>('calc(100vh - 300px)');

  // 动态计算表格高度
  React.useEffect(() => {
    const calculateTableHeight = () => {
      const viewportHeight = window.innerHeight;
      const headerHeight = 64; // 头部高度
      const statusCardsHeight = 80; // 状态卡片高度
      const padding = 32; // 内边距
      const footerHeight = 40; // 表格页脚高度
      const cardHeaderHeight = 48; // 卡片头部高度
      
      // 计算可用高度
      const availableHeight = viewportHeight - headerHeight - statusCardsHeight - padding - footerHeight - cardHeaderHeight;
      
      // 设置最小高度为300px，最大高度为可用高度
      const finalHeight = Math.max(300, Math.min(availableHeight, 600));
      
      setTableHeight(`${finalHeight}px`);
    };

    // 初始计算
    calculateTableHeight();

    // 监听窗口大小变化
    window.addEventListener('resize', calculateTableHeight);

    // 清理事件监听器
    return () => {
      window.removeEventListener('resize', calculateTableHeight);
    };
  }, []);

  // 根据boardName确定表格样式主题
  const getThemeClass = (boardName: string) => {
    switch (boardName) {
      case '1号主板':
        return 'theme-board-1';
      case '2号主板':
        return 'theme-board-2';
      case '3号主板':
        return 'theme-board-3';
      default:
        return 'theme-board-1';
    }
  };

  // 获取引脚编号的映射
  const getPinNumber = (gpio: string): number => {
    const pinMap: Record<string, number> = {
      'GPIO00': 1, 'GPIO01': 2, 'GPIO02': 4, 'GPIO03': 5, 'GPIO04': 6, 'GPIO05': 7,
      'GPIO06': 9, 'GPIO07': 10, 'GPIO08': 11, 'GPIO09': 12, 'GPIO10': 14, 'GPIO11': 15,
      'GPIO12': 16, 'GPIO13': 17, 'GPIO14': 19, 'GPIO15': 20, 'GPIO16': 21, 'GPIO17': 22,
      'GPIO18': 24, 'GPIO19': 25, 'GPIO20': 26, 'GPIO21': 27, 'GPIO22': 29, 'GPIO23': 30,
      'GPIO24': 31, 'GPIO25': 32, 'GPIO26': 34, 'GPIO27': 35, 'GPIO28': 36, 'GPIO29': 37,
      'GPIO30': 39, 'GPIO31': 40
    };
    return pinMap[gpio] || 0;
  };

  // 定义表格列
  const columns = [
    {
      title: '引脚编号',
      dataIndex: 'gpio',
      key: 'pinNumber',
      width: 80,
      render: (text: string) => {
        const pinNumber = getPinNumber(text);
        return (
          <span className="pin-number">
            {pinNumber > 0 ? pinNumber : '-'}
          </span>
        );
      },
    },
    {
      title: 'GPIO编号',
      dataIndex: 'gpio',
      key: 'gpio',
      width: 100,
      render: (text: string, record: BoardPin) => (
        <span className={`gpio-number ${record.status === '未使用' ? 'unused' : ''}`}>
          {text}
        </span>
      ),
    },
    {
      title: 'UART通信',
      dataIndex: 'uart',
      key: 'uart',
      width: 80,
      render: (text: string) => (
        <span className={text !== '-' ? 'occupied' : 'empty'}>{text}</span>
      ),
    },
    {
      title: 'TFT-LCD (SPI-0)',
      dataIndex: 'tftLcd',
      key: 'tftLcd',
      width: 120,
      render: (text: string) => (
        <span className={text !== '-' ? 'occupied' : 'empty'}>{text}</span>
      ),
    },
    {
      title: 'MicroSD (SPI-1)',
      dataIndex: 'microSd',
      key: 'microSd',
      width: 120,
      render: (text: string) => (
        <span className={text !== '-' ? 'occupied' : 'empty'}>{text}</span>
      ),
    },
    {
      title: '摇杆 (I2C-1)',
      dataIndex: 'joystick',
      key: 'joystick',
      width: 100,
      render: (text: string) => (
        <span className={text !== '-' ? 'occupied' : 'empty'}>{text}</span>
      ),
    },
    {
      title: '功放 (I2S-0)',
      dataIndex: 'amplifier',
      key: 'amplifier',
      width: 100,
      render: (text: string) => (
        <span className={text !== '-' ? 'occupied' : 'empty'}>{text}</span>
      ),
    },
    {
      title: '拾音器 (I2S-1)',
      dataIndex: 'microphone',
      key: 'microphone',
      width: 100,
      render: (text: string) => (
        <span className={text !== '-' ? 'occupied' : 'empty'}>{text}</span>
      ),
    },
    {
      title: '按键控制',
      dataIndex: 'buttons',
      key: 'buttons',
      width: 100,
      render: (text: string) => (
        <span className={text && text !== '-' ? 'occupied' : 'empty'}>{text || '-'}</span>
      ),
    },
    {
      title: '开关控制',
      dataIndex: 'switches',
      key: 'switches',
      width: 100,
      render: (text: string) => (
        <span className={text && text !== '-' ? 'occupied' : 'empty'}>{text || '-'}</span>
      ),
    },
    {
      title: '功能描述',
      dataIndex: 'description',
      key: 'description',
      width: 150,
      render: (text: string, record: BoardPin) => (
        <span className={`description ${record.status === '未使用' ? 'unused' : ''}`}>
          {text}
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (text: string) => {
        let color = 'default';
        if (text === '已占用') {
          color = 'green';
        } else if (text === '未使用') {
          color = 'default';
        }
        return (
          <Tag color={color} className="status-tag">
            {text}
          </Tag>
        );
      },
    },
  ];

  return (
    <div className={`board-table-container ${getThemeClass(boardName)}`}>
      <Card 
        title={`${boardName}GPIO占用状态表（按引脚正序排列）`}
        className="board-table-card"
        size="small"
      >
        <Table
          columns={columns}
          dataSource={boardData}
          rowKey="gpio"
          pagination={false}
          size="small"
          scroll={{ x: 1400, y: tableHeight }}
          className="board-table"
          rowClassName={(record) => record.status === '未使用' ? 'unused-row' : ''}
        />
        <div className="table-footer">
          <span>设计版本：v1.0 | 最后更新：2025年7月</span>
        </div>
      </Card>
    </div>
  );
};

export default BoardTable; 