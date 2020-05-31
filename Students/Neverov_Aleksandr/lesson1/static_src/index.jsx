import React from 'react';
import ReactDOM from 'react-dom';

const MessageComponent = (props) => <div>{props.text}</div>;

const MessageField = (props) => {
  return props.messages.map((message, index) => <MessageComponent key={ index } text={ message }/>);
};

const messages = ['Привет', 'Как дела?'];


const SendNewMessageButton2 = (props) => {
  return <button onClick = { () => { pushMessage(props.messages) }}>{props.text}</button>;
};

const pushMessage = (messages) => {
  messages.push('Нормально');
  render();
};

function render() {
  ReactDOM.render(
    <div>
      <MessageField messages={messages} />
      <SendNewMessageButton2 messages = {messages} text={'Отправить сообщение'}/>
    </div>,
    document.getElementById('root'),
  );
}

render();
