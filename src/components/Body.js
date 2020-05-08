import React, {Component} from 'react';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Resume from './Resume';
import Guestbook from './Guestbook';

export class Body extends Component{
    displayContent = () => {
        var activeTab = this.props.activeTab;
        var functions = this.props.functions;
        if(activeTab == 1){
            return <Home functions={functions}/>
        } else if(activeTab == 2){
            return <About functions={functions}/>
        } else if(activeTab == 3){
            return <Projects functions={functions}/>
        } else if(activeTab == 4){
            return <Resume functions={functions}/>
        } else if(activeTab == 5){
            return <Guestbook functions={functions}/>
        }
    }
    render() {
        return(
            <div>
                {this.displayContent()}
            </div>
        );
    }
}

export default Body;