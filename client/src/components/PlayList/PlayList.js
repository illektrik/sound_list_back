import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Mutation } from 'react-apollo';

import {NEW_PLAYLIST, GET_ALL_LISTS, DELETE_PLAYLIST} from "../../queries";
import Songs from "../Songs/Songs";
import './index.css';

const PlayList = ({user}) => {
  const [ openAdd, setOpenAdd ] = useState(false);
  const [ listName, setListName] = useState('');
  const [ openList, setOpenList ] = useState('');

  const lists = useQuery(GET_ALL_LISTS);
  const [deleteList] = useMutation(DELETE_PLAYLIST, {
    refetchQueries: [{query: GET_ALL_LISTS}]
  });

  const delList = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Вы уверенны, что хотите удалить этот плейлист?')) {
      deleteList({
        variables: {id: id}
      })
    }
  };

  if (lists.loading) return <p>Loading...</p>;
  const playlists = lists.data.getAllLists.map((item, i) => (
    <div className="playlist__div" key={i}>
      <div
        className="playlist_area__div"
        key={i}
        style={{
          background: item.name === openList ? 'darkgray' : 'black',
          color: item.name === openList ? 'antiquewhite' : null
        }}
        onClick={ (event) => choseList(event) }

      >
        <p className="playlist_area__p">{item.name}</p>
      </div>
      <button onClick={() => delList(item._id)}>Удалить</button>
    </div>
  ));

  const addingList = (event, addList) => {
    event.preventDefault();
    addList({
      variables: {
        name: listName
      }
    });
    setListName('');
    setOpenAdd(false);
  };

  const choseList = (event) => {
    setOpenList(event.target.innerHTML);
  };
  if (user === 'admin') {
    return (
      <div className="wrapper">
        <div className="playlist_div">
          <h5>Плейлисты</h5>
          <div className="playlist_area">
            {playlists}
          </div>
          <button
            onClick={ () => setOpenAdd(!openAdd ) }
          >
            { openAdd ? <span>Отменить</span> : <span>Добавить новый плейлист</span>}
          </button>
          {openAdd
            ? (
              <Mutation mutation={NEW_PLAYLIST} refetchQueries={ [ {query: GET_ALL_LISTS} ] }>
                { (addList) => (
                  <form onSubmit={ event => addingList(event, addList) } className="new_playlist">
                    <input type="text" onChange={ (event) => setListName(event.target.value)}/>
                    <button type="submit">Добавить</button>
                  </form>
                )}
              </Mutation>
            )
            : null
          }
        </div>
        <Songs playlist={openList}/>
      </div>
    )
  }
  return <h3>You are not allowed to see this page!!</h3>
};

export default PlayList;