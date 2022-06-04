import elements from "./createElements";
import {getStorage} from "./serviceStorage";
//import {createImageLogo} from "./createElements.js";
const {
    createImageLogo,
    createHeader,
    createTable,
    createLogo,
    createMain,
    createButtonsGroup,
    createForm,
    createFooter,
    createRow,
} = elements;

export const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const imageLogo = createImageLogo();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
        {
            className: 'btn btn-primary mr-3',
            type: 'button',
            text: 'Добавить',
        },
        {
            className: 'btn btn-danger mr-3',
            type: 'button',
            text: 'Удалить',
        },

    ]);
    const table = createTable();
    const {form, overlay} = createForm();
    const footer = createFooter(title);
    header.headerContainer.append(imageLogo, logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    app.append(header, main, footer);

    return {
        list: table.tbody,
        logo,
        btnAdd: buttonGroup.btns[0],
        btnDel: buttonGroup.btns[1],
        formOverlay: overlay,
        form,
    }
};
export const renderContacts = elem => {
    const allRow =  getStorage('dataKey').map(createRow);
    elem.append(...allRow);
    return allRow;
};
