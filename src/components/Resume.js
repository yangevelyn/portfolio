import React, {Component} from 'react';

export class Resume extends Component{
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
    }

    render() {
        return(
            <div class="content">
            <div class="main-body">
                <div class="resume-desc">
                    <h2>My Resume</h2>
                    <p>Here's my resume! Please feel free to contact me if you'd like
                    more info!
                    </p>
                </div>
                <div class="iframe-container">
                    <iframe src="https://docs.google.com/document/d/e/2PACX-1vS5M5QSvo5s-wWRl7Tox0L-QQBL39bm-haeCjSP1TmnylbezMsxvxAsMQJiiNe_aINFqGQNlMDbiR6K/pub?embedded=true"
                    ></iframe>
                </div>
            </div>
            <div>
                <input type="image" src={require('../images/back-to-top.svg')} id="left-to-top" onClick={this.toTop}/>
            </div>        
            {/* <script>
                const btn = document.getElementById("left-to-top");
                var d = document.documentElement;
                var b = document.body;

                window.onscroll = () => {
                    st = "scrollTop";
                    sh = "scrollHeight";

                    if(d[st]/d[sh] > 0.1 || b[st]/b[sh] > 0.1){
                        btn.style.display = "block";
                    } else{
                        btn.style.display = "none";
                    }
                }

                function toTop(){
                    b.scrollTop = 0;
                    d.scrollTop = 0;
                }
            </script> */}
        </div>

        );
    }
}

export default Resume;

