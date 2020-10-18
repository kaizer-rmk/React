import React,{Component} from 'react';
import {Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle} from 'reactstrap'

class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedDish:null
        }
    }

    render(){
        const menu=this.props.dishes.map((dish)=>{
            return(
                <div key={dish.id} onClick={()=>this.props.onClick(dish.id)} className="col-12 col-md-6 mt-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                        <CardImgOverlay>
                            <CardTitle><h4>{dish.name}</h4></CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return(
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
}

export default Menu;