import {renderPhoneBook, renderContacts} from "./script/render.js";
import control from "./script/control.js";
const {modalControl, deleteControl, hoverRow, formControl} = control;
import './css/normalize.min.css';
import './css/bootstrap.min.css';
import './css/style.css';

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
