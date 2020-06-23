import * as React from 'react';
import {render as ReactDomRender} from 'react-dom';
import './less/style.less';
import {Provider} from 'react-redux';
import {store} from './store.js';
import {Main} from './Main.js';
import {Modal} from './common/components/Modals/Modal.js';
import {AddModal} from './common/components/Modals/AddModal.js';
import {Button} from './common/components/Button/Button.js';


class App extends React.Component {
    state = {
        modalOpened: false
    };

    handleButtonClick = () => {
        this.setState({modalOpened: true});
    }

    closeModal = () => {
        this.setState({modalOpened: false});
    }

    render() {
        return (
            <Provider store={store}>
                <div className="container">
                    <div className="header">
                        <h1>{'Example table'}</h1>
                        {<Button title={'Add'} onClick={this.handleButtonClick}/>}
                    </div>
                    <Main />
                    <Modal opened={this.state.modalOpened} closeModal={this.closeModal}>
                        <AddModal/>
                    </Modal>
                </div>
            </Provider>
        );
    }
}

ReactDomRender(<App/>, document.getElementById('root'));