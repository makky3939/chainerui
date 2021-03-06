import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import {
  RESULT_LIST_REQUEST,
  RESULT_LIST_SUCCESS,
  RESULT_LIST_FAILURE,
  RESULT_REQUEST,
  RESULT_SUCCESS,
  RESULT_FAILURE,
} from '../actions';

const PollingStatus = ({ pollingKey, fetchState, globalConfig }) => {
  let colorClass = 'text-muted';
  let statusMessage = '';
  if (globalConfig.pollingRate && pollingKey) {
    const targetState = fetchState[pollingKey];
    // eslint-disable-next-line default-case
    switch (targetState) {
      case RESULT_LIST_REQUEST:
      case RESULT_REQUEST:
        colorClass = 'text-primary';
        statusMessage = 'loading data ...';
        break;
      case RESULT_LIST_SUCCESS:
      case RESULT_SUCCESS:
        colorClass = 'text-success';
        statusMessage = 'success fully loaded data';
        break;
      case RESULT_LIST_FAILURE:
      case RESULT_FAILURE:
        colorClass = 'text-danger';
        statusMessage = 'failed to load data';
        break;
    }
  }
  return (
    <div className={colorClass}>
      <small>
        <i id="polling-status-tooltip" className="fas fa-circle fa-xs" />
      </small>
      {statusMessage ? (
        <UncontrolledTooltip placement="bottom" target="polling-status-tooltip">
          {statusMessage}
        </UncontrolledTooltip>
      ) : null}
    </div>
  );
};

PollingStatus.propTypes = {
  pollingKey: PropTypes.oneOf(['resultList', 'result']),
  fetchState: uiPropTypes.fetchState.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired,
};

PollingStatus.defaultProps = {
  pollingKey: undefined,
};

export default PollingStatus;
