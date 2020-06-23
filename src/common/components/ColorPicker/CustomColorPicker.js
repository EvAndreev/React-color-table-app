import * as React from 'react';
import './picker.less';
import {ChromePicker} from 'react-color';


export class CustomColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            defaultColor: '#999',
            changeColor: '#999',
            color: {
                r: '0',
                g: '9',
                b: '153',
                a: '1'
            }
        }
    }

    onHandleShowColorPicker = () => {
        this.setState({displayColorPicker: true})
    };

    onHandleCloseColorPicker = () => {
        this.setState({displayColorPicker: false})
    };

    onChangeColorPicker = color => {
        this.setState({
            color: color.rgb,
            changeColor: color.hex
        })
    };

    render() {
        return (
            <div className="color-picker__container">
                <input className="color-picker__input"
                    type="text"
                    name="color-picker-input"
                    value={this.state.changeColor}
                    onClick={() => this.onHandleShowColorPicker()}
                />
                <div className="color-picker__palette">
                    <div className="color-picker__cover" closeColorPicker={() => this.onHandleCloseColorPicker()}>
                        {this.state.displayColorPicker && <ChromePicker color={this.state.color} onChange={this.onChangeColorPicker}/>}
                    </div>
                </div>
            </div>
        )
    }
}