import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'mobile'];

  users: any[] = [];
  dataSource: MatTableDataSource<any>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe({
      next: response => {
        if(response){
          this.users = response;
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
        } else {
          console.log("Failed to get user details");
        }
      },
      error: err => {
        console.log("Failed to get user details. Error : ", err);
        if(err.status == 401){
          this.logout();
        }
      }
    });
  }

  logout(){
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

}
