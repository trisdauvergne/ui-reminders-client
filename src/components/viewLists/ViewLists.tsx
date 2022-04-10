import axios from 'axios';
import {
  useEffect,
  useState
} from 'react';
import {
  Link
} from 'react-router-dom';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  selectLists,
  addListsToState,
  saveListToState
} from '../../redux/listsSlice';
import {
  selectViewMoreModal,
  changeViewMoreModalVisibility
} from '../../redux/modalSlice';
import { host } from '../../utils/config';
import ModalViewMore from '../modalViewMore/ModalViewMore';
import { IList } from '../../interfaces/List';
import './viewlists.scss';

const ViewLists = () => {
  const [ width, setWidth ] = useState(window.innerWidth);
  const lists = useSelector(selectLists);
  const viewMoreModal = useSelector(selectViewMoreModal);
  const dispatch = useDispatch();

  const breakPoint = 768;

  const showViewMoreModal = (list: IList) => {
    dispatch(saveListToState(list));
    dispatch(changeViewMoreModalVisibility(true));
  };

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, []);

  useEffect(() => {
    axios.get(`${host}/lists`)
    .then(res => {
      const listData = res.data;
      dispatch(addListsToState(listData));
    })
  }, []);

  if (lists.length > 0) {
    return (
      <section className="view-lists">
          <h1>Your lists</h1>
          {width > breakPoint ? lists.map((list: IList, i: number) => 
            <Link to={`/viewlist/${list.id}`} key={i}>{list.name}</Link>
            )
          : 
          lists.map((list: IList, i: number) => 
          <button onClick={() => showViewMoreModal(list)}>{list.name}</button>
          )}
          {viewMoreModal && <ModalViewMore />}
      </section>
    )
  } else {
    return (
      <section className="view-lists">
        <h1>You currently have no lists</h1>
      </section>
    )
  }
};

export default ViewLists;