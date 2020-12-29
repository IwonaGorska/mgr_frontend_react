import React from 'react';
import '../App.css';
import Operation from './Operation';
import RightContent from './RightContent';
// import axios from "axios";
import ItemsService from '../services/ItemsService'

class Content extends React.Component {

   constructor() {
      super();

      this.beginTest = this.beginTest.bind(this);
      this.beginTest();
      this.getAllItems = this.getAllItems.bind(this);
      this.state = {
         data: 
         [
            // {
            //    "label": "Tworzenie pojedynczego rekordu",
            //    "isInput": true,
            //    "dropdown": [],
            //    "dropdownTitle": ""
            // },
            {
               "label": "Tworzenie rekordów",
               "isInput": true,
               "dropdown": [1, 10, 100, 1000], /*ile */
               "dropdownTitle": "Powtórzenia"
            },
            /*{
               "label": "Zastąpienie wszystkich rekordów nowymi wartościami",
               "isInput": true,
               "dropdown": [],
               "dropdownTitle": ""
            },*/
            {
              "label": "Zastąpienie rekordów nowymi wartościami",
              "isInput": true,
              "dropdown": [1, 10, 100, 1000],
              "dropdownTitle": "Powtórzenia"
            },
            // {
            //   "label": "Wyszukanie rekordu",
            //   "isInput": false,
            //   "dropdown": [],
            //   "dropdownTitle": ""
              /*informacja bedzie o tym, ze zostanie jakis losowy rekord jeden wygenerowany i wyszukany od razu
              bo nie da sie chyba inaczej jesli ktos stworzy nawet 1 tys. takich samych rekordow, to po czym
              potem wyszukiwac, skoro wartosc taka sama, a index to nie szukanie */
            // },
            {
               "label": "Wyszukanie rekordów",
               "isInput": false,
               "dropdown": [1, 10, 100, 1000],
               "dropdownTitle": "Powtórzenia"
             },
            // {
            //   "label": "Usunięcie pojedynczego rekordu",
            //   "isInput": false,
            //   "dropdown": [],
            //   "dropdownTitle": ""
              /*informacja bedzie o tym, ze zostanie jakis losowy rekord jeden wygenerowany i usuniety od razu
              bo nie da sie chyba inaczej jesli ktos stworzy nawet 1 tys. takich samych rekordow, to po czym
              potem wyszukiwac, skoro wartosc taka sama, a index to nie szukanie */
            // },
            {
              "label": "Usunięcie rekordów",
              "isInput": false,
              "dropdown": [1, 10, 100, 1000],
              "dropdownTitle": "Powtórzenia"
            }
         ],
         items: {}
      }
   }

   componentDidMount(){
      this.getAllItems();
      window.setInterval(this.getAllItems, 3000);
   }

   beginTest(){
      window.onload = function () {
         let oper = new Operation();
         console.log('start onload');
         let time = window.performance.timing;
         let pageloadtime = time.loadEventStart - time.navigationStart;
         console.log('pageloadtime = ', pageloadtime);
         oper.sendTestResult(5, pageloadtime);

         if (!performance.memory) {
            console.log("performance.memory() is not available.");
            return;
         }
         console.log('performance.memory.usedJSHeapSize = ', performance.memory.usedJSHeapSize); 
         oper.sendTestResult(6, performance.memory.usedJSHeapSize);
       }
   }

   getAllItems(){
      //console.log("Get all items");
      var items = {};
      // ItemsService.getAll()
      //    .then((response)=>{
      //       items = response.data;
      //          this.setState({      
      //             items: items
      //          });                
      //    })
      //    .catch(error => {
      //       console.log("error in getallitems = ", error);
      //       return;
      //     });

      ItemsService.getAll()
         .then(response=>{
            items = response.data;
               this.setState({      
                  items: items
               });                
         })
         .catch(error => console.log(error));


      // try{
      //    ItemsService.getAll()
      //    .then(response=>{
      //       items = response.data;
      //          this.setState({      
      //             items: items
      //          });                
      //    })
      // }catch(error){
      //    console.log(error);
      // }
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

// index.js:1 Warning: Can't perform a React state update on an unmounted component. 
// This is a no-op, but it indicates a memory leak in your application. To fix, cancel
//  all subscriptions and asynchronous tasks in the componentWillUnmount method.