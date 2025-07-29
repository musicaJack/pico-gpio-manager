export interface SystemConfig {
    boardVersions: BoardVersion[];
    interfaceTypes: InterfaceType[];
    moduleTypes: ModuleType[];
    pinStatusColors: Record<string, string>;
    systemConstraints: SystemConstraints;
}
export interface BoardVersion {
    id: string;
    name: string;
    description: string;
    manufacturer: string;
    revision: string;
    powerSupply: string;
    maxCurrent: number;
}
export interface InterfaceType {
    id: string;
    name: string;
    description: string;
    maxFrequency?: number;
    maxBaudRate?: number;
    maxSampleRate?: number;
    pins: string[];
    color: string;
}
export interface ModuleType {
    id: string;
    name: string;
    description: string;
    interface: string;
    icon: string;
    color: string;
    defaultPins: string[];
    power: {
        voltage: string;
        current: number;
        power: number;
    };
}
export interface SystemConstraints {
    powerBudget: {
        total: number;
        reserved: number;
        available: number;
    };
    timingConstraints: TimingConstraint[];
    emiConsiderations: EMIConfig[];
}
export interface TimingConstraint {
    id: string;
    type: string;
    value: number;
    unit: string;
    description: string;
}
export interface EMIConfig {
    id: string;
    type: string;
    description: string;
    pins: string[];
}
export interface PinDefinition {
    id: string;
    number: number;
    name: string;
    function: string;
    voltage: string;
    description: string;
    spi?: {
        interface: string;
        role: string;
    };
    i2c?: {
        interface: string;
        role: string;
    };
    uart?: {
        interface: string;
        role: string;
    };
    pwm?: {
        channel: string;
        slice: number;
    };
    adc?: {
        channel: number;
    };
    position: {
        x: number;
        y: number;
        side: string;
        row: number;
    };
}
export declare class ConfigLoader {
    private static instance;
    private cache;
    private constructor();
    static getInstance(): ConfigLoader;
    loadSystemConfig(): Promise<any>;
    loadPinDefinitions(): Promise<any>;
    loadBoardConfig(boardId: string): Promise<any>;
    clearCache(): void;
    clearCacheItem(key: string): void;
}
export declare const configLoader: ConfigLoader;
//# sourceMappingURL=configLoader.d.ts.map