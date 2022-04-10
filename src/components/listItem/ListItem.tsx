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
    changeViewMoreModalVisibility } from '../../redux/modalSlice';
import ModalAddReminder from '../modalAddReminder/ModalAddReminder';
import ModalViewMore from '../modalViewMore/ModalViewMore';
import ViewLists from '../viewLists/ViewLists';

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

    const showViewMoreModal = () => {
        dispatch(changeViewMoreModalVisibility(true));
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
            .then(() => {
                console.log('List deleted');
            });
        refreshPage();
        navigate('/viewlists');
    };

    if (list) {
        return (
            <section className="">
                <ViewLists />
                {addReminderModal && <ModalAddReminder />}
                {viewMoreModal && <ModalViewMore />}
                <h1>{list.name}</h1>
                <p>Description: {list.description}</p>
                <p>ID: {list.id}</p>
                {list.reminders && list.reminders.length > 0 && <p>There are {list.reminders.length} reminders</p>}
                <button onClick={showAddReminderModal}>Add a reminder</button>
                <button onClick={deleteList}>Delete list</button>
                <button onClick={showViewMoreModal}>View more</button>
            </section>
        )
    } else {
        return (
            <div>
                <h3>Loading...</h3>
            </div>
        )
    }
}

export default NewListItem