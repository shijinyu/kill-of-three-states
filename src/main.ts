import {EventEmitter} from 'events';

export = class Hello extends EventEmitter{
    constructor(){
        super();
        console.log('Hello!');
    }
}