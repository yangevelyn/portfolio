import React, {Component} from 'react';

export class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            functions: this.props.functions
        }

        this.openLightbox = this.state.functions.openLightbox.bind(this);
        this.toTop = this.state.functions.toTop.bind(this);
    }

    render() {
        return(
            <div>
                <div class="content">
                    <div>
                        <input type="image" src={require('../images/back-to-top.svg')} id="to-top" onClick={this.toTop.bind(this)}/>
                    </div>
                    <div class="home-text">
                        <p>hello, hello, i'm evelyn—welcome to my website! <br/>
                            i'm currently a second-year computer science major. <br/>
                            good to meet you!
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;

