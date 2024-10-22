import { Injectable, input } from '@angular/core';
import { range, observeOn, from, EMPTY, fromEvent, interval } from 'rxjs';
import { distinct, distinctUntilChanged, distinctUntilKeyChanged, filter, first, map, reduce, scan, skip, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import data from './data/user';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor() { 
    console.log('Funciona');
    // this.map();
    // this.tap();
    // this.reducer();
    // this.take();
    // this.skip();
    // this.distinct();
    // this.distinctUntilChanged();
     this.distinctUntilKeyChanged();
  }

  distinctUntilKeyChanged(){
      const numbers=[1,2,3,4,4,5,5,7,1,10,1];
    const users=[
      { name:'Jhon'},
      { name:'Brad'},
      { name:'Jhon'},
      { name:'Leonardo'},
      { name:'Jhon'},
      { name:'David'},
      { name:'Leonardo'},
      { name:'Leonardo'},
      { name:'Leonardo'},
      { name:'Edson'},
    ]
    const obs$= from(users).pipe(
      distinctUntilKeyChanged('name')
    );
    obs$.subscribe(console.log);
  }

  distinctUntilChanged(){
    //  const numbers=[1,2,3,4,4,5,5,7,1,10,1];
    const users=[
      { name:'Jhon'},
      { name:'Brad'},
      { name:'Jhon'},
      { name:'Leonardo'},
      { name:'Jhon'},
      { name:'David'},
      { name:'Leonardo'},
      { name:'Leonardo'},
      { name:'Leonardo'},
      { name:'Edson'},
    ]
    const obs$= from(users).pipe(
      distinctUntilChanged((prev,curr) => prev.name === curr.name)
    );
    obs$.subscribe(console.log);
  }
  

distinct(){
  // const numbers=[1,2,3,4,4,5,5,7,1,10];
  const users=[
    { name:'Jhon'},
    { name:'Brad'},
    { name:'Jhon'},
    { name:'Leonardo'},
    { name:'Jhon'},
    { name:'David'},
    { name:'Leonardo'},
    { name:'Leonardo'},
    { name:'Leonardo'},
    { name:'Edson'},
  ]
  const obs$= from(users).pipe(
    distinct(user => user.name)
  );
  obs$.subscribe(console.log);
}


  skip(){
    const range$= range(1,15).pipe(
      skip(5)
    );
    range$.subscribe(console.log);
  }


takeUntil(input: HTMLInputElement){
  const change$ = fromEvent(input,'change');
  const interval$ = interval(1000).pipe(
    takeUntil(change$)
  );
  interval$.subscribe(console.log)
}


takewhile(input: HTMLInputElement){
  let hasClicked= false;
  const input$ = fromEvent(input,'input');
  const interval$ = interval(1000).pipe(
    takeWhile(() => !hasClicked,true)
  );
  interval$.subscribe(console.log)
  input$.subscribe(()=> hasClicked = true);
}

  take(){
    // const take$= range(1,15).pipe(
    //  const take$= EMPTY.pipe(
     const take$= range(1,20).pipe(
      take(100)
    );
    take$.subscribe(console.log);
  }

first(){
  const first$ = range(1,15).pipe(
    first(number => number>5)
  );
  first$.subscribe(console.log)
}
  scan(){
    const scanFn =(acc:number,curr:number) => acc + curr
    const obs = range(1,5).pipe(
      tap((val) => console.log('tap', val)),
      scan<number,number>(scanFn,12)
    );
    obs.subscribe((val) => console.log(val))

  }


  reducer(){
    const reduceFn =(acc:number,curr:number) => acc + curr
    // si ponemos  como  valor 0  me  mostrara el dato por defecto
    const obs = range(5).pipe(
      tap((val) => console.log('tap', val)),
      // el segundo  valor es  un dato que mostrara  por defecto
      // reduce<number,number>(reduceFn,12)
      reduce<number,number>(reduceFn)
    );
    obs.subscribe((val) => console.log(val))
  }

 tap(){
  const obs = from(data).pipe( 
    tap((val) => console.log('antes del filter', val)),
    filter((val) => val.email === 'Rey.Padberg@karina.biz'),
    map<any,{email:string,name:string,username:string}>(({email, name, username}) => {
      return{
        email,
        name,
        username
      };
    } ),
    tap((val) => console.log('despues del filter', val))
  );
  obs.subscribe();
 }

  filter(){
    //muesta  numeros impares
    // const obs = range(1,10).pipe( filter((val) => val % 2 === 1 ) );
    // muestra  numeros pares
    // const obs = range(1,10).pipe( filter((val) => val % 2 === 0 ) );
    // muestra los datos  donde el Id  es mayor a  5
    // const obs= from(data).pipe(filter((val) =>  val.id >5))
    // busca un registro por email
    const obs = from(data).pipe( filter((val) => val.email === 'Rey.Padberg@karina.biz'));
    obs.subscribe((val) => console.log(val));
  }


map(){
  const obs=from(data).pipe( 
    map<any,{email:string,name:string,username:string}>(({email, name, username}) => {
    return{
      email,
      name,
      username
    };
  } )
 );

  obs.subscribe(val => console.log(val));
}

}
