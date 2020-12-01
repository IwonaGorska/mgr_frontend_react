import React from 'react';
import '../App.css';

class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popupInner'>
            <div className='blockFormer'>
                <p>{this.props.text}</p>
                <button onClick={this.props.closePopup} className = "operationElement buttonElement popupButton">{this.props.buttonLabel}</button>
            </div>
          </div>
        </div>
      );
    }
  }

  export default Popup;