import React, {PropTypes} from 'react';
import { push }           from 'react-router-redux';

export default class BoardCard extends React.Component {
  _handleClick() {
    this.props.dispatch(push(`/boards/${this.props.id}`));
  }
  _handleMileClick() {
    this.props.dispatch(push(`/miles/${this.props.id}`));
  }

  render() {
    return (
      <div id={this.props.id} className="board" >
        <div className="inner">
          <h5 onClick={::this._handleMileClick}>|     |@@|    |</h5>
          <h4 onClick={::this._handleClick}>{this.props.name}</h4>
        </div>
      </div>
    );
  }
}

BoardCard.propTypes = {
};
