import { openPopup } from "./index.js";

const popupView = document.querySelector('.popup_mode-view')
const elementPhotoView = document.querySelector('.element-view__photo')
const elementPhotoViewCaption = document.querySelector('.element-view__name')

export class Card {
    constructor(name, link, templateSelector){
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }

    convertCardToElement(){
        const newElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.list-element')
            .cloneNode(true)
        const newElementImage = newElement.querySelector('.element__photo')
        this._fillCardLayout(newElement, newElementImage)
        this._addEventListeners(newElement, newElementImage)
        return newElement
    }

    _fillCardLayout(newElement, newElementImage) {
        newElementImage.src = this._link
        newElementImage.alt = this._name
        newElement.querySelector('.element__name').textContent = this._name
    }

    _addEventListeners(newElement, newElementImage) {
        this._addListenerToSwitchLike(newElement)
        this._addEventListenerToDeleteElement(newElement)
        this._addEventListenerToOpenViewPopup(newElementImage)
    }

    _addListenerToSwitchLike(newElement) {
        newElement
            .querySelector('.element__like-button')
            .addEventListener( 'click', (evt) => this._switchLike(evt.target))
    }

    _addEventListenerToDeleteElement(newElement) {
        newElement
            .querySelector('.element__button-remove')
            .addEventListener('click', () => this._deleteElement(newElement))
    }

    _addEventListenerToOpenViewPopup(newElementImage) {
        newElementImage.addEventListener('click', () => this._openPhotoViewPopup())
    }

    _openPhotoViewPopup() {
        openPopup(popupView)
        elementPhotoView.src = this._link
        elementPhotoViewCaption.textContent = this._name
        elementPhotoView.alt = this._name
    }

    _deleteElement(newElement) {
        newElement.remove()
    }

    _switchLike(likeButton) {
        likeButton.classList.toggle('element__like-button_active')
    }
}
