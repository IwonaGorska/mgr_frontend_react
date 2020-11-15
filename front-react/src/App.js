import React from 'react';
import './App.css';
import Select from 'react-select'

class App extends React.Component {

  render() {
     return (
        <div>
           <Header/>
           <Content/>
        </div>
     );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div className = "App-header">Badanie wydajności aplikacji webowych przy zastosowaniu React JS</div>
    );
  }
}

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

class Content extends React.Component {

  constructor() {
    super();
    this.state = {
       data: 
       [
          {
             "label": "Tworzenie pojedynczego rekordu",
             "isInput": true,
             "dropdown": [],
             "dropdownTitle": ""
          },
          {
             "label": "Tworzenie wielu rekordów",
             "isInput": true,
             "dropdown": [100, 1000], /*ile */
             "dropdownTitle": "Ile"
          },
          {
             "label": "Zastąpienie wszystkich rekordów nowymi wartościami",
             "isInput": true,
             "dropdown": [],
             "dropdownTitle": ""
          },
          {
            "label": "Zastąpienie wybranych rekordów nowymi wartościami",
            "isInput": true,
            "dropdown": [2, 10, 100], /*co ile */
            "dropdownTitle": "Co ile"
          },
          {
            "label": "Wyszukanie rekordu",
            "isInput": false,
            "dropdown": [],
            "dropdownTitle": ""
            /*informacja bedzie o tym, ze zostanie jakis losowy rekord jeden wygenerowany i wyszukany od razu
            bo nie da sie chyba inaczej jesli ktos stworzy nawet 1 tys. takich samych rekordow, to po czym
            potem wyszukiwac, skoro wartosc taka sama, a index to nie szukanie */
          },
          {
            "label": "Usunięcie pojedynczego rekordu",
            "isInput": false,
            "dropdown": [],
            "dropdownTitle": ""
            /*informacja bedzie o tym, ze zostanie jakis losowy rekord jeden wygenerowany i usuniety od razu
            bo nie da sie chyba inaczej jesli ktos stworzy nawet 1 tys. takich samych rekordow, to po czym
            potem wyszukiwac, skoro wartosc taka sama, a index to nie szukanie */
          },
          {
            "label": "Usunięcie wielu rekordów",
            "isInput": false,
            "dropdown": [10, 100], /*ile */
            "dropdownTitle": "Ile"
          }
       ]
    }
 }

  render() {
     return (
      <div id = "content">
          {this.state.data.map((operation, i) => <Operation key = {i} number = {i} label = {operation.label} isInput = {operation.isInput} dropdown = {operation.dropdown} dropdownTitle = {operation.dropdownTitle} />)}
          {/*<Operation label = "Tworzenie pojedynczego rekordu"/>*/}
      </div>
     );
  }
}

export default App;


//best: https://www.tutorialspoint.com/reactjs

/*
done:
- UI
- zaplanowanie przeplywu danych, funckji, komponentow
------
- zastanowienie się czym zastapic pola tekstowe w niektorych przypadkach, 
przy operacjach niektorych i zmienic to odpowiednio
- popraw hr
- niech header bedzie przyczepiony do gory zawsze
- select dropdown - jeszcze wiecej czasu potrzebne zeby znalexc cos co nie jest strasznie brzydkie
- pobranie wartości z pól i przekazanie ich do funkcji

todo:
- validacja formy
- przeniesienie klas do innych plików
- pomysl nad zaplanowaniem prawej strony (na mobile przejdzie na dol)
moze animacja z logo frameworka i opis apki i pwoodu jej stworzenia i celu 
czy to moze w nawigacji i na innej stronie?
- dodac info ikonke z wytlumaczeniem co zrobic z operacja w kolorze reacta tez - pop up lub tooltip do tego
- pokaz gdzies ile obecnie jest rekordow w bazie - moze po prawej stronie tez
*/