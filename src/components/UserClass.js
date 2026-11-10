import React from "react";
import { useState, useEffect } from "react";
import userContext from "../utils/userContext";
class UserClass extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      userinfo:{}
    };
    
  }
  async componentDidMount(){
    const data = await fetch("https://api.github.com/users/" + this.props.name);
    const jsonData = await data.json();
    this.setState({
      userinfo: jsonData
    });
    console.log(jsonData);
  }

  render(){
    // const {name, location, contact} = this.props;
    // const {count, count2} = this.state;
    const {name, avatar_url, location, company} = this.state.userinfo;
    return(
      <>
        <img className="profile-img" src={avatar_url} alt="Profile" />
        <userContext.Consumer>
          {({ loggedInUser }) => (
            <h1 className="font-bold text-xl">{loggedInUser}</h1>
          )}
        </userContext.Consumer>
        <h2>{name}</h2>
        <h3>{location}</h3>
        <h4>{company}</h4>
      </>
    )
  }
}

export default UserClass;