import React, {useState} from 'react';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Mutation } from 'react-apollo';

import { GET_PAY_LIST, NEW_SONG, DELETE_SONG, UPDATE_SONG } from "../../queries";
import './index.css';

const Songs = (props) => {
  const [ openAdd, setOpenAdd ] = useState(false);
  const [newSong, setNewSong] = useState({
    name: '',
    author: '',
    link: ''
  });
  const [songId, setSongId] = useState('');
  const [changeSong, setChangeSong] = useState({
    name: '',
    author: '',
    link: ''
  });

  const { loading, data } = useQuery(GET_PAY_LIST, {
    variables: {playList: props.playlist}
  });

  const [updateSong] = useMutation(UPDATE_SONG, {
    refetchQueries: [{query: GET_PAY_LIST, variables: {playList: props.playlist}}]
  });

  const { name, author, link } = newSong;

  const addingSong = (event, addSong) => {
    event.preventDefault();
    addSong({
      variables: {name, author, link, playList: props.playlist}
    });
    setOpenAdd(false);
  };

  const deletingSong = (deleteSong) => {
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Вы уверенны, что хотите удалить эту песню?')) {
      deleteSong();
    }
  };

  const settingSong = (item) => {
    setSongId(item._id);
    setChangeSong({
      author: item.author,
      name: item.name,
      link: item.link
    })
  };

  const updatingSong = async (item) => {
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Внести изменения?')) {
      await updateSong({
        variables: {
          id: item._id,
          name: changeSong.name,
          author: changeSong.author,
          link: changeSong.link,
          playList: props.playlist
        }
      });
    }
    await setSongId('');
  };

  const changingSong = (event) => setChangeSong({...changeSong, [event.target.name]: event.target.value});

  if (loading) return <p>Loading</p>;
  const songs = data.getPlayList.map(item => (
    <Mutation mutation={DELETE_SONG} variables={{id: item._id}} refetchQueries={[{query: GET_PAY_LIST, variables: {playList: props.playlist}}]} key={item._id}>
      { (deleteSong) => (
        <div className="songs_area_title" >
          { songId === item._id
            ? <input type="text" name="author" required defaultValue={item.author} style={{width: '15%'}} onChange={(event) => changingSong(event)}/>
            : <div className="songs_area__div" style={{width: '15%'}}><p>{item.author}</p></div>
          }
          { songId === item._id
            ? <input type="text" name="name" required defaultValue={item.name} style={{width: '20%'}} onChange={(event) => changingSong(event)}/>
            :  <div className="songs_area__div" style={{width: '20%'}}><p>{item.name}</p></div>
          }
          { songId === item._id
            ? <input type="text" name="link" required placeholder={item.link} style={{width: '60%'}} onChange={(event) => changingSong(event)}/>
            :  <div className="songs_area__div"><p>{item.link}</p></div>
          }
          { songId === item._id
            ? <div className="songs_area__div" style={{width: '7vw'}}>
              <button style={{marginRight: '5px'}} onClick={() => updatingSong(item)}><span>&#9989;</span></button>
              <button onClick={() => setSongId('')}><span>&#x274C;</span></button>
            </div>
            : <div className="songs_area__div" style={{width: '7vw'}}><button onClick={() => settingSong(item)}>Изменить</button></div>
          }
          <div className="songs_area__div" style={{width: '7vw'}}><button onClick={() => deletingSong(deleteSong)}>Удалить</button></div>
        </div>
      )}
    </Mutation>
  ));
  if (props.playlist !== '') {
    return (
      <div>
        <div className="songs_area" style={{marginTop: '70px'}}>
          <div style={{display: 'flex'}}>
            <h5 style={{marginRight: '10px'}}>Плейлист:</h5>
            <h5>{props.playlist}</h5>
          </div>
          <div className="songs_area_title">
            <div className="songs_area__div" style={{width: '15%'}}><p style={{fontWeight: 'bold'}}>Автор</p></div>
            <div className="songs_area__div" style={{width: '20%'}}><p style={{fontWeight: 'bold'}}>Название</p></div>
            <div className="songs_area__div"><p style={{fontWeight: 'bold'}}>Ссылка</p></div>
            <div className="songs_area__div" style={{width: '7vw', fontSize: '16px'}}><p style={{fontWeight: 'bold'}}>Изменить</p></div>
            <div className="songs_area__div" style={{width: '7vw', fontSize: '16px'}}><p style={{fontWeight: 'bold'}}>Удалить</p></div>
          </div>
          {songs}
        </div>
        <button
          onClick={ () => setOpenAdd(!openAdd ) }
        >
          { openAdd ? <span>Отменить</span> : <span>Добавить новый трек</span>}
        </button>
        { openAdd ? (
          <Mutation mutation={NEW_SONG} refetchQueries={[{query: GET_PAY_LIST, variables: {playList: props.playlist}}]}>
            {(addSong) => (
              <form className="new_playlist new_song" onSubmit={(event) => addingSong(event, addSong)}>
                <input type="text" placeholder="Автор" required onChange={event => setNewSong({...newSong, author: event.target.value}) }/>
                <input type="text" placeholder="Название" required onChange={event => setNewSong({...newSong, name: event.target.value})}/>
                <input type="text" placeholder="Ссылка" required onChange={event => setNewSong({...newSong, link: event.target.value})}/>
                <button type="submit" style={{marginTop: '15px'}}>Добавить</button>
              </form>
            )}
          </Mutation>
        )
          : null
        }
      </div>
    )
  }
  return null
};

export default Songs;