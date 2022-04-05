import { IReminder } from "./Reminder"

export interface IList {
    name: string,
    description: string,
    id: string,
    _id?: string,
    reminders?: IReminder[] | [],
}

// export interface IListsState {
//     lists: IList[]
// };