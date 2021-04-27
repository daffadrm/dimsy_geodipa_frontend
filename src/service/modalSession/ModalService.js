import React from 'react';
import ReactDOM from 'react-dom';
import ModalSession from './ModalSession';

export const MODAL = {
    showSession(title, message, button) {
        const data = {title:title, message:message, button:button}
        ReactDOM.render(<ModalSession data={data} />, document.getElementById('modal-react'));
    },
    hide() {
        ReactDOM.unmountComponentAtNode(document.getElementById('modal-react'));
    },
};