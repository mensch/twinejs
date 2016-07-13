// A Vuex module for working with story formats.

const uuid = require('tiny-uuid');
const locale = require('../locale');

const formatDefaults = {
	name: locale.say('Untitled Story Format'),
	url: '',
	userAdded: true,
	properties: {}
};

module.exports = {
	state: {
		formats: []
	},

	mutations: {
		CREATE_FORMAT(state, props) {
			let newFormat = Object.assign({}, props);
			newFormat.id = uuid();
			state.formats.push(newFormat);
		},

		UPDATE_FORMAT(state, id, props) {
			let format = state.formats.find(format => format.id === id);
			Object.assign(format, props);
		},

		DELETE_FORMAT(state, id) {
			state.formats = state.formats.filter(format => format.id !== id);
		},

		LOAD_FORMAT(state, id, props) {
			let format = state.formats.find(format => format.id === id);
			format.properties = props;
			format.loaded = true;

			if (format.setup) {
				format.setup.call(format);
			}
		}
	}
};
