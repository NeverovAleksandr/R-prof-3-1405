import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Message from '../Components/Message';
import { botPhrases } from '../utils';
import { sendMessage } from '../Actions/messageActions';

class MessageField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      overloadBot: {
        timer: null,
        tick: 0,
      },
    };

    this.chatWindow = React.createRef();

    this.handleChange.bind(this);
    this.handleKeyUp.bind(this);
  }

  botSendMessage() {
    const { overloadBot } = this.state;
    const { chatId, messages } = this.props;
    clearTimeout(overloadBot.timer);
    overloadBot.timer = setTimeout(() => {
      overloadBot.tick = 0;

      const messageId = Object.keys(messages).length + 1;
      this.props.sendMessage(messageId, botPhrases(), 'bot', chatId);
    }, 1000);
  }

  handleSendMessage(text, sender) {
    if (text.length > 0) {
      const {
        chatId, messages,
      } = this.props;
      const messageId = Object.keys(messages).length + 1;

      this.props.sendMessage(messageId, text, sender, chatId);

      if (sender !== 'bot') {
        this.botSendMessage();
      }
      this.setState({ input: '' });
      const chatWindow = this.chatWindow.current;
      setTimeout(() => {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      });
    }
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      const { input } = this.state;
      this.handleSendMessage(input, 'me');
    }
  }

  render() {
    const {
      chatId, chats, messages,
    } = this.props;
    const { input } = this.state;

    const messageElements = chats[chatId].messageList.map(messageId => (
      <Message
        key={`${messageId}${messages[messageId].text}`}
        text={messages[messageId].text}
        sender={messages[messageId].sender}
      />
    ));

    return (
      <>
        <div className="message-field" ref={this.chatWindow}>{ messageElements }</div>
        <div className="text-field">
          <TextField
            onChange={this.handleChange.bind(this)}
            onKeyUp={this.handleKeyUp.bind(this)}
            fullWidth
            margin="normal"
            type="text"
            autoFocus
            placeholder="Write a message..."
            value={input}
          />
          <button onClick={() => this.handleSendMessage(input, 'me')} type="button">Отправить</button>
        </div>
      </>
    );
  }
}

MessageField.propTypes = {
  chatId: PropTypes.number.isRequired,
  chats: PropTypes.array.isRequired,
  messages: PropTypes.object,
  sendMessage: PropTypes.func.isRequired,
};

const mapStateToProps = ({ chatReducer, messageReducer }) => ({
  chats: chatReducer.chats,
  messages: messageReducer.messages,
});

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);
