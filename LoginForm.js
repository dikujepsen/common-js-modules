import {Component} from 'react';
import TextInput from '../common/TextInput';
import LabeledInput from '../common/LabeledInput';
import {observer, inject} from "mobx-react";
import LoginFormStore from '../../store/LoginFormStore';
import React from 'react';


@inject("loginStore") @observer
export default class LoginForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.loginFormStore = new LoginFormStore([
      {name: 'username',label: 'Brugernavn'},
      {name: 'password',label: 'Kodeord'}
    ], this.props.loginStore);

  }

  render () {
    return (
    <form>
      <h3>
        Login
      </h3>
      <TextInput
        validatedInput={this.loginFormStore.username}
      />

      <LabeledInput
        validatedInput={this.loginFormStore.password}
        input_type="password"
      />

      <input
        type="submit"
        disabled={this.loginFormStore.saving}
        value={this.loginFormStore.saving ? 'Logger ind...' : 'Log ind'}
        onClick={this.loginFormStore.loginUser}
        className="btn btn-primary"/>

    </form>
    )
  };
};


