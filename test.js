import MESSAGE from '../constants/message';
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
export default class Validator {
  constructor(formSelector, confirmSelector) {
    this.formSelector = formSelector;
    this.formElement = document.querySelector(this.formSelector);
    this.formRules = {};

    /**
     * @param {value}
     * Have error return value
     * No error return undefined
     */
    this.validatorRules = {
      required: (value) => (value ? undefined : MESSAGE.MESSAGE_FIELD_REQUIRED),
      email: (value) =>
        MESSAGE.REGEX_EMAIL.test(value)
          ? undefined
          : MESSAGE.MESSAGE_EMAIL_FORMAT,
      min: (min) => (value) =>
        value.length >= min
          ? undefined
          : `Please enter at least ${min} characters`,
      positiveNumbers: (value) =>
        value > 0 ? undefined : MESSAGE.MESSAGE_NUMBER_MIN,
      confirmed: (value) => {
        const confirmValue = document.querySelector(confirmSelector).value;
        if (confirmValue) {
          return value === confirmValue
            ? undefined
            : MESSAGE.MESSAGE_PASSWORD_CONFIRM;
        }
      },
      file: (type) =>
        type === 'image/jpeg' ? undefined : MESSAGE.MESSAGE_FILE_FORMAT,
    };
    this.handleEvent();
  }

  getParent = (element, selector) => {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  };

  handleEvent = () => {
    // Only handle have formElement
    if (this.formElement) {
      const inputs = this.formElement.querySelectorAll('[name][rules]');
      let rule;

      // eslint-disable-next-line no-restricted-syntax
      for (const input of inputs) {
        const rules = input.getAttribute('rules').split('|');
        let ruleInfo;

        // eslint-disable-next-line no-restricted-syntax
        for (rule of rules) {
          const isRuleHasValue = rule.includes(':');
          if (isRuleHasValue) {
            ruleInfo = rule.split(':');

            // eslint-disable-next-line prefer-destructuring
            rule = ruleInfo[0];
          }
          let ruleFunc = this.validatorRules[rule];
          if (isRuleHasValue) {
            ruleFunc = ruleFunc(ruleInfo[1]);
          }

          // Add rule like array to formRules
          if (Array.isArray(this.formRules[input.name])) {
            this.formRules[input.name].push(ruleFunc);
          } else {
            this.formRules[input.name] = [ruleFunc];
          }
        }

        // Implement event (blur, change,...)
        input.onblur = this.handleValidate;
        input.oninput = this.handleClearError;
      }
    }
  };

  handleValidate = (event) => {
    const rules = this.formRules[event.target.name];

    let errorMessage;
    rules.find((rule) => {
      if (rule.name === 'file') {
        if (event.target.files[0]) {
          errorMessage = rule(event.target.files[0].type);
        }
      } else {
        errorMessage = rule(event.target.value);
      }
      return errorMessage;
    });

    if (errorMessage) {
      const formGroup = this.getParent(event.target, '.form-group');
      if (formGroup) {
        formGroup.classList.add('invalid');
        const formMessage = formGroup.querySelector('.text-error');
        if (formMessage) {
          formMessage.innerText = errorMessage;
        }
      }
    }

    return !errorMessage;
  };

  handleClearError = (event) => {
    const formGroup = this.getParent(event.target, '.form-group');
    const formMessage = formGroup.querySelector('.text-error');

    if (formGroup.classList.contains('invalid')) {
      formGroup.classList.remove('invalid');
    }

    if (formMessage) {
      formMessage.innerText = '';
    }
  };

  submitForm = (handler) => {
    let invalid = true;
    const inputs = this.formElement.querySelectorAll('[name][rules]');

    // eslint-disable-next-line no-restricted-syntax
    for (const input of inputs) {
      if (
        !this.handleValidate({
          target: input,
        })
      ) {
        invalid = false;
      }
    }
    if (invalid) {
      const enableInputs = this.formElement.querySelectorAll('[name]');

      // Get value input and convert to object
      const formValues = Array.from(enableInputs).reduce((values, input) => {
        switch (input.type) {
          case 'radio':
            values[input.name] = this.formElement.querySelector(
              `input[name="${input.name}"]:checked`,
            ).value;
            break;
          case 'checkbox':
            if (!input.matches(':checked')) {
              values[input.name] = '';
              return values;
            }
            if (!Array.isArray(values[input.name])) {
              values[input.name] = [];
            }
            values[input.name].push(input.value);
            break;
          case 'file':
            values[input.name] = input.files[0]
              ? `/assets/${input.files[0].name}`
              : input.getAttribute('value');
            break;
          default:
            values[input.name] = input.value.trim();
            break;
        }
        return values;
      }, {});
      handler(formValues);
    }
  };
}
