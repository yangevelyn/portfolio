import React, {Component} from 'react';
import config from '../config.js'
import secondary from '../secondary.js'
import {Frame, Scroll} from 'framer'

const firebase = require('firebase');
const axios = require('axios');

export class CreateLists extends Component{
    constructor(props){
        super(props);
        this.state = {
            functions: this.props.functions,
            listName: "test list"
        }

        this.openLightbox = this.state.functions.openLightbox.bind(this);
        this.toTop = this.state.functions.toTop.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    componentDidMount = () =>{
        // this.setState({secondary: firebase.initializeApp(secondary, "secondary")});
        // firebase.initializeApp(secondary, "secondary");
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        } 

        //get a reference to the database
        let ref = firebase.database().ref('data')

        // ref.on('value', snap =>  {
        //     var data = [];
        //     snap.forEach(ss => {
        //         let guest = [];
        //         guest.push(ss.child('name').val());
        //         guest.push(ss.child('date').val());
        //         guest.push(ss.child('description').val());
        //         guest.push(ss.child('message').val());
        //         guest.push(ss.child('email').val());
        //         guest.push(ss.child('public').val());
        //         // guest.push(ss.child('name').val());
        //         // guest.push(ss.child('message').val());
        //         data.push(guest);
        //     });
        //     this.setState({guestbook: data});
        //     console.log(data);
        // });
    }

    handleFormChange = (event) => {
        this.setState({listName: event.target.value});
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        // alert("submit");

        let valid = await this.handleValidation();

        if(valid){
            firebase.database().ref('MovieLists').child(this.state.listName).set(0);

            alert("Thank you for your submission!");
        } else{
            alert(JSON.stringify(this.state.errors));
        }
        console.log("handleSubmit");
    }

    handleValidation(){
        // console.log("valid: " + valid);
        return true;
    }

    render() {
        return(
            <div>
                <div class="content">
                    <div class="main-body">
                        <div>
                            <input type="image" src={require('../images/back-to-top.svg')} id="to-top" onClick={this.toTop.bind(this)}/>
                        </div>
                        <div class="mov-form">
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    <br/> New List Name: <br/>
                                    <input type="text" name="list" onChange={this.handleFormChange}/>
                                </label>
                                <br/><input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateLists;

