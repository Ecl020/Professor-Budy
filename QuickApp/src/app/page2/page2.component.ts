import { Component, inject} from '@angular/core';

import { GeminiService } from '../gemini.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.css'
})
export class Page2Component {

  prompt: string = '';
  response:string = '';
  premadResponse:string = '';
  geminiService:GeminiService = inject(GeminiService);
  isChatOpen: boolean = false; // To track the chat container's state

  loading:boolean = false;
  chatHistory: any[] = [];
  constructor(){
    this.geminiService.getMessageHistory().subscribe((res) =>{
      if(res){
        this.chatHistory.push(res)
      }
    })
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
      this.premadResponse = await this.geminiService.generateText(promptToSend);
      this.loading = false;
    }
  }
}
