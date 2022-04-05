import axios from 'axios';
import React, {
    useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLists, addListsToState } from '../../redux/listsSlice';
import { host } from '../../config';
import { IList } from '../../interfaces/List';
import ListItem from '../listItem/ListItem';

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
      <section>
          <h1>Your lists</h1>
          {/* {lists.map(list => <p>{list.name}</p>)} */}
          {lists.map((list: IList, i: number) => <ListItem {...list} key={i}/>)}
      </section>
    )
  } else {
    return (
      <section>
        <h1>You have no lists</h1>
      </section>
    )
  }
};

export default ViewLists;