import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../../chat.service';
// import 'rxjs/add/operator/scan';

import { of } from 'rxjs';
import { scan } from 'rxjs/operators';

import { Observable } from '../../../../node_modules/rxjs';

Observable


@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;

  constructor(private chat: ChatService) { }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';

    this.messages.forEach((element) => {
      console.log(element)
    });
    
  }

  ngOnInit() {


    // this.chat.talk();
    // appends to array after each new message is added to feedSource
    //   this.messages = this.chat.conversation.asObservable()
    //     .scan((acc, val) => acc.concat(val));
    this.messages = this.chat.conversation.pipe(
      scan((acc, val) => acc.concat(val))
    )
  }

}
