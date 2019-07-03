import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Login from './components/LoginPage'
import arweave from './ArweaveInit'
import {UserState, AppState} from './Types';
//import { render } from 'react-dom';
import Arweave from 'arweave/web';

import LoginButton from './components/Login'
import LogoutButton from './components/Logout'


let mainStyle = {
  width:"100%",
  height:"100%",
  backgroundImage:"linear-gradient(#292929, #191919)",
  backgroundColor:"#191919",
  hotColor:"#F69E4D",
  mainColorAlt:"#fa7d36",
  mainColor:"#F76B1C",
}


export default class App extends React.Component<{}, AppState> {
  
  state = {
    view: "main",
    userDetails: {
      loggedIn: false,
      address: ""
    },
    arweave: undefined
  };
  
  updateDimensions() {
    //force it to rerender when the window is resized to make sure qr fits etc
    this.forceUpdate();
  }

  componentDidMount() {
    document.body.style.backgroundColor = mainStyle.backgroundColor
    window.addEventListener("resize", this.updateDimensions.bind(this));

    this.connectToArweave()
  }

  connectToArweave(){
    let mainnetArweave: Arweave = arweave();
    this.setState({arweave:mainnetArweave})

  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateView(event: React.MouseEvent<HTMLElement, MouseEvent>): void{
    console.log("Log in")
    console.log(event.currentTarget)
    console.log(event.target)
    this.setState({view: (event.target as any).value});
  }

  logout(event: React.MouseEvent<HTMLElement, MouseEvent>): void{
    console.log("logOut")
    let userUpdate: UserState  = {
      loggedIn: false,
       address: ""
    }
   
    this.setState({view: (event.target as any).value, userDetails: userUpdate, arweave: undefined});
  }

  loggedin(userDetails: UserState, view: string){
    this.setState({userDetails, view})
  }
    render() {

      if(this.state.view.length === 0){
        this.setState({view:"main"})
      }

      switch(this.state.view) {
        case "main":
          return(
                <div>
                <div className="main-card card w-100" style={{zIndex:1}}>
                  <LoginButton changeView={this.updateView.bind(this)}/>
                  <LogoutButton logout={this.logout.bind(this)}/>
              </div>
              </div>
          );
        case "login":
          return(
            <Login changeView={this.updateView.bind(this)} arweave={this.state.arweave}/>
          );
      }
    }
}


