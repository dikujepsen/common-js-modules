import {observable, action, computed} from "mobx";
import validatedInput from './validatedInput';

export default class validatedForm {
  constructor(validatedInputs) {
    this.validatedInputs = validatedInputs;
    for (let validatedInput of this.validatedInputs) {
      this[validatedInput.name] = validatedInput;
    }
  }

  validate = (minimumLength) => {
    for (let validatedInput of this.validatedInputs) {
      validatedInput.validate(minimumLength);
    }
  };

  @computed get hasErrors() {
    let hasError = false;
    for (let validatedInput of this.validatedInputs) {
      hasError = hasError && validatedInput.error
    }
    return hasError;
  }

  @action resetErrors() {
    for (let validatedInput of this.validatedInputs) {
      validatedInput.error = "";
    }
  }

  updateValue = (name, newValue) => {
    this[name].value = newValue;
  };

  data = () => {
    let postData = {};
    for (let validatedInput of this.validatedInputs) {
      postData[validatedInput.name] = validatedInput.value;
    }
    return postData;
  };

}
