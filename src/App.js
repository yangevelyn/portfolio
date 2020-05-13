import React, {Component, useState} from 'react';
import './App.css';
import Body from './components/Body'
import TabList from './components/TabList'
import Header from './components/Header'
import config from './config.js'

const firebase = require('firebase')

export class App extends Component{
  // const [data, setData] = useState([]);
  // const sample = ["test", "hello", "hi"]

  constructor(){
    super();
    this.state = {
      activeTab: 1,
      data: ""
    }

    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }

    this.handleScroll = this.handleScroll.bind(this);
    this.handleLightbox = this.handleLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.toTop = this.toTop.bind(this);
  }

  componentDidMount = () => {
    //It is necessary to check if firebase has already been initialized otherwise it will throw an exception if it tries to initialize again
    //You can put this code in your componentDidMount function, or in an Effect to make sure it is ran when the app loads.
    //Use the second argument to useEffect() to control how often it is ran  
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    } 

    //get a reference to the database
    let ref = firebase.database().ref('data')

    //retrieve its data
    ref.on('value', snapshot => {
        //this is your call back function
        //state will be a JSON object after this
        //set your apps state to contain this data however you like
        // const state = snapshot.val()
        //since i use react 16, i set my state like this
        //i have previously declared a state variable like this: const [data, setData] = useState([]) so that I can make the below call
        // setData(state)
        this.setState({data: snapshot.val});
    })
  }

  //componentdidupdate called every update

  handleScroll = () => {
    console.log('handleScroll');
    var btn = document.getElementById("to-top");

    if(btn == null){
      btn = document.getElementById("left-to-top");
    }

    var d = document.documentElement;
    var b = document.body;

    var st = "scrollTop";
    var sh = "scrollHeight";

    if(d[st]/d[sh] > 0.2 || b[st]/b[sh] > 0.2){
        btn.style.display = "block";
        console.log('block')
    } else{
        btn.style.display = "none";
    }
  }

  handleLightbox = () => {
    console.log("in handlelightbox");
    var openLightbox = this.openLightbox;
    const images = document.getElementsByTagName('img');
    console.log(images)
    console.log(images.length);
    for(var i = 0; i < images.length; i++){
        const image = images[i];
        console.log(image)
        image.addEventListener('click', openLightbox(this.src, false));
        image.onclick = function(){
            openLightbox(this.src, false);
        }
    }
  }
  
  openLightbox = (src, isVideo) => {
    console.log('in openLightbox');
    const lightbox = document.getElementById("lightbox");

    if(!isVideo){
        const img = document.getElementById("lightbox-img");
        img.src = src;

        window.addEventListener("click", e => {
            if(e.target.tagName != "IMG"){
                lightbox.style.display = "none";
            }
        })
    } else{
        const vid = document.getElementById("lightbox-vid");
        vid.src = src;

        window.addEventListener("click", e => {
            console.log(e.target.tagName);
            if(e.target.tagName != "video"){
                lightbox.style.display = "none";
            }
        })
    }
    lightbox.style.display = "block";
  }


  toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render(){
    const tabs = [
      {
        id: 1,
        title: 'HOME'
      },
      {
        id: 2,
        title: 'ABOUT'
      },
      {
        id: 3,
        title: 'PROJECTS'
      },
      {
        id: 4,
        title: 'RESUME'
      },
      {
        id: 5,
        title: 'GUESTBOOK'
      },
      {
        id: 6,
        title: 'MOVIES'
      }
    ]

    const functions = {
      openLightbox: this.openLightbox,
      toTop: this.toTop,
      handleScroll: this.handleScroll,
      handleLightbox: this.handleLightbox
    }

    return (
      <div className="App">
        <header class="header">
          <Header />
        </header>
        <div className="nav-bar">
          {/* sending a prop called tabs to tablist */}
          <TabList tabs={tabs} activeTab={this.state.activeTab}
          changeTab={this.changeTab}/> 
        </div>
        <hr />
        <div className="body">
          <Body activeTab={this.state.activeTab} functions={functions}/>
        </div>
        {/* {this.sample.map((s, index) => (
          <p>
            {s}
          </p>
        ))} */}
      </div>
    );
  }
  
}

export default App;
