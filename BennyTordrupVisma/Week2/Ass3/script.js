var Message = React.createClass({
	render: function() {
		return (
			<div>
					{this.props.message.isArchived 
						? <div className="archived-message">{this.props.message.id}. {this.props.message.text}<button onClick={this.handleUnarchive}>Unarchive</button></div> 
						: <div>{this.props.message.id}. {this.props.message.text}<button onClick={this.handleArchive}>Archive</button><button onClick={this.handleDelete}>Delete</button></div>}
			</div>
		);
	},
	
	handleDelete: function() {
		this.props.onDeleteMessage(this.props.message);
	},
	
	handleArchive: function() {
		this.props.onArchiveMessage(this.props.message);
	},
	
	handleUnarchive: function() {
		this.props.onUnarchiveMessage(this.props.message);
	}
})

var List = React.createClass({
	render: function() {
		var that = this;
		
		return 	<div>
					<h4>{this.props.list.name}</h4>
					<div>
						{this.props.list.messages.map(function(message, index) {
							return <Message key={index} 
											message={message} 
											onArchiveMessage={that.archiveMessage} 
											onDeleteMessage={that.deleteMessage}
											onUnarchiveMessage={that.unarchiveMessage} />
						})}
					</div>
				</div>
	},
	
	deleteMessage: function(message) {
		this.props.onDeleteMessage(message, this.props.list);
	},
	
	archiveMessage: function(message) {
		this.props.onArchiveMessage(message, this.props.list);
	},
	
	unarchiveMessage: function(message) {
		this.props.onUnarchiveMessage(message, this.props.list);
	},
})

var InputField = React.createClass({
	render: function() {
		return <div>
				<label>Text to add:</label>
				<input type="text" ref="input" />
				<label>Name of list:</label>
				<input type="text" ref="listInput" />
				<button onClick={this.handleCommit}>Commit</button>
			</div>;
	},
	
	isInputValid: function(input, list) {
		if (input.length > 200)
		{
			window.alert("The input may not exceed 200 characters.");
			return false;
		}
		
		if (list.length == 0)
		{
			window.alert("You have to enter a name on the list to add message to.");
			return false;
		}
		
		return true;
	},
	
	handleCommit: function() {
		var input = this.refs.input.value;
		var list = this.refs.listInput.value;
		if (this.isInputValid(input, list)) {
			this.props.handleCommit(input, list);
			this.refs.input.value = '';
			this.refs.listInput.value = '';
		}
	},
});

var App = React.createClass({
	getInitialState: function() {
		return {
			//lists: []
			lists: [{
				name: "List 1", 
				messages: [
					{
						id: 1,
						text: "Test 1"
					},
					{
						id: 2,
						text: "Test 2"
					},
					{
						id: 3,
						text: "Test 3"
					}
					] 
			}]
		}
	},
	
	render: function() {
		var that = this;
		
		return 	<div>
					<InputField handleCommit={this.commitMessage}/>
					<div>
						<h3>Lists</h3>
						<div>
							{this.state.lists.map(function(list, index) {
								return <List key={index} 
											list={list} 
											onArchiveMessage={that.archiveMessage} 
											onDeleteMessage={that.deleteMessage}
											onUnarchiveMessage={that.unarchiveMessage} />
							})}
						</div>
					</div>
				</div>
	},
	
	deleteMessage: function(message, list) {
		var listToChange = this.state.lists.find(l => l.name == list.name);
		if (listToChange == null)
			return;

		var msgPos = listToChange.messages.findIndex(m => m.id == message.id);
		if (msgPos === -1)
			return;

		var tailElements = listToChange.messages.slice(msgPos + 1);
		var newMessages = listToChange.messages.slice(0, msgPos).concat(tailElements);
		listToChange.messages = newMessages;
		
		this.setState({
			lists: this.state.lists.map(function(list) {
				return list.name == listToChange.name ? listToChange : list;
			})
		});
	},
	
	archiveOrUnarchiveMessageKernel: function(message, list, doArchive) {
		var listToChange = this.state.lists.find(l => l.name == list.name);
		if (listToChange == null)
			return;
		
		var msgToArchive = listToChange.messages.find(m => m.id == message.id);
		if (msgToArchive == null)
			return;
		
		msgToArchive.isArchived = doArchive;
		
		this.setState({
			lists: this.state.lists.map(function(list) {
					return list.name == listToChange.name ? listToChange : list;
			})
		});
	},
	
	archiveMessage: function(message, list) {
		this.archiveOrUnarchiveMessageKernel(message, list, true);
	},
	
	unarchiveMessage: function(message, list) {
		this.archiveOrUnarchiveMessageKernel(message, list, false);
	},

	commitMessage: function(messageText, listName) {
		var msgToAdd = {
			id: 0,
			text: messageText,
			isArchived: false
		};
		
		var destinationList = this.state.lists.find(l => l.name == listName);	
		if (destinationList == null) {
			msgToAdd.id=1;
			
			destinationList = {
				name: listName, 
				messages: [msgToAdd]
			};
			
			this.setState({
				lists: this.state && this.state.lists ? this.state.lists.concat([destinationList]) : [destinationList]
			});
		}
		else {
			msgToAdd.id= destinationList.messages.length + 1;
			destinationList.messages.push(msgToAdd);
			this.setState({
				lists: this.state.lists.map(function(list) { 
					return list.name == destinationList.name ? destinationList : list; 
				})
			});
		}
	},
})


ReactDOM.render(<App/>, document.getElementById("content"));
