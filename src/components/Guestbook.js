import React, {Component} from 'react';
import config from '../config.js'

const firebase = require('firebase')

export class Guestbook extends Component{
    constructor(props){
        super(props);
        this.state = {
            functions: this.props.functions,
            name: "",
            description: "",
            message: "",
            email: "",
            public: false,
            errors: {},
            guestbook: []
        }

        this.openLightbox = this.state.functions.openLightbox.bind(this);
        this.toTop = this.state.functions.toTop.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    componentDidMount = () =>{
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        } 

        //get a reference to the database
        let ref = firebase.database().ref('data')

        // //retrieve its data
        // ref.on('value', snapshot => {
        //     //this is your call back function
        //         //state will be a JSON object after this
        //     //set your apps state to contain this data however you like
        //     // const state = snapshot.val()
        //     // //since i use react 16, i set my state like this
        //     // //i have previously declared a state variable like this: const [data, setData] = useState([]) so that I can make the below call
        //     // setData(state)
        //     this.setState({guestbook: Object.values(snapshot.val().category)});
        //     console.log(this.state.guestbook);
        // })

        // ref.on('value', snap =>  {
        //     var data = [];
        //     snap.forEach(ss => {
        //         let guest = {};
        //         guest.name = ss.child('name').val();
        //         guest.description = ss.child('description').val();
        //         guest.message = ss.child('message').val();
        //         guest.email = ss.child('email').val();
        //         guest.public = ss.child('public').val();
        //         // guest.push(ss.child('name').val());
        //         // guest.push(ss.child('message').val());
        //         data.push(guest);
        //     });
        //     this.setState({guestbook: data});
        //     console.log(data);
        // });

        ref.on('value', snap =>  {
            var data = [];
            snap.forEach(ss => {
                let guest = [];
                guest.push(ss.child('name').val());
                guest.push(ss.child('date').val());
                guest.push(ss.child('description').val());
                guest.push(ss.child('message').val());
                guest.push(ss.child('email').val());
                guest.push(ss.child('public').val());
                // guest.push(ss.child('name').val());
                // guest.push(ss.child('message').val());
                data.push(guest);
            });
            this.setState({guestbook: data});
            console.log(data);
        });
    }

    handleFormChange = (event) => {
        if(event.target.id == "public"){
            this.setState({public: true});
        } else if(event.target.id == "private"){
            this.setState({public: false});
        } else{
            this.setState({[event.target.name]: event.target.value});
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        // alert("submit");

        let valid = await this.handleValidation();

        if(valid){
            let json = {
                name: this.state.name,
                description: this.state.description,
                message: this.state.message,
                date: new Date().toLocaleString(),
                email: this.state.email,
                public: this.state.public,
            }
            firebase.database().ref('data').child(this.state.name).set(json);
            alert("Thank you for your submission!");
        } else{
            alert(JSON.stringify(this.state.errors));
        }
        console.log("handleSubmit");
    }

    handleValidation(){
        let name = this.state.name;
        let description = this.state.description;
        let message = this.state.message;
        let errors = {};
        let valid = true;

        if(!name){
            valid = false;
            errors["name"] = "Name is required"
        } else if(name.length <= 5 || name.length >= 20){
            valid = false;
            errors["name"] = "Name must be between 5 and 20 characters"
        }

        if(description.length >= 100){
            valid = false;
            errors["description"] = "Description must be less than 100 characters"
        }

        if(!message){
            valid = false;
            errors["message"] = "Message is required"
        } else if(message.length <= 15 || message.length >= 500){
            valid = false;
            errors["message"] = "Message must be between 15 and 500 characters"
        }

        console.log("valid: " + valid);
        this.setState({errors: errors});
        console.log(this.state.errors);
        return valid;
    }

    render() {
        let guestbook;
        if(typeof(this.state.guestbook) != 'undefined'){
            if(this.state.guestbook.length != 0){
                guestbook = this.state.guestbook.map((guest) => {
                    let display = false;
                    let item = guest.map((i, index) => {
                        let field = "";
                        if(i != null && i.length != 0){
                            if(index == 0){
                                field = "Name: ";
                            } else if(index == 1){
                                field = "Date: ";
                            } else if(index == 2){
                                field = "Description: ";
                            } else if(index == 3){
                                field = "Message: ";
                            } else if(index == 5){
                                display = i;
                            }
                            if(index < 4){
                                return(
                                    <p>{field}{i}<br/></p>
                                )
                            } else{
                                return
                            }
                        }
                    })
                    if(display){
                        return(
                            <div class="guest">
                                <p><b>Guest:</b></p>
                                <p>
                                    {item}
                                </p>
                            </div>
                        )
                    } else{
                        return
                    }
                });
            }
        } else{
            guestbook = <p>No guestbook</p>
        }

        return(
            <div>
                <div class="content">
                    <div class="main-body">
                        <div>
                            <input type="image" src={require('../images/back-to-top.svg')} id="to-top" onClick={this.toTop.bind(this)}/>
                        </div>
                        <div class="gb-form">
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    <br/> Name (between 5 and 20 characters)*: <br/>
                                    <input type="text" name="name" onChange={this.handleFormChange}/>
                                </label>
                                <label>
                                    <br/> Description (less than 100 characters): <br/>
                                    {/* <input type="text" name="description" onChange={this.handleFormChange}/> */}
                                    <textarea name="description" cols="40" rows="5" onChange={this.handleFormChange}/>
                                </label>
                                <label>
                                    <br/> Message (between 15 and 500 characters)*: <br/>
                                    {/* <input type="text" name="message" onChange={this.handleFormChange}/> */}
                                    <textarea name="message" cols="40" rows="5" onChange={this.handleFormChange}/>
                                </label>
                                <label>
                                    <br/> Email: <br/>
                                    <input type="text" name="email" onChange={this.handleFormChange}/>
                                </label>
                                <label>
                                    <br/> Display my message publicly*: <br/>
                                    <input type="radio" id="public" name="public" value={this.state.public} onChange={this.handleFormChange} required/>
                                    <label for="public">Yes</label> <br/>
                                    <input type="radio" id="private" name="public" value={this.state.public} onChange={this.handleFormChange} />
                                    <label for="private">No</label> <br/>
                                </label>
                                <br/><input type="submit" value="Submit" />
                            </form>
                        </div>
                        <div class="gb-messages">
                            <h2>Guestbook:</h2>
                            {guestbook}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Guestbook;

