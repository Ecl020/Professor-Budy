import { Component, inject, OnInit} from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  state = AuthenticatorCompState.LOGIN;

  ngOnInit(): void {
    
  }
  onLogin(){
    this.state = AuthenticatorCompState.LOGIN;
  }
  async loginUser(loginEmail:HTMLInputElement,loginPassword:HTMLInputElement){
    const auth = getAuth();
    let email = loginEmail.value
    let password = loginPassword.value
    if(this.isNotEmpty(email) && this.isNotEmpty(password)){
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email,password);
        const user = userCredential.user;
        console.log('Login Succesful:', user);
      } catch (error) {
        if (error instanceof Error) {
          // Using type assertion to handle 'unknown' type
          console.error('Error during registration:', error.message);
        } else {
          console.error('Unexpected error during registration');
        }
      }
    }

  }

  onForgotPassword(){
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }
  async ForgotPassword(resetEmail:HTMLInputElement){
    const auth = getAuth();
    let email = resetEmail.value
    if(this.isNotEmpty(email)){
      try {
        const userCredential = await sendPasswordResetEmail(auth, email);
        const user = userCredential;
        console.log('Login Succesful:', user);
      } catch (error) {
        if (error instanceof Error) {
          // Using type assertion to handle 'unknown' type
          console.error('Error during registration:', error.message);
        } else {
          console.error('Unexpected error during registration');
        }
      }
    }
  }
  onRegister(){
    this.state = AuthenticatorCompState.REGISTER;
  }
  async registerUser(registerEmail: HTMLInputElement,registerPassword:HTMLInputElement,registerConfirmPassword: HTMLInputElement) {

    const auth = getAuth();
    let email = registerEmail.value;
    let password = registerPassword.value
    let confirmPassword = registerConfirmPassword.value
    if(this.isNotEmpty(email) && this.isNotEmpty(password)&& this.isNotEmpty(confirmPassword)&&this.isAMatch(password,confirmPassword)){
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email,password);
      const user = userCredential.user;
      console.log('User registered:', user);
    } catch (error) {
      if (error instanceof Error) {
        // Using type assertion to handle 'unknown' type
        console.error('Error during registration:', error.message);
      } else {
        console.error('Unexpected error during registration');
      }
    }
  }
  }

  isLoginState(){
    return this.state == AuthenticatorCompState.LOGIN
  }
  isRegisterState(){
    return this.state == AuthenticatorCompState.REGISTER
  }
  isForgotPasword(){
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD
  }


  isNotEmpty(text:string){
    return text != null && text.length > 0;
  }
  isAMatch(text:string,comparedWith:string){
    return text == comparedWith
  }

  getStateText(){
    switch(this.state){
      case AuthenticatorCompState.LOGIN:
        return "Login";
      case AuthenticatorCompState.REGISTER:
        return "Register";
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return "Forgot Password";
    }
  }
}
export enum AuthenticatorCompState{
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
