import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js";

const buttonEdit = document.querySelector('.profile__button-edit')
const buttonAdd= document.querySelector('.profile__button-add')
const popupEdit = document.querySelector('.popup_mode-edit')
const popupAdd = document.querySelector('.popup_mode-add')
const popupList = document.querySelectorAll('.popup')

const profileName = document.querySelector ('.profile__name')
const profileJob = document.querySelector ('.profile__job')

const inputName = document.querySelector('.popup__input_type_name')
const inputJob = document.querySelector('.popup__input_type_job')
const inputPlace = document.querySelector('.popup__input_type_place')
const inputLink = document.querySelector('.popup__input_type_link')

const elementTemplateSelector = '.element-template'
const elementContainer = document.querySelector('.elements')

const formEdit = document.querySelector('.popup__edit-form')
const formAdd = document.querySelector('.popup__add-form')

const validationProperties = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const initialCardList = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const formValidators = {}

initialCardList.forEach(card => {
    const newElement = createCardElement(card.name, card.link)
    elementContainer.append(newElement)
})

buttonEdit.addEventListener('click', () => {
    formValidators[ formEdit.name ].enableSaveButton()
    formValidators[ formEdit.name ].clearInputFieldsValidationErrors()
    openPopup(popupEdit)
    inputName.value = profileName.textContent
    inputJob.value = profileJob.textContent
})


buttonAdd.addEventListener('click', () => {
    formValidators[ formAdd.name ].disableSaveButton()
    formValidators[ formAdd.name ].clearInputFieldsValidationErrors()
    openPopup(popupAdd)
    formAdd.reset();
})

formEdit.addEventListener('submit', evt => {
    evt.preventDefault()
    profileName.textContent = inputName.value
    profileJob.textContent = inputJob.value
    closePopup(popupEdit)
})

formAdd.addEventListener('submit', evt => {
    evt.preventDefault()
    const newElement = createCardElement(inputPlace.value, inputLink.value)
    elementContainer.prepend(newElement)
    closePopup(popupAdd)
})

function createCardElement(cardName, cardLink) {
    const newCard = new Card(cardName,
        cardLink,
        elementTemplateSelector)
    return newCard.convertCardToElement()
}

popupList.forEach(onePopup => {
    onePopup.addEventListener('click', evt => {
        if (evt.target.classList.contains('popup') ||
            evt.target.classList.contains('popup__button-close') ||
            evt.target.classList.contains('popup__close-image')) {
            closePopup(onePopup)
        }
    })
})

function findAndCloseActivePopup() {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closePopupByEscape)
}

export function openPopup(popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', closePopupByEscape)
}

const closePopupByEscape = function(evt) {
    if (evt.key === 'Escape') {
        findAndCloseActivePopup()
    }
}


enableValidation(validationProperties)

function enableValidation(validationProperties) {
    const formList = document.querySelectorAll(validationProperties.formSelector)
    formList.forEach(form => {
        const newValidator = new FormValidator(validationProperties, form)
        formValidators[ form.name ] = newValidator;
        newValidator.enableValidation()
    })
}
