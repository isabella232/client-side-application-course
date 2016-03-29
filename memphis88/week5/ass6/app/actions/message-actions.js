var Constants = require('../dispatcher/constants');
var Dispatcher = require('../dispatcher/dispatcher');

function isValidMessage(msg) {
	if (msg.length <= 200) {
		return true;
	}
	return false;
}

module.exports = {
	createMessage: function(listKey, msgText) {
		if (msgText == '') return;
		if (isValidMessage(msgText)) {
			Dispatcher.dispatch({
				type: Constants.CREATE_MESSAGE,
				listKey: listKey,
				message: msgText
			});
		} else {
			Dispatcher.dispatch({
				type: Constants.EXCEED_RANGE_ERROR
			});
		}
	},

	deleteMessage: function(msgId) {
		Dispatcher.dispatch({
			type: Constants.DELETE_MESSAGE,
			id: msgId
		});
	},

	moveMessage: function(msgId, targetListId, color) {
		Dispatcher.dispatch({
			type: Constants.MOVE_MESSAGE,
			id: msgId,
			listKey: targetListId,
			color: color
		});
	},

	archiveMessage: function(msgId) {
		Dispatcher.dispatch({
			type: Constants.ARCHIVE_MESSAGE,
			id: msgId
		});
	},

	extractMessage: function(msgId) {
		Dispatcher.dispatch({
			type: Constants.EXTRACT_MESSAGE,
			id: msgId
		});
	}
}