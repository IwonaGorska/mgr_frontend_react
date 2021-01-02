import React from 'react';
import '../App.css';

class SingleMessage extends React.Component {

    render() {
        return (
            <div>
                <span className = "author">
                    {this.props.author}:
                </span>
                <span className = "message">
                    {this.props.content}
                </span>
            </div>
        );
     }
}

export default SingleMessage;