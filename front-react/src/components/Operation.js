import React from 'react';
import '../App.css';
import Select from 'react-select'
// import axios from "axios";
import ItemsService from '../services/ItemsService'
import TestsService from '../services/TestsService'
import Popup from './Popup';

class Operation extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    amount: 0,
    phrase: "",
    showPopup: false,
    popupText: "Błędne dane"
  };
}

validate() {
  var text = "";
  this.props.getAllItems();//update the  items object so everywhere we have access to current state in database
      //I need to know during the validation, just now, the current items list
      //subscription will wait maybe 1 sec and then things can change, cause error
  var max = this.props.items.length;
  var isCorrect = true;
  // if([1, 2, 4, 6].includes(this.props.number) && this.state.amount === 0){
  //   text += "Należy wybrać liczbę z listy. ";
  //   isCorrect = false;
  // }

  //or without this first condition
  if([0, 1, 2, 3].includes(this.props.number) && this.state.amount === 0){ 
    text += "Należy wybrać liczbę z listy. ";
    isCorrect = false;
  }

  if([1, 3].includes(this.props.number) && this.state.amount > max){
    text += "Wybrana liczba jest większa niż aktualna liczba wszstkich rekordów. ";
    isCorrect = false;
  }

  if([2].includes(this.props.number) && max === 0){
    text += "Aktualna liczba wszstkich rekordów jest równa 0. ";
    isCorrect = false;
  }

  if([0, 1].includes(this.props.number) && !this.state.phrase){
    text += "Pole tekstowe nie może być puste. ";
    isCorrect = false;
  }

  if(!isCorrect){
    this.togglePopup(text);
  }

  return isCorrect;
}

togglePopup(text) {
  this.setState({
    showPopup: !this.state.showPopup,
    popupText: text
  });
}
  
submit(number, event){
  event.preventDefault();//without this page is reloading, with this form is not validating
  if(!this.validate())
    return;
  var phrase = this.state.phrase;
  var amount = this.state.amount;
  //var number = this.props.number;

  //console.log("Number of operation is " + number);
  //console.log("Amount is " + amount);
  //console.log("Phrase is " + phrase);
  
  switch(number){
    // case 0: this.createSingleItem(phrase); break;
    case 0: this.createItems(phrase, amount); break;
    case 1: this.updateItems(phrase, amount); break;
    // case 3: this.searchForItem(); break;
    case 2: this.searchForItems(amount); break;
    // case 5: this.deleteSingleItem(); break;
    case 3: this.deleteItems(amount); break;
    default: console.log("Uncorrect operation number");
  }
}
  
// createSingleItem(phrase){
//   console.log("Create single item");
//     var postObject = {
//         name: phrase
//     }
//     ItemsService.create(postObject).then(response=>{
//       console.log(response)
//     });

//     // axios.post("http://localhost:8000/items", postObject).then(response=>{
//     //   console.log(response)
//     //   this.props.getAllItems();//update the parent component (Content)
//     //   //it updates items object in Content and also renders once again Operation components 
//     //   //so everywhere we have access to current state in database
//     // });
// }
  
createItems(phrase, amount){
  console.log("Create items");
  let t0 = performance.now();
  for(let i = 0; i < amount; i++){//I tackle amount here not on server side to test the speed on front
    var postObject = {
      name: phrase
    }
    ItemsService.create(postObject).then(response=>{
      //do sth with response maybe
    })
    .catch(error => console.log(error));
  }
  let t1 = performance.now();
  console.log("Performance create item: ", (t1 - t0)/amount, 'milliseconds');

  this.sendTestResult(1, (t1 - t0)/amount, amount);
}

updateItems(phrase, amount){
  //to obliczenie, że co 10 np. to rób tutaj i stąd uderzaj w endpoint jak na pojedynczy, tylko ze w petli
  // bo testujesz wydajnosc frontu, a jak zrobisz inaczej, to od serwera bd dokladnie wszystko zalezalo
  //i tu to amount to bedzie konkretne id do zaktualizowania
  //wyliczysz sobie, bo liczbe wszystkich rekordow w bazie bd przechowywala tez
  //z tego zapytania GET tez skorzystaj i bd trzeba je tu trzymac na froncie w arrayu i id z nich pobierac do 
  //kolejnych requestow uzytku
  console.log("Update items");
  let t0 = performance.now();
  var postObject = {
    name: phrase
  }
  for(let i = 0; i < amount; i++){
    var id = this.props.items[i].item_id;
    // axios.put(`http://localhost:8000/items/${id}`, postObject).then(response=>{
    //   this.props.getAllItems();//update the parent component (Content)
    // });
    ItemsService.update(id, postObject).then(response=>{
      //do sth with response maybe
    })
    .catch(error => console.log(error));
  }
  let t1 = performance.now();
  console.log("Performance update item: ", (t1 - t0)/amount, 'milliseconds');

  this.sendTestResult(2, (t1 - t0)/amount, amount);
}
  
// searchForItem(){
//   //wylosuj id
//   var id = this.drawId();
//   //zrob request z tym id
//   ItemsService.get(id).then((response)=>{
//     console.log("Found item = " + JSON.stringify(response.data));
//   });
//   // axios.get(`http://localhost:8000/items/${id}`).then((response)=>{
//   //   console.log("Found item = " + JSON.stringify(response.data));
//   //   this.props.getAllItems();//update the parent component (Content)
//   // });
// }

searchForItems(amount){
  console.log("Search for items");
  let t0 = performance.now();
  for(let i = 0; i < amount; i++){//I tackle amount here not on server side to test the speed on front
    let id = this.drawId();
    ItemsService.get(id).then((response)=>{
      // console.log("Found item = " + JSON.stringify(response.data));
    })
    .catch(error => console.log(error));
  }
  let t1 = performance.now();
  console.log("Performance search for item: ", (t1 - t0)/amount, 'milliseconds');

  this.sendTestResult(3, (t1 - t0)/amount, amount);
}

// deleteSingleItem(){
//   console.log("Delete single item");
//   //wylosuj id
//   var id = this.drawId();
//   //zrob request z tym id
//   ItemsService.delete(id).then((response)=>{
//     console.log(response);
//   });
//   // axios.delete(`http://localhost:8000/items/${id}`).then((response)=>{
//   //   console.log(response);
//   //   this.props.getAllItems();//update the parent component (Content)
//   // });
// }

deleteItems(amount){
  console.log("Delete items");
  let t0 = performance.now();
  for(let i = 0; i < amount; i++){
    var id = this.props.items[i].item_id;
    ItemsService.delete(id).then((response)=>{
      //console.log(response);
    })
    .catch(error => console.log(error));
  }
  let t1 = performance.now();
  console.log("Performance delete item: ", (t1 - t0)/amount, 'milliseconds');

  this.sendTestResult(4, (t1 - t0)/amount, amount);
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
  // console.log("Draw id = " + id);
  return id;
}

sendTestResult(feature, result, avg_of){
  //UWAGA - TA FUNKCJA POWINNA BYC WYSLANA DOPIERO JAK UPLYNIE 
  //TEN CZAS, NIE OD RAZU LINIOWO...
  var tObject = {
    framework: 1,
    feature: feature,
    score: result,
    avg_of: avg_of
  }
  // console.log(JSON.stringify(tObject));
  TestsService.create(tObject).then(response=>{
    //do sth with response maybe
  })
  .catch(error => console.log(error));
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
          {this.state.showPopup ? 
          <Popup
            text = {this.state.popupText}
            buttonLabel = 'Ok'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
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