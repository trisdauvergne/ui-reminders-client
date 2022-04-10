import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  selectLists,
  addListsToState
} from '../../redux/listsSlice';
import { host } from '../../utils/config';
import { IList } from '../../interfaces/List';

const ViewLists = () => {
  const lists = useSelector(selectLists);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${host}/lists`)
    .then(res => {
      const listData = res.data;
      dispatch(addListsToState(listData));
    })
  }, []);

  if (lists.length > 0) {
    return (
      <section className="body">
          <h1>Your lists</h1>
          {lists.map((list: IList, i: number) => 
            <Link to={`/viewlist/${list.id}`} key={i}>{list.name}</Link>)
          }
      </section>
    )
  } else {
    return (
      <section className="body">
        <h1>You currently have no lists</h1>
      </section>
    )
  }
};

export default ViewLists;