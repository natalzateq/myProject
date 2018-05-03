import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService} from '../user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  // users: User[];
  users: any;



  constructor(private userService: UserService) {

  }

  ngOnInit() {

    this.getUsers();

  }



  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  console.log(this.users);
  }

  add(nombres_user: string, apellidos_user: string, username: string, password: string): void {
    nombres_user = nombres_user.trim();
    if (!nombres_user) { return; }
    const newUser: User = {
      id_user: 0,
      nombres_user: nombres_user,
      apellidos_user: apellidos_user,
      username: username,
      password: password

    };
    this.userService.addUser(newUser )
      .subscribe(user => {
        this.users.push(user), location.reload();
      });
  }

  delete(user: User): void {
    if (confirm('Are you sure you want to delete it?')) {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe();
    }
  }


}
