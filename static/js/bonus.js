// Adapt the Gauge Chart to plot the weekly washing frequency of the individual

function init() {

    let selectButton = d3.select("#selDataset");
    let selectedID = selectButton.property("value");
    // console.log(`ID: ${selectedID}`);

    gaugeChart(selectedID);
}

function gaugeChart(inputID) {
    
    d3.json(url).then(function(data) {
        // console.log(data);

        let metaData = data.metadata;

        function selectSample(sample) {
            let idCheck = sample.id;
            let idCheckStr = idCheck.toString();
            return idCheckStr === inputID;
        }

        let filteredSample = metaData.filter(selectSample);
        // console.log(filteredSample);

        let metaSample = filteredSample[0];
        // console.log(metaSample);

        let washFreq = metaSample.wfreq;
        // console.log(washFreq); 

        let traceSample = {
            title: { 
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: { 
                    size: 30 
                } 
            },
            domain: { x: [0, 1], y: [0, 1] },
            value: washFreq,
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis:{
                    range: [0,9]
                },
                bar: {'color': "red"},
                steps: [
                    {range: [0, 1], color: "rgb(255, 255, 255)"},
                    {range: [1, 2], color: "rgb(235, 225, 250)"},
                    {range: [2, 3], color: "rgb(215, 205, 235)"},
                    {range: [3, 4], color:  "rgb(195, 185, 215)"},
                    {range: [4, 5], color:  "rgb(175, 165, 195)"},
                    {range: [5, 6], color: "rgb(155, 185, 175"},
                    {range: [6, 7], color: "rgb(125, 205, 145)"},
                    {range: [7, 8], color:  "rgb(105, 225, 125)"},
                    {range: [8, 9], color: "rgb(85, 255, 105)"},
                ]
            }            
        };

        let traceData = [traceSample];

        let layout = {     
            width: 600, 
            height: 500 
        };
        
        Plotly.newPlot("gauge", traceData, layout);
    });
}


d3.selectAll("#selDataset").on("change", optionChanged)

function optionChanged() {

    let selectButton = d3.select("#selDataset");
    let newID = selectButton.property("value");
    // console.log(newID);
    
    hbarChart(newID);
    bubbleChart(newID);
    demoInfo(newID);
    gaugeChart(newID);
}

init();