import { Item } from './item'

export interface Lesson extends Item {
    tutorName: string;
    lessons: string[];
    location?: string;
    duration?: string;
}
