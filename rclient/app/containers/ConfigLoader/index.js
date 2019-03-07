import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadConfig } from './actions';
import saga from './saga';
import reducer from './reducer';

export class ConfigLoader extends React.PureComponent {
  componentDidMount() {
    this.props.onLoadConfig();
  }

  render() {
    return null;
  }
}

ConfigLoader.propTypes = {
  onLoadConfig: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLoadConfig: () => dispatch(loadConfig()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'config', reducer });
const withSaga = injectSaga({ key: 'config', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ConfigLoader);
