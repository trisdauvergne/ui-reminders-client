import{ useEffect } from 'react';
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
    selectViewMoreModal,
    selectReminderModal,
    changeReminderModalVisibility,
    // changeViewMoreModalVisibility
} from '../../redux/modalSlice';
import ModalAddReminder from '../modalAddReminder/ModalAddReminder';
import ModalViewMore from '../modalViewMore/ModalViewMore';
import { IReminder } from '../../interfaces/Reminder';
import ViewLists from '../viewLists/ViewLists';
import './listitem.scss';
import Reminder from '../reminder/Reminder';

const NewListItem = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    
    const list = useSelector(selectSavedList);
    const viewMoreModal = useSelector(selectViewMoreModal);
    const addReminderModal = useSelector(selectReminderModal);

    useEffect(() => {
        axios.get(`${host}/lists/${id}`)
        .then(res => {
            const listData = res.data[0];
            dispatch(saveListToState(listData));
        });
    }, [addReminderModal, id]);

    const showAddReminderModal = () => {
        dispatch(changeReminderModalVisibility(true));
    };

    // const showViewMoreModal = () => {
    //     dispatch(changeViewMoreModalVisibility(true));
    // };

    const refreshPage = async () => {
        await axios.get(`${host}/lists`)
            .then(res => {
                const listData = res.data;
                dispatch(addListsToState(listData));
            })
    };

    const deleteList = async () => {
        await axios.delete(`${host}/lists/${list.id}`)
            .then(() => {
                console.log('List deleted');
            });
        refreshPage();
        navigate('/viewlists');
    };

    if (list) {
        return (
            <section className="list-item">
                <ViewLists />
                <div className='list-item__content'>
                    {addReminderModal && <ModalAddReminder />}
                    {viewMoreModal && <ModalViewMore />}
                    <h1>{list.name}</h1>
                    <h3>{list.description}</h3>
                    <div className='list-item__btns'>
                        <button onClick={showAddReminderModal}>Add a reminder</button>
                        <button onClick={deleteList}>Delete list</button>
                    </div>
                    {list.reminders && list.reminders.length > 0 ? list.reminders.map((reminder: IReminder, i: number) => <Reminder key={i} {...reminder} />) : 'This list has no reminders'}
                    {/* <button onClick={showViewMoreModal}>View more</button> */}
                </div>
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

export default NewListItem