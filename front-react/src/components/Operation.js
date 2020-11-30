import React from 'react';
import '../App.css';
import Select from 'react-select'

class Operation extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        amount: 0,
        phrase: ""
      };
  
    }
  
    submit(number, event){
      event.preventDefault();//without this page is reloading, wit this form is not validating
      console.log("Number of operation is " + number);
      console.log("Amount is " + this.state.amount);
      console.log("Phrase is " + this.state.phrase);
      switch(number){
        case 0: this.createSingleRecord(); break;
        case 1: this.createManyRecords(); break;
        case 2: this.updateAllRecords(); break;
        case 3: this.updateSelectedRecords(); break;
        case 4: this.searchForRecord(); break;
        case 5: this.deleteSingleRecord(); break;
        case 6: this.deleteManyRecords(); break;
        default: console.log("Uncorrect operation number");
      }
    }
  
    createSingleRecord(){
      console.log("Create single record");
    }
  
    createManyRecords(){
      console.log("Create many records");
    }
  
    updateAllRecords(){
      console.log("Update all records");
    }
  
    updateSelectedRecords(){
      console.log("Update selected records");
    }
  
    searchForRecord(){
      console.log("Search for record");
    }
  
    deleteSingleRecord(){
      console.log("Delete single record");
    }
  
    deleteManyRecords(){
      console.log("Delete many records");
    }
  
    handleAmountChange = (event) => {
      this.setState({amount: event.value});
    }
  
    handlePhraseChange = (event) => {
      this.setState({phrase: event.target.value});
    }
  
    render() {
  
      var input;
      var dropdown;
      if(this.props.isInput){
        input = <input type = "text" className = "operationElement inputElement" onChange={this.handlePhraseChange} required></input>;
      }
  
      if(this.props.dropdown.length){
       
        const options = [];
  
        for(let i = 0; i < this.props.dropdown.length; i++){
          var option = {};
          option.value = this.props.dropdown[i];
          option.label = this.props.dropdown[i];
          options.push(option);
        }
  
        var placehold = this.props.dropdownTitle + "";
  
        dropdown = <Select options={options} placeholder = {placehold} onChange={this.handleAmountChange} required/>;
      }
  
      return (
        <div id = "operationBlockBig">
          <div className = "operationBlock">
            <label className = "operationName operationElement">{this.props.label}</label>
            <form className = "operationBlockPart">
              {dropdown}
              {input}
              <button type = "submit" className = "operationElement buttonElement" onClick = {this.submit.bind(this, this.props.number)}>Zatwierdź</button>
            </form>
          </div>
          {/*<div><hr/></div>*/}
        </div>
      );
    }
  }
  //type = "button" is in order to avoid reloading the page - it used to reload since I change div to form tag
  //Maybe now the form is not submitted by defaulr after clicking on this but at least it doesnt look weird 
  //and I will see if there are real consequences for me later
  export default Operation;