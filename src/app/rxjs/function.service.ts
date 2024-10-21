import {ElementRef, Injectable, ViewChild } from '@angular/core';
import { asyncScheduler, from, fromEvent, interval, observeOn, of, range, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionService  {
// @ViewChild('inputref') inputref!:ElementRef<HTMLInputElement>;


  constructor() { 
    // console.log('funciona');
  //  this.of();
  // this.from();
  // this.range();
  // this.interval();
  // this.timer();
  // this.asyncScheduler();
  // this.fromEvent();
  }


  of(){
    console.log("inicio");
    const obs = of(1,'Alex',true,['1']).pipe(observeOn(asyncScheduler));
    obs.subscribe(val =>  console.log(val));
    console.log("final");
  }

  from(){
    // const obs= from([1,2,3,4,5]);
    //  const obs= from([{name:'Alex'},{name:'Pedro'}]);
      const obs= from(Promise.resolve(true));

  obs.subscribe(val =>  console.log(val));
  }

  range(){
    const obs = range(5,15);
    obs.subscribe(val => console.log(val));
  }

  interval(){
    const obs= interval(2000);
    console.log("inicio");
    obs.subscribe(val => console.log(val));
    console.log("final");
  }

  timer(){
    const date= new Date();
    date.setSeconds(date.getSeconds() +5)
    const obs= timer(date);
    obs.subscribe({
      next:(val) => console.log(val),
      complete:() => console.log("Completado"),
    });
  }

  asyncScheduler(){
  //   const gretting = (val:number[] | undefined) => console.log(
  //     'Hola , ',
  //      val?.reduce((prev, curr) => prev + curr,0)
  // );
  //     asyncScheduler.schedule(gretting,2000,[1,2,3,4,5]);
 const sub=  asyncScheduler.schedule(function(val){
    console.log('val',val)
    this.schedule((val ?? 1) + 1,1000)
  },
  0,
  1);
  asyncScheduler.schedule(() => sub.unsubscribe(),5000)
  }

  fromEvent(inputref:ElementRef<HTMLInputElement>){
    const obs = fromEvent(inputref.nativeElement,'click');
    obs.subscribe((val) =>{ 
      console.log((val.target as HTMLInputElement).value );
    });
  }

}
