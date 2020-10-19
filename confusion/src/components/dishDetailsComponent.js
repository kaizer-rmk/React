import React from 'react';
import {Card,CardText,CardImg,CardTitle} from 'reactstrap';

function RenderDish({dish}) {
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
function RenderComments({dish}){
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

const Details=(props)=>{
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4 mt-1">
                    <RenderDish dish={props.selectedDish}/>    
                </div>
                <div className="col-12 col-md-6 mt-1">
                    <RenderComments dish={props.selectedDish}/>
                </div>
            </div>
        </div>
    );
}

export default Details;
