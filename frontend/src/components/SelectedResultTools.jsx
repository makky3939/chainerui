import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import * as uiPropTypes from '../store/uiPropTypes';
import { fetchResultTypes } from '../constants/index';

const SelectedResultTools = (props) => {
  const {
    project,
    results,
    resultsStatus,
    resultTypeId,
    onResultsPatch,
    onResultCheckBulkUpdate,
    onTableExpandedUpdate,
  } = props;

  const checkedResults = Object.keys(results).filter(
    (key) => resultsStatus[key] && resultsStatus[key].checked
  );

  const handleDeleteResults = (isUnregistered) => {
    onTableExpandedUpdate(project.id, {});

    const targetResultKeys = Object.keys(resultsStatus).filter((resultStatusId) => {
      const result = results[resultStatusId];
      const resultStatus = resultsStatus[resultStatusId];

      if (!result) {
        return false;
      }

      if (!resultStatus.checked) {
        return false;
      }

      return true;
    });

    const requestBody = targetResultKeys.map((id) => ({ id, isUnregistered }));
    onResultsPatch(project.id, requestBody);
    const resultStatusList = targetResultKeys.map((id) => ({ id, checked: false }));
    onResultCheckBulkUpdate(project.id, resultStatusList);
  };

  return (
    <ButtonGroup>
      {checkedResults.length > 0 && resultTypeId === fetchResultTypes[0].id ? (
        <Button color="danger" className="mr-2" onClick={() => handleDeleteResults(true)}>
          Delete results
        </Button>
      ) : null}

      {checkedResults.length > 0 && resultTypeId === fetchResultTypes[1].id ? (
        <Button color="success" className="mr-2" onClick={() => handleDeleteResults(false)}>
          Restore results
        </Button>
      ) : null}
    </ButtonGroup>
  );
};

SelectedResultTools.propTypes = {
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  resultsStatus: uiPropTypes.resultsStatus,
  resultTypeId: PropTypes.string.isRequired,
  onResultsPatch: PropTypes.func.isRequired,
  onResultCheckBulkUpdate: PropTypes.func.isRequired,
  onTableExpandedUpdate: PropTypes.func.isRequired,
};

SelectedResultTools.defaultProps = {
  resultsStatus: {},
};

export default SelectedResultTools;
