import React from 'react';

export default class SaiDash extends React.Component {
    static defaultProps = {
        x:0, y:0, w:1, h:1, i:0,
    }
    constructor(props) {
        super(props);
        console.log("SaiDash:constructor, props=", props);
    };
    render() {
        const type = this.props.type;
        const data = this.props.data;
        switch(type) {
            case "text":
                return <span>{data.text}</span>;
                break;
            default:
                return <span>Unknown dash type {type}</span>
        }
        return <div>Sai Dash, id={this.props.id}</div>
    }
};

