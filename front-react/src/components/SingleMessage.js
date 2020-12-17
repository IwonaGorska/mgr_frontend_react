import React from 'react';
import '../App.css';

class SingleMessage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span class = "author">
                    {this.props.author}:
                </span>
                <span class = "message">
                    {this.props.content}
                </span>
            </div>
        );
     }
}

export default SingleMessage;