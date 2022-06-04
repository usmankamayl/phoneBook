import elements from "./createElements.js";
import {getStorage} from "./serviceStorage.js";
const {
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
    header.headerContainer.append(logo);
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
