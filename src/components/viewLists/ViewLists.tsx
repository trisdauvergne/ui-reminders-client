import axios from 'axios';
import React, {
    useState,
    useEffect
} from 'react';
import { host } from '../../config';
import { IList } from '../../interfaces/List';
import ListItem from '../listItem/ListItem';

const ViewLists = () => {
  const [ lists, setLists ] = useState<IList[]>([]);

  useEffect(() => {
    axios.get(`${host}/lists`)
    .then(res => {
      const listData = res.data;
      console.log('in viewlists useEffect', listData);
      setLists(listData);
    })
  }, []);

  if (lists.length === 0) {
    return (
      <section>
        <h1>You have no lists</h1>
      </section>
    )
  } else {
    return (
      <section>
          <h1>Your lists</h1>
          {lists.map((list: IList, i: number) => <ListItem {...list} key={i}/>)}
      </section>
    )
  }
};

export default ViewLists;