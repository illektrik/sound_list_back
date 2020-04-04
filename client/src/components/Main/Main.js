import React, {useState} from 'react';
import { useQuery } from "@apollo/react-hooks";

import YouTubePlayer from "../YouTube/YouTube";
import './main.css';
import '../PlayList/index.css';
import {GET_ALL_LISTS} from "../../queries";

const Main = (props) => {
  const [ openList, setOpenList ] = useState('');
  const [id, setId] = useState('');

  const lists = useQuery(GET_ALL_LISTS);
  if (lists.loading) return <p>Loading...</p>;

 if (openList === '') {
   setOpenList(lists.data.getAllLists[0].name);
   setId(lists.data.getAllLists[0]._id);
 }

  const playlists = lists.data.getAllLists.map((item, i) => (
    <div
      className="playlist_area__div"
      key={i}
      style={{
        // background: item.name === openList ? '#167ac6' : '#167ac6',
        color: item.name === openList ? 'antiquewhite' : null
      }}
      onClick={ (event) => choseList(event, item._id) }

    >
      <p className="playlist_area__p">{item.name}</p>
    </div>
  ));

  const choseList = (event, id) => {
    setOpenList(event.target.innerHTML);
    setId(id);
  };

  return (
    <div className="main">
      <div className="playlist_div">
        {/* <h5>Плейлисты</h5> */}
        <div className="playlist_area">
          {playlists}
        </div>
      </div>
      <YouTubePlayer playList={openList} id={id}/>
    </div>
  )
};

export default Main;