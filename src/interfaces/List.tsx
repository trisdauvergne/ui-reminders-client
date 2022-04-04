import { IReminder } from "./Reminder"

export interface IList {
    name: string,
    description: string,
    id: string,
    reminders?: IReminder[] | [],
}