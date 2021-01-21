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
    popupText: "Błędne dane",
    imgSource: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr-TG2bBh544dNz4bjTR11_4gtX66BHtXKMg&usqp=CAU',
    isImgLoaded: false
  };
}

validate() {
  var text = "";
  this.props.getAllItems();//update the  items object so everywhere we have access to current state in database
      //I need to know during the validation, just now, the current items list
      //subscription will wait maybe 1 sec and then things can change, cause error
  var max = this.props.items.length;
  var isCorrect = true;

  if(this.state.amount === 0){ 
    text += "Należy wybrać liczbę z listy. ";
    isCorrect = false;
  }

  if([1, 2, 3].includes(this.props.number) && this.state.amount > max){
    text += "Wybrana liczba jest większa niż aktualna liczba wszstkich rekordów. ";
    isCorrect = false;
  }

  if(this.props.isInput && !this.state.phrase){
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
    case 0: this.createItems(phrase, amount); break;
    case 1: this.updateItems(phrase, amount); break;
    case 2: this.searchForItems(amount); break;
    case 3: this.deleteItems(amount); break;

    case 4: this.getLocation(amount); break;
    case 5: this.pushNotification(phrase, amount); break;
    case 6: this.setLocalStorage(phrase, amount); break;
    case 7: this.searchLocalStorage(phrase, amount); break;
    case 8: this.addTheImage(amount); break;
    default: console.log("Uncorrect operation number");
  }
}
  
createItems(phrase, amount){
  console.log("Create items");
  var sum = 0;
  var responsesReceived = 0;
  for(let i = 0; i < amount; i++){//I tackle amount here not on server side to test the speed on front
    var postObject = {
      name: phrase
    }
    let t0 = performance.now();
    ItemsService.create(postObject).then(response=>{
      //do sth with response maybe
      let t1 = performance.now();
      // console.log("Single response - create: ", t1 - t0, 'milliseconds');
      sum += t1 - t0;
      responsesReceived++;
      // console.log(responsesReceived);
      if(responsesReceived === amount){//if we have all the responses yet
        console.log("Performance create item: ", sum/amount, 'milliseconds');
        this.sendTestResult(1, sum/amount, amount);
      }
    })
    .catch(error => console.log(error));
  }
}

updateItems(phrase, amount){
  console.log("Update items");
  var sum = 0;
  var responsesReceived = 0;//I should use this, not simply iterator because
  //responses gets here in various order and sometimes i=amount-1 is in the middle for example
  var postObject = {
    name: phrase
  }
  for(let i = 0; i < amount; i++){
    var id = this.props.items[i].item_id;
    // axios.put(`http://localhost:8000/items/${id}`, postObject).then(response=>{
    //   this.props.getAllItems();//update the parent component (Content)
    // });
    let t0 = performance.now();
    ItemsService.update(id, postObject).then(response=>{
      let t1 = performance.now();
      // console.log("Single response - create: ", t1 - t0, 'milliseconds');
      sum += t1 - t0;
      responsesReceived++;
      // console.log(responsesReceived);
      if(responsesReceived === amount){
        console.log("Performance update item: ", sum/amount, 'milliseconds');
        this.sendTestResult(2, sum/amount, amount);
      }
    })
    .catch(error => console.log(error));
  }
}

searchForItems(amount){
  console.log("Search for items");
  var sum = 0;
  var responsesReceived = 0;
  for(let i = 0; i < amount; i++){//I tackle amount here not on server side to test the speed on front
    let id = this.drawId();
    let t0 = performance.now();
    ItemsService.get(id).then((response)=>{
      // console.log("Found item = " + JSON.stringify(response.data));
      let t1 = performance.now();
      // console.log("Single response - search: ", t1 - t0, 'milliseconds');
      sum += t1 - t0;
      responsesReceived++;
      // console.log(responsesReceived);
      if(responsesReceived === amount){
        console.log("Performance search item: ", sum/amount, 'milliseconds');
        this.sendTestResult(3, sum/amount, amount);
      }
    })
    .catch(error => console.log(error));
  }
}

