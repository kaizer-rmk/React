import React,{Component} from 'react';
import {Card,CardText,CardImg,CardBody,CardTitle} from 'reactstrap';

class Details extends Component{
    constructor(props){
        super(props);
    }
    renderDish(dish) {
        if(dish != null) {
          return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardTitle><h4>{dish.name}</h4></CardTitle>
                <CardText>{dish.description}</CardText>
            </Card>
          );
        }
        else {
          return (
            <div></div>
          );
        }
      }
    renderComments(dish){
        if(dish != null) {
            const cmnts = dish.comments.map((com) => {
                return (
                    <div>
                        <ul key={com.id} className='list-unstyled'>
                        <li>
                            {com.comment}
                        </li>
                        <li>
                            -- {com.author}, {}{
                                new Intl.DateTimeFormat('en-US', {
                                    month: 'short', day: '2-digit', year: 'numeric' 
                                }).format(new Date(com.date))
                            }
                        </li>
                    </ul>
                    </div>
                );
            });
            return (
                <div className='p-3'>
                    <h4>Comments</h4>
                    {cmnts}
                </div>
            );
        }
        else {
            return (
              <div></div>
            );
          }
    }
    
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 mt-1">
                        {this.renderDish(this.props.selectedDish)}    
                    </div>
                    <div className="col-12 col-md-6 mt-1">
                        {this.renderComments(this.props.selectedDish)}
                    </div>
                </div>
            </div>
        );
    }
}
export default Details;
