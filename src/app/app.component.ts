import { FunctionService } from './rxjs/function.service';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
 
  @ViewChild('inputref') inputref!:ElementRef<HTMLInputElement>;

  constructor(
    // public readonly introductionService: IntroductionService
    public readonly functionService: FunctionService
  ){}


  ngAfterViewInit(): void {
    this.functionService.fromEvent(this.inputref)
    console.log('ngAfterViewInit', this.inputref.nativeElement);
  }


}
