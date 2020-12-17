import React from 'react';
import './App.css';
import Content from './components/Content';
import Chat from './components/Chat';
// import axios from "axios";

class App extends React.Component {

// componentDidMount(){
//   axios.get("http://localhost:8000/items").then((response)=>{console.log(response)});
// }
  
render() {
    return ( 
      <div>
          <Header/>
          {/* <Content/> */}
          <Chat/>
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
- pokaz gdzies ile obecnie jest rekordow w bazie - moze po prawej stronie tez
- pomysl nad zaplanowaniem prawej strony (na mobile przejdzie na dol)
moze animacja z logo frameworka i opis apki i pwoodu jej stworzenia i celu 
czy to moze w nawigacji i na innej stronie?
- przeniesienie klas do innych plików 
-------
- validacja formy

todo:
https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145
- dodac info ikonke z wytlumaczeniem co zrobic z operacja w kolorze reacta tez - pop up lub tooltip do tego
*/