import {observable, action, computed, autorun, extendObservable} from "mobx";
import validatedInput from '../library/validation/validatedInput';

export default class FormStore {
  @observable saving = false;

  constructor(inputs) {
    this.validatedInputs = [];
    let inputMap = {};
    for (let input of inputs) {
      let newValidatedInput = new validatedInput(input.name, input.label);
      inputMap[input.name] = newValidatedInput;
      this.validatedInputs.push(newValidatedInput);
    }

    extendObservable(this, inputMap);
  }

  @action
  validate(minimumLength) {

    for (let validatedInput of this.validatedInputs) {
      validatedInput.validate(minimumLength);
    }
  }

  @action
  resetErrors() {
    for (let validatedInput of this.validatedInputs) {
      validatedInput.error = "";
    }
  }

  @computed
  get hasErrors() {
    let hasError = false;
    for (let validatedInput of this.validatedInputs) {
      hasError = hasError || Boolean(validatedInput.error);
    }
    return hasError;
  }

  @computed
  get data() {
    let postData = {};
    for (let validatedInput of this.validatedInputs) {
      postData[validatedInput.name] = validatedInput.value;
    }
    return postData;
  };

}
