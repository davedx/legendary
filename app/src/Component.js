class Component {
  constructor(parent, props = {}) {
    this.parent = parent;
    this.props = props;
  }

  update(dt, scene) {}

  destroy() {}
}

export default Component;