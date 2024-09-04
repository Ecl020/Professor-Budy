import { Component } from '@angular/core';
import { GeminiService } from '../gemini.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  
  school: string = '';
  
  prompt: string = '';
  jsonResponse: any = null; // To store the JSON response
  textResponse: string = ''; // To store the text response
  loading: boolean = false;
  adviceType: string = 'positive'; // Default value
  topic: string = 'scholarships';  // Default value
  premadResponse:string = '';
  categorizedInterests: { name: string, interests: string[] }[] = [
    // General Interests
    { name: 'Hobbies', interests: ['Reading', 'Gaming', 'Cooking', 'Gardening', 'DIY Projects', 'Crafts'] },
    { name: 'Activities', interests: ['Sports', 'Travel', 'Fitness', 'Volunteering', 'Outdoor Adventures', 'Music Festivals'] },
    { name: 'Art & Culture', interests: ['Music', 'Art', 'Photography', 'Theater', 'Dance', 'Literature'] },
    { name: 'Technology', interests: ['Technology', 'Programming', 'Gaming', 'Robotics', 'AI', 'Web Development'] },
  
    // College Freshman Specific
    { name: 'College Life', interests: ['Campus Events', 'Student Organizations', 'Academic Clubs', 'Study Groups', 'Networking Events', 'Career Services'] },
    { name: 'Academic Interests', interests: ['STEM', 'Humanities', 'Social Sciences', 'Business', 'Health Sciences', 'Arts'] },
    { name: 'Campus Resources', interests: ['Library', 'Academic Advising', 'Counseling Services', 'Fitness Center', 'Dining Options', 'Student Housing'] },
  
    // High School Specific
    { name: 'High School Activities', interests: ['Sports Teams', 'Debate Club', 'Student Government', 'Academic Competitions', 'Band', 'Drama Club'] },
    { name: 'College Prep', interests: ['SAT/ACT Prep', 'College Applications', 'Scholarship Searches', 'Interview Skills', 'Extracurriculars', 'Letters of Recommendation'] },
    { name: 'Youth Programs', interests: ['Summer Camps', 'Leadership Programs', 'Mentorship', 'Community Service', 'Internships', 'Workshops'] },
  
    // Community of Color
    { name: 'Cultural Interests', interests: ['Cultural Festivals', 'Heritage Celebrations', 'Language Learning', 'Traditional Arts', 'Cultural Workshops', 'Community Gatherings'] },
    { name: 'Support Networks', interests: ['Mentorship Programs', 'Scholarship Opportunities', 'Black People', 'Networking Events', 'Support Groups', 'Cultural Associations'] },
    { name: 'Diversity & Inclusion', interests: ['Diversity Initiatives', 'Inclusion Workshops', 'Cultural Awareness Training', 'Anti-Racism Education', 'Equity Programs', 'Community Advocacy'] }
  ];
  selectedInterests: string[] = [];
  onInterestChange(event: any, interest: string) {
    if (event.target.checked) {
      this.selectedInterests.push(interest);
    } else {
      const index = this.selectedInterests.indexOf(interest);
      if (index > -1) {
        this.selectedInterests.splice(index, 1);
      }
    }
  }

  // sendPrefilledResponse() {
  //   const prompt = `Give a ${this.adviceType} word of advice about ${this.topic}, keep it ${this.adviceType}`;
  //   this.sendPremmadeData(prompt);
  // }
  sendInterestData() {
    if (this.selectedInterests.length === 0) {
      alert('Please select at least one interest.');
      return;
    }

    const prompt = `Please find scholarships related to  ${this.selectedInterests.join(', ')}. I'm planning to attend ${this.school}. 

Please provide the results in the following JSON format:

{
  "scholarships": [
    {
      "name": "Scholarship Name",
      "requirements": "Eligibility requirements and criteria for the scholarship.",
      "application_deadline": "Application deadline date.",
      "how_to_apply": "Instructions or a link on how to apply.",
      "additional_info": "Any other relevant information, such as award amount or specific considerations."
    },
    ...
  ]
}

Make sure the information is up-to-date and includes working links to the application or official websites.
`;
    this.sendPremmadeData(prompt);
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

  
  constructor(private geminiService: GeminiService) { }
  async sendJsonData() {
    if (this.prompt) {
      this.loading = true;
      this.jsonResponse = await this.geminiService.generateTextJson(this.prompt);
      this.loading = false;
    }
  }
}
