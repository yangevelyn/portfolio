import React, {Component} from 'react';
import {motion} from 'framer-motion';
import { schemeBrBG } from 'd3';

const firebase = require('firebase');
const d3 = require('d3');

const graphdata = {
    nodes: [
        {
            name: 'test1'
        },
        {
            name: 'test2'
        }
    ],
    links: [
        {
            source: 1,
            target: 0
        }
    ]
}

export class Graph extends Component{
    constructor(props){
        super(props);
        this.state = {
            functions: this.props.functions,
            nodes: [],
            links: [],
            isMounted: false,
            fbDone: false
        }

        this.openLightbox = this.state.functions.openLightbox.bind(this);
        this.toTop = this.state.functions.toTop.bind(this);
    }

    componentWillMount = () => {
        this.setState({isMounted: false})
    }

    componentDidMount = async () => {
        // this.setState({isMounted: true}, () => {
        //     this.getNodesArray(); 
        // });

        await this.getNodesArray();

        console.log(graphdata.nodes)
    }

    drag = (simulation) => {
        function dragStarted(d){
            if(!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d){
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragEnded(d){
            if(!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded)
    }

    chart = (nodes, links) => {
        const width = 1920;
        const height = 1080;

        const obj_links = links.map((i) => Object.create(i));
        const obj_nodes = nodes.map((i) => Object.create(i));

        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, height]);

        const simulation = d3.forceSimulation(obj_nodes)
            .force("link", d3.forceLink().links(links).id(d => { return d.index;}).distance(300))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2))

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)

            text
                .attr("x", d => d.x + 75)
                .attr("y", d => d.y + 75)
        })

        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(obj_links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));
    
        const color = (node) => {
            if(node.type == 'movie'){
                return `url(#${node.name.replace(/\s+/g, '')})`;
            } else{
                return d3.color("steelblue");
            }
        }

        const radius = (node) => {
            if(node.type == 'movie'){
                return 75;
            } else{
                return 25;
            }
        }

        // const image = (node) => {
        //     if(node.type == 'movie'){
        //         return node.poster;
        //     } else{
        //         return 
        //     }
        // }

        const group = svg.selectAll("g").append("g")
            .selectAll("circle")
            .data(obj_nodes)
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5)
            .enter().append("g")
            .attr("class", "node")

        const node = group
            .append("circle")
            .attr("cx", 500)
            .attr("cy", 500)
            .attr("r", radius)
            .style("fill", "#dots-9")
            .style("fill", color)
            // .style("fill", function(d) {return `url(#${d.name.replace(/\s+/g, '')})`})
            // .attr("fill", color)
            // .append("text")
            //     .attr("x", 300)
            //     .attr("fill", d3.color("black"))
            //     .text('function(d) {return d.name}')
            // .join("text")
            // .attr("fill", d3.color("black"))
            // .append("image")
            // .attr("xlink:href", image)
            .call(this.drag(simulation));

        // const image = group
        //     .append("image")
        //         .attr("xlink:href", `${node.poster}`)
        //         .attr("x", 1000);
        

        const textClass = (node) => {
            if(node.type == 'actor'){
                return 'actor';
            }
            return 'movie';
        }

        const text = group
            .append("text")
            .attr("fill", d3.color("black"))
            .attr("class", textClass)
            .text(function(d) {return d.name})

        
        var defs = svg.append("svg:defs");

        // const pattern = (node) => {
        //     return node.poster;
        // }

        for(var i = 0; i < nodes.length; i++){
            if(nodes[i].type == 'movie'){
                console.log('looping ' + nodes[i].name.replace(/\s+/g, ''))
                defs.append("svg:pattern")
                    .attr("id", nodes[i].name.replace(/\s+/g, ''))
                    .attr("width", 1)
                    .attr("height", 1)
                    .append("image")
                        .attr("xlink:href", nodes[i].poster)
                        .attr("width", 250)
                        .attr("height", 250)
                        .attr("x", -50)
                        .attr("y", 0);
            }
        }

        // const node = svg.selectAll("g").append("g")
        //     .attr("stroke", "#fff")
        //     .attr("stroke-width", 1.5)
        //     .selectAll("circle")
        //     .data(obj_nodes)
        //     .join("circle")
        //     .attr("r", radius)
        //     .attr("fill", color)
        // //     // .on("mouseover", function() {
        // //     //     svg.append("text").attr({
        // //     //         id: node.name
        // //     //     })
        // //     //         .text(function() {
        // //     //             return node.name;
        // //     //         })
        // //     // })
        //     // .append("text")
        //     //     .attr("x", 300)
        //     //     .attr("fill", d3.color("black"))
        //     //     .text('function(d) {return d.name}')
        //     .join("text")
        //     .attr("fill", d3.color("black"))
        //     .call(this.drag(simulation));

        // const node = svg.append("g")
        //     .attr("stroke", "#fff")
        //     .attr("stroke-width", 1.5)
        //     .data(obj_nodes)


        // const text = node.append("text")
        //     .attr("dx", function(d){return -20;})
        //     .attr("fill", d3.color("black"))
        //     .text('function(d) {return d.name}')

        // node.append("svg:path")
        //     .append("svg:title")
        //         .text(function(d) {return d.name});
        
        svg.on("mouseover", function () {
            d3.selectAll('.line_over').style("display", "block");
        })
        .on("mouseout", function () {
            d3.selectAll('.line_over').style("display", "none");
        })
            .append('rect')
            .attr('class', 'click-capture')
            .style('visibility', 'hidden')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', width)
            .attr('height', height)
            .text('hello');

        svg.selectAll("circle")
            .data(obj_nodes)
            .enter()
            .append("circle")  // Get attributes from circleAttrs var
            .on("mouseover", handleMouseOver);


        function handleMouseOver(d, i){
            // Use D3 to select element, change color and size
            d3.select(this).attr({
                fill: "orange",
                r: radius * 2
            });

            // Specify where to put label of text
            svg.append("text").attr({
                id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
                x: function() { return d.x - 30; },
                y: function() { return d.y - 15; }
            })
            .text(function() {
                return [d.x, d.y];  // Value of the text
            });
            console.log("mouseover")
        }

        return svg.node();
    }

    getNodesArray = async () => {
        let ref = firebase.database().ref('MovieLists').child('GraphViz');

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
                source: 22,
                target: 27
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
                source: 30,
                target: 31
            },
            {
                source: 30,
                target: 32
            },
            {
                source: 30,
                target: 33
            }
        ]

        var data = [];
        ref.once('value', snap =>  {
            snap.forEach(ss => {
                data.push({
                    name: ss.child('Title').val(),
                    poster: ss.child('Poster').val(),
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
            this.setState({nodes: data, fbDone: true});
            console.log(data);
        })
        .then(() => {
            document.getElementById("my-svg").appendChild(this.chart(data, links));
        });


        this.setState({links: links})
        console.log(links)

        // document.getElementById("my-svg").appendChild(this.chart(data, links));
        console.log('here')
    }


    render() {
        return(
            <div>
                <div class="content">
                    <defs>
                        <pattern id="img1" patternUnits="userSpaceOnUse" width="100" height="100">
                            <image xlinkHref="../images/book.jpg" x="0" y="0" width="100" height="100" />
                        </pattern>
                    </defs>
                    <div>
                        <input type="image" src={require('../images/back-to-top.svg')} id="to-top" onClick={this.toTop.bind(this)}/>
                    </div>
                    <div id="my-svg">
                    </div>
                </div>
            </div>
        );
    }
}

export default Graph;

