import React from 'react'

export default function InfoPanel(props) {
    let layout_items = props.layout.map( (el) =>
        <li>[{el.x}, {el.y}, {el.w}, {el.h}, i={el.i}]</li>);
    return <ul style={{backgroundColor:"lavender"}}>{layout_items}</ul>;
};
