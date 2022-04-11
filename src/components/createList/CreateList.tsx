import {
    useState,
    FormEvent,
} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { host } from '../../utils/config';
import { IList } from '../../interfaces/List';
import { useNavigate } from 'react-router-dom';
import './createlist.scss';

const CreateList = () => {
    const [ listName, setListName ] = useState<string>('');
    const [ listDescription, setListDescription ] = useState<string>('');
    const navigate = useNavigate();

    const sendListToBackEnd = async ( completedList: IList ) => {
        await axios.post(`${host}/lists`, completedList)
        navigate('/viewlists');
    };

    const createListObject = (e: FormEvent) => {
        e.preventDefault();
        const id = uuidv4().replace(/-/g, "");
        if (listName && listDescription !== ' ') {
            const listToAdd: IList = {
                name: listName,
                description: listDescription,
                id,
            };
            sendListToBackEnd(listToAdd);
            setListName('');
            setListDescription('');
        } else {
            alert('Please check you have typed both a name and description in the boxes');
        }
    };

    return (
        <section className="create-list">
            <form className="create-list__form" onSubmit={(e) => createListObject(e)}>
                <label>Name</label>
                <p>What would you like to name your list?</p>
                <input
                    type="text"
                    name="list_name"
                    onChange={e => setListName(e.target.value)}
                    value={listName}
                    required
                />
                <br />
                <label>Description</label>
                <p>A few words to describe your list</p>
                <input
                    type="text"
                    name="list_description"
                    onChange={e => setListDescription(e.target.value)}
                    value={listDescription}
                    required
                />
                <br />
                <button type="submit">Create list</button>
            </form>
        </section>
    )
}

export default CreateList;