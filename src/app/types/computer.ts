import { Item } from './item'

export interface Computer extends Item {
    brand: string;
    model: string;
    year?: string;
    processor?: string;
    ram?: string;
    storage?: string;
    graphicsCard?: string;
    operatingSystem?: string;
}
