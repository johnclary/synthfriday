// line borrowed from:
// https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89

var bits = 50;

count = 0;

var frequencyData;

var width = window.innerWidth, height = window.innerHeight;

// linear scale for init line color
var color = d3.scaleSequential(d3.interpolatePlasma).domain([0,200]);

// linear color scale to be wrapped by stroke power scale
// reverse domain to flip color scale
var colorPow = d3.scaleSequential(d3.interpolatePlasma).domain([1,0]);

// power scale which decrease line color variation as lines sink
// adjust range to limit color scale min/max
var strokePow = d3.scalePow().exponent(4).range([0,1]);

// power scale that sets the rate of line sink
// increse begin range to increase speed. reduce exponent to increase separation (?)
var sinkPow = d3.scalePow().exponent(.45).range([5, 0]);

// power scale to set opacity higher as lines sink
var opacityPow = d3.scalePow().exponent(5).range([1, .5]);

var yScalePow = d3.scalePow().exponent(4).range([0, 255]);

var xScale = d3.scaleLinear()
    .domain([0, bits-1]) // input
    .range([0, width]); // output

var yScale = d3.scaleLinear()
    .domain([0, 300]) // input 
    .range([height/2, 0]); // output 

var line = d3.line()
    .x(function(d, i) { return xScale(i); })
    .y(function(d) { return yScale(d); })
    .curve(d3.curveMonotoneX)

document.querySelector('#play').addEventListener('click', function() {

    var element = document.getElementById("play");
    element.parentNode.removeChild(element);

    // create svg container
    svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement = document.getElementById('audioElement');
    audioElement.play();

    var audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();

    var delayNode = audioCtx.createDelay(3.0);  //create a delay
    audioSrc.connect(delayNode); //bind our delay to media element source
    delayNode.connect(analyser);  // Bind our analyser to the media element source.
    analyser.connect(audioCtx.destination); //bind the destination to the delay node output

    frequencyData = new Uint8Array(bits); //<this denominator "groups" the columns together when assinging the data later

    function animateChart() {
            
        // loop
        requestAnimationFrame(animateChart);
        
        if (++count % 6){
            // animate every other frame
            return false;
        }

        if (count < 450){
            addText();
        }

        analyser.getByteFrequencyData(frequencyData);

        var avgFreq = avg(frequencyData);

        var stroke = color(avgFreq);        

        // reset xScale which has changed during sink
        xScale.range([0, width]);

        svg.append("path")
            .datum(Array.from(frequencyData).map(x => yScalePow(x/255)))
            .attr("class", "line")
            .attr("stroke", stroke)
            .attr("opacity", .05) 
            .attr("d", line);

        sink();

    }

    animateChart()

    addText();  

});


function avg(arr) {
    // return average of array
    var total = 0;
    
    for(var i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    
    return total / arr.length;    
}


function sink() {
    // create sinking effect
    
    // total number of paths
    var size = svg.selectAll("path").size();

    svg.selectAll("path")
        .each(function(d, i) {

            var sunkData = d.map( function(value) { 
                // reduce frequency data via power scale
                return value - sinkPow(i/size)
            } );

            if (avg(sunkData) < -350) {
                // ensure "old" lines are remove
                // this hardcoding will be a problem on any other display size
                d3.select(this).remove();
                return
            }

            if (avg(sunkData) == 0) {
                // ensure "flat" lines are removed
                d3.select(this).remove();
                return
            }
            
            // linear scale to widen lines as they sink
            // inscreae range to increase lindespread with sink
            xScaleLin = d3.scaleLinear().domain([size,0]).range([0,1000]);

            // widen effect by increase x range
            xScale.range([0-xScaleLin(i), width+xScaleLin(i)]);

            d3.select(this)
                .datum(sunkData)
                .attr("opacity", function(d){
                    return opacityPow(i/size)
                })
                .attr("stroke", function(){
                    return colorPow(strokePow(i/size))
                })
                .attr("d", line);
        })
}

function addText() {    
    d3.select("svg").append("text").attr("class", "heavy").text("SYNTHFRIDAY")
        .attr("x", 30)
        .attr("y", 400)
}