import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private title: string | null = null;
  private message: string | null = null;

  setMessage(title: string, message: string): void {
    this.title = title;
    this.message = message;
  }

  getMessage(): { title: string | null, message: string | null } {
    const tempTitle = this.title;
    const tempMessage = this.message;
    this.title = null; 
    this.message = null; 
    return { title: tempTitle, message: tempMessage };
  }
}
