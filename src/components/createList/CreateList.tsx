import React, {
    useState
} from 'react';
import { IList } from '../../interfaces/List';
import { v4 as uuidv4 } from 'uuid';

const CreateList = () => {
    const [ listName, setListName ] = useState<string>('');
    const [ listDescription, setListDescription ] = useState<string>('');
    const [ completeList, setCompleteList ] = useState<IList>();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const id = uuidv4().replace(/-/g, "");
        console.log(listName, listDescription, id);
        let list = {
            name: listName,
            description: listDescription,
            id
        };
        setCompleteList(list);
        setListName('');
        setListDescription('');
    };

    return (
        <section>
            <div>
                <h1>CREATE A LIST</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
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