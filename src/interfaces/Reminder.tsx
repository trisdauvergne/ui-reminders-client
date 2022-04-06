import { IReminderNote } from "./ReminderNote"

export interface IReminder {
    description: string,
    id: string,
    notes?: IReminderNote[] | [],
    completed?: boolean,
}