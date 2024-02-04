import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

interface User {
  userName: string;
  email: string;
  password: string;
  address: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  currentUser: User = { userName: '', email: '', password: '', address: ''};

  constructor(
    private userService: UserService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
      this.httpClient
        .get<User>(
          `http://localhost:5215/api/Gumcraft/GetUserByEmail?email=${this.currentUser.email}`
        )
        .subscribe((userFromServer) => {
          this.currentUser = userFromServer; // Actualiza this.currentUser con los datos del servidor
          console.log(`Nombre de usuario: ${this.currentUser.userName}`); // Esto imprimirá el nombre del usuario
          console.log(`Correo electrónico: ${this.currentUser.email}`); // Esto imprimirá el correo electrónico del usuario
        });
    }
  }
}
