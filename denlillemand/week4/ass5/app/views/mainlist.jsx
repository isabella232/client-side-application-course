import React from 'react';
import NamedList from './namedlist.jsx';
import NamedListForm from './namedlistform.jsx';

export default class MainList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.swapMessage = this.swapMessage.bind(this);
        this.archiveMessage = this.archiveMessage.bind(this);
        this.onSubmitNamedList = this.onSubmitNamedList.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.onSubmitMessage = this.onSubmitMessage.bind(this);
    }

    archiveMessage(id, currentList, isArchived) {
        var mutatedArray = this.state[currentList].map(function (message) {
            if (message.id === id) {
                var clonedMessage = Object.assign({}, message);
                clonedMessage.archived = !isArchived;
                return clonedMessage;
            }
            return message;
        });
        this.setState({
            [currentList]: mutatedArray
        });
    }

    swapMessage(messageId, destinationList, currentList) {
        let messageIndex = this.state[currentList].findIndex(function (message) {
            return message.id === messageId;
        });
        if (messageIndex > -1) {
            let copiedCurrentList = this.state[currentList].slice();
            let removedMessage = copiedCurrentList.splice(messageIndex, 1);
            if (removedMessage[0].archived) {
                alert("Cannot remove an archived message");
            } else {
                this.setState({
                    [currentList]: copiedCurrentList,
                    [destinationList]: this.state[destinationList].concat(removedMessage)
                });
            }
        } else {
            alert("Couldn't find the message id you wanted to remove");
        }
    }

;

    onSubmitNamedList(name) {
        if (this.state[name]) {
            alert("Cannot create another list with the same name");
        } else {
            this.setState({
                [name]: []
            });
        }
    }

    onSubmitMessage(message, listName) {
        let copiedList = this.state[listName].slice();
        copiedList.push(message);
        this.setState({
            [listName]: copiedList
        });
    }

    deleteMessage(id, listName) {
        let copiedMessages = this.state[listName].slice();
        let messageIndex = copiedMessages.findIndex(function (message) {
            return message.id = id;
        });
        if (messageIndex > -1) {
            copiedMessages.splice(messageIndex, 1);
            this.setState({
                [listName]: copiedMessages
            });
        } else {
            alert("Could not find the message to delete");
        }
    }

    render() {
        var lists = [];
        for (var key in this.state) {
            lists.push(<li><NamedList onSubmitMessage={this.onSubmitMessage} name={key} messages={this.state[key]}
                                      swap={this.swap} archiveMessage={this.archiveMessage}
                                      deleteMessage={this.deleteMessage} swapMessage={this.swapMessage}/></li>);
        }
        return (
            <div>
                <h3>Assignment 3</h3>

                <div>
                    <h4>Create list:</h4>
                    <NamedListForm onSubmitNamedList={this.onSubmitNamedList}/>
                </div>
                <div>
                    <h4>Lists:</h4>
                    <ul>
                        {lists}
                    </ul>
                </div>
            </div>
        );
    }
}