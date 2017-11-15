import {observable, action, computed, autorun, extendObservable} from "mobx";
import FormStore from './FormStore';
import toastr from 'toastr';
import {browserHistory} from 'react-router';


export default class LoginFormStore extends FormStore {

  constructor(validatedInputs, loginStore) {
    super(validatedInputs);
    this.loginStore = loginStore;
    toastr.options.positionClass = "toast-bottom-right";
    this.toastr = toastr;
  }

  @action
  resetState() {
    this.password.value = '';
    this.saving = false;
  }

  @action
  loginUser = (event) => {
    this.resetErrors();
    this.saving = true;
    event.preventDefault();

    this.validate(4);

    if (this.hasErrors) {
      this.resetState();
      return;
    }

    this.loginStore.Login(this.data)
      .then(isSuccessful => {
        if (isSuccessful) {
          window.scrollTo(0, 0);
          browserHistory.push('/profiles/new/');

          this.toastr.success('Login gennemført');
        } else {
          this.toastr.error('Login fejlede pga. ugyldigt brugernavn eller kodeord.');
        }
        this.resetState();
      });
  };

}
