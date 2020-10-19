import React, { Component } from 'react';
import Menu from './menuComponent';
import Details from './dishDetailsComponent';
import Header from './headerComponent';
import Footer from './footerComponent';
import {DISHES} from '../shared/dishes'

class Main extends Component{

  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      selectedDish:null
    };
  }
  onDishSelect(dish){
    this.setState({
        selectedDish:dish
    });
}
  render(){
    return (
      <div>
        <Header/>
        <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/>
        <Details  selectedDish={this.state.dishes.filter((dish)=>dish.id===this.state.selectedDish)[0]} />
        <Footer/>
      </div>
    );
  }
}

export default Main;
