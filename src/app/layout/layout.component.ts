import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.isLoggedIn = !!user;
      if (user && user.email === 'adm@adm.com') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }

  logout(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['layout/login']);
    });
  }
}