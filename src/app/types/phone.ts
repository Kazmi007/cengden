import { Item } from './item'

export interface Phone extends Item {
    brand: string;
    model: string;
    year?: string;
    operatingSystem?: string;
    processor?: string;
    ram?: string;
    storage?: string;
    camera?: any;
    batteryCapacity?: string;
}
