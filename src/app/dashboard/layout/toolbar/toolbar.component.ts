import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../pages/users/models';
import { Observable } from 'rxjs';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input()
  public drawer?: MatDrawer;

  public authUser$: Observable<User | null>;

  constructor( private store: Store) {
    this.authUser$ = this.store.select(selectAuthUser)
  }
}
