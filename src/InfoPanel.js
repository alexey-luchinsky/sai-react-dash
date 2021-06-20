import React from 'react'
import ReactModal from 'react-modal';

export default class  InfoPanel extends React.Component {
    render() {
        let layout_items = this.props.layout.map( (el) =>
            <li key={el.i}>[{el.x}, {el.y}, {el.w}, {el.h}, i={el.i}]</li>);
        let elements_items = this.props.elements.map( (el) =>
                <li key={el.i}>[i={el.i}: {el.type}, {" "+el.data}]</li>);
        return (
            <ReactModal 
            isOpen={this.props.infoOpened}
            ariaHideApp={false}
        >
            <table>
                <tbody>
                <tr>
                    <td>Layout</td><td>Elements</td>
                </tr>
                <tr>
                    <td>{layout_items}</td><td>{elements_items}</td>
                </tr>
                </tbody>
            </table>
            </ReactModal>
        );
    }
}
