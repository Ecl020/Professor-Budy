import { Component, inject } from '@angular/core';
import { GeminiService } from '../gemini.service';


@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css'
})
export class ChatBotComponent {
  prompt: string = '';
  response:string = '';
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
      await this.geminiService.generateText(data);
      this.loading = false;
    }
  }
}
