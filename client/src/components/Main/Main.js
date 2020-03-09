import React, {useState} from 'react';
import { useQuery } from "@apollo/react-hooks";

import YouTubePlayer from "../YouTube/YouTube";
import './main.css';
import '../PlayList/index.css';
import {GET_ALL_LISTS} from "../../queries";

const Main = (props) => {
  const [ openList, setOpenList ] = useState('');

  const lists = useQuery(GET_ALL_LISTS);
  if (lists.loading) return <p>Loading...</p>;

 if (openList === '') setOpenList(lists.data.getAllLists[0].name);

  const playlists = lists.data.getAllLists.map((item, i) => (
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
  ));

  const choseList = (event) => {
    setOpenList(event.target.innerHTML);
  };

  return (
    <div className="main">
      <div className="playlist_div">
        <h5>Плейлисты</h5>
        <div className="playlist_area">
          {playlists}
        </div>
      </div>
      <YouTubePlayer playList={openList} />
    </div>
  )
};

export default Main;