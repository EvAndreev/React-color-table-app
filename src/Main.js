import * as React from 'react';
import {Table} from './common/components/Table/Table.js';
import { connect } from 'react-redux';
import {Modal} from './common/components/Modals/Modal.js';
import {EditModal} from './common/components/Modals/EditModal.js';

// data for table-header cells
const columns = [
    {id: 'Name', label: 'Name', key: 'name'},
    {id: 'Type', label: 'Type', key: 'type'},
    {id: 'Color', label: 'Color', key: 'color'},
    {id: null, label: null, key: 'actions'}
];

class MainComponent extends React.Component {
    
    state = {
        editModalOpened: false,
        editItemId: null
    }

    handleCloseModal = () => {
        this.setState({
            editModalOpened: false,
            editItemId: null
        });
    }

    handleDeleteRow = (id) => () => {
        this.props.dispatch({type: 'DELETE_COLOR', payload: {id}})
    }

    handleColorEdit = (id) => () => {
        this.setState({
            editModalOpened: true,
            editItemId: id
        });
    }

    renderCustomRow = (row, key) => {
        return (
            <div className="table-row">
                <div className="table-cell">
                    {row.name}
                </div>
                <div className="table-cell">
                    {row.type}
                </div>
                <div className="table-cell" style={{background: row.color}}>  
                    {''}
                </div>
                <div className="table-cell">
                    <div className="person-set__edit" onClick={this.handleColorEdit(row.id)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.4853 6.45733L9.54267 5.51466L3.33333 11.724V12.6667H4.276L10.4853 6.45733ZM11.428 5.51466L12.3707 4.57199L11.428 3.62933L10.4853 4.57199L11.428 5.51466ZM4.828 14H2V11.1713L10.9567 2.21466C11.0817 2.08968 11.2512 2.01947 11.428 2.01947C11.6048 2.01947 11.7743 2.08968 11.8993 2.21466L13.7853 4.10066C13.9103 4.22568 13.9805 4.39522 13.9805 4.57199C13.9805 4.74877 13.9103 4.91831 13.7853 5.04333L4.82867 14H4.828Z" fill="#9B9FB3"/>
                        </svg>
                    </div>
                    <div className="person-set__delete" onClick={this.handleDeleteRow(row.id)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3333 3.99999H14.6666V5.33333H13.3333V14C13.3333 14.1768 13.2631 14.3464 13.1381 14.4714C13.013 14.5964 12.8435 14.6667 12.6666 14.6667H3.33331C3.1565 14.6667 2.98693 14.5964 2.86191 14.4714C2.73688 14.3464 2.66665 14.1768 2.66665 14V5.33333H1.33331V3.99999H4.66665V1.99999C4.66665 1.82318 4.73688 1.65361 4.86191 1.52859C4.98693 1.40357 5.1565 1.33333 5.33331 1.33333H10.6666C10.8435 1.33333 11.013 1.40357 11.1381 1.52859C11.2631 1.65361 11.3333 1.82318 11.3333 1.99999V3.99999ZM12 5.33333H3.99998V13.3333H12V5.33333ZM5.99998 2.66666V3.99999H9.99998V2.66666H5.99998Z" fill="#9B9FB3"/>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
    
    render() {
        console.log(this.props);
        const {editItemId, editModalOpened} = this.state;
        return (
            <>
                <Table 
                    columns={columns} 
                    data={this.props.colors} 
                    rowRenderer={this.renderCustomRow} 
                />
                <Modal 
                    opened={editModalOpened && editItemId}
                    closeModal={this.handleCloseModal}
                    >
                    <EditModal 
                        itemId={editItemId}
                        closeModal={this.handleCloseModal}    
                    />
                </Modal>
            </>
        );
    }
}

//перенаправление состояния redux в component (MainComponent)
const mapStateToProps = (state) => {
    console.log(state);
    return {
        colors: state.items //from state stor`a -> colors
    }
}

export const Main = connect(mapStateToProps)(MainComponent)