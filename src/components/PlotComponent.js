import React, { useEffect } from 'react';
import Plotly from 'plotly.js';

function PlotComponent({ xEpsi, epsi, columns, spectralData, rows }) {
    console.log('PlotComponent props:', { xEpsi, epsi, columns, spectralData, rows });
    // Function to update the plot
    const updatePlot = (xEpsi, epsi, columns, spectralData, rows) => {
        // Check that xEpsi and epsi have the same length and that they contain valid data
        if (xEpsi.length !== epsi.length) {
            console.error('Error: xEpsi and epsi arrays have different lengths.');
            return; // Exit the function if lengths are different
        }

        // Replace 'epsi' values of -1 with null
        const adjustedEpsi = epsi.map(value => value === -1 ? null : value);

        // Log the indices and values where epsi != -1 for debugging
        console.log('Valid epsi values and their indices:', adjustedEpsi.flatMap((value, index) => value !== null ? [[index, value]] : []));

        const plotData = [
            {
                x: xEpsi,
                y: adjustedEpsi,
                type: 'scatter',
                mode: 'lines',
                line: {
                    color: '#FF00FF',
                    width: 1,
                },
            },
        ];

        // Gridlines setup
        const gridlines = [];
        for (let i = 0; i <= columns; i++) {
            gridlines.push({
                type: 'line',
                x0: i, x1: i,
                y0: 0, y1: rows,
                line: {
                    color: 'white',
                    width: 1,
                    dash: 'dash',
                },
            });
        }
        for (let j = 0; j <= rows; j++) {
            gridlines.push({
                type: 'line',
                x0: 0, x1: columns,
                y0: j, y1: j,
                line: {
                    color: 'white',
                    width: 1,
                    dash: 'dash',
                },
            });
        }

        const layout = {
            showlegend: false,
            xaxis: {
                range: [0, columns],
                showgrid: false,
                zeroline: false,
                showline: false,
                showticklabels: false,
                fixedrange: true,
            },
            yaxis: {
                range: [0, rows],
                showgrid: false,
                zeroline: false,
                showline: false,
                showticklabels: false,
                fixedrange: true,
            },
            paper_bgcolor: 'rgba(0,0,0,0)', // transparent background
            plot_bgcolor: 'rgba(0,0,0,0)', // transparent background
            shapes: gridlines,
        };

        // Log the data and layout to be used by Plotly for debugging
        console.log('Plotly data:', plotData);
        console.log('Plotly layout:', layout);

        // Make sure the div for the plot exists
        if (!document.getElementById('epsi-plot')) {
            console.error('Error: The div for the plot does not exist.');
            return; // Exit the function if the div does not exist
        }

        // Create the plot
        Plotly.newPlot('epsi-plot', plotData, layout, { staticPlot: true }).then(() => {
            console.log('Plotly plot should be rendered now.');
        }).catch(error => {
            console.error('Plotly error:', error);
        });
    };

    // useEffect hook to call updatePlot whenever props change
    useEffect(() => {
        console.log('useEffect triggered with:', { xEpsi, epsi, columns, spectralData, rows });
        updatePlot(xEpsi, epsi, columns, spectralData, rows);
    }, [xEpsi, epsi, columns, spectralData, rows]); // Depedencies array

    // Render the plot container
    return (
        <div className="plot-container">
            <div id="epsi-plot"></div>
        </div>
    );
}
export default PlotComponent;
