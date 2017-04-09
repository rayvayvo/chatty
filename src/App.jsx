import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

const uuid = require('uuid/v4');

var ws = new WebSocket("ws://localhost:3001");


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {currentUser: {name: "Anonymous"},
    messages: [{}],
    type: ""};
  }

  handleChangeUser = (userChange) => {
    let newName = this.state.currentUser.name
    this.setState({ currentUser: {name: userChange}})
    let userChangeMsg = {
      key: uuid(),
      messages: `${newName} changed their name to ${userChange}`,
      username: "Server Alert: ",
      type: "incomingNotification",
      active:this.state.active,
    }
    ws.send((JSON.stringify(userChangeMsg)));
  }


  handleSendMessage = (incoming) => {
    let incomingMsg = {
      key: uuid(),
      messages: incoming,
      username: this.state.currentUser.name,
      type: "incomingMessage",
    }
    this.setState({ messages: this.state.messages.concat([incomingMsg])
    })
    ws.send((JSON.stringify(incomingMsg)));
  }


  componentDidMount() {
    console.log("componentDidMount <App />");
    ws.onmessage = (event) => {
        let newMessage = JSON.parse(event.data);
        const messages = this.state.messages.concat(newMessage)
        switch(newMessage.type) {
          case "incomingMessage":
          this.setState({messages: messages})
            break;
          case "incomingNotification":
          this.setState({messages: messages, active:newMessage.active})
            break;
          default:
            // show an error in the console if the message type is unknown
            throw new Error("Unknown event type " + newMessage.type);
        }
    }
  }
  render() {
      return(
        <div>
          <NavBar active ={this.state.active} />
          <MessageList messages={this.state.messages} />
          <Chatbar username={this.state.currentUser.name}
            onSendMessage={this.handleSendMessage}
            onChangeUser={this.handleChangeUser}/>
        </div>
      )
    }
}

export default App





