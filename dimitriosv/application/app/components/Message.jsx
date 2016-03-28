var React = require('react');
var ReactDOM = require('react-dom');
var MessageActions = require('../actions/message-actions.js');


var Message = React.createClass({
    renderListOptions: function(messageId) {  return function(list,i) {
        return (
             <option key={list.listId+messageId} value={list.listId}>{list.listName}</option>
        );
    }
    
    },
    render: function () {
        return (<div>
                    {this.props.messageIsArchived
                        ? <div className="archived">
                        <div className="messageText" >{this.props.messageText}</div>
                        <button type="button" onClick={this.toggleArchiveMessageChild.bind(null,this.props.messageId)}>Unarchive</button>
                        </div>
                        : <div>
                        <div className="messageText" >{this.props.messageText}</div>
                        <button type="button"  onClick={this.deleteMessageChild.bind(null,this.props.messageId)}>Delete</button>
                            <select className="llistcontselect" defaultValue="0"  onChange={this.moveMessage}>
                                <option key="0" value="0"  >Move to:</option>
                                {this.props.allLists.map(this.renderListOptions(this.props.messageId))}
                             </select>
                        <button type="button" onClick={this.toggleArchiveMessageChild.bind(null,this.props.messageId)}>Archive</button></div>
                    }
               </div>)
    },
    moveMessage: function(e) {
        var Listid=e.target.value;  
        MessageActions.addMessage(Listid,this.props.messageText);
        MessageActions.deleteMessage(this.props.messageId);

    },
    deleteMessageChild: function(messageid) {
        MessageActions.deleteMessage(messageid)
    },
    toggleArchiveMessageChild: function(messageid) {
        MessageActions.toggleArchiveMessage(messageid)
    }
});

module.exports = Message;
