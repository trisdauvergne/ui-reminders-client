import {
    useEffect,
    useState
} from 'react';
import axios from 'axios';
import { host } from '../../utils/config';
import {
    useParams,
    useNavigate
} from 'react-router-dom';
import {
    useSelector,
    useDispatch
} from 'react-redux';
import {
    saveListToState,
    selectSavedList,
    addListsToState,
} from '../../redux/listsSlice';
import {
    selectReminderModal,
    changeReminderModalVisibility,
} from '../../redux/modalSlice';
import ModalAddReminder from '../modalAddReminder/ModalAddReminder';
import { IReminder } from '../../interfaces/Reminder';
import ViewLists from '../viewLists/ViewLists';
import './listitem.scss';
import Reminder from '../reminder/Reminder';
import {
    handleDeleteAlert
} from '../../utils/socketroutes';

const NewListItem = () => {
    const [ width, setWidth ] = useState(window.innerWidth);
    const breakPoint = 768;
    const [ remindersFiltered, setRemindersFiltered ] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    
    const list = useSelector(selectSavedList);
    const addReminderModal = useSelector(selectReminderModal);

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth))
    }, []);

    useEffect(() => {
        setRemindersFiltered(false);
        axios.get(`${host}/lists/${id}`)
        .then(res => {
            const listData = res.data[0];
            dispatch(saveListToState(listData));
        });
    }, [addReminderModal, id]);

    const showAddReminderModal = () => {
        dispatch(changeReminderModalVisibility(true));
    };

    const refreshPage = async () => {
        await axios.get(`${host}/lists`)
            .then(res => {
                const listData = res.data;
                dispatch(addListsToState(listData));
            })
    };

    const deleteList = async () => {
        await axios.delete(`${host}/lists/${list.id}`)
        handleDeleteAlert(list.name, refreshPage);
        await refreshPage();
        navigate('/viewlists');
    };

    const closeModal = () => {
        navigate('/viewlists');
    }; 

    const filterReminders = () => {
        setRemindersFiltered(!remindersFiltered);
    };

    if (list && width > breakPoint) {
        return (
            <section className="list-item">
                <ViewLists />
                <div className='list-item__content'>
                    {addReminderModal && <ModalAddReminder />}
                    <h1>{list.name}</h1>
                    <h3>{list.description}</h3>
                    <div className='list-item__btns'>
                        {list.reminders && list.reminders.length !== 0 && <button onClick={filterReminders}>{!remindersFiltered ? 'Hide completed reminders' : 'Show all reminders'}</button>}
                        <button onClick={showAddReminderModal}>Add a reminder</button>
                        <button onClick={deleteList}>Delete list</button>
                    </div>
                    {!remindersFiltered && list.reminders && list.reminders.length > 0 && list.reminders.map((reminder: IReminder, i: number) => <Reminder key={i} {...reminder} />)}
                    {remindersFiltered && list.reminders && list.reminders.length > 0 && list.reminders.map((reminder: IReminder, i: number) => !reminder.completed && <Reminder key={i} {...reminder} />)}
                    {list.reminders && list.reminders.length === 0 && <p>You currently have no reminders in this list.</p>}
                </div>
            </section>
        )
    } else if (list && width <= breakPoint) {
        return (
        <section className="list-item">
                <ViewLists />
                {!addReminderModal &&
                    <div className="modal">
                        <button onClick={closeModal}>Close modal</button>
                        <h1>{list.name}</h1>
                        <p>{list.description}</p>
                        <div className='list-item__btns'>
                            <button onClick={filterReminders}>{!remindersFiltered ? 'Hide completed reminders' : 'Show all reminders'}</button>
                            <button onClick={showAddReminderModal}>Add a reminder</button>
                            <button onClick={deleteList}>Delete list</button>
                        </div>
                        {!remindersFiltered && list.reminders && list.reminders.length > 0 && list.reminders.map((reminder: IReminder, i: number) => 
                            <Reminder key={i} {...reminder} />
                        )}
                        {remindersFiltered && list.reminders && list.reminders.length > 0 && list.reminders.map((reminder: IReminder, i: number) => !reminder.completed && <Reminder key={i} {...reminder} />)}
                    </div>
                }
                {addReminderModal && <ModalAddReminder />}
            </section>
        )
    } else {
        return (
            <section className="list-item">
                <ViewLists />
                <h3>Loading...</h3>
            </section>
        )
    }
}

export default NewListItem;