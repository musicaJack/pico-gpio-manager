import * as React from 'react';
import { Table, Card, Tag } from 'antd';
import { BoardPin } from '../../services/boardDataService';
import './BoardTable.css';

interface BoardTableProps {
  boardData: BoardPin[];
  boardName: string;
}

const BoardTable: React.FC<BoardTableProps> = ({ boardData, boardName }) => {
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

  // 定义表格列
  const columns = [
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
          scroll={{ x: 1200 }}
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