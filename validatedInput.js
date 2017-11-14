import {observable, action, computed} from "mobx";


export default class validatedInput {
  @observable error = "";
  @observable value = "";

  constructor(name, label) {
    this.name = name;
    this.label = label;
  }

  validate = (minimumLength) => {
    if (this.value.length < minimumLength) {
      this.error = this.label + " skal have mindst " + minimumLength + " tegn.";
    }
  };

  @action onChange = (event) => {
    this.value = event.target.value;
  };

}
