import React from 'react';
import YouTube from 'react-youtube';
import { Query } from 'react-apollo'

import { GET_PAY_LIST } from "../../queries";
import './index.css';

class YouTubePlayer extends React.Component {
  state = {
    song: 0,
    playList: '',
    randomArr: []
  };
  componentDidUpdate(prevProps) {
    if (this.props.playList !== prevProps.playList) {
      this.setState({song: 0, playList: '', randomArr: []})
    }
  };

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  }

  nextSong = () => {
    this.state.playList[this.state.song + 1] === undefined
      ? this.setState({song: 0, randomArr: []})
      : this.setState({song: this.state.song + 1});
    if (this.state.playList[this.state.song + 1] !== undefined) {
      const arr = this.state.randomArr;
      for ( let len = (this.state.song + 2); arr.length < len;) {
        const num = Math.floor(Math.random() * this.state.playList.length);
        if(this.state.randomArr.indexOf(num) === -1) {
          arr.push(num);
        }
      }
      this.setState({randomArr: arr});
    }
  };
  render() {
    const opts = {
      height: '480',
      width: '840',
      playerVars: {
        autoplay: 1
      }
    };
    return (
      <div className='ycontainer'>
        <Query query={GET_PAY_LIST} variables={{playList: this.props.playList, playListId: this.props.id}}>
          {({loading, data}) => {
            if (loading) return <p>Loading...</p>;
            const links = data.getPlayList.map(item => {
              const link = item.link.split('=');
              if (link.length > 1) {
                const finalLink = link[1].split('&');
                return finalLink[0];
              } else {
                const finalLink = item.link.split('/');
                return finalLink[finalLink.length - 1]
              }
            });
            if (this.state.playList === '') this.setState({playList: data.getPlayList});
            if (this.state.randomArr.length === 0) this.setState({randomArr: [Math.floor(Math.random() * data.getPlayList.length)]});
            const song = this.state.randomArr.length === 1 ? this.state.randomArr[0] : this.state.randomArr[this.state.song];
            return (
              <>
                {/* {data.getPlayList[song] === undefined
                  ? null
                  : <h3>{data.getPlayList[song].author} - {data.getPlayList[song].name}</h3>
                } */}
                <YouTube
                  videoId={links[song]}
                  opts={opts}
                  onReady={this._onReady}
                  onEnd={this.nextSong}
                  onError={(error) => {
                    if (error.data === 150) {
                      this.nextSong()
                    }
                  } }
                />
              </>
            )
          }}
        </Query>
        <button
          onClick={this.nextSong}
        >
          Next 
        </button>
      </div>
    );
  };
}

export default YouTubePlayer;