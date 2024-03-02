import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private actualizar: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.isAdmin = await this.userService.imAdmin();
    this.userService.adminStatus$.subscribe((status: boolean) => {
      this.isAdmin = status;
    });
  }
}
