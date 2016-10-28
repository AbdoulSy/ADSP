import Constants from '../constants';

const Actions = {
  showForm: (show) => {
    return dispatch => {
      dispatch({
        type: Constants.GENERATED_LISTS_SHOW_FORM,
        show: show,
      });
    };
  },

  save: (channel, data) => {
    return dispatch => {
      const topic = data.id ? 'generatedList:update' : 'generatedLists:create';

      channel.push(topic, { generated_list: data });
    };
  },

  createCard: (channel, data) => {
    return dispatch => {
      channel.push('cards:create', { card: data });
    };
  },
};

export default Actions;
