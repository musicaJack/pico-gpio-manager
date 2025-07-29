import * as React from 'react';
import { Card, Modal } from 'antd';
import { useAppStore } from '../../stores/appStore';
import { EyeOutlined } from '@ant-design/icons';
import './BoardImage.css';

interface BoardImageProps {
  className?: string;
}

const BoardImage: React.FC<BoardImageProps> = ({ className }) => {
  const { currentBoard } = useAppStore();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  // 根据当前选中的主板获取对应的图片路径
  const getBoardImagePath = (boardVersion: string): string => {
    switch (boardVersion) {
      case 'board-1':
        return '/gpio-manager/board-imgs/board-1.png';
      case 'board-2':
        return '/gpio-manager/board-imgs/board-2.png';
      case 'board-3':
        return '/gpio-manager/board-imgs/board-3.png';
      default:
        return '/gpio-manager/board-imgs/board-1.png';
    }
  };

  const boardImagePath = getBoardImagePath(currentBoard);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card size="small" className={`board-image-card ${className || ''}`}>
        <div className="board-image-container" onClick={showModal}>
          <div className="board-image-thumbnail">
            <img
              src={boardImagePath}
              alt={`${currentBoard} 主板样式`}
              className="board-thumbnail"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = '<div class="image-error">图片加载失败</div>';
                }
              }}
            />
            <div className="board-image-overlay">
              <EyeOutlined className="view-icon" />
            </div>
          </div>
          <div className="board-image-label">主板样式</div>
        </div>
      </Card>

      <Modal
        title={`${currentBoard} 主板样式`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        centered
        className="board-image-modal"
      >
        <div className="modal-image-container">
          <img
            src={boardImagePath}
            alt={`${currentBoard} 主板样式`}
            className="modal-board-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              if (target.parentElement) {
                target.parentElement.innerHTML = '<div class="modal-image-error">图片加载失败</div>';
              }
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default BoardImage; 