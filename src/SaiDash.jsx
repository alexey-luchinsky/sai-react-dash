import React from 'react';

export default class SaiDash extends React.Component {
    constructor(props) {
        super(props);
        console.log("SaiDash:constructor, props=", props);
    }
    render() {
        console.log("SaiDash:render");
        return <div key={this.props.id}>SAI Dash</div>;
    }
}
