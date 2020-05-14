import React, {Component} from 'react';
import {motion} from 'framer-motion'

export class About extends Component{
    constructor(props){
        super(props);
        this.state = {
            functions: this.props.functions
        }

        this.handleScroll = this.state.functions.handleScroll.bind(this);
        this.handleLightbox = this.state.functions.handleLightbox.bind(this);
        this.openLightbox = this.state.functions.openLightbox.bind(this);
        this.toTop = this.state.functions.toTop.bind(this);
    }

    componentDidMount() {
        //wasn't working before because of the () after handleScroll
        window.addEventListener('scroll', this.handleScroll);
        this.handleLightbox();
    }

    render() {
        return(
            <div class="content">
                <div class="main-body">
                    <div>
                        <input type="image" src={require('../images/back-to-top.svg')} id="to-top" onClick={this.toTop.bind(this)}/>
                    </div>
                    <motion.div class="description"
                        animate={{  x: 5,
                                y: -2 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            <h2>More About Me</h2>
                        </div>
                        <p>In my free time, I enjoy making music, learning languages, and reading.
                            Here's some of what I've been up to recently...
                        </p>
                    </motion.div>
                    <div class="about-grid">
                        <div class="grid-item">
                            <img src={require("../images/guitar.jpg")} class="grid-img" alt="Photo by Annie Spratt on Unsplash" />
                            <p>playing fingerstyle guitar...</p>
                        </div>
                        <div class="grid-item">
                            <img src={require("../images/piano.jpg")} class="grid-img" alt="Photo by Geert Pieters on Unsplash" />
                            <p>arranging songs on the piano...</p>
                        </div>
                        <div class="grid-item">
                            <img src={require("../images/germany.jpg")} class="grid-img" alt="Photo by Ricardo Gomez Angel on Unsplash" />
                            <p>learning German...</p>
                        </div>
                        <div class="grid-item">
                            <img src={require("../images/book.jpg")} class="grid-img" alt="Photo by John-Mark Smith on Unsplash" />
                            <p>reading...</p>
                        </div>
                    </div>
                    <div id="lightbox">
                        <div>
                            <img src={require("../images/wave.png")} id="lightbox-img" />
                        </div>
                    </div>
                </div>
                <script>
                    {/* https://stackoverflow.com/questions/4588759/how-do-you-set-a-javascript-onclick-event-to-a-class-with-css */}
                    {/* https://stackoverflow.com/questions/5743863/onclick-gets-fired-without-clicking */}
                    {/* window.onload = function(){
                        const images = document.getElementsByTagName('img');
                        for(var i = 0; i < images.length; i++){
                            const image = images[i];
                            image.onclick = function(){
                                openLightbox(this.src, false);
                            }
                        }
                    } */}

                    {/* const btn = document.getElementById("to-top");
                    var d = document.documentElement;
                    var b = document.body;

                    window.onscroll = () => {
                        st = "scrollTop";
                        sh = "scrollHeight";

                        if(d[st]/d[sh] > 0.2 || b[st]/b[sh] > 0.2){
                            btn.style.display = "block";
                        } else{
                            btn.style.display = "none";
                        }
                    } */}

                    {/* function toTop(){
                        b.scrollTop = 0;
                        d.scrollTop = 0;
                    } */}
                </script>
            </div>
        );
    }
}

export default About;