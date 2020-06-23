import * as React from 'react';
import './modal.less';
import '../ColorPicker/picker.less';
import {connect} from 'react-redux';
import {ChromePicker} from 'react-color';
import {Button} from '../Button/Button.js';

const defaultState = {
    name: '',
    type: '',
    color: '',      // this rgb color
    colorHex: '',
    id: null,
    displayColorPicker: false
}

class ModalComponent extends React.Component {
    
    state = defaultState;

    handleInputChange = (fieldName) => {
        return (event) => {
            this.setState({
                [fieldName]: event.target.value
            })
        }
    }

    handleAdd = () => {
        // console.log(this.state);
        const {name, type, color} = this.state;
        if (!name || !type || !color) {
            alert('Заполните все поля');
            return;
        }
        this.props.dispatch({type: 'ADD_COLOR', payload: this.state});
        this.setState(defaultState);
    }

    handleOutsideClick = (e) => {
        const colorPicker = document.getElementsByClassName('color-picker-palette')[0];
        if (colorPicker && !colorPicker.contains(e.target)) {
            this.onHandleCloseColorPicker();
        };
    }

    onHandleShowColorPicker = () => {
        document.addEventListener('click', this.handleOutsideClick);
        this.setState({displayColorPicker: true});
    };

    onHandleCloseColorPicker = () => {
        document.removeEventListener('click', this.handleOutsideClick);
        this.setState({displayColorPicker: false});
    };

    onChangeColorPicker = (color) => {
        this.setState({
            color: color.rgb,
            colorHex: color.hex
        })
    };

    render() {
        return (
            <div className="modal-block-forms">
                <div className="modal-block-cells">
                    <div className="modal-block-cell">
                        <label>{'Name'}</label>
                        <input value={this.state.name} onChange={this.handleInputChange('name')}/>
                    </div>
                    <div className="modal-block-cell">
                        <label>{'Type'}</label>
                        <input value={this.state.type} onChange={this.handleInputChange('type')}/>
                    </div>
                    <div className="modal-block-cell">
                        <label>{'Color'}</label>
                        <input 
                            value={this.state.colorHex}
                            onChange={this.handleInputChange('color')}
                            onClick={() => this.onHandleShowColorPicker()}
                        />
                        {this.state.displayColorPicker && (
                            <div className="color-picker-palette">
                                <ChromePicker 
                                    onChange={this.onChangeColorPicker} 
                                    color={this.state.color}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {<Button title={'Add'} onClick={this.handleAdd} />}
            </div>
        );
    }
}

export const AddModal = connect()(ModalComponent)