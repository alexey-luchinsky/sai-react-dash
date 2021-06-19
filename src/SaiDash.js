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
            content = <div>Plotly Dash</div>
        };
        return(
            <div 
            style={{width:"100%", height:"100%"}}
            onContextMenu={(e) => this.handleClick(e)}>
                {content}
                </div>
        );
    };
}


