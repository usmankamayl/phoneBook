import {renderPhoneBook, renderContacts} from "./modules/render.js";
import control from "./modules/control.js";
const {modalControl, deleteControl, hoverRow, formControl} = control;

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

