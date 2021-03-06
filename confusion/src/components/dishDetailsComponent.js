import React,{Component} from 'react';
import {Card,CardText,CardImg,CardTitle,Breadcrumb,BreadcrumbItem,Button,Modal,ModalHeader,ModalBody,Row,Col,Label} from 'reactstrap';
import {Control,LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

function RenderDish({dish}) {
    if(dish != null) {
        return (
            <FadeTransform in 
                transformProps={{
                    exitTransform:'scale(0.5) translateY(-50%)'
                }}>
                <Card className="mb-4">
                    <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name}></CardImg>
                    <CardTitle><h4>{dish.name}</h4></CardTitle>
                    <CardText>{dish.description}</CardText>
                </Card>
        </FadeTransform>
        );
    }
    else {
        return (
        <div></div>
        );
    }
}
function RenderComments({comments,addComment,dishId}){
    if(comments != null) {
        const cmnts = comments.map((com) => {
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
                <Stagger in>
                    <h4>Comments</h4>
                    {cmnts}
                    <Fade in>
                        <CommentForm dishId={dishId} addComment={addComment}/>
                    </Fade>
                </Stagger>
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
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }
    else if(props.errmess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errmess}</h4>
                </div>
            </div>
        );  
    }
    else if(props.dish!=null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4 mt-1">
                        <RenderDish dish={props.dish}/>    
                    </div>
                    <div className="col-12 col-md-6 mt-1">
                        <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default Details;

const required=(val)=>val && val.length;
const maxLength=(len)=>(val)=>!(val)|| (val.length<=len);
const minLength=(len)=>(val)=>(val)&&(val.length>=len);
export class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        }
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values){
        this.props.addComment(this.props.dishId,values.rating,values.author,values.comment)
    }
    
    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>

                <div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader className="bg-warning" toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <div >
                                <LocalForm onSubmit={(values)=>this.handleSubmit(values)}> 
                                    <Row className="form-group">
                                        <Col md={10}>
                                            <Label htmlFor="rating">Rating</Label>
                                        </Col>
                                        <Col md={12}>
                                            <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col md={10}>
                                            <Label htmlFor="name">Your Name</Label>
                                        </Col>
                                        <Col md={12}>
                                            <Control.text model=".author" className="form-control" id="author" name="author" placeholder="Your Name"
                                            validators={{
                                                required,minLength:minLength(3),maxLength:maxLength(15)
                                            }}/>
                                            <Errors className="text-danger" model=".author" show="touched"
                                            messages={{
                                                required:" Required ",
                                                minLength:" Must be greater than 2 characters",
                                                maxLength:" Must be less than 15 characters"
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col md={10}>
                                            <Label htmlfor="comment">Comment</Label>
                                        </Col>
                                        <Col md={12}>
                                            <Control.textarea model=".comment" id="comment" className="form-control" name="comment" rows="6"/>
                                        </Col>
                                    </Row>
                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}
