import React from 'react';
import Plotly from 'plotly.js';



class SaiDash extends React.Component {
    static defaultProps = {
        x:0, y:0, w:1, h:1, i:"0",
    }

    /**
     * Callback the master to open the Edit form
     * @param {event} e 
     */
    openEditForm = (e) => {
        if(this.props.openEditForm)
            this.props.openEditForm(this.props.i);
        e.preventDefault();
    }


    render() {
        const type = this.props.type;
        const data = this.props.data;
        let content = <span>Unknown dash type {type}, data={data}</span>;
        if(type==="text") {
            content = <div dangerouslySetInnerHTML={{__html:data.text}}/>;
//            content = <span>{data.text}</span>;
        } else if(type==="image") {
            content = 
                <img
                    src={data.filePath}
                    style={{width:"100%", height:"100%"}}
                    alt={"Image "+data.imagePath+" not found"}/>;
        } else if(type === "plotly") {
            var chartID = "gs"+this.props.i;
            content = <div id={chartID}></div>;
        };
        return(
            <div 
            className = "aaa"
            style={{width:"100%", height:"100%"}}
            onContextMenu={(e) => {
                e.preventDefault();
                this.props.removeElement(this.props.i)
            }}
            onDoubleClick={(e) => this.openEditForm(e)}>
                {content}
                </div>
        );
    };

    /**
     * Fills the div with the required id with the Ploly plot
     */
    componentDidMount() {
        if(this.props.type === "plotly") {
            refreshPlotly(this.props.i, this.props.data)
        };
    }

};

/**
 * Resizes the plotly to fit into the div
 * @param {String} chartID DOM id of the plot div
 */
function resize_plotly(chartID) {
    console.log("SaiDash:resize_plotly: chartID=",chartID);    
    var doc = document.getElementById(chartID).parentElement
    Plotly.relayout(chartID, {
      width: doc.offsetWidth,
      height: doc.offsetHeight
    });
};

function refreshPlotly(keyI, data) {
    console.log("refreshPlotly: ", keyI, " ", data);
    var chartID = "gs"+keyI;
    // adding Plotly
    let layout = {autosize: true, responsive:true, 
        margin:{t:0, r:0}
    };
    let config = {'staticPlot': true};
    console.log("mounting plotly: chartID=", chartID, " data=", data);
    Plotly.newPlot(chartID, data, layout, config);
    // resizing it to fit rect-grid-item
    resize_plotly(chartID);
}

export {SaiDash, resize_plotly, refreshPlotly};
