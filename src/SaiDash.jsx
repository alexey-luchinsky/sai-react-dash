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
        return <div>Sai Dash, id={this.props.id}</div>
    }
};

