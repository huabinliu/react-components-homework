import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  addQuestionMessage = (text) => {
    const questionMessage = {
      text,
      role: ROLE.CUSTOMER,
    };
    this.addMessage(questionMessage);

    setTimeout(() => {
      this.addAnswerMessage(text);
    }, 1000);
  };

  addAnswerMessage = (text) => {
    const answerMessages = answersData.filter((answer) =>
      answer.tags.some((tag) => text.includes(tag))
    );
    this.addMessage(answerMessages);
  };

  addMessage = (message) => {
    this.setState((previousState) => ({
      messages: previousState.messages.concat(message),
    }));
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput onAddMessage={this.addQuestionMessage} />
      </main>
    );
  }
}

export default Chat;
