import gql from 'graphql-tag';

export const GET_ALL_SONGS = gql`
  query {
    getAllSongsLists {
      name
      _id
    }
  }
`;

export const GET_ALL_LISTS = gql`
  query {
    getAllLists {
      name
      _id
    }
  }
`;

export const GET_PAY_LIST = gql`
  query($playList: String!) {
    getPlayList(playList: $playList) {
      _id
      name
      playList
      link
      author
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
    }
  }
`;

// Mutations

export const NEW_PLAYLIST = gql`
  mutation($name: String!) {
    addList(name: $name) {
      name,
      _id
    }
  }
`;

export const NEW_SONG = gql`
  mutation($name: String!, $author: String!, $link: String!, $playList: String!) {
    addSong(name: $name, playList: $playList, link: $link, author: $author) {
      _id
      name
      playList
      link
      author
    }
  }
`;

export const DELETE_SONG = gql`
  mutation($id: ID!) {
    deleteSong(_id: $id) {
      _id
    }
  }
`;

export const UPDATE_SONG = gql`
  mutation ($id: ID!, $name: String!, $playList: String!, $link: String!, $author: String!) {
    changeSong(_id: $id, name: $name, author: $author, link: $link, playList: $playList) {
      _id,
      name,
      author,
      link
    }
  }
`;

export const DELETE_PLAYLIST = gql`
  mutation($id: ID!) {
    deleteList(_id: $id) {
      _id
    }
  }
`;

export const SIGN_IN = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;