import React, {Component} from 'react';

const axios = require('axios');

export class Movies extends Component{
    constructor(props){
        super(props);
        this.state = {
            functions: this.props.functions,
            movieIDs: ["tt0317219",
                "tt3281548",
                "tt0347149",
                "tt8772262",
                "tt0286106",
                "tt2380307",
                "tt1375666",
                "tt4967094"
            ],
            posters: [],
            title: 'test title',
            director: 'test director',
            rating: ''
        }

        this.handleScroll = this.state.functions.handleScroll.bind(this);
        this.handleLightbox = this.state.functions.handleLightbox.bind(this);
        this.openLightbox = this.state.functions.openLightbox.bind(this);
        this.toTop = this.state.functions.toTop.bind(this);
        this.movieLightbox = this.movieLightbox.bind(this);
    }

    componentDidMount = () => {
        this.getMovies()
        window.addEventListener('scroll', this.handleScroll);
    }

    getMovies = async () => {
        for(var i = 0; i < this.state.movieIDs.length; i++){
            await axios.get(`http://www.omdbapi.com/?apikey=b5a41eaf&i=${this.state.movieIDs[i]}`)
            .then((response) => {
                console.log(response.data);
                this.setState({posters: [...this.state.posters, response.data.Poster]});
            });
        }
        console.log(this.state.posters);
    }

    movieLightbox = async (src, index) => {
        console.log("in movielightbox");
        const box = document.getElementById("movie-lightbox");
        const img = document.getElementById("lightbox-img");
        console.log(img);
        console.log(src);
        console.log(box);
        img.src = src;

        await axios.get(`http://www.omdbapi.com/?apikey=b5a41eaf&i=${this.state.movieIDs[index]}`)
        .then((response) => {
            console.log(response.data);
            this.setState({
                title: response.data.Title,
                director: response.data.Director,
                rating: response.data.Ratings[0].Value
            })
            console.log(response.data.Title);
        });

        window.addEventListener("click", e => {
            if(e.target.tagName != "IMG"){
                box.style.display = "none";
                document.body.style.overflow = "scroll";
            }
        })
        box.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    render() {
        var movieLightbox = this.movieLightbox.bind(this);
        var lightbox = 
        <div id="movie-lightbox">
            <div id="info-grid">
                <img src={require("../images/wave.png")} id="lightbox-img" />
                <div id="info">
                    <h2>{this.state.title}<br/></h2>
                    <br/>Directed by {this.state.director}<br/>
                    <br />IMDB Rating: {this.state.rating}
                </div>
            </div>
        </div>

        var posters = this.state.posters.map((i, index) => {
            return(
            <div>
                <img src={i} class="movies-poster" onClick={() => this.movieLightbox(i, index)}/>
            </div>
            );
        });
        
        return(
            <div>
                <div class="content">
                    <div>
                        <input type="image" src={require('../images/back-to-top.svg')} id="to-top" onClick={this.toTop.bind(this)}/>
                    </div>
                    <div class="main-body">
                        <div class="movies-body">
                            <div class="movies-grid">
                                {posters}
                            </div>
                            {lightbox}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Movies;