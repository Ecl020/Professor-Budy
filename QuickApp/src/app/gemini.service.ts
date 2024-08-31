import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private generativeAi:GoogleGenerativeAI;
  private messageHistory: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { 
    this.generativeAi = new GoogleGenerativeAI(environment.googleGenerativeAIKey);
  }

  async generateText(prompt:string){
    const model = this.generativeAi.getGenerativeModel({model: 'gemini-pro'});
    this.messageHistory.next({
      from: 'user',
      message: prompt
    })
    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();
    console.log(text);
    this.messageHistory.next({
      from:'bot',
      message:text
    })
    return text
  }
  async generateTextJson(prompt: string): Promise<any> {
    const model = this.generativeAi.getGenerativeModel({ model: 'gemini-pro' });

    this.messageHistory.next({
      from: 'user',
      message: prompt
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    const jsonResponse = {
      prompt: prompt,
      responseText: text
    };

    return jsonResponse;
  }

  public getMessageHistory(): Observable<any>{
    return this.messageHistory.asObservable();
  }
}
