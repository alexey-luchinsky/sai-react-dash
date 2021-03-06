import React from 'react';
import ReactModal from 'react-modal';
import {SaiDash} from './SaiDash';
import ReactSelect from "react-select";



export default class EditForm extends React.Component {

    state=this.props.element;

    /**
     * create a DOM to edit the text dash
     * @returns DOM
     */
    editTextForm() {
        const styles = [
            {value:'h1', label:"h1"},
            {value:"h2", label:"h2"},
            {value:"h3", label:"h3"},
            {value:"html", label:"html"}
        ];
        const styleSelector = <ReactSelect options={styles}
            defaultValue={{value:this.state.style, label: this.state.style}}
            onChange = {selectedOption => this.setState({style: selectedOption.value})}
        />;

        return <form>
            <label>
                {styleSelector}
                Edit Text: style
                <input type="text" value={this.state.text} 
                onChange = {event => this.setState({text: event.target.value})}
                />
            </label>
        </form>
    }

    editImageForm() {
        return <form>
            <label>
                File path:
                <input type="text" value={this.state.filePath} 
                onChange={(e) => {
                    this.setState({filePath:e.target.value});
                    }}/>
            </label>
        </form>
    }

    editPlotlyForm() {
        const typeOptions = [{
            value:"markers", label:"markers"},
            {value:"lines", label:"lines"},
            {value:"markers+lines", label:"markers+lines"},
            {value:"bar", label:"bar"},
        ];
        const typeSelector = 
            <div>Type:
                <ReactSelect  name="type" 
                    defaultValue={{value:this.state.type, label: this.state.type}}
                    options={typeOptions}
                    onChange = {selectedOption => this.setState({type: selectedOption.value})}
            />
            </div>;
        return <form>
            <label>
                {typeSelector}
                File path:
                <input type="text" value={this.state.file_name} 
                onChange={(e) => {
                    this.setState({file_name:e.target.value, layout:[], mode:[]});
                    }}/>
            </label>
        </form>
    }

// UPDATE HERE TO INTRODUCE NEW DASH TYPE
    editProbeForm() {
        return <form>
            Info:
            <input type="text" value={this.state.info} onChange={ (e) => this.setState({info: e.target.value})}/>
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
// UPDATE HERE TO INTRODUCE NEW DASH TYPE
            else if(element.type === "probe") {
                editPane = this.editProbeForm();
            }
            else {
                editPane = <div>The element type {this.props.element.type} cannot be edited</div>;
            }

        };
        let submitButton = <button 
            onClick={(e) => {this.props.submitForm(this.props.element.layout.i, this.state)}}> 
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