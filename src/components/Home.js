import React, {Component} from 'react';
import {motion} from 'framer-motion';

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
                    <motion.div class="home-text"
                        initial={{ x: "3%",
                                   y: "3%"     
                                }}
                        animate={{  x: -1,
                                y: -1 }}
                        transition={{ duration: 0.5 }}>
                        <p>hello, hello, i'm evelyn—welcome to my website! <br/>
                            i'm currently a second-year computer science major. <br/>
                            good to meet you!
                        </p>
                    </motion.div>
                </div>
            </div>
        );
    }
}

export default Home;

