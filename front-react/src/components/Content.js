import React from 'react';
import '../App.css';
import Operation from './Operation';
import RightContent from './RightContent';
// import axios from "axios";
import ItemsService from '../services/ItemsService'

class Content extends React.Component {

   constructor() {
      super();
      this.getAllItems = this.getAllItems.bind(this);
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
               "dropdown": [10, 100], /*ile */
               "dropdownTitle": "Ile"
            },
            /*{
               "label": "Zastąpienie wszystkich rekordów nowymi wartościami",
               "isInput": true,
               "dropdown": [],
               "dropdownTitle": ""
            },*/
            {
              "label": "Zastąpienie wielu rekordów nowymi wartościami",
              "isInput": true,
              "dropdown": [10, 100], /*co ile */
              "dropdownTitle": "Ile"
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
         ],
         items: {}
      }
   }

   componentDidMount(){
      this.getAllItems();
   }

   getAllItems(){
      //console.log("Get all items");
      var items = {};
      ItemsService.getAll().then((response)=>{
         items = response.data;
         this.setState({      
            items: items    
         });
         //console.log("Items from state = " + JSON.stringify(this.state.items));
         //console.log("Item number 2 = " + JSON.stringify(this.state.items[2]));
      });
   }
  
    render() {
       return (
         <div id = "content">
            <div id = "contentLeft">
                {this.state.data.map((operation, i) => <Operation key = {i} number = {i} label = {operation.label} isInput = {operation.isInput} dropdown = {operation.dropdown} dropdownTitle = {operation.dropdownTitle} items = {this.state.items} getAllItems = {this.getAllItems}/>)}
                {/*<Operation label = "Tworzenie pojedynczego rekordu"/>*/}
            </div>
            <RightContent number = {this.state.items.length}/>
        </div>
       );
    }
  }

export default Content;