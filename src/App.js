import React, {Component} from 'react';
import './App.css';
import Body from './components/Body'
import TabList from './components/TabList'
import Header from './components/Header'

export class App extends Component{
  constructor(){
    super();
    this.state = {
      activeTab: 1
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
      </div>
    );
  }
  
}

export default App;
