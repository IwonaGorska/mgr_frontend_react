import React from 'react';
import '../App.css';
import Operation from './Operation';
import RightContent from './RightContent';
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
            {
               "label": "Tworzenie rekordów",
               "isInput": true,
               "dropdown": [1, 10, 100, 1000], /*ile */
               "dropdownTitle": "Powtórzenia"
            },
            {
              "label": "Zastąpienie rekordów nowymi wartościami",
              "isInput": true,
              "dropdown": [1, 10, 100, 1000],
              "dropdownTitle": "Powtórzenia"
            },
            {
               "label": "Wyszukanie rekordów",
               "isInput": false,
               "dropdown": [1, 10, 100, 1000],
               "dropdownTitle": "Powtórzenia"
             },
            {
              "label": "Usunięcie rekordów",
              "isInput": false,
              "dropdown": [1, 10, 100, 1000],
              "dropdownTitle": "Powtórzenia"
            },
            {
              "label": "Czytanie lokalizacji urządzenia",
              "isInput": false,
              "dropdown": [1, 10, 100, 1000],
              "dropdownTitle": "Powtórzenia"
            },
            {
              "label": "Tworzenie Push Notification",
              "isInput": true,
              "dropdown": [1, 10, 100, 1000],
              "dropdownTitle": "Powtórzenia"
            },
            {
              "label": "Umieszczanie danych w Local Storage",
              "isInput": true,
              "dropdown": [1, 10, 100, 1000],
              "dropdownTitle": "Powtórzenia"
            },
            {
              "label": "Czytanie danych z Local Storage",
              "isInput": true,
              "dropdown": [1, 10, 100, 1000],
              "dropdownTitle": "Powtórzenia"
            },
            {
               "label": "Ładowanie obrazu",
               "isInput": false,
               "dropdown": [1, 10, 100, 1000],
               "dropdownTitle": "Powtórzenia",
               "amount": 0
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
         let usedMemory;
         let oper = new Operation();
         console.log('start onload');
         let time = window.performance.timing;
         let pageloadtime = time.loadEventStart - time.navigationStart;
         console.log('pageloadtime = ', pageloadtime);
         oper.sendTestResult(5, pageloadtime, 1);

         if (!performance.memory) {
            console.log("performance.memory() is not available.");
            return;
         }
         usedMemory = performance.memory.usedJSHeapSize/Math.pow(1000, 2);
         console.log('performance.memory.usedJSHeapSize = ', usedMemory); 
         oper.sendTestResult(6, usedMemory, 1);
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