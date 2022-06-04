import {getStorage, removeStorage, setStorage as setContact} from "./serviceStorage.js";
import elements from "./createElements.js";
const {createRow} = elements;
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
};
const addContactPage = (obj, list) => {
    list.append(createRow(obj));
    setContact('dataKey', obj);
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
export default {modalControl, deleteControl, formControl, addContactPage, hoverRow};
