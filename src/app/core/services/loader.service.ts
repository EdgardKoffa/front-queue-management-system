import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private requestCount=0;
  private readonly loaderSignal=signal(false);

  show(){
    this.requestCount++;
    this.loaderSignal.set(true)
  }

  hide(){
    if(this.requestCount>0){
      this.requestCount--;
    }
    if(this.requestCount===0){
    this.loaderSignal.set(false)
  }
  }

  reset(){

    this.requestCount=0;
    this.loaderSignal.set(false)
  }
  isloading(){
    return this.loaderSignal()
  }
}
