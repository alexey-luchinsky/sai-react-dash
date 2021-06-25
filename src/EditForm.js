import React from 'react';
import ReactModal from 'react-modal';
import {SaiDash} from './SaiDash';


export default class EditForm extends React.Component {

    state={metaData: this.props.element.metaData};

    /**
     * create a DOM to edit the text dash
     * @returns DOM
     */
    editTextForm() {
        return <form>
            <label>
                Edit Text: style
                <input type="text" value={this.state.metaData.style}
                onChange={(e) => {
                    this.setState({metaData: {text:this.state.metaData.text, style:e.target.value}});
                    }}/>                
                <input type="text" value={this.state.metaData.text} 
                onChange={(e) => {
                    this.setState({metaData: {text:e.target.value, style: this.state.metaData.style}});
                    }}/>
            </label>
        </form>
    }

    editImageForm() {
        return <form>
            <label>
                File path:
                <input type="text" value={this.state.metaData.filePath} 
                onChange={(e) => {
                    this.setState({metaData: {filePath:e.target.value}});
                    }}/>
            </label>
        </form>
    }

    editPlotlyForm() {
        return <form>
            <label>
                File path:
                <input type="text" value={this.state.metaData.file_name} 
                onChange={(e) => {
                    this.setState({metaData: {file_name:e.target.value, layout:[], mode:[]}});
                    }}/>
            </label>
        </form>
    }

    /**
     * creates the React DOM
     * @returns React DOM
     */
    render() {
        let element = this.props.element;
        let preview = <div>Element is empty</div>; // content of the preview pane (on the right)
        let editPane = <div>Element is empty</div> // // content of the edit pane (on the left)
        if(element) {
            // Let us fill the panes depending on element type
            preview = <SaiDash type={element.type} data={element.innerData}/>;
            if(element.type === "text") {
                console.log("edit text");
                editPane = this.editTextForm();
            }
            else if(element.type === "image") {
                console.log("edit image");
                editPane = this.editImageForm();
            }
            else if(element.type === "plotly") {
                console.log("edit plotly");
                editPane = this.editPlotlyForm();
            }
            else {
                editPane = <div>The element type {this.props.element.type} cannot be edited</div>;
            }

        };
        let submitButton = <button 
            onClick={(e) => {this.props.submitForm(this.props.element.layout.i, this.state.metaData)}}> 
            Submit 
            </button>;
        let cancelButton = <button onClick={this.props.closeEditForm}>Cancel</button>;
        let removeElementbutton =
            <button onClick={() => {
                this.props.removeElement(this.props.i);
                this.props.closeEditForm();
            }}> Remove Element</button>;

        return(
            <ReactModal 
            isOpen={this.props.isOpen}
            ariaHideApp={false}>
                 <div className="row">
                    <div className="column" style={{float:"left",width:"50%"}}>
                        {submitButton}
                        {cancelButton}
                        {editPane}
                    </div>
                    <div className="column" style={{float:"right",width:"50%"}}>
                        {removeElementbutton}
                        {preview}
                    </div>
                 </div>
            </ReactModal>
        );
    }
}