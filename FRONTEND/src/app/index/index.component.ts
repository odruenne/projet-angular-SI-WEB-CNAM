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
  accountDeletedMessage: string | null = null;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.accountDeletedMessage = this.messageService.getMessage();
    if (this.accountDeletedMessage != null) {
      this.showDeletedAccountMessage = true;
    }
  }
}