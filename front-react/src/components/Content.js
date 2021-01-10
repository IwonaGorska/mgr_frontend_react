import React from 'react';
import '../App.css';
import Operation from './Operation';
import RightContent from './RightContent';
// import axios from "axios";
import ItemsService from '../services/ItemsService'

class Content extends React.Component {

   constructor() {
      super();

      this.searchLocalStorage = this.searchLocalStorage.bind(this);
      this.setLocalStorage = this.setLocalStorage.bind(this);
      this.pushNotification = this.pushNotification.bind(this);
      this.getLocation = this.getLocation.bind(this);

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

   success(position) {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    }

    error() {
      console.log('error');
    }

    getLocation(){
      let t0 = performance.now();
      if(!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
      } else {
        console.log('Locating…');
        navigator.geolocation.getCurrentPosition(this.success, this.error);
      }
      let t1 = performance.now();
      console.log("Performance location: ", t1 - t0, 'milliseconds');
    }

    pushNotification(){
      let t0 = performance.now();
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("Hi there!");
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification("Hi there!");
          }
        });
      }
      let t1 = performance.now();
      console.log("Performance notification: ", t1 - t0, 'milliseconds');
    }

    setLocalStorage(){
      let t0 = performance.now();
      localStorage.setItem('test', 'test');
      let t1 = performance.now();
      console.log("Performance set storage: ", t1 - t0, 'milliseconds');
    }

    searchLocalStorage(){
      let t0 = performance.now();
      console.log(localStorage.getItem('test'));
      let t1 = performance.now();
      console.log("Performance get storage: ", t1 - t0, 'milliseconds');
    }
  
    render() {

       return (
         <div id = "content">
            <div id = "contentLeft">
                {this.state.data.map((operation, i) => <Operation key = {i} number = {i} label = {operation.label} isInput = {operation.isInput} dropdown = {operation.dropdown} dropdownTitle = {operation.dropdownTitle} items = {this.state.items} getAllItems = {this.getAllItems}/>)}
                {/*<Operation label = "Tworzenie pojedynczego rekordu"/>*/}



                <div>
                  <button onClick = {this.getLocation.bind(this)}>
                  Location
                  </button>
                  <button onClick = {this.pushNotification.bind(this)}>
                  pushNotification
                  </button>
                  <button onClick = {this.setLocalStorage.bind(this)}>
                  setLocalStorage
                  </button>
                  <button onClick = {this.searchLocalStorage.bind(this)}>
                  searchLocalStorage
                  </button>
                </div>



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