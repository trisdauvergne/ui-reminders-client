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
} from '../../redux/listsSlice';
import { host } from '../../utils/config';
import { IList } from '../../interfaces/List';
import './viewlists.scss';

const ViewLists = () => {
  const lists = useSelector(selectLists);
  const [loading, setLoading ] = useState(false)
  const dispatch = useDispatch();


  const getLists = async () => {
    setLoading(true);
    await axios.get(`${host}/lists`)
    .then(res => {
      const listData = res.data;
      dispatch(addListsToState(listData));
    })
    setLoading(false);
  }

  useEffect(() => {
    getLists();
  }, []);
  
  if (lists.length > 0) {
    return (
      <section className="view-lists">
          {loading ? <h1>Loading</h1> : <h1>Your lists</h1>}
          {lists.map((list: IList, i: number) => 
            <Link to={`/viewlist/${list.id}`} key={i}>{list.name}</Link>
            )
          }
      </section>
    )
  } else {
    return (
      <section className="view-lists">
          {loading ? <h1>Loading</h1> : <h1>You have no lists</h1>}
      </section>
    )
  }
};

export default ViewLists;