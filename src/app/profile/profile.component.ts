import { Component, Input, signal  } from '@angular/core';
import { faUserGroup, faLink, faLocationDot, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  faUserGroup = faUserGroup;
  faLink = faLink;
  faLocationDot = faLocationDot;
  faUpRightFromSquare = faUpRightFromSquare;
  @Input() userDetails: any;
}
