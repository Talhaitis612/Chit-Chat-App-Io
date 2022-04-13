import { Component } from '@angular/core';
import { ChatService } from '../app/Services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'socket.io';
  public roomId!: string;
  public messageText!: string;
  public messageArray: { user: string; message: string }[] = [];
  private storageArray: any = [];
  status = false;
  public showScreen = false;
  public showLogin = true;
  public phone!: string;
  public currentUser: any;
  public selectedUser: any;
  filteredlist: any = [];
  meUser: any = [];

  public userList: any = [
    {
      id: 1,
      name: 'Sir Zeeshan',
      phone: '1',
      image: '../assets/user/user-1.png',
      roomId: {
        2: 'room-1',
        3: 'room-2',
        4: 'room-3',
      },
    },
    {
      id: 2,
      name: 'M. Sohaib',
      phone: '2',
      image: '../assets/user/user-2.png',
      roomId: {
        1: 'room-1',
        3: 'room-4',
        4: 'room-5',
      },
    },
    {
      id: 3,
      name: 'M. Talha',
      phone: '3',
      image: '../assets/user/user-3.png',
      roomId: {
        1: 'room-2',
        2: 'room-4',
        4: 'room-6',
      },
    },
    {
      id: 4,
      name: 'Lakhan',
      phone: '765',
      image: '../assets/user/user-4.png',
      roomId: {
        1: 'room-3',
        2: 'room-5',
        3: 'room-6',
      },
    },
  ];

  constructor(private chatService: ChatService) {
    this.promptFunction();
  }
  promptFunction() {
    this.currentUser = prompt('Please enter your Phone...');
    this.login(this.currentUser.toString());
  }
  login(findUser: any): void {
    this.currentUser = this.userList.find((user: any) => {
      if (user.phone === findUser) {
        this.status = true;
      }
    });
    this.userList.filter((user: any) => {
      if (user.phone != findUser) {
        this.filteredlist.push(user);
      } else {
        user.mine = true;
        this.meUser.push(user); // for active user (me)
      }
    });
    if (this.status == true) {
      this.showLogin = false;
      this.showScreen = true;
    } else {
      alert('User Not found');
    }
  }
  ngOnInit(): void {
    this.chatService
      .getMessage()
      .subscribe(
        (data: {
          user: string;
          room: string;
          message: string;
          mine: boolean;
        }) => {
          this.messageArray.push(data);
          // console.log('Message Array: ', this.messageArray)
          // if (this.roomId) {
          //   setTimeout(() => {
          //     // this.storageArray = this.chatService.getStorage();
          //     // console.log('Message Array: ', this.messageArray)
          //     // const storeIndex = this.messageArray.findIndex(
          //     //   (storage: any) => storage.roomId === this.roomId
          //     // );
          //     // console.log(storeIndex)
          //     // this.messageArray = this.storageArray[storeIndex].chats;
          //   }, 500);
          // }
        }
      );
  }
  selectUserHandler(phone: string): void {
    this.selectedUser = this.userList.find((user: any) => user.phone === phone);
    this.roomId = this.selectedUser.roomId[this.meUser[0].id];
    this.messageArray = [];
    // this.storageArray = this.chatService.getStorage();
    // const storeIndex = this.storageArray.findIndex(
    //   (storage: any) => storage.roomId === this.roomId
    // );
    // if (storeIndex > -1) {
    //   this.messageArray = this.storageArray[storeIndex].chats;
    // }
    this.join(this.meUser[0].name, this.roomId);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({ user: username, room: roomId });
  }

  sendMessage() {
    this.chatService.sendMessage({
      user: this.meUser[0].name,
      room: this.roomId,
      message: this.messageText,
    });


    // this.storageArray = this.chatService.getStorage();
    // const storeIndex = this.storageArray.findIndex(
    //   (storage: any) => storage.roomId === this.roomId
    // );
    // console.log(this.meUser[0].name,' : ', this.roomId)
    // console.log(this.messageText)
    // if (storeIndex > -1) {
    //   this.storageArray[storeIndex].chats.push({
    //     user: this.meUser[0].name,
    //     message: this.messageText,
    //   });
    // } else {
    //   const updateStorage = {
    //     roomId: this.roomId,
    //     chats: [
    //       {
    //         user: this.meUser[0].name,
    //         message: this.messageText,
    //       },
    //     ],
    //   };
    //   this.storageArray.push(updateStorage);
    // }
    // this.chatService.returnMessage(this.messageText);

    this.messageText = '';
  }
}
