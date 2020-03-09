import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
// import Loader from 'components/Loader';
// import { FormattedMessage } from 'react-intl';
import { NotificationManager } from 'react-notifications';

import './style.less';
import { FormattedMessage } from 'react-intl';

export const mutationHOC = () => SourceComponent => {
  class MutationHOC extends React.Component {
    state = {
      loading: false,
      error: '',
      test: <FormattedMessage id="You can't send messages without photo in your profile" />,
      errorMessage: <FormattedMessage id="Unexpected error" />
    };

    mutate = async (mutationFn, variables, { handleError, handleSuccess } = {}) => {
      this.setState({ loading: true, error: '' });

      try {
        this.setState({ loading: false });
        if (handleSuccess) {
          handleSuccess();
        }
        return await mutationFn({ variables });
      } catch (error) {
        this.setState({
          loading: false,
          error: error.message
        });
        if (error.message === 'GraphQL error: You do not have a photo. Upload photo to profile') {
          // eslint-disable-next-line react/destructuring-assignment
          NotificationManager.error('', this.state.test);
        } else if (error.message === 'GraphQL error: Token incorrect') {
          // eslint-disable-next-line react/destructuring-assignment
          return null;
        } else {
          // eslint-disable-next-line react/destructuring-assignment
          NotificationManager.error('', this.state.errorMessage);
        }
        if (handleError) {
          handleError();
        }
      }
    };
    // errorMessage = (errorMessage) => {
    //   // eslint-disable-next-line no-unused-expressions
    //   <h1 style={ { color: 'green' } }>{`Произошла ошибка ${ errorMessage }` }</h1>;
    // }

    render() {
      const { loading, error } = this.state;
      return (
        <>
          <SourceComponent { ...this.props } loading={ loading } error={ error } mutate={ this.mutate } />
        </>
      );
    }
  }

  hoistNonReactStatic(MutationHOC, SourceComponent);
  return MutationHOC;
};
