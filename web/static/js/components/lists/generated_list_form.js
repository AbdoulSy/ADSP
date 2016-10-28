import React, { PropTypes } from 'react';
import Actions              from '../../actions/generatedLists';
import PageClick                from 'react-page-click';

export default class GeneratedListForm extends React.Component {
  componentDidMount() {
    this.refs.name.focus();
  }

  _handleSubmit(e) {
    e.preventDefault();

    const { dispatch, channel, generatedList } = this.props;
    const { name } = this.refs;

    const data = {
      id: generated_list ? generated_list.id : null,
      name: name.value,
    };

    dispatch(Actions.save(channel, data));
  }

  _renderErrors(field) {
    const { errors } = this.props;

    if (!errors) return false;

    return errors.map((error, i) => {
      if (error[field]) {
        return (
          <div key={i} className="error">
            {error[field]}
          </div>
        );
      }
    });
  }

  _handleCancelClick(e) {
    e.preventDefault();

    this.props.onCancelClick();
  }

  render() {
    const defaultValue = this.props.generatedList ? this.props.genratedList.name : '';
    const buttonText   = this.props.generatedList ? 'Update generated list' : 'Save generated list';

    return (
      <PageClick onClick={::this._handleCancelClick}>
        <div className="list form generated">
          <div className="inner">
            <h4> You can't create a generated list </h4>
          </div>
        </div>
      </PageClick>
    );
  }
}

ListForm.propTypes = {
};
