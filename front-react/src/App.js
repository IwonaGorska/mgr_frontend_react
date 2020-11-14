import React from 'react';
import './App.css';

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

  submit(number){
    console.log(number);
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

  render() {
    return (
      <div className = "operationBlock">
        <label className = "operationName operationElement">{this.props.label}</label>
        <div className = "operationBlockPart">
          <input type = "text" className = "operationElement inputElement"></input>
          <button className = "operationElement buttonElement" onClick = {this.submit.bind(this, this.props.number)}>Zatwierdź</button>
          <hr/>
        </div>
      </div>
    );
  }
}

class Content extends React.Component {

  constructor() {
    super();
    this.state = {
       data: 
       [
          {
             "label": "Tworzenie pojedynczego rekordu"
             /*,
             "name":"Foo",
             "age":"20"*/
          },
          {
             "label": "Tworzenie wielu rekordów"
          },
          {
             "label": "Zastąpienie wszystkich rekordów nowymi wartościami"
          },
          {
            "label": "Zastąpienie wybranych rekordów nowymi wartościami"
          },
          {
            "label": "Wyszukanie rekordu"
          },
          {
            "label": "Usunięcie pojedynczego rekordu"
          },
          {
            "label": "Usunięcie wielu rekordów"
          }
       ]
    }
 }

  render() {
     return (
      <div id = "content">
          {this.state.data.map((operation, i) => <Operation key = {i} number = {i} label = {operation.label} />)}
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


todo:
- pobranie wartości z pola tekstowego i przekazanie jej do funkcji
- zastanowienie się czym zastapic pola tekstowe w niektorych przypadkach, 
przy operacjach niektorych i zmienic to odpowiednio
- przeniesienie klasdo innych plików
- puszczenie commita
*/