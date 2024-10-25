import { Component, inject, OnInit} from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  private firestore = getFirestore();
  username: string = '';
  birthday: string = '';
  location: string = '';
  userid: string = '';

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
  async registerUser(registerEmail: HTMLInputElement,registerPassword:HTMLInputElement,registerConfirmPassword: HTMLInputElement,registerUsername: HTMLInputElement,
    registerBirthday: HTMLInputElement,) {

    const auth = getAuth();
    let email = registerEmail.value;
    let password = registerPassword.value
    let confirmPassword = registerConfirmPassword.value
    this.username = registerUsername.value;
    this.birthday = registerBirthday.value;
    if(this.isNotEmpty(email) && this.isNotEmpty(password)&& this.isNotEmpty(confirmPassword)&&this.isAMatch(password,confirmPassword)){
    try {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.userid = user.uid;
        console.log('User created successfully:', user);
        this.createUserProfile();
        Swal.fire('Success', 'Account created successfully!', 'success'); // Success alert

      })
      .catch((error) => {
        console.error('Error creating user:', error.message);
        Swal.fire('Error', `Error creating account: ${error.message}`, 'error'); // Error alert
      });
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

  async createUserProfile() {
    const docRef = doc(this.firestore, 'users', this.userid);

    const userProfileData = {
      username: this.username,
      birthday: this.birthday,
      location: this.location,
    };

    await setDoc(docRef, userProfileData)
      .then(() => {
        console.log('Profile created successfully in Firestore');
        Swal.fire('Success', 'Profile saved successfully!', 'success'); // Success alert
      })
      .catch(error => {
        console.error('Error creating profile in Firestore:', error.message);
        Swal.fire('Error', `Error saving profile: ${error.message}`, 'error'); // Error alert
      });
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
