// line borrowed from:
// https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89

var bits = 40;
var multiplier = 3;

count = 0;

var frequencyData;

var width = window.innerWidth;
var height = window.innerHeight;

var textPos = height*.8;

var removeFactor = -1*height; 

var widenSpreadRange = true;
var spreadRangeMin = 4000;
var spreadRangeLimit = spreadRangeMin;
var spreadRangeMax = 5000;
var spreadSpeed = 50;

var sinkExponentMin = 6
var sinkExponentMax = 7;
var sinkExponent = sinkExponentMin;
var sinkExponentIncrement = .1
var sinkUp = true;

// linear scale for init line color
var color = d3.scaleSequential(d3.interpolatePlasma).domain([0,200]);

// linear color scale to be wrapped by stroke power scale
// reverse domain to flip color scale
var colorPow = d3.scaleSequential(d3.interpolatePlasma).domain([.7,0]);

// power scale which decrease line color variation as lines sink
// adjust range to limit color scale min/max
var strokePow = d3.scalePow().exponent(4).range([0,1]);

// power scale that sets the rate of line sink
// increse begin range to increase dropspeed/separation
// decrease exponent and begin range to lower viewing angle
var sinkPow = d3.scalePow().exponent(sinkExponent).range([10, 0]);

// power scale to set opacity higher as lines sink
var opacityPow = d3.scalePow().exponent(5).range([1, .5]);

var yScalePow = d3.scalePow().exponent(7).range([0, 255]);

var xScale = d3.scaleLinear()
    .domain([0, (bits*multiplier)-1]) // input
    .range([0, width]); // output

var yScale = d3.scaleLinear()
    .domain([0, 255]) // increase the extent to increase the relative height. where the invput value is the frequency, min 0, max 255
    .range([height/3, 0]); // reduce the init exent of range to raise the init drawing height higher

var line = d3.line()
    .x(function(d, i) { return xScale(i); })
    .y(function(d) { return yScale(d); })
    .curve(d3.curveMonotoneX)

// var track = document.getElementsByTagName("audio")[0]

// track.addEventListener("playing", function() {
document.getElementById("play").addEventListener("click", function(){

    this.parentNode.removeChild(this);

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
        
        if (++count % 4){
            // animate every other frame
            return false;
        }

        if (count < 450){
            addText();
        }
        
        rollWindow();

        analyser.getByteFrequencyData(frequencyData);

        lineData = Array.from(frequencyData);

        lineData = lineData.concat(lineData).concat(lineData);
        
        var avgFreq = avg(frequencyData);

        var stroke = color(avgFreq);        

        // reset xScale which has changed during sink
        xScale.range([0, width]);

        svg.append("path")
            .datum(Array.from(lineData).map(x => yScalePow(x/255)))
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

            if (avg(sunkData) < -300) {
            // if (avg(sunkData) < removeFactor) {
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
            // tweek linespread and sinkPow to get the right feeling
            // of moving through space. 
            xScaleLin = d3.scaleLinear().domain([size,0]).range([0,spreadRangeLimit]);

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
    d3.selectAll(".heavy").remove();

    textPos = (textPos < 0 ? height : textPos - 1);

    d3.select("svg").append("text").attr("class", "heavy").text("SYNTHFRIDAY")
        .attr("x", 30)
        .attr("y", textPos);
}


function rollWindow() {
    // removeFactor = (removeFactor > -200 ? height*-1 : removeFactor + 10);
    
    if (widenSpreadRange) {
        widenSpreadRange = (spreadRangeLimit < spreadRangeMax ? true : false)
    } else {
        widenSpreadRange = (spreadRangeLimit > spreadRangeMin ? false : true)
    }

    
    if (sinkUp) {
        sinkUp = (sinkExponent < sinkExponentMax ? true : false)
    } else {
        sinkUp = (sinkExponent > sinkExponentMin ? false : true)
    }

    spreadRangeLimit = (widenSpreadRange ? spreadRangeLimit + spreadSpeed : spreadRangeLimit - spreadSpeed);
    sinkExponent = (sinkUp ? sinkExponent + sinkExponentIncrement : sinkExponent - sinkExponentIncrement);
}
