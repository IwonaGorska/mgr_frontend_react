import React from 'react';
import '../App.css';
import SingleMessage from './SingleMessage';

class Chat extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: 
            [
               {
                  "author": "Iwona",
                  "message": " xyz",
               },
               {
                "author": "David",
                "message": " abc",
             },
            ]
        }
    }

    render() {
        return (
            <div id = "contentChat">
                <h1 id="webSocketH">
                    WebSockets Chat
                </h1>
                <div id="msgBlock">
                {this.state.messages.map((message, i) => <SingleMessage key = {i} author = {message.author} content = {message.message}/>)}
                    {/* <SingleMessage/> */}
                </div>
                <div id="createMsgBlock">
                    <textarea class="textareaElement"></textarea>
                    <button class="buttonElement">Send Message</button>
                </div>
            </div>
        );
     }

}

export default Chat;