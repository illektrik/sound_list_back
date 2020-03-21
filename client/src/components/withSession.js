import React from 'react';
import { Query } from 'react-apollo';

import {GET_CURRENT_USER} from "../queries";

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({data, loading, refetch}) => {
      if (loading) return null;
      const user = data.getCurrentUser === null ? null : data.getCurrentUser.username;

      return (
        <Component {...props} refetch={refetch} user={user}/>
      )
    }}
  </Query>
);

export default withSession;