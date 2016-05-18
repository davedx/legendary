import EventEmitter from 'eventemitter3';
import _ from 'lodash';

let events;

export default {
  init: () => {
    events = new EventEmitter();
  },

  on: (event, callback, ctx) => {
    events.on(event, callback, ctx);
  },

  off: (event, callback, ctx) => {
    events.removeListener(event, callback, ctx);
  },

  emit: (event, args) => {
    events.emit(event, args);
  },

  count: (event) => {
    return events.listeners(event).length;
  },

  totalCount: () => {
    return _.reduce(events._events, (sum, v, k) => { console.info(v); return sum += _.isArray(v) ? v.length : 1 }, 0);
  }
}