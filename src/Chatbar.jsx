import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();
    this.state = {newMessage: ""}
  }

    handleMessageChange = (e) => {
    this.setState({newMessage: e.target.value})
  }

  render() {
    return (
        <footer className="chatbar">
          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            defaultValue={this.props.username}/>
          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            />
        </footer>
    );
  }

  // componentDidMount() {
  // }
}

export default ChatBar;

