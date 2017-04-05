import React, {Component} from 'react';
import Message from './Message.jsx'

  class MessageList extends Component {
  render() {
    return (
      <div>
        {this.props.messages.map(message =>
        <Message {...message}/> ) }
      </div>
    )
}
}

export default MessageList;


//each message will be put as a prop to messagelist,
//loop through messagelist props and print them

        // <li key={this.props.messages}>
        // {message.text}
        // </li>


// <li key={this.props.messages}>
        // {message.text}
        // </li>