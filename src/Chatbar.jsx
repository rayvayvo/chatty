import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();
    this.state = {newMessage: "", newUser: ""}

  }

  handleMessageChange = (event) => {
    this.setState({newMessage: event.target.value})
  }

  handleMessageKeyUp = (event) => {
    if (event.key === 'Enter') {
      this.props.onSendMessage(this.state.newMessage)
      this.setState({newMessage: ""})
    }
  }

    handleUserChange = (event) => {
    this.setState({newUser: event.target.value})
  }

  handleUserKeyUp = (event) => {
    if (event.key === 'Enter') {
      this.props.onChangeUser(this.state.newUser)
    }
  }

  render() {
    return (
        <footer className="chatbar">
          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            defaultValue={this.props.username}
            onChange={this.handleUserChange}
            onKeyUp={this.handleUserKeyUp}
            />
          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            type="text"
            id="typehere"
            value={this.state.newMessage}
            onChange={this.handleMessageChange}
            onKeyUp={this.handleMessageKeyUp}
            />
        </footer>
    );
  }
}

  // componentDidMount() {
  // }


export default ChatBar;



