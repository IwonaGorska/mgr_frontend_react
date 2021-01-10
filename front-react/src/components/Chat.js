import React from 'react';
import '../App.css';
import SingleMessage from './SingleMessage';
//Look I didn't have to import WebSockets module... :O 

class Chat extends React.Component {

    constructor() {
        super();
        this.sendMsg = this.sendMsg.bind(this);
        this.url = 'ws://127.0.0.1:1337';
        this.connection = new WebSocket(this.url);
        this.state = {
            messages : [],
            newMsg : ''
        }
    }

    handleMsgChange = (event) => {
        this.setState({newMsg: event.target.value});
    }

    sendMsg(){
        if(!this.state.newMsg)
            return;

        var message = {
          author: "React JS Client",
          message: this.state.newMsg
        };
    
        this.connection.send(JSON.stringify(message));
        this.newMsg = '';
        document.getElementById("txtArea").value = "";
    }

    render() {
        this.connection.onopen = function () {
            console.log('WebSocket connected');
        }
    
        this.connection.onmessage =  (message) => {//arrow function
          //because standard function sees in 'this' websocket, not component
          //and can't fetch messages object
          var json;
          try {
            // console.log('Valid JSON: ', message.data);
            json = JSON.parse(message.data);
          } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
          };
          if (json.type === 'history') { // entire message history
            console.log('history');
            let tempMessages = [];
            //insert every single message 
            for (var i=0; i < json.data.length; i++) {
                tempMessages.push(json.data[i]);
            }
            this.setState({messages: tempMessages});
          };
          if (json.type === 'message') { // it's a single message
            console.log('message');
            let tempMessages = this.state.messages;
            tempMessages.push(json.data);
            this.setState({messages: tempMessages});
          };
        }

        return (
            <div id = "contentChat">
                <h1 id="webSocketH">
                    WebSockets Chat
                </h1>
                <div id="msgBlock">
                {this.state.messages.map((message, i) => <SingleMessage key = {i} author = {message.author} content = {message.message}/>)}
                </div>
                <div id="createMsgBlock">
                    <textarea id="txtArea" className="textareaElement" onChange={this.handleMsgChange}></textarea>
                    <button className="buttonElement" onClick = {this.sendMsg}>Wyślij</button>
                </div>
            </div>
        );
     }

}

export default Chat;