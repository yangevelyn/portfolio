import React, {Component} from 'react';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Resume from './Resume';
import Guestbook from './Guestbook';
import Movies from './Movies2';
import AddMovies from './AddMovies';
import CreateLists from './CreateLists';
import Graph from './Graph'

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
        } else if(activeTab == 6){
            return <Movies functions={functions}/>
        } else if(activeTab == 7){
            return <AddMovies functions={functions}/>
        } else if(activeTab == 8){
            return <CreateLists functions={functions}/>
        } else if(activeTab == 9){
            return <Graph functions={functions}/>
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