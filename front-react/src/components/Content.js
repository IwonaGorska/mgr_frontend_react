import React from 'react';
import '../App.css';
import Operation from './Operation';
import RightContent from './RightContent';

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
            <div id = "contentLeft">
                {this.state.data.map((operation, i) => <Operation key = {i} number = {i} label = {operation.label} isInput = {operation.isInput} dropdown = {operation.dropdown} dropdownTitle = {operation.dropdownTitle} />)}
                {/*<Operation label = "Tworzenie pojedynczego rekordu"/>*/}
            </div>
            <RightContent/>
        </div>
       );
    }
  }

export default Content;