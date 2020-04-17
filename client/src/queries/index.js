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
  query($playListId: String!) {
    getPlayList(playListId: $playListId) {
      _id
      name
      link
      author
      playListId,
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
  mutation($name: String!, $author: String!, $link: String!, $playListId: String!) {
    addSong(name: $name, link: $link, author: $author, playListId: $playListId) {
      _id
      name
      link
      author,
      playListId
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
  mutation ($id: ID!, $name: String!, $playListId: String!, $link: String!, $author: String!) {
    changeSong(_id: $id, name: $name, author: $author, link: $link, playListId: $playListId) {
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

export const UPDATE_LIST = gql`
  mutation($id: ID!, $name: String!) {
    changeList(_id: $id, name: $name) {
      name
    }
  }
`;