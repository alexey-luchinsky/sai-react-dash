import React from 'react';
import Plotly from 'plotly.js';

export default class SaiDash extends React.Component {
    static defaultProps = {
        x:0, y:0, w:1, h:1, i:0,
    }
    constructor(props) {
        super(props);
    };

    handleClick = (e) => {
        if(this.props.removeElement)
            this.props.removeElement(this.props.index);
        e.preventDefault();
    }


    render() {
        const type = this.props.type;
        const data = this.props.data;
        let content = <span>Unknown dash type {type}, data={data}</span>;
        if(type==="text") {
            content = <span>{data}</span>;
        } else if(type==="image") {
            content = 
                <img
                    src={data}
                    style={{width:"100%", height:"100%"}}
                    alt={"Image "+data+" not found"}/>;
        } else if(type === "plotly") {
            var chartID = "gs"+this.props.index;
            content = <div id={chartID}></div>;
        };
        return(
            <div 
            className = "aaa"
            style={{width:"100%", height:"100%"}}
            onContextMenu={(e) => this.handleClick(e)}>
                {content}
                </div>
        );
    };

    resize_plotly(chartID) {
        var doc = document.getElementById(chartID).parentElement
        console.log("doc=", doc);
        console.log("w=", doc.offsetWidth, "h=", doc.offsetHeight);
        Plotly.relayout(chartID, {
          width: doc.offsetWidth,
          height: doc.offsetHeight
        });
    };
    

    componentDidMount() {
        if(this.props.type=="plotly") {
            var chartID = "gs"+this.props.index;
            console.log("PlotlyDash2: component ",chartID," dit mount");
            // adding Plotly
            Plotly.newPlot(chartID, 
                [{x:[1,2,3], y:[1,2,1], type:"scatter"}],
                {autosize: true, responsive:true, margin:{l:0, t:0, r:0, b:0}}
            );
            // resizing it to fit rect-grid-item
            this.resize_plotly(chartID);
        };
    }

}


