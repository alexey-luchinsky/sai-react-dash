import React from 'react';
import Plotly from 'plotly.js';



class SaiDash extends React.Component {
    static defaultProps = {
        x:0, y:0, w:1, h:1, i:"0",
    }

    handleClick = (e) => {
        if(this.props.openEditForm)
            this.props.openEditForm(this.props.i);
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
            onDoubleClick={(e) => this.handleClick(e)}>
                {content}
                </div>
        );
    };

    componentDidMount() {
        if(this.props.type === "plotly") {
            var chartID = "gs"+this.props.i;
            // adding Plotly
            let data = this.props.data;
            let layout = {autosize: true, responsive:true, 
                margin:{t:0, r:0}
            };
            let config = {'staticPlot': true};
            console.log("mounting plotly: chartID=", chartID, " data=", data);
            Plotly.newPlot(chartID, data, layout, config);
            // resizing it to fit rect-grid-item
            resize_plotly(chartID);
        };
    }

};

function resize_plotly(chartID) {
    var doc = document.getElementById(chartID).parentElement
    Plotly.relayout(chartID, {
      width: doc.offsetWidth,
      height: doc.offsetHeight
    });
};


export {SaiDash, resize_plotly};
