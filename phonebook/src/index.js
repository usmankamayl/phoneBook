import {renderPhoneBook, renderContacts} from "./script/render";
import control from "./script/control";
const {modalControl, deleteControl, hoverRow, formControl} = control;
// import './css/normalize.min.css';
// import './css/bootstrap.min.css';
import './scss/index.scss';
import './index.html';

    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);
        const {list, logo, btnAdd, formOverlay, form, btnDel} = renderPhoneBook(app, title);
        //функционал
        renderContacts(list);
        const {closeModal} =  modalControl(btnAdd, formOverlay);
        deleteControl(btnDel, list);
        hoverRow();
        const btnClose = document.querySelector('.close');
        formControl(form, list, closeModal);

    };
    window.phoneBookInit = init;

document.addEventListener('DOMContentLoaded', () => {
    phoneBookInit('#app', 'Усман');
})
