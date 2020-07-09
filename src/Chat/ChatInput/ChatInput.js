import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      messageText: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({ messageText: event.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSendMessage();
    }
  };

  handleSendMessage = () => {
    const { messageText } = this.state;
    if (messageText !== '') {
      this.props.onAddMessage(messageText);
    }
    this.setState({ messageText: '' });
  };

  render() {
    const { messageText } = this.state;
    return (
      <footer className="ChatInput">
        <input
          type="text"
          value={messageText}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        <button type="button" onClick={this.handleSendMessage}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
