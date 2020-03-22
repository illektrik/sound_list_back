import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Mutation } from 'react-apollo';

import {NEW_PLAYLIST, GET_ALL_LISTS, DELETE_PLAYLIST, UPDATE_LIST} from "../../queries";
import Songs from "../Songs/Songs";
import './index.css';
import query from "apollo-cache-inmemory/lib/fragmentMatcherIntrospectionQuery";

const PlayList = ({user}) => {
  const [ openAdd, setOpenAdd ] = useState(false);
  const [ listName, setListName] = useState('');
  const [ openList, setOpenList ] = useState('');
  const [ updateList, setUpdateList ] = useState('');
  const [ renameList, setRenameList ] = useState('');
  const [id, setId] = useState('');

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
    <Mutation mutation={UPDATE_LIST} refetchQueries={[{query: GET_ALL_LISTS}]}>
      {(changeList) => (
        <div className="playlist__div" key={i}>
          {item._id === updateList
            ? <input
              type="text"
              name="name"
              required defaultValue={item.name}
              style={{width: 'auto'}}
              onChange={(event) => setRenameList(event.target.value)}
            />
            : <div
              className="playlist_area__div"
              key={i}
              style={{
                background: item.name === openList ? '#2a9fd6' : 'black',
                color: item.name === openList ? 'antiquewhite' : null
              }}
              onClick={ (event) => choseList(event, item._id) }

            >
              <p className="playlist_area__p">{item.name}</p>
            </div>
          }
          {item._id === updateList
            ? <div>
              <button
                onClick={async () => {
                  await changeList({
                    variables: {
                      id: updateList,
                      name: renameList
                    }
                  });
                  setUpdateList('');
                }}
              >
                Сохранить
              </button>
              <button
                onClick={() => {
                  setUpdateList('');
                  setRenameList('');
                }}
              >
                Отменить
              </button>
            </div>
            : <button onClick={() => setUpdateList(item._id)}>Изменить</button>
          }
          <button onClick={() => delList(item._id)}>Удалить</button>
        </div>
      )}
    </Mutation>
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

  const choseList = (event, id) => {
    setOpenList(event.target.innerHTML);
    setId(id);
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
        <Songs playList={openList} id={id}/>
      </div>
    )
  }
  return <h3>You are not allowed to see this page!!</h3>
};

export default PlayList;