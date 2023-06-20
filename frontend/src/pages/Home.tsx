import React, { Component } from "react";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/Footer";
import Main from "../Components/Home/Main";

export default  class Home extends Component {
  render(){
      return (
          <>
              <Navbar />
              <Main />
              <Footer />         
         </>
      )
  }
}