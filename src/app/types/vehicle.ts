import { Item } from './item'

export interface Vehicle extends Item {
    type?: string;
    brand: string;
    model: string;
    year?: string;
    color?: string;
    engineDisp?: number;
    fuelType?: string;
    transmissionType?: string;
    mileage?: number;
}
