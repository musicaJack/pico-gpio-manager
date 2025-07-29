import board1Data from '../data/board-1.json';
import board2Data from '../data/board-2.json';
import board3Data from '../data/board-3.json';
import { BOARD_VERSIONS } from './config';

export interface BoardPin {
  gpio: string;
  uart: string;
  tftLcd: string;
  microSd: string;
  joystick: string;
  amplifier: string;
  microphone: string;
  buttons?: string;
  switches?: string;
  description: string;
  status: string;
}

export interface BoardModule {
  name: string;
  type: string;
  pins: {
    gpio: string;
    function: string;
    description: string;
    status: string;
  }[];
}

export interface BoardData {
  boardId: string;
  boardName: string;
  version: string;
  lastUpdate: string;
  totalPins: number;
  usedPins: number;
  modules: BoardModule[];
  allPins: BoardPin[];
}

class BoardDataService {
  private boardDataMap: Record<string, BoardData> = {
    [BOARD_VERSIONS.BOARD_1]: board1Data as BoardData,
    [BOARD_VERSIONS.BOARD_2]: board2Data as BoardData,
    [BOARD_VERSIONS.BOARD_3]: board3Data as BoardData,
  };

  /**
   * 标准化GPIO编号格式
   */
  private normalizeGpioName(name: string): string {
    // 将GPIO0转换为GPIO00格式，保持一致性
    if (name.match(/^GPIO\d$/)) {
      const num = name.replace('GPIO', '');
      return `GPIO0${num}`;
    }
    return name;
  }

  /**
   * 生成完整的40个PICO引脚数据
   */
  private generateFullPinData(): BoardPin[] {
    const fullPins: BoardPin[] = [];
    
    // 生成GPIO0到GPIO29的引脚（PICO有30个GPIO引脚）
    for (let i = 0; i <= 29; i++) {
      // 统一使用GPIO00、GPIO01等格式
      const gpioName = i < 10 ? `GPIO0${i}` : `GPIO${i}`;
      
      fullPins.push({
        gpio: gpioName,
        uart: "-",
        tftLcd: "-",
        microSd: "-",
        joystick: "-",
        amplifier: "-",
        microphone: "-",
        buttons: "-",
        switches: "-",
        description: `${gpioName} - 未使用`,
        status: "未使用"
      });
    }

    return fullPins;
  }

  /**
   * 合并实际使用的引脚数据到完整引脚列表中
   */
  private mergePinData(fullPins: BoardPin[], usedPins: BoardPin[]): BoardPin[] {
    const mergedPins = [...fullPins];
    
    usedPins.forEach(usedPin => {
      // 标准化GPIO编号格式进行比较
      const normalizedUsedPin = this.normalizeGpioName(usedPin.gpio);
      const index = mergedPins.findIndex(pin => this.normalizeGpioName(pin.gpio) === normalizedUsedPin);
      
      if (index !== -1) {
        // 确保合并后的引脚使用标准化的GPIO编号
        mergedPins[index] = {
          ...usedPin,
          gpio: this.normalizeGpioName(usedPin.gpio)
        };
      }
    });
    
    return mergedPins;
  }

  /**
   * 获取指定板的数据
   */
  getBoardData(boardVersion: string): BoardData | null {
    const originalData = this.boardDataMap[boardVersion];
    if (!originalData) return null;

    // 生成完整的40个引脚数据
    const fullPins = this.generateFullPinData();
    
    // 合并实际使用的引脚数据
    const mergedPins = this.mergePinData(fullPins, originalData.allPins);

    return {
      ...originalData,
      allPins: mergedPins
    };
  }

  /**
   * 获取所有可用的板版本
   */
  getAvailableBoards(): string[] {
    return Object.keys(this.boardDataMap);
  }

  /**
   * 获取指定板的统计信息
   */
  getBoardStats(boardVersion: string) {
    const data = this.getBoardData(boardVersion);
    if (!data) return null;

    // 计算实际占用的引脚数量（状态为"已占用"的引脚）
    const usedPinsCount = data.allPins.filter(pin => pin.status === '已占用').length;

    return {
      totalPins: 40, // PICO固定40个引脚
      usedPins: usedPinsCount,
      moduleCount: data.modules.length
    };
  }

  /**
   * 获取指定板的模块列表
   */
  getBoardModules(boardVersion: string): BoardModule[] {
    const data = this.getBoardData(boardVersion);
    return data?.modules || [];
  }

  /**
   * 获取指定板的所有引脚信息
   */
  getBoardPins(boardVersion: string): BoardPin[] {
    const data = this.getBoardData(boardVersion);
    return data?.allPins || [];
  }
}

export const boardDataService = new BoardDataService();
export default boardDataService; 