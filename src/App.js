import React from 'react';
import './App.css';
import api from './Api';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      answer:null  
    }
  }
  ask = () =>api().then(answer => this.setState({answer}));

  render(){
    return (
      <div className="App">
        <div className="question">
          <input type="text" />
          <button type="submit" onClick={this.ask}>Ask any question to me!</button>
        </div>
        {this.state.answer && (
          <div className="answer">
          <h1>{this.state.answer.answer}</h1>
          <img src={this.state.answer.image} alt=""></img>
          </div>
        )}
       
      </div>
    );
    
  }
}
  


export default App;
