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
  currentUser: User = { userName: '', email: '', password: '', address: '' };

  constructor(
    private userService: UserService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {}
}
