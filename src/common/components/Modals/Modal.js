import * as React from 'react';
import './modal.less';


export class Modal extends React.Component {
    
    render() {
        const {opened, closeModal, children} = this.props;
        // condition for display modal window
        const openedClassName = opened ? 'opened' : '';
        return (
            <div className={`modal ${openedClassName}`}>
                <div className="modal-overlay"></div>
                <div className="modal-block">
                    <div className="modal-block__close" onClick={closeModal}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99999 7.05732L11.3 3.75732L12.2427 4.69999L8.94266 7.99999L12.2427 11.3L11.3 12.2427L7.99999 8.94266L4.69999 12.2427L3.75732 11.3L7.05732 7.99999L3.75732 4.69999L4.69999 3.75732L7.99999 7.05732Z" fill="#2051A3"/>
                        </svg>
                        {'close'}
                    </div>
                    <div className="modal-block__children">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}