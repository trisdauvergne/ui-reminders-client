import React, {
    useState,
} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { host } from '../../utils/config';
import { IList } from '../../interfaces/List';
import { useNavigate } from 'react-router-dom';

const CreateList = () => {
    const [ listName, setListName ] = useState<string>('');
    const [ listDescription, setListDescription ] = useState<string>('');
    const navigate = useNavigate();

    const sendListToBackEnd = async ( completedList: IList ) => {
        await axios.post(`${host}/lists`, completedList)
            .then((res) => {
                console.log('item added', res.data);
            });
        navigate('/viewlists');
    };

    const createListObject = (e: any) => {
        e.preventDefault();
        const id = uuidv4().replace(/-/g, "");
        const listToAdd: IList = {
            name: listName,
            description: listDescription,
            id,
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

export default CreateList;