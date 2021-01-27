import React from 'react';
import '../App.css';
import logo from '../logo.svg';

class RightContent extends React.Component {

  render() {
    
    return (
      <div id = "contentRight">
        <img src={logo} className="App-logo" alt="logo" />
        <p id = "description">
        Aplikacja jest częścią pracy magisterskiej na kierunku "Informatyka Stosowana" na temat:<br/>
        "Badanie wydajności aplikacji webowych przy zastosowaniu Angular i React JS".<br/>
        Jej celem jest umożliwienie zbadania zużycia zasobów strony internetowej stworzonej<br/>
        z użyciem biblioteki React JS.<br/>
        </p>
        <p id = "recordsInfo">
        Obecna liczba rekordów w bazie to: {this.props.number}
        </p>
      </div>
    );
  }
}

export default RightContent;