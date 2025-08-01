import * as React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import { useAppStore } from '../../stores/appStore';
import BoardTable from '../boards/BoardTable';
import BoardImage from '../common/BoardImage';
import boardDataService from '../../services/boardDataService';
import './MainLayout.css';

const { Content } = Layout;

interface MainLayoutProps {
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ className }) => {
  const { currentBoard } = useAppStore();

  const boardData = boardDataService.getBoardData(currentBoard);
  const boardStats = boardDataService.getBoardStats(currentBoard);

  const renderSystemStatus = () => {
    if (!boardStats) return null;

    return (
      <Row gutter={12} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card size="small" className="status-card">
            <div className="status-item">
              <div className="status-value">{boardStats.totalPins}</div>
              <div className="status-label">总引脚数</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" className="status-card">
            <div className="status-item">
              <div className="status-value">{boardStats.usedPins}</div>
              <div className="status-label">已用引脚</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" className="status-card">
            <div className="status-item">
              <div className="status-value">{boardStats.moduleCount}</div>
              <div className="status-label">模块数量</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <BoardImage />
        </Col>
      </Row>
    );
  };

  const renderBoardTable = () => {
    if (!boardData) {
      return (
        <Card className="no-data-card">
          <div className="no-data-content">
            <p>未找到板数据</p>
          </div>
        </Card>
      );
    }

    return (
      <BoardTable
        boardData={boardData.allPins}
        boardName={boardData.boardName}
      />
    );
  };

  return (
    <Layout className={`main-layout ${className || ''}`}>
      <Content className="main-content">
        {renderSystemStatus()}
        <div className="board-table-section">
          {renderBoardTable()}
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout; 