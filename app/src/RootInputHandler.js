import events from './events';

class RootInputHandler {
  constructor(options) {
    this.options = options;
    events.on('onkeydown', this.keyDown, this);
  }

  destroy() {
    events.off('onkeydown', this.keyDown, this);
    console.info('Total events count: ', events.totalCount());
  }

  keyDown(options) {
    if (options.key === 27) {
      if (this.options.exit) {
        this.options.exit();
      }
    }
  }
}

export default RootInputHandler;