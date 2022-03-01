'use strict';

{
    const createContainer = () => {
        const container = document.createElement('div');
        container.classList.add('container');
        return container;
    };

    const createHeader = () => {
        const header = document.createElement('header');
        header.classList.add('header');
        const headerContainer = createContainer();
        header.append(headerContainer);
        header.headerContainer = headerContainer;
        return header;
    };

    const createLogo = title => {
        const h1 = document.createElement('h1');
        h1.classList.add('logo');
        h1.textContent = `Телефонный справочник. ${title}`;
        return h1;
    };

    const createMain = () => {
        const main = document.createElement('main');
        const mainContainer = createContainer();
        main.append(mainContainer);
        main.mainContainer = mainContainer;
        return main;
    };

    const createButtonsGroup = params => {
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btn-wrapper');
        const btns = params.map(({className, type, text}) => {
            const button = document.createElement('button');
            button.className = className;
            button.type = type;
            button.textContent = text;
            return button;
        });
        btnWrapper.append(...btns);
        return {
            btnWrapper,
            btns,
        };
    };

    const createTable = () => {
          const table = document.createElement('table');
          table.classList.add('table', 'table-stripped');
          const thead = document.createElement('thead');
          thead.insertAdjacentHTML('beforeend', `
            <tr>
              <th class="delete">Удалить</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Телефон</th>
            </tr>`)
          const tbody = document.createElement('tbody')
          table.append(thead, tbody);
          table.tbody = tbody;

          return table;
    }

    const createForm = () => {
          const overlay = document.createElement('div');
          overlay.classList.add('form-overlay');
          const form = document.createElement('form');
          form.classList.add('form');
          form.insertAdjacentHTML('beforeend', `
            <button class="close" type="button"></button>
            <h2 class="form-title">Добавить контакт</h2>
            <div class="form-group">
              <label class="form-label" for="name">Имя:</label>
              <input class="form-input" name="name" id="name" type="text" required>
            </div>
             <div class="form-group">
              <label class="form-label" for="surname">Фамилия:</label>
              <input class="form-input" name="surname" id="surname" type="text" required>
            </div>
             <div class="form-group">
              <label class="form-label" for="phone">Телефон:</label>
              <input class="form-input" name="phone" id="phone" type="number" required>
            </div>
          `);
            const buttonGroup = createButtonsGroup([
                {
                    className: 'btn btn-primary mr-3',
                    type: 'submit',
                    text: 'Добавить',
                },
                {
                    className: 'btn btn-danger',
                    type: 'reset',
                    text: 'Отмена',
                },

            ]);
            form.append(...buttonGroup.btns);
            overlay.append(form);
            return {
                overlay,
                form,
            }
    };

    const createFooter = (title) => {
        const footer = document.createElement('footer');
        footer.classList.add('footer');
        footer.insertAdjacentHTML('beforeend', `<p>Все права защищены &#169${title}</p>`)
        return footer;
    };
    const renderPhoneBook = (app, title) => {
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

    const createRow = ({name: firstName, surname, phone}) => {
        const tr = document.createElement('tr');
        tr.classList.add('contact');
        const tdDel = document.createElement('td');
        tdDel.classList.add('delete');
        const buttonDel = document.createElement('button');
        buttonDel.classList.add('del-icon');
        tdDel.append(buttonDel);
        const tdName = document.createElement('td');
        tdName.textContent = firstName;
        const tdSurname = document.createElement('td');
        tdSurname.textContent = surname;
        const tdPhone = document.createElement('td');
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel${phone}`
        phoneLink.textContent = phone;
        tr.phoneLink = phoneLink;
        tdPhone.append(phoneLink);
        tr.append(tdDel, tdName, tdSurname, tdPhone);
        return tr;
    }

    function getStorage (dataKey) {
        return JSON.parse(localStorage.getItem(dataKey)) || [];
    }



    function setStorage (dataKey, obj) {
        const data = getStorage(dataKey);
        data.push(obj);
        localStorage.setItem(dataKey, JSON.stringify(data));
    }

    function  removeStorage (phone) {
        const data = getStorage('dataKey');
        data.forEach((obj, index) => {
            if (obj.phone === phone) {
                data.splice(index, 1);
            }

        })
       localStorage.setItem('dataKey', JSON.stringify( data));
    }


    const renderContacts = elem => {
        const allRow =  getStorage('dataKey').map(createRow);
        elem.append(...allRow);
        return allRow;
    };

    const hoverRow = () => {
        const allRow = document.querySelectorAll('.contact');
        const logo = document.querySelector('.logo');
        const text = logo.textContent;
        allRow.forEach(contact => {
            contact.addEventListener('mouseenter', () => {
                logo.textContent = contact.phoneLink.textContent;
            })
            contact.addEventListener('click', (e) => {
                if (e.target.closest('.delete')) {
                    logo.textContent = text;
                }
            })
        })

        allRow.forEach(contact => {
            contact.addEventListener('mouseleave', () => {
                logo.textContent = text;
            })
        })
    };

    const modalControl = (btnAdd, formOverlay) => {
        const openModal = () => {
            formOverlay.classList.add('is-visible');
        }

        const closeModal = () => {
            formOverlay.classList.remove('is-visible');
        }
        btnAdd.addEventListener('click', openModal);

        formOverlay.addEventListener('click', (e) => {
            const target = e.target;
            if (target === formOverlay || target.classList.contains('close')) {
                closeModal();
            }
        });
        return {
            closeModal,
        }
    };
    const deleteControl = (btnDel, list) => {
        btnDel.addEventListener('click', () => {
            document.querySelectorAll('.delete').forEach(del => {
                del.classList.toggle('is-visible');
            })
        });

        list.addEventListener('click', e => {
            if (e.target.closest('.del-icon')) {
                const phone = e.target.closest('.contact').querySelector('a').textContent;
                removeStorage(phone);
                e.target.closest('.contact').remove();
            }
        });
    }

    const addContactPage = (obj, list) => {
        list.append(createRow(obj));
        setStorage('dataKey', obj);
    };

    const formControl = (form, list, closeModal) => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newContact = Object.fromEntries(formData);
            addContactPage(newContact, list);
            hoverRow();
            form.reset();
            closeModal();
        })
    }

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

    }
    window.phoneBookInit = init;
}
