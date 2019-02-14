// some global params
var letterRows = 10; // aka height
var letterColumns = 7; // aka width. includes one blank column for spacing
var wordHeight = 10; // hardcoded until you write code to handle two words (synth + friday)
var delay = 50; 
var textDuration = 2000;
var backgroundDuration = 2000;
var frequencyData;

//letters!
var s = [[3,0],[2,1],[3,1],[4,1],[1,2],[2,2],[3,2],[4,2],[5,2],[0,3],[1,3],[1,4],[2,4],[3,4],[4,4],[2,5],[3,5],[4,5],[5,5],[5,6],[0,7],[1,7],[2,7],[3,7],[4,7],[5,7],[1,8],[2,8],[3,8],[4,8],[3,9]];
var y = [[4,0],[1,1],[3,1],[4,1],[0,2],[1,2],[3,2],[4,2],[0,3],[1,3],[3,3],[4,3],[0,4],[1,4],[3,4],[4,4],[0,5],[1,5],[2,5],[3,5],[4,5],[1,6],[2,6],[3,6],[2,7],[3,7],[2,8],[3,8],[2,9],[3,9]];
var n = [[0,0],[4,0],[0,1],[1,1],[4,1],[5,1],[0,2],[1,2],[2,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[3,5],[4,5],[5,5],[0,6],[1,6],[4,6],[5,6],[0,7],[1,7],[4,7],[5,7],[0,8],[1,8],[4,8],[5,8],[0,9],[1,9],[4,9],[5,9]];
var t = [[4,0],[5,0],[1,1],[2,1],[3,1],[4,1],[5,1],[0,2],[1,2],[2,2],[3,2],[0,3],[2,3],[3,3],[2,4],[3,4],[2,5],[3,5],[2,6],[3,6],[2,7],[3,7],[2,8],[3,8],[2,9],[3,9]];
var h = [[1,0],[5,0],[0,1],[1,1],[4,1],[5,1],[0,2],[1,2],[4,2],[5,2],[0,3],[1,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[0,6],[1,6],[4,6],[5,6],[0,7],[1,7],[4,7],[5,7],[0,8],[1,8],[4,8],[5,8],[0,9],[4,9]];
var f = [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[0,2],[1,2],[2,2],[0,3],[1,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[0,6],[1,6],[0,7],[1,7],[0,8],[1,8],[0,9]];
var r = [[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[4,1],[5,1],[0,2],[1,2],[4,2],[5,2],[0,3],[1,3],[4,3],[5,3],[0,4],[1,4],[3,4],[0,5],[1,5],[2,5],[3,5],[4,5],[0,6],[1,6],[4,6],[0,7],[1,7],[4,7],[5,7],[0,8],[1,8],[4,8],[5,8],[0,9],[1,9],[4,9],[5,9]];
var i = [[3,0],[2,1],[3,1],[2,2],[3,2],[2,3],[3,3],[2,4],[3,4],[2,5],[3,5],[2,6],[3,6],[2,7],[3,7],[2,8],[3,8],[2,9]];
var d = [[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[3,1],[4,1],[0,2],[1,2],[4,2],[5,2],[0,3],[1,3],[4,3],[5,3],[0,4],[1,4],[4,4],[5,4],[0,5],[1,5],[4,5],[5,5],[0,6],[1,6],[4,6],[5,6],[0,7],[1,7],[4,7],[5,7],[0,8],[1,8],[3,8],[4,8],[0,9],[1,9],[2,9],[3,9]];
var a = [[2,0],[3,0],[4,0],[5,0],[1,1],[2,1],[3,1],[4,1],[5,1],[0,2],[4,2],[5,2],[0,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[0,6],[4,6],[5,6],[0,7],[4,7],[5,7],[0,8],[4,8],[5,8],[0,9],[4,9]];

var l = [[0,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3],[0,4],[1,4],[0,5],[1,5],[0,6],[1,6],[0,7],[1,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[0,9],[1,9],[2,9],[3,9],[4,9],[5,9]];
var e = [[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[1,1],[2,1],[3,1],[4,1],[0,2],[1,2],[0,3],[1,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[0,6],[1,6],[0,7],[1,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[1,9],[2,9],[3,9],[4,9]];
var o = [[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[4,1],[5,1],[0,2],[4,2],[5,2],[0,3],[4,3],[5,3],[0,4],[4,4],[5,4],[0,5],[4,5],[5,5],[0,6],[4,6],[5,6],[0,7],[4,7],[5,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[1,9],[2,9],[3,9],[4,9]];
var u = [[5,0],[1,1],[4,1],[5,1],[0,2],[1,2],[4,2],[5,2],[0,3],[1,3],[4,3],[5,3],[0,4],[1,4],[4,4],[5,4],[0,5],[1,5],[4,5],[5,5],[0,6],[1,6],[4,6],[5,6],[0,7],[1,7],[4,7],[5,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[1,9],[2,9],[3,9],[4,9]];
var b = [[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[3,1],[4,1],[5,1],[0,2],[1,2],[4,2],[5,2],[0,3],[1,3],[3,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[0,5],[1,5],[2,5],[3,5],[4,5],[0,6],[1,6],[3,6],[4,6],[5,6],[0,7],[1,7],[4,7],[5,7],[0,8],[1,8],[3,8],[4,8],[5,8],[0,9],[1,9],[2,9],[3,9],[4,9]];
var g_ = [[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[0,2],[4,2],[5,2],[0,3],[0,4],[0,5],[3,5],[4,5],[5,5],[0,6],[3,6],[4,6],[5,6],[0,7],[4,7],[5,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[1,9],[2,9],[3,9],[4,9]];

var letterList = [];
var letterList2 = [];

var word1Length = letterList.length;
var word2Length = letterList2.length;  

var word1Length = 4; // hacks to size corretly when starting blank
var word2Length = 7; // matches word lenth of first "newwords"

var wordWidth = word1Length * letterColumns;
var wordWidth2 = word2Length * letterColumns;

var width = window.innerWidth, height = window.innerHeight;

//calc circle radius based on page size and word length
var maxRhorizontal = width / ((letterColumns + .5) * word2Length) / 2;//where +`x` is the padding
var maxRvertical = height / ((letterRows+4) * 2) / 2; //where +`x` is the padding
var radius = Math.min(maxRhorizontal, maxRvertical);

// calc total circle cols and rows
var dia = radius * 2;
var totalCol = width / dia;
var totalRow = height / dia;

// calc offets for placement of words
var xOffset = Math.floor((totalCol - wordWidth) / 2); //horiz center first word
var yOffset = Math.floor((totalRow - wordHeight * 2) / 2); // vertical center
var xOffset2 = Math.floor((totalCol - wordWidth2) / 2); //horiz center second word

document.querySelector('#play').addEventListener('click', function() {

    var element = document.getElementById("play");
    element.parentNode.removeChild(element);

    // create svg container
    svg = d3.select("body")
        .append("svg")
        .attr("width", dia * totalCol)
        .attr("height", dia * totalRow);

    // generate circles and apply row (x) and column (y) classes
    // which is how we can later maniupulate the circles

    for (var i = 0; i < totalCol; i++) { 
        // create a g container for every column
        // (so that we can manipulate circles in vertical columns)
        var g = svg.append("g").attr("class", "x_" + i)            
        
        for (var q = 0; q < totalRow; q++) { 
            // for every row
            // add a circle with a class that corresoponds to its column/row
            g.append("circle")
                .attr("class", "x_" + i + "_y_" + q + " x_" + i + " y_" + q + " disabled")
                .attr("cx", (i * dia + radius))
                .attr("cy", q * dia + radius)
                .attr("r", radius)
                .attr("fill", "#000000" )
                .attr("opacity", 1);
        }
    }

    // do some math to get circle "coordiantes" of letters
    var absLetters = generateAbsPositions(letterList, letterList2);

    // assign letter status (aka, active)
    for (var i = 0; i < absLetters.length; i++) {
        // use `absLetters` as a map to identify letter circles and apply "active" class
        d3.selectAll(".x_" + absLetters[i][0] + "_y_" + absLetters[i][1])
            .classed("active", true)
            .classed("disabled", false);
    }

    // and we're ready to animate
    cycleColumns("rainbow");

    var cols = Math.ceil(totalCol);
    var rows = Math.ceil(totalRow);

    circlesBackground = d3.selectAll(".disabled");

    // we shuffle the circle array to randomize the effect of the music frequency
    // vis a vis circle position.
    shuffle(circlesBackground[0]);

    var scale = d3.scale.linear().domain([20,130]).range([0,1]);
    var lightnessScale = d3.scale.linear().domain([0,255]).range([.5,1]);

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement = document.getElementById('audioElement');
    audioElement.play();

    var audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();

    var delayNode = audioCtx.createDelay(1.0);  //create a delay
    audioSrc.connect(delayNode); //bind our delay to media element source
    delayNode.connect(analyser);  // Bind our analyser to the media element source.
    analyser.connect(audioCtx.destination); //bind the destination to the delay node output

    frequencyData = new Uint8Array(circlesBackground[0].length); //<this denominator "groups" the columns together when assinging the data later
    
    var renderThrottle = 0;
    var throttleRate = 75;
    var count = 0
    var hold = false;
    var wordRenderCount = 0;
    var flickerTime = false;
    var fireWord = false;
    var holdFadeCount = 12; // after leah is displayed and we want to black out for a while

    function renderChart() {
        
        // loop
        requestAnimationFrame(renderChart);

        // fire column transitions after x frames
        // as set by throttleRate
        renderThrottle++;
        // console.log(count);
        if ( (count == 6) & hold == false) {
            // roll 6 for right at the sweetspot (res dependent)
            console.log("FADEOUT ROLL");
            cycleColumns("fadeout");
            count++;

        } else if (count == 7 && wordRenderCount == 0) { 
            console.log("LEAH");
            newWords([l,e,a,h],[], false);
            wordRenderCount = 1;

        } else if (wordRenderCount == 1 & count > holdFadeCount) {  
            console.log("FADEOUT HOLD");
            wordRenderCount = 2;
            cycleColumns("fadeout");
            hold = true;

            var counter = 0;
            var rainbowGo = false;
            var i = setInterval(function(){

                counter++;
                if (counter == 2) {
                    console.log("good trouble")
                    newWords([g_,o,o,d],[t,r,o,u,b,l,e])
                } else if (counter == 8 || counter == 11 || counter == 14) {
                    console.log("flicker")
                    cycleColumns("flicker");
                }

                if (counter == 4) {
                    cycleColumns("rainbow");
                } 

                if (counter == 14) {
                    cycleColumns("fadeout");
                } else if (counter == 20) {
                    newWords([l,e,a,h], [t,r,o,u,b,l,e])
                } else if (counter == 21 || counter == 23 || counter == 24 || counter == 26 || counter == 28 || counter == 30 ) {
                    cycleColumns("rainbow");
                } else if (counter == 32) {
                    d3.selectAll(".active")
                        .transition()
                        .duration(1000)
                        .attr("r", 0)
                        .transition()
                        .delay(1000)
                        .classed("active", false);
                } else if (counter == 34 || counter == 36 || counter == 38 || counter == 40 || counter == 42 || counter == 44 ) {
                    cycleColumns("rainbow");

                } else if (counter == 45) {
                    clearInterval();
                }

            }, 1000);

        } else if (renderThrottle == throttleRate && hold == false) { 
            // default pass
            console.log("RAINBOW");
            cycleColumns("rainbow");
            renderThrottle = 0;
            count++;
        }

        // Get frequency data
        analyser.getByteFrequencyData(frequencyData);

        // scale background circle radii from frequency values
        circlesBackground.data(frequencyData).attr("r", function(d) {
            return scale(d) * radius > 0  ? scale(d) * radius : 0;
        })
    }

    renderChart();

});


function shuffle(array) { //Fisher-Yates shuffle from Mike Bostock
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}


function generateAbsPositions(letterList, letterList2){
    // take letter circle position and convert to row/col on screen
    var word1Length = letterList.length;
    var word2Length = letterList2.length;  

    var wordWidth = word1Length * letterColumns;
    var wordWidth2 = word2Length * letterColumns;

    var totalCol = width / dia;
    var totalRow = height / dia;

    // calc offets for placement of words
    var xOffset = Math.floor((totalCol - wordWidth) / 2); //horiz center first word
    var yOffset = Math.floor((totalRow - wordHeight * 2) / 2); // vertical center
    var xOffset2 = Math.floor((totalCol - wordWidth2) / 2); //horiz center second word

    var letterPositions = []
    
    // first word
    for (var z = 0; z < letterList.length; z++){
        //for every letter
        var length = letterList[z].length;

        for (var q = 0; q < length; q++){
            //for every circle in letter
            
            letterPositions.push([ letterList[z][q][0] + (z * letterColumns) + xOffset, letterList[z][q][1] + yOffset ]);
            // simplified: [(diameter * letter position) + ( diamater * circle position) + offset, letter position + offset]
        }
    }

    // second word
    for (var z = 0; z < letterList2.length; z++){
        // for every letter
        var length = letterList2[z].length;

        for (var q = 0; q < length; q++){
            // for every circle in letter
            letterPositions.push([ letterList2[z][q][0] + (z * letterColumns) + xOffset2, letterList2[z][q][1] + yOffset + letterRows + 1 ]);  
        }
    }

    return letterPositions;
}

function cycleColumns(method) {
    // this is slow...
    
    if (method == "rainbow") {
    
        // randomize initial hue
        var hue =  Math.floor(Math.random() * 361);
        
        // sets the hue difference between the foreground and background colors
        var magicColorOffset = 57 

        var saturation = (Math.floor(Math.random() * 71)+30)/100; 

        var textHue = (hue + 180 < 360) ? hue + 180: hue + 180 - 360;

        for (i = 0; i < totalCol; i++) {

            textHue = textHue + 1; // taste the rainbow!
            
            svg.selectAll(".x_" + i)
                .filter(".active")
                .transition()
                .duration(textDuration)
                .delay(i * delay)
                .attr("r", radius)
                .attr("fill", function(){
                    lightness = .5;
                    saturation = (Math.floor(Math.random() * 71)+30)/100; 
                    return d3.hsl(textHue, saturation, lightness);    
                });

            hue = hue + 1; // taste the rainbow!

            svg.selectAll(".x_" + i)
                .filter(".disabled")
                .transition()
                .duration(backgroundDuration)
                .delay(i * delay)
                .attr("fill", function(){
                    lightness = (Math.floor(Math.random() * 45))/100;
                    saturation = (Math.floor(Math.random() * 81)+20)/100;
                    return d3.hsl(hue, saturation, lightness);
                });
        }

        hue = (hue + magicColorOffset < 360) ? hue + magicColorOffset: hue + magicColorOffset - 360;

    } else if (method == "fadeout") {
        
        for (i = 0; i < totalCol; i++) {

            svg.selectAll(".x_" + i)
                .transition()
                .duration(textDuration)
                .delay(i * delay)
                .attr("fill", "#000");
        }
    } else if (method == "flicker") {

        delay = 100;

        svg.selectAll(".active")
            .transition()
            .duration(100)
            .attr("r", radius)
            .transition()
            .duration(0)
            .delay(delay)
            .attr("r", 0)
            .transition()
            .duration(0)
            .delay(delay * 2.5)
            .attr("r", radius)
            .transition()
            .duration(0)
            .delay(delay * 3.25)
            .attr("r", 0)
            .transition()
            .duration(0)
            .delay(delay * 4)
            .attr("r", radius)
            .transition()
            .duration(0)
            .delay(delay * 5)
            .attr("r", 0)
            .transition()
            .duration(0)
            .delay(delay * 5.5)
            .attr("r", radius);

    }  else if (method == "rainbow2") {
    
        // randomize initial hue
        var hue =  Math.floor(Math.random() * 361);
        
        // sets the hue difference between the foreground and background colors
        var magicColorOffset = 57 

        var saturation = (Math.floor(Math.random() * 71)+30)/100; 

        var textHue = (hue + 180 < 360) ? hue + 180: hue + 180 - 360;

        for (i = 0; i < totalCol; i++) {

            textHue = textHue + 1; // taste the rainbow!
            
            svg.selectAll(".x_" + i)
                .filter(".active")
                .transition()
                .duration(textDuration)
                .delay(i * delay)
                .attr("fill", function(){
                    lightness = .5;
                    saturation = (Math.floor(Math.random() * 71)+30)/100; 
                    return d3.hsl(textHue, saturation, lightness);    
                });

            hue = hue + 1; // taste the rainbow!

            svg.selectAll(".x_" + i)
                .filter(".disabled")
                .transition()
                .duration(backgroundDuration)
                .delay(i * delay)
                .attr("fill", function(){
                    lightness = (Math.floor(Math.random() * 45))/100;
                    saturation = (Math.floor(Math.random() * 81)+20)/100;
                    return d3.hsl(hue, saturation, lightness);
                });
        }

        hue = (hue + magicColorOffset < 360) ? hue + magicColorOffset: hue + magicColorOffset - 360;

    } 

}


function newWords(word1, word2) {
    var letterList = word1;
    var letterList2 = word2;

    var absLetters2 = generateAbsPositions(letterList, letterList2);

    d3.selectAll("circle")
        .classed("disabled", true)
        .classed("active", false)

    // assign letter status (aka, active)

    for (var i = 0; i < absLetters2.length; i++) {
        // use `absLetters` as a map to identify letter circles and apply "active" class
        d3.selectAll(".x_" + absLetters2[i][0] + "_y_" + absLetters2[i][1])
            .classed("active", true)
            .classed("disabled", false);
    }

    circlesBackground = d3.selectAll(".disabled");
    shuffle(circlesBackground[0]);

    frequencyData = new Uint8Array(circlesBackground[0].length); //<this denominator "groups" the columns together when assinging the data later
    
}