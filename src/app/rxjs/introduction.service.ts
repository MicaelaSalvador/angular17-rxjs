import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, Subscription } from 'rxjs';

const observer:Observer<string>={
      next:(val) => console.log(val),
      error:(err) => console.warn(err),
      complete:() => console.log('Completado'),
}

@Injectable({
  providedIn: 'root'
})
export class IntroductionService {

  private sub!: Subscription;

  constructor() { }

  start(){
    // console.log('Start');
    this.observable();
  }

  stop(){
    // console.log('stop');
    this.sub?.unsubscribe();
  }

  observable(){
    const obs= new Observable<string>((sub) =>{
      // sub.next({name:'Alex'});
      // sub.next({name:'Juan'});
      // sub.next({name:'Pedro'});
      // let a:any;
      // a.name;
      // sub.next({name:'Pablo'});
      // sub.complete();
      // sub.next({name:'Lucas'});
      // sub.next({name:'David'});
    const interval= setInterval(() => {
      const uuid = crypto.randomUUID();
       console.log('------',uuid);
      sub.next(uuid)
     },1000);
     
     return () => {
      console.log('Terminado');
      clearInterval(interval)
     };

    });

    const subject = new Subject<string>();
    this.sub= obs.subscribe(subject);

  //   this.sub=obs.subscribe(
  //      {
  //     next:(val) => console.log(val),
  //      error:(err) => console.warn(err),
  //     complete:() => console.log('Completado'),
  //    }
  //   observer 
  // );  

  subject.subscribe(observer);
  subject.subscribe(observer);
  subject.subscribe(observer);
  subject.subscribe(observer);
  subject.subscribe(observer);

  setTimeout(() => {
    subject.next("Hola mundo");
    //subject.unsubscribe();
  },5000);
  }

}
