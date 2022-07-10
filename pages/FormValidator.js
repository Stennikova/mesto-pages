export class FormValidator{
    constructor(validationProperties, form) {
        this._validationProperties = validationProperties;
        this._form = form
    }

    enableValidation() {
        const formInputList = Array.from(this._form.querySelectorAll(this._validationProperties.inputSelector))
        formInputList.forEach(formInput => {
            const inputErrorElement = this._form.querySelector(`.${formInput.id}-error`);
            this._addFormInputValidationListeners(formInput, inputErrorElement, formInputList)
        })
    }

    _addFormInputValidationListeners(formInput, inputErrorElement, formInputList) {
        formInput.addEventListener('input', () => {
            this._toggleSaveButtonState(formInputList);
            this._toggleInputErrorState(formInput, inputErrorElement)
        })
    }

    _toggleSaveButtonState(inputList) {
        if (this._hasInvalidInput(inputList)) {
            this.disableSaveButton();
        } else {
            this.enableSaveButton();
        }
    }

    disableSaveButton() {
        const saveButton = this._form.querySelector(this._validationProperties.submitButtonSelector)
        saveButton.setAttribute('disabled', true);
        saveButton.classList.add(this._validationProperties.inactiveButtonClass);
    }

    enableSaveButton() {
        const saveButton = this._form.querySelector(this._validationProperties.submitButtonSelector)
        saveButton.removeAttribute('disabled');
        saveButton.classList.remove(this._validationProperties.inactiveButtonClass);
    }

    _hasInvalidInput(inputList) {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid;
        })
    }

    _toggleInputErrorState(formInput, inputErrorElement) {
        if (formInput.validity.valid) {
            this._hideInputErrorMessage(formInput, inputErrorElement)
        } else {
            this._showInputErrorMessage(formInput, inputErrorElement);
        }
    }

    _hideInputErrorMessage(formInput, inputErrorElement) {
        formInput.classList.remove(this._validationProperties.inputErrorClass);
        inputErrorElement.classList.remove(this._validationProperties.errorClass);
        inputErrorElement.textContent = '';
    }

    _showInputErrorMessage(formInput, inputErrorElement) {
        formInput.classList.add(this._validationProperties.inputErrorClass);
        inputErrorElement.classList.add(this._validationProperties.errorClass);
        inputErrorElement.textContent = formInput.validationMessage;
    }

    clearInputFieldsValidationErrors() {
        const formInputList = Array.from(this._form.querySelectorAll(this._validationProperties.inputSelector))
        formInputList.forEach(formInput => {
            const formInputError = this._form.querySelector(`.${formInput.id}-error`);
            this._hideInputErrorMessage(formInput, formInputError)
        })
    }
}
