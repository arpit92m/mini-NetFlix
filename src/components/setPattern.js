import React, {Component} from 'react';
import * as d3 from "d3";

const dots=[1,2,3,4,5,6,7,8,9];
export default class setPattern extends Component {
    constructor(props) {
        super(props);

        this.state=
        {
          mouseMovement:false,
          onCircle:false
        }

        this.mousemove = this.mousemove.bind(this)
        this.mouseup = this.mouseup.bind(this)
        this.mousedown = this.mousedown.bind(this)
        this.createCircles = this.createCircles.bind(this)
        this.createNewLine = this.createNewLine.bind(this)
        this.removeLines = this.removeLines.bind(this)
        this.svgLine = this.svgLine.bind(this)
    }

   componentDidMount() {
      this.createCircles()
   }

   svgLine(d,i) {
    console.log("svgLine"+d3.event.target.id)
    if(d3.event.target.id.search("circle")==-1 && this.state.onCircle){
      this.setState({onCircle:false})
    }
   }

   createNewLine(d,i) {
    d3.select("#circle-"+(i+1)).style(
              "fill", "orange")
             .attr( "r", 20 * 2)
            
    {!this.state.onCircle && this.mousedown()}
    console.log("onCircle"+this.state.onCircle)
     this.setState({onCircle:true})
     d3.event.stopPropagation()
   
   }

  mousedown() {
    var selection = d3.select('svg').node()
    var m = d3.mouse(d3.select('svg').node());
    d3.select('svg').append("line")
        .attr("x1", m[0])
        .attr("y1", m[1])
        .attr("x2", m[0])
        .attr("y2", m[1]);

        this.setState({mouseMovement:true})
    
    d3.select('svg').on("mousemove", this.mousemove);
}

mousemove() {
  if(this.state.mouseMovement) {
    var m = d3.mouse(d3.select('svg').node());
    d3.select("line").attr("x2", m[0])
        .attr("y2", m[1]);
      }
}

removeLines() {
    
    this.setState({mouseMovement:false,onCircle:false})
    d3.selectAll("line").remove();
   d3.selectAll("circle").style(
              "fill", "green")
             .attr( "r", 20)
}

mouseup() {
  console.log("mouseLeave"+d3.event.target.id)
  
}

   createCircles() {
   var circleRadii = [1,1,1,1,1,1,1,1,1]
 
var svgContainer = d3.select("#app-container").append("svg")
                                   .attr("width", 500)
                                   .attr("height", 500).on("mouseup", this.removeLines).on("mousemove", this.svgLine)

var circleGroup = svgContainer.append("g").attr("id","fattu")
                              

var circles = circleGroup.selectAll("circle")
                          .data(circleRadii)
                          .enter()
                         .append("circle")
                         .on("mouseenter", this.createNewLine).on("mouseleave", this.mouseup)


var circleAttributes = circles
                       .attr("cx", function(d,i){
                              return (i % 3) * 100 + 200;
                            })
                       .attr("cy",  function(d,i){
                              return 100 * Math.floor(i / 3) + 100;
                            })
                       .attr("r", function (d) { return 20; })
                       .style("fill", "green")
                       .attr("id",function(d,i){
                              return "circle-"+(i+1);
                            })
    
  //code for transition


circles.append("text")
            .text(function(d,i){
              return i;
            })
            .style({
              "display": "none"
            });
   

}
  	render() {
		return (
		      <div id='app-container' className='container'>
                {/* Header content , common for entire application */}   
                
          </div>
		);
	}
}  