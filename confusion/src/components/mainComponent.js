import React, { Component } from 'react';
import Home from './homeComponent';
import Menu from './menuComponent';
import Contact from './contactComponent';
import Details from './dishDetailsComponent';
import Header from './headerComponent';
import Footer from './footerComponent';
import About from './aboutComponent';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import{addComment, fetchDishes} from '../redux/ActionCreators';

const mapStateToProps=state=>{
  return{
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  }    
}

const mapDispatchToProps=(dispatch)=>({
  addComment:(dishId,rating,author,comment)=>dispatch(addComment(dishId,rating,author,comment)),
  fetchDishes:()=>{dispatch(fetchDishes())}
});

class Main extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
  }

  render(){

    const HomePage=()=>{
      return(
        <Home 
        dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errmess}
        promotion={this.props.promotions.filter((promo)=>promo.featured)[0]}
        leader={this.props.leaders.filter((leader)=>leader.featured)[0]}/>
      );
    };

    const DishWithId=({match})=>{
      return(
        <Details 
        dish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errmess={this.props.dishes.errmess}
        comments={this.props.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}
        addComment={this.props.addComment}
        />
      );
    };

    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route path="/aboutus" component={()=><About leaders={this.props.leaders}/>}></Route>
          <Route path="/contactus" component={Contact}></Route>
          <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
