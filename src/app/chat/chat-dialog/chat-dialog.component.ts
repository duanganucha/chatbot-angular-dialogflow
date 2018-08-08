import { Component, OnInit  } from '@angular/core';
import { ChatService, Message } from '../../chat.service';
// import 'rxjs/add/operator/scan';

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

  yHeight = 0 ;

  constructor(private chat: ChatService) { }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';

    this.messages.forEach((element) => {
      console.log(element)
      var message = element[element.length - 1]
      console.log(message.content)
    });

    this.yHeight += 200;

    this.scrollToBottom();
   
  }
  
  scrollToBottom() {
    setTimeout(() => {
      window.scroll({ top : this.yHeight , behavior: 'smooth' });
    },500);

  }
  scrollToTop() {
    window.scroll({ top: 0, behavior: 'smooth'});
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
