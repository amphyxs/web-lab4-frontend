import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports: [FormsModule],
})
export class UserFormComponent {
  
  @Input() isRegistering: boolean = false;
  
  public username: string = '';

  public password: string = '';

  public get sumbitText(): string {
    return this.isRegistering ? 'Зарегистрироваться' : 'Войти';
  }

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  public processAuth(): void {
    const credentials = {
        username: this.username,
        password: this.password
    };
    
    let authObservable: Observable<Object>;

    if (this.isRegistering) {
      authObservable = this._authService.register(credentials);
    } else {
      authObservable = this._authService.login(credentials);
    }

    authObservable.subscribe({
      complete: () => this._router.navigate(['/']),
      error: (err) => alert(err.message),
    })
  }
  
}
