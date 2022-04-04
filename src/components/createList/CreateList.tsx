import React, {
    useState,
} from 'react';
import axios from 'axios';
import { host } from '../../config';
import { IList } from '../../interfaces/List';

const CreateList = () => {
    const [ listName, setListName ] = useState<string>('');
    const [ listDescription, setListDescription ] = useState<string>('');

    const sendListToBackEnd = ( completedList: IList ) => {
        axios.post(host, completedList)
            .then((res) => {
                console.log('item added', res.data);
            })
    };

    const createListObject = (e: any) => {
        e.preventDefault();
        const listToAdd: IList = {
            name: listName,
            description: listDescription,
            reminders: []
        };
        sendListToBackEnd(listToAdd);
        setListName('');
        setListDescription('');
    };

    return (
        <section>
            <div>
                <h1>CREATE A LIST</h1>
                <form onSubmit={(e) => createListObject(e)}>
                    <label>Name</label>
                    <p>What would you like to name your list?</p>
                    <input
                        type="text"
                        name="list_name"
                        onChange={e => setListName(e.target.value)}
                        value={listName}
                    />
                    <br />
                    <label>Description</label>
                    <p>A few words to describe your list</p>
                    <input
                        type="text"
                        name="list_description"
                        onChange={e => setListDescription(e.target.value)}
                        value={listDescription}
                    />
                    <br />
                    <button type="submit">Create list</button>
                </form>
            </div>
        </section>
    )
}

export default CreateList