deleteItems(amount){
  console.log("Delete items");
  var sum = 0;
  var responsesReceived = 0;
  for(let i = 0; i < amount; i++){
    var id = this.props.items[i].item_id;
    let t0 = performance.now();
    ItemsService.delete(id).then((response)=>{
      //console.log(response);
      let t1 = performance.now();
      // console.log("Single response - delete: ", t1 - t0, 'milliseconds');
      sum += t1 - t0;
      responsesReceived++;
      // console.log(responsesReceived);
      if(responsesReceived === amount){
        console.log("Performance delete item: ", sum/amount, 'milliseconds');
        this.sendTestResult(4, sum/amount, amount);
      }
    })
    .catch(error => console.log(error));
  }
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

success(position) {
  // console.log(position.coords.latitude);
  // console.log(position.coords.longitude);
}

error() {
  console.log('Error while getting location');
}

getLocation(amount){
  if(!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
  } else {
    let t0 = performance.now();
    for(let i = 0; i < amount; i++){
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    }
    // console.log('Locating…');
    let t1 = performance.now();
    this.sendTestResult(7, (t1 - t0)/amount, amount);//what if there was an error..
    console.log("Performance location: ", (t1 - t0)/amount, 'milliseconds');
  }
}

pushNotification(phrase, amount){
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    let t0 = performance.now();
    for(let i = 0; i < amount; i++){
      new Notification(phrase);
    }
    let t1 = performance.now();
    this.sendTestResult(8, (t1 - t0)/amount, amount);
    console.log("Performance notification: ", (t1 - t0)/amount, 'milliseconds');
    // var notification = new Notification(phrase);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        let t0 = performance.now();
        for(let i = 0; i < amount; i++){
          new Notification(phrase);
        }
        let t1 = performance.now();
        this.sendTestResult(8, (t1 - t0)/amount, amount);
        console.log("Performance notification: ", (t1 - t0)/amount, 'milliseconds');
      }
    });
  }
}

setLocalStorage(phrase, amount){
  let t0 = performance.now();
  for(let i = 0; i < amount; i++){
    localStorage.setItem(phrase, phrase);
  }
  let t1 = performance.now();
  this.sendTestResult(9, (t1 - t0)/amount, amount);
  console.log("Performance set storage: ", (t1 - t0)/amount, 'milliseconds');
}

searchLocalStorage(phrase, amount){
  let t0 = performance.now();
  // console.log(localStorage.getItem(phrase));
  for(let i = 0; i < amount; i++){
    localStorage.getItem(phrase);
  }
  let t1 = performance.now();
  this.sendTestResult(10, (t1 - t0)/amount, amount);
  console.log("Performance get storage: ", (t1 - t0)/amount, 'milliseconds');
  console.log(localStorage.getItem(phrase));
}

addTheImage(amount) { 
  let t0 = performance.now();
  for(let i = 0; i < amount; i++){
    document.getElementById("imageTest").textContent = ''; //removing children from element to not collect many imgs
    let img = document.createElement('img');
    img.src = this.state.imgSource;
    document.getElementById("imageTest").appendChild(img);
  }
  let t1 = performance.now();
  this.sendTestResult(11, (t1 - t0)/amount, amount);
  console.log("Performance load image: ", (t1 - t0)/amount, 'milliseconds');
  this.isImgLoaded = true;
}


handleAmountChange = (event) => {
  this.setState({amount: event.value});
}
  
handlePhraseChange = (event) => {
  this.setState({phrase: event.target.value});
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
  var picture;
  var imgSourceP;
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

  if(this.props.number === 8){
    if(this.state.isImgLoaded){
      imgSourceP = <p id='sourceInfo'>Źródło: {this.state.imgSource}</p>;
    }
    picture = <div style={{clear: 'both'}}><p id='imageTest'></p>{imgSourceP}</div>;
  }

    return (
      <div id = "operationBlockBig">
        <div className = "operationBlock">
          <label className = "operationName operationElement">{this.props.label}</label>
          <form className = "operationBlockPart">
            {dropdown}
            {input}
            <button type = "submit" className = "operationElement buttonElement" onClick = {this.submit.bind(this, this.props.number)}>Zatwierdź</button>
            {picture}
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