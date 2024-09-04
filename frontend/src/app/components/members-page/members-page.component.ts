import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-members-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './members-page.component.html',
  styleUrl: './members-page.component.css',
})
export class MembersPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
