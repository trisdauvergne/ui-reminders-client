import { IReminder } from "./Reminder"

export interface IList {
    name: string,
    description: string,
    reminders?: IReminder[] | [],
}