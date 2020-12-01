import React from 'react';
import '../App.css';
import Select from 'react-select'
// import axios from "axios";
import ItemsService from '../services/ItemsService'

class Operation extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    amount: 0,
    phrase: ""
  };
}
  
submit(number, event){
  event.preventDefault();//without this page is reloading, with this form is not validating
  var phrase = this.state.phrase;
  var amount = this.state.amount;
  //console.log("Number of operation is " + number);
  //console.log("Amount is " + amount);
  //console.log("Phrase is " + phrase);
  
  switch(number){
    case 0: this.createSingleItem(phrase); break;
    case 1: this.createManyItems(phrase, amount); break;
    case 2: this.updateManyItems(phrase, amount); break;
    case 3: this.searchForItem(); break;
    case 4: this.deleteSingleItem(); break;
    case 5: this.deleteManyItems(amount); break;
    default: console.log("Uncorrect operation number");
  }
}
  
createSingleItem(phrase){
  console.log("Create single item");
    var postObject = {
        name: phrase
    }
    ItemsService.create(postObject).then(response=>{
      console.log(response)
      this.props.getAllItems();//update the parent component (Content)
      //it updates items object in Content and also renders once again Operation components 
      //so everywhere we have access to current state in database
    });

    // axios.post("http://localhost:8000/items", postObject).then(response=>{
    //   console.log(response)
    //   this.props.getAllItems();//update the parent component (Content)
    //   //it updates items object in Content and also renders once again Operation components 
    //   //so everywhere we have access to current state in database
    // });
}
  
createManyItems(phrase, amount){
  console.log("Create many items");
  for(let i = 0; i < amount; i++){//I tackle amount here not on server side to test the speed on front
    var postObject = {
      name: phrase
    }
    ItemsService.create(postObject).then(response=>{
      this.props.getAllItems();//update the parent component (Content)
      //do sth with response maybe
    });
  }
}

updateManyItems(phrase, amount){
  //to obliczenie, że co 10 np. to rób tutaj i stąd uderzaj w endpoint jak na pojedynczy, tylko ze w petli
  // bo testujesz wydajnosc frontu, a jak zrobisz inaczej, to od serwera bd dokladnie wszystko zalezalo
  //i tu to amount to bedzie konkretne id do zaktualizowania
  //wyliczysz sobie, bo liczbe wszystkich rekordow w bazie bd przechowywala tez
  //z tego zapytania GET tez skorzystaj i bd trzeba je tu trzymac na froncie w arrayu i id z nich pobierac do 
  //kolejnych requestow uzytku
  console.log("Update many items");
  var postObject = {
    name: phrase
  }
  for(let i = 0; i < amount; i++){
    var id = this.props.items[i].item_id;
    // axios.put(`http://localhost:8000/items/${id}`, postObject).then(response=>{
    //   this.props.getAllItems();//update the parent component (Content)
    // });
    ItemsService.update(id, postObject).then(response=>{
      this.props.getAllItems();//update the parent component (Content)
      //do sth with response maybe
    });
  }
}
  
searchForItem(){
  //wylosuj id
  var id = this.drawId();
  //zrob request z tym id
  ItemsService.get(id).then((response)=>{
    console.log("Found item = " + JSON.stringify(response.data));
    this.props.getAllItems();//update the parent component (Content)
  });
  // axios.get(`http://localhost:8000/items/${id}`).then((response)=>{
  //   console.log("Found item = " + JSON.stringify(response.data));
  //   this.props.getAllItems();//update the parent component (Content)
  // });
}

deleteSingleItem(){
  console.log("Delete single item");
  //wylosuj id
  var id = this.drawId();
  //zrob request z tym id
  ItemsService.delete(id).then((response)=>{
    console.log(response);
    this.props.getAllItems();//update the parent component (Content)
  });
  // axios.delete(`http://localhost:8000/items/${id}`).then((response)=>{
  //   console.log(response);
  //   this.props.getAllItems();//update the parent component (Content)
  // });
}

deleteManyItems(amount){
  console.log("Delete many items");
  for(let i = 0; i < amount; i++){
    var id = this.props.items[i].item_id;
    ItemsService.delete(id).then((response)=>{
      //console.log(response);
      this.props.getAllItems();//update the parent component (Content)
    });
  }
}

handleAmountChange = (event) => {
  this.setState({amount: event.value});
}
  
handlePhraseChange = (event) => {
  this.setState({phrase: event.target.value});
}

drawId(){
  //choose random index in range of items array size
  var max = this.props.items.length;
  var randomNr = Math.floor(Math.random() * max);
  //fetch item_id of this chosen item
  var id = this.props.items[randomNr].item_id;
  console.log("Draw id = " + id);
  return id;
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
          {/*<p>{this.props.items.length}</p> ok, it updates automatically when I change state in Content*/}
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