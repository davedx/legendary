import EventEmitter from 'eventemitter3';

let events;

export default {
  SelectBuildMaterial: 'SelectBuildMaterial',
  DoAction: 'DoAction',
  MenuBuild: 'MenuBuild',

  init: () => {
    events = new EventEmitter();
  },

  on: (event, callback, ctx) => {
    events.on(event, callback, ctx);
  },

  emit: (event, args) => {
    events.emit(event, args);
  }
}