export class FormValidator{
    constructor(validationProperties, form) {
        this._validationProperties = validationProperties;
        this._form = form
        this._formInputList = Array.from(form.querySelectorAll(validationProperties.inputSelector))
        this._saveButton = form.querySelector(validationProperties.submitButtonSelector)
    }

    enableValidation() {
        this._formInputList.forEach(formInput => {
            const inputErrorElement = this._form.querySelector(`.${formInput.id}-error`);
            this._addFormInputValidationListeners(formInput, inputErrorElement)
        })
    }

    _addFormInputValidationListeners(formInput, inputErrorElement) {
        formInput.addEventListener('input', () => {
            this._toggleSaveButtonState();
            this._toggleInputErrorState(formInput, inputErrorElement)
        })
    }

    _toggleSaveButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSaveButton();
        } else {
            this.enableSaveButton();
        }
    }

    disableSaveButton() {
        this._saveButton.setAttribute('disabled', true);
        this._saveButton.classList.add(this._validationProperties.inactiveButtonClass);
    }

    enableSaveButton() {
        this._saveButton.removeAttribute('disabled');
        this._saveButton.classList.remove(this._validationProperties.inactiveButtonClass);
    }

    _hasInvalidInput() {
        return this._formInputList.some(inputElement => {
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
        this._formInputList.forEach(formInput => {
            const formInputError = this._form.querySelector(`.${formInput.id}-error`);
            this._hideInputErrorMessage(formInput, formInputError)
        })
    }
}
