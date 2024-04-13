import { Component, HostListener,HostBinding, effect, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  userDetails: any;
  userRepos: any[] = [];
  userName: string = '';
  itemsPerPage: number = 10;
  totalPages: number = 0;
  totalItems: number = 0;
  currentPage: number = 1;
  isLoading: boolean = false;
  isSuccess: boolean = true;

  constructor(private apiService: ApiService) {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
  }

  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'true')
  );

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  searchUser(userName: string) {
    this.userName = userName;
    this.currentPage = 1;
    this.fetchUserDetails(this.userName);
  }

  ngOnInit() {
    this.fetchUserDetails(this.userName);
  }

  fetchUserDetails(name: string) {
    if(name === '') {
      return;
    }

    this.isLoading = true;
    this.apiService.getUser(this.userName).subscribe((data: any) => {
      console.log(data);
      this.userDetails = data;
      this.totalItems = data.public_repos;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.fetchUserRepos(data.repos_url, this.currentPage, this.itemsPerPage);
      this.isSuccess = true;
    },
    (error) => {
      if (error.status === 404) {
        console.log('User not found');
        this.isSuccess = false;
      } else {
        console.error('Error fetching user details:', error);
      }
    },
    () => {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }

  fetchUserRepos(reposUrl: string, page: number, itemsPerPage: number) {
    //this.isLoading = true;
    const startIndex = (page - 1) * itemsPerPage;
    const apiUrl = `${reposUrl}?page=${page}&per_page=${itemsPerPage}`;
    this.apiService.getRepos(apiUrl).subscribe((repos: any[]) => {
      this.userRepos = repos;
      this.loadLanguagesForRepos();
    });
  }

  loadLanguagesForRepos() {
    for (const repo of this.userRepos) {
      this.apiService.getRepoLanguages(this.userName, repo.name).subscribe((languages: any) => {
        repo.languages = Object.keys(languages);
      });
    }
  }

  handlePageChange(action: string | number) {
    if (action === 'prev' && this.currentPage > 1) {
      this.currentPage--;
      this.fetchUserRepos(this.userDetails.repos_url, this.currentPage, this.itemsPerPage);
    } else if (action === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchUserRepos(this.userDetails.repos_url, this.currentPage, this.itemsPerPage);
    } else if (typeof action === 'number' && action >= 1 && action <= this.totalPages) {
      this.currentPage = action;
      this.fetchUserRepos(this.userDetails.repos_url, this.currentPage, this.itemsPerPage);
    }
  }

  calculateTotalPages(totalItems: number, itemsPerPage: number): number[] {
    this.totalPages = Math.ceil(totalItems / itemsPerPage);
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updateItemsPerPage(itemsPerPage: number) {
    this.currentPage = 1;
    this.itemsPerPage = itemsPerPage;
    this.fetchUserDetails(this.userName);
  }

  updateUserName() {
    this.currentPage = 1;
    this.fetchUserDetails(this.userName);
  }

  changeNameAndFetchData(newName: string) {
    this.userName = newName;
    this.updateUserName();
  }
}
