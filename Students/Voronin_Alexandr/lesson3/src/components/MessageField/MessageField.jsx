import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx'

import { sendMessage } from '../../store/actions/messages_actions.js';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

class MessageField extends Component {
    constructor (props) {
        super (props)
        this.state = {
            //botResponse: false,
            text: '',
            
        }
    }

    handleSend = (text, sender) => {
        this.setState({text: ''})
        if (sender == 'Me') {
            this.sendMessage(text, sender)
        }
    }

    sendMessage = (text, sender) => {
        let { messages } = this.props;
        let messageId = Object.keys(messages).length + 1;
        //вызов Action
        this.props.sendMessage(messageId, sender, text)
    }

    //handleChange = (evt) => {
    //    if (evt.keyCode !== 13) this.setState({ text: evt.target.value })
    //}

    handleChange = (evt) => {
        evt.keyCode !== 13 ?
            this.setState({ text: evt.target.value }) :
            this.handleSend(evt)
    }


    //componentDidUpdate(prevProps, prevState) {
    //    if ((this.state.messages.length > prevState.messages.length) && 
    //    (this.state.messages[this.state.messages.length - 1].user != prevState.messages[prevState.messages.length - 1].user)&&
    //    this.state.botResponse === false)
    //    {
    //        setTimeout(() => {
    //            this.setState({
    //                botResponse: true,
    //                text: '',
    //                messages: [...this.state.messages, {
    //                    user: null,
    //                    text: '' 
    //                }]
    //            })
    //        }, 1000);
    //    }
    //    
    //}

    render () {
        let { messages } = this.props;

        let msgArr = []
        Object.keys(messages).forEach(key => {
            msgArr.push (<Message
                text={ messages[key].text } 
                sender={ messages[key].user }
                key={ key }/>);
        });

        return (
            <div className="d-flex flex-column w-50">
                <div>
                    { msgArr }
                </div>
                <hr/>
                <div className="controls d-flex w-100">
                    <input
                        type="text" 
                        className="w-75"
                        onChange={ this.handleChange }
                        onKeyUp={ this.handleChange }
                        value={ this.state.text }
                    />
                    <button className="ml-3" onClick={ () => this.handleSend(this.state.text, 'Me') }>Send</button>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = ({ msgReducer }) => ({
    messages: msgReducer.messages
})

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);