import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount(){
    fetch('http://localhost:5000', { method: 'GET'})
      .then(res => res.json())
      .then(
        (result)=> {
          console.log('result: ', result)
          this.setState({
            isLoaded: true,
            items: result.result
          });
        },
        (error) => {
          this.setState({
            isLoaded:true,
            error
          });
        }
      )
  }
  render() {
    const{ error, isLoaded, items} = this.state;
    if(error){
      return (<div>Error: {error.message}</div>);
    }
    else if (!isLoaded){
      return (<div>Loading...</div>);
    }
    else{
      return(
        <ul>
          {items.map(item => (
            <li key={item.title}>
              {item.title} {item.company}
            </li>
          ))}
        </ul>
        );    
    }
  }
}
export default App;