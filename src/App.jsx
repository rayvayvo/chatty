import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

  class App extends Component {

    constructor() {
      super();
      this.state = {currentUser: {name: "Bob"},
      messages: [
          {
            username: "Bob",
            content: "Has anyone seen my marbles?",
            key: 1
          },
          {
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
            key: 2
          }
        ]};
    }


  render() {
    return(
      <div>
        <MessageList messages={this.state.messages} />
        <Chatbar username={this.state.currentUser.name}/>
      </div>

    )
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {key: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }


}


export default App




