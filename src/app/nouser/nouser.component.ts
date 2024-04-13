import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-nouser',
  templateUrl: './nouser.component.html',
  styleUrls: ['./nouser.component.scss']
})
export class NouserComponent {
  @Input() isSuccess: boolean = true;
}
