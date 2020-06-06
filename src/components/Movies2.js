import React, {Component} from 'react';
import config from '../config.js';
import {motion} from 'framer-motion';

const firebase = require('firebase');
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
            movieObjects: [],
            title: 'test title',
            id: 'test id',
            director: 'test director',
            rating: '',
            lists: [],
            list: 'All',
            search: false,
            currPage: 1,
            nodes: [],
            links: []
        }

        this.handleScroll = this.state.functions.handleScroll.bind(this);
        this.handleLightbox = this.state.functions.handleLightbox.bind(this);
        this.openLightbox = this.state.functions.openLightbox.bind(this);
        this.toTop = this.state.functions.toTop.bind(this);
        this.movieLightbox = this.movieLightbox.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
        this.updateList = this.updateList.bind(this);
        this.getMovies = this.getMovies.bind(this);
        this.getOtherLists = this.getOtherLists.bind(this);
        this.addToList = this.addToList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchLightbox = this.searchLightbox.bind(this);
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);

        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        } 

        //get a reference to the database
        let ref = firebase.database().ref('MovieLists').child('All')

        ref.on('value', snap =>  {
            var data = [];
            snap.forEach(ss => {
                let movie = [];
                movie.push(ss.child('Title').val());
                movie.push(ss.child('imdbID').val());
                movie.push(ss.child('Poster').val());
                movie.push(ss.child('Director').val());
                movie.push(ss.child('imdbRating').val());
                data.push(movie);
            });
            this.setState({movieObjects: data});
            console.log(data);
        });

        ref = firebase.database().ref('MovieLists');

        var lists = [];
        ref.on('value', snap => {
            snap.forEach(ss => {
                lists.push(ss.key); //ss.val() will give the movies in the list as an object
            });
            // console.log(lists);
            this.setState({lists: lists});
        });

        this.getNodesArray();
    }

    movieLightbox = async (src, index) => {
        console.log("in movielightbox");
        const box = document.getElementById("movie-lightbox");
        const img = document.getElementById("lightbox-img");
        console.log(img);
        console.log(src);
        console.log(box);
        img.src = src[2];

        this.setState({
            title: src[0],
            id: src[1],
            director: src[3],
            rating: src[4]
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

    searchLightbox = () => {
        console.log("in movielightbox");
        const box = document.getElementById("movie-lightbox");
        const img = document.getElementById("lightbox-img");
        console.log(img);
        console.log(box);
        img.src = this.state.posters[0];

        window.addEventListener("click", e => {
            if(e.target.tagName != "IMG"){
                box.style.display = "none";
                document.body.style.overflow = "scroll";
            }
        })
        box.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    deleteMovie = () => {
        for(var i = 0; i < this.state.lists.length; i++){
            console.log(firebase.database().ref('MovieLists').child(`${this.state.lists[i]}`).child(`${this.state.id}`));
            firebase.database().ref('MovieLists').child(`${this.state.lists[i]}`).child(`${this.state.id}`).remove();
            console.log('removing ' + this.state.id + ' from ' + this.state.lists[i]);
        }
    }

    updateList = (e) => {
        console.log(e.target.value);
        //setState is async, use callback
        // https://stackoverflow.com/questions/38558200/react-setstate-not-updating-immediately
        this.setState({list: e.target.value, search: false}, this.getMovies.bind(this));
    }

    getMovies = () => {
        let ref = firebase.database().ref('MovieLists').child(this.state.list);

        ref.on('value', snap =>  {
            var data = [];
            snap.forEach(ss => {
                let movie = [];
                movie.push(ss.child('Title').val());
                movie.push(ss.child('imdbID').val());
                movie.push(ss.child('Poster').val());
                movie.push(ss.child('Director').val());
                movie.push(ss.child('imdbRating').val());
                data.push(movie);
            });
            this.setState({movieObjects: data});
            console.log(data);
        });
    }

    getOtherLists = () => {
        var ref = firebase.database().ref('MovieLists');

        var listsArray = [];
        ref.on('value', snap => {
            snap.forEach(ss => {
                listsArray.push(ss.key); //ss.val() will give the movies in the list as an object
            });
        });

        var otherLists = [];
        for(var i = 0; i < listsArray.length; i++){
            if(listsArray[i] != this.state.list){
                firebase.database().ref(`MovieLists/${listsArray[i]}/${this.state.id}`)
                .once("value", snapshot => {
                    if(!snapshot.exists()){
                        console.log('movie not in list');
                        otherLists.push(<option value={listsArray[i]}>{listsArray[i]}</option>);
                    }
                })
            }
        }
        console.log(otherLists);

        return(
            otherLists
        );
    }

    addToList = async (e) => {
        console.log(e.target.value);
        var list = e.target.value;
        await axios.get(`https://www.omdbapi.com/?apikey=b5a41eaf&i=${this.state.id}`)
        .then((response) => {
            console.log(response.data);
            firebase.database().ref('MovieLists').child(`${list}`).child(response.data.imdbID).set(response.data);
            this.state.list = 'All'
            this.forceUpdate();
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        var title = this.refs.movieTitle.value;
        console.log(title);
        firebase.database().ref('MovieLists').child('All').orderByChild('Title').equalTo(title)
        .once("value", snapshot => {
            if(!snapshot.exists()){
                alert('Movie not found.');
                this.setState({posters: []}, this.forceUpdate());
            } else{
                var poster = [];
                snapshot.forEach(ss => {
                    poster.push(ss.child('Poster').val());
                    console.log(ss.child('Poster').val());
                    this.setState({
                        title: ss.child('Title').val(),
                        id: ss.child('imdbID').val(),
                        director: ss.child('Director').val(),
                        rating: ss.child('imdbRating').val()
                    })
                });
                // console.log(snapshot.child('tt0286106').child('Poster').val());
                this.setState({posters: poster, search: true}, this.forceUpdate());
            }
        })
    }

    getNodesArray = () => {
        let ref = firebase.database().ref('MovieLists').child('GraphViz');

        ref.on('value', snap =>  {
            var data = [];
            snap.forEach(ss => {
                data.push({
                    name: ss.child('Title').val(),
                    type: 'movie'
                });
                // console.log(ss.child('Actors').val())
                let actors = [];
                let actorsString = ss.child('Actors').val();
                while(actorsString.search(',') != -1){
                    actors.push(actorsString.slice(0, actorsString.search(',')));
                    actorsString = actorsString.slice(actorsString.search(',') + 2);
                }
                actors.push(actorsString);
                console.log(actors);
                actors.map((i) => {
                    if(data.findIndex(x => x.name === i) == -1){
                        data.push({
                            name: i,
                            type: 'actor'
                        });
                    }
                })
            });
            this.setState({nodes: data});
            console.log(data);
        });

        let links = [
            {
                source: 0,
                target: 1
            },
            {
                source: 0,
                target: 2
            },
            {
                source: 0,
                target: 3
            },
            {
                source: 0,
                target: 4
            },
            {
                source: 5,
                target: 6
            },
            {
                source: 5,
                target: 7
            },
            {
                source: 5,
                target: 8
            },
            {
                source: 5,
                target: 9
            },
            {
                source: 10,
                target: 11
            },
            {
                source: 10,
                target: 12
            },
            {
                source: 10,
                target: 2
            },
            {
                source: 10,
                target: 7
            },
            {
                source: 13,
                target: 14
            },
            {
                source: 13,
                target: 15
            },
            {
                source: 13,
                target: 16
            },
            {
                source: 13,
                target: 17
            },
            {
                source: 13,
                target: 1
            },
            {
                source: 18,
                target: 14
            },
            {
                source: 18,
                target: 19
            },
            {
                source: 18,
                target: 20
            },
            {
                source: 18,
                target: 21
            },
            {
                source: 18,
                target: 27
            },
            {
                source: 22,
                target: 14
            },
            {
                source: 22,
                target: 23
            },
            {
                source: 22,
                target: 24
            },
            {
                source: 22,
                target: 25
            },
            {
                source: 26,
                target: 27
            },
            {
                source: 26,
                target: 28
            },
            {
                source: 26,
                target: 29
            },
            {
                source: 26,
                target: 11
            },
            {
                source: 30,
                target: 20
            },
            {
                source: 26,
                target: 31
            },
            {
                source: 26,
                target: 32
            },
            {
                source: 26,
                target: 33
            }
        ]

        this.setState({links: links})
        console.log(links)
    }

    render() {
        var movieLightbox = this.movieLightbox.bind(this);
        var lightbox;
        if(this.state.search){
            lightbox = <div id="movie-lightbox">
                <div id="info-grid">
                    <img src={require("../images/wave.png")} id="lightbox-img" />
                    <div id="info">
                        <h2>{this.state.title}<br/></h2>
                        <br/>Directed by {this.state.director}<br/>
                        <br />IMDB Rating: {this.state.rating}
                        <br /><br /><button onClick={this.deleteMovie}>Delete from this list</button><br />
                        <br /><label for="otherLists">Add to another list:</label>
                        <br /><select id="otherLists" onChange={this.addToList}>
                            <option selected="true" disabled="true"></option>
                            {this.getOtherLists()}
                        </select>
                    </div>
                </div>
            </div>

        } else{
            lightbox = <div id="movie-lightbox">
                <div id="info-grid">
                    <img src={require("../images/wave.png")} id="lightbox-img" />
                    <div id="info">
                        <h2>{this.state.title}<br/></h2>
                        <br/>Directed by {this.state.director}<br/>
                        <br />IMDB Rating: {this.state.rating}
                        <br /><br /><button onClick={this.deleteMovie}>Delete</button><br />
                        <br /><label for="otherLists">Add to another list:</label>
                        <br /><select id="otherLists" onChange={this.addToList}>
                            <option default></option>
                            {this.getOtherLists()}
                        </select>
                    </div>
                </div>
            </div>
        }

        const lastInd = this.state.currPage * 8;
        const currMovies = this.state.movieObjects.slice(0, lastInd);

        var posters;
        if(this.state.search){
            console.log('search result');
            console.log(this.state.posters[0]);
            posters = <img src={this.state.posters[0]} class="movies-poster" onClick={this.searchLightbox}/>
        } else {
            posters = currMovies.map((i, index) => {
                return(
                <motion.div 
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.5 },
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    <img src={i[2]} class="movies-poster" onClick={() => this.movieLightbox(i, index)}/>
                </motion.div>
                );
            });
        }

        var showMore;

        if(lastInd < this.state.movieObjects.length){
            showMore = <button onClick={() => this.setState({currPage: this.state.currPage + 1})} className="show-more">Show More</button>
        }


        var ref = firebase.database().ref('MovieLists');

        var listsArray = [];
        ref.on('value', snap => {
            snap.forEach(ss => {
                listsArray.push(ss.key); //ss.val() will give the movies in the list as an object
            });
            // console.log(lists);
        });

        // console.log(this.state.lists);
        var lists = listsArray.map((i) => {
            return(
                <option value={i}>{i}</option>
            )
        })
        
        return(
            <div>
                <div class="content">
                    <div>
                        <input type="image" src={require('../images/back-to-top.svg')} id="to-top" onClick={this.toTop.bind(this)}/>
                    </div>
                    <div class="main-body">
                        <div class="movies-body">
                            <div>
                                <div class="list-select">
                                    <select id="lists" onChange={this.updateList}>
                                        {lists}
                                    </select>
                                </div>
                                <br />
                                <div class="movie-search">
                                    <form onSubmit={this.handleSubmit}>
                                        <label>Search for a movie:</label>
                                        <br />
                                        <input type="text" ref="movieTitle"/>
                                        <input type="submit" value="Submit" />
                                    </form>
                                </div>
                                <br />
                                <div>
                                    {showMore}
                                </div>
                            </div>
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