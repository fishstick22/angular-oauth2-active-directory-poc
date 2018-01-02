import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Hero } from './hero';
import { AuthService } from './auth.service';
import { RestService } from './rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Oauth2 Active Directory POC App';
  closeResult: string;
  heroes: Hero[] = [];
  creds: any = {username: '', password: ''};
  loading = false;
  error = '';

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private restService: RestService
  ) { }

  ngOnInit(): void {

    // this.login('jburkholder', 'kcitshsif');

  }

  openLoginModal(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  submitLogin(closeFunc) {
    console.log('submitLogin', closeFunc);
    this.login(this.creds.username, this.creds.password);
    if (typeof closeFunc === 'function') {
      closeFunc('close submitLogin');
    }
  }

  login(username: string, password: string) {
    this.loading = true;
    // this.authService.login(this.model.username, this.model.password)
    this.authService.login(username, password)
      .subscribe(result => {
          if (result === true) {
              // login successful
              // this.router.navigate(['home']);
              this.getHeroes();
          } else {
              // login failed
              this.error = 'Username or password is incorrect';
              this.loading = false;
          }
      }, error => {
        this.loading = false;
        this.error = error;
      });
  }

  getHeroes() {
    this.restService.getHeroes()
      .then(heroes => {
        this.heroes = heroes;
        console.log('AppComponent OnInit:', this.heroes);
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
