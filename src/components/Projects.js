import React, {Component} from 'react';

export class Projects extends Component{
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
        // this.handleLightbox();
    }

    render() {
        return(
            <div class="content">
                <div class="main-body">    
                    <div class="projects-grid">
                        <div class="project">
                            <div class="proj-desc">
                                <h2>Spotifynd Friends</h2>
                                <p>This webapp analyzes Spotify playlists and measures their compatability which 
                                    can then be used to make friends and find people to go to concerts with. 
                                    With Spotifynd Friends, you can easily match with other users who like 
                                    the same music! After connecting to your Spotify account, simply choose 
                                    a playlist and our app will find other users who have the same tastes.</p>
                            </div>
                            <div class="grid-item">
                                <a href="https://spotifynd-friends.herokuapp.com/">
                                    <img src={require('../images/spotify-logo.jpg')} class="img" />
                                    <p>Live Demo</p>
                                </a>
                            </div>
                            <div class="grid-item" onclick="openLightbox(document.getElementById('vid').src, true)">
                                <iframe id="vid" class="video" src="https://drive.google.com/file/d/1BenI3Yg_eYEW0u22Vl5G5rNWqckjEPck/preview" 
                                width="640" height="480" allowfullscreen="true"></iframe>
                                <p>Video</p>
                            </div>
                        </div>
                        <div class="projs-desc">
                            <div>
                                <h2>Projects</h2>
                            </div>
                            <p>Here's some of the stuff I've done!
                            </p>
                        </div>
                        <div id="lightbox">
                            <div>
                                <iframe id="lightbox-vid" class="video" src="https://drive.google.com/file/d/1BenI3Yg_eYEW0u22Vl5G5rNWqckjEPck/preview" width="640" height="480"></iframe>
                            </div>
                        </div>
                        <div>
                            <input type="image" src={require('../images/back-to-top.svg')} id="to-top" onClick={this.toTop}/>
                        </div>
                    </div> 
                    <script>
                        {/* console.log(document.getElementById("vid").contentDocument);
                        document.getElementById("vid").contentDocument.addEventListener("click", e => {
                            console.log(e.target);
                        });
                        window.onclick = (e) => {
                            console.log(e.target);
                        }

                        const btn = document.getElementById("to-top");
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
                        } */}
                    </script>
                </div>
            </div>
        );
    }
}

export default Projects;

