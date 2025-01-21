import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageService } from '../services/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  showDeletedAccountMessage : boolean = false;
  shownMessage: string | null = "";
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    const { title, message } = this.messageService.getMessage();
    if (title === "confirmationSuppression") {
      this.showDeletedAccountMessage = true;
      this.shownMessage = message;
    }
  }
}