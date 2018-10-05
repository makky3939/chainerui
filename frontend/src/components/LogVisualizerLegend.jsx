import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import TruncatedResultName from './TruncatedResultName';
import {
  line2dataKey
} from '../utils';


const renderItems = (lines, axisName, project, results, isResultNameAlignRight) => (
  lines[axisName].map((line) => {
    const { resultId, logKey, config } = line;
    const result = results[resultId] || {};
    return (
      <li
        className="list-group-item py-0"
        key={line2dataKey(line, axisName)}
        style={{ borderLeft: `3px solid ${config.color}` }}
      >
        <Row>
          <Col xs="6" className="text-truncate px-1">
            <TruncatedResultName
              project={project}
              result={result}
              isResultNameAlignRight={isResultNameAlignRight}
            />
          </Col>
          <Col xs="6" className="text-truncate px-1">
            {logKey}
          </Col>
        </Row>
      </li>
    );
  })
);

const LogVisualizerTooltip = (props) => {
  const {
    project, results, lines, maxHeight, isResultNameAlignRight
  } = props;

  return (
    <div className="log-visualizer-legend" style={{ maxHeight }}>
      <div className="card">
        <ul className="list-group list-group-flush small text-muted">
          {renderItems(lines, 'yLeftAxis', project, results, isResultNameAlignRight)}
          {renderItems(lines, 'yRightAxis', project, results, isResultNameAlignRight)}
        </ul>
      </div>
    </div>
  );
};

LogVisualizerTooltip.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    pathName: PropTypes.string
  }).isRequired,
  results: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string,
    name: PropTypes.string,
    args: PropTypes.arrayOf(PropTypes.any),
    logs: PropTypes.arrayOf(PropTypes.any)
  })).isRequired,
  lines: PropTypes.objectOf(PropTypes.any),
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isResultNameAlignRight: PropTypes.bool
};

LogVisualizerTooltip.defaultProps = {
  xAxisKey: '',
  isResultNameAlignRight: false,
  label: undefined,
  payload: []
};

export default LogVisualizerTooltip;
