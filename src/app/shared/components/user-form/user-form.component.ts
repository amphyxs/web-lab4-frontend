import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

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
    
    try {
      if (this.isRegistering) {
        this._authService.register(credentials);
      } else {
        this._authService.login(credentials);
      }
      
      this._router.navigate(['/']);
    } catch (err) {
      alert(err);
    } 
  }
  
}
