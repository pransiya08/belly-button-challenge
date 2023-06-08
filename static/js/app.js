// Use the D3 library to read in samples.json from the URL 
// https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {
    console.log(data);
});

function dashboard() {
    
    let selectButton = d3.select("#selDataset");
    
    d3.json(url).then(function(data) {
        // console.log(data);

        let selectIDs = data.names;
        
        selectIDs.forEach(function (name) {
            selectButton.append("option").attr("value",name).text(name);
        });
        
        // for sample charts and info table
        let selectedID = selectIDs[0];
        // console.log(selectedID);

        hbarChart(selectedID);
        bubbleChart(selectedID);
        demoInfo(selectedID);
        gaugeChart(selectedID);

    });
}

function hbarChart(inputID) {

    // let barArea = d3.select("#bar");

    d3.json(url).then(function(data) {
        // console.log(data);

        let idSamples = data.samples;
        // console.log(idSamples);

        function selectSample(sample) {
            return sample.id === inputID;
        }

        let filteredSample = idSamples.filter(selectSample);
        // console.log(filteredSample);
 
        let idSample = filteredSample[0];
        // console.log(idSample);

        let traceSample = {
            x: idSample.sample_values.slice(0,10).reverse(),
            y: idSample.otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
            text: idSample.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };

        let layout = {
            automargin: true

        }

        let traceData = [traceSample];

        Plotly.newPlot("bar", traceData, layout);

    });

}

function bubbleChart(inputID) {

    d3.json(url).then(function(data) {
        // console.log(data);

        let idSamples = data.samples;
        // console.log(idSamples);

        function selectSample(sample) {
            return sample.id === inputID;
        }

        let filteredSample = idSamples.filter(selectSample);
        // console.log(filteredSample);
 
        let idSample = filteredSample[0];
        // console.log(idSample);

        let traceSample = {
            x: idSample.otu_ids,
            y: idSample.sample_values,
            text: idSample.otu_labels,
            mode: "markers",
            marker: {
                color: idSample.otu_ids,
                size: idSample.sample_values,
                colorscale: 'Picnic'}
        };

        let traceData = [traceSample];

        let layout = {     
            width: 1300,
            height: 800,
            xaxis: {
              title: "OTU ID",
            },
            yaxis: {
            automargin: true
            }
        };

        Plotly.newPlot("bubble", traceData, layout);

    });
}

function demoInfo(inputID) {

    let metaPanel = d3.select("#sample-metadata");
        
    d3.json(url).then(function(data) {
        // console.log(data);
        
        metaPanel.html("");

        let metaData = data.metadata;
        // console.log(metaData);

        function selectSample(sample) {
            let idCheck = sample.id;
            let idCheckStr = idCheck.toString();
            return idCheckStr === inputID;
        }

        let filteredSample = metaData.filter(selectSample);
        // console.log(filteredSample);
 
        let metaSample = filteredSample[0];
        // console.log(metaSample);

        let idKeys = Object.keys(metaSample);
        // console.log(idKeys);

        let idValues = Object.values(metaSample);
        // console.log(idValues);
        
        for( let i = 0; i < idKeys.length; i++) {
            let metaRow = metaPanel.append("tr");
            metaRow.append("td").text(`${idKeys[i]}: `);
            metaRow.append("td").text(`${idValues[i]}`);
        }
    });
}

// BONUS part
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
                text: "Belly Button Washing Frequency",
                // text: "Scrubs per Week",
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
                    range: [null,9]
                }
            }            
        };

        let traceData = [traceSample];

        let layout = {     
            width: 600, 
            height: 500 
            // margin: { t: 0, b: 0 } 
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

dashboard();