import { Component, inject, OnInit} from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { GeminiService } from '../gemini.service';
import { get } from 'http';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.css'
})
export class Page2Component implements OnInit {
  prompt: string = '';
  response:string = '';
  premadResponse:string = '';
  geminiService:GeminiService = inject(GeminiService);
  isChatOpen: boolean = false; // To track the chat container's state

  loading:boolean = false;
  chatHistory: any[] = [];
  state = AuthenticatorCompState.LOGIN;
  ngOnInit(): void {
    
  }
  constructor(){
    this.geminiService.getMessageHistory().subscribe((res) =>{
      if(res){
        this.chatHistory.push(res)
      }
    })
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

  toggleChat() {
    this.isChatOpen = !this.isChatOpen; // Toggle chat visibility
  }
  async sendData(){
    if(this.prompt){
      this.loading = true;
      const data = this.prompt;
      this.prompt = '';
      this.response = '';
      this.response = await this.geminiService.generateText(data);
      this.loading = false;
    }
  }
  async sendPremmadeData(premadePrompt?: string) {
    const promptToSend = premadePrompt || this.prompt;
    if (promptToSend) {
      this.loading = true;
      this.premadResponse = '';
      this.premadResponse = await this.geminiService.generatePreMadeText(promptToSend);
      this.loading = false;
    }
  }
}

export enum AuthenticatorCompState{
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
