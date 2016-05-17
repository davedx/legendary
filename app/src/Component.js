class Component {
  constructor(parent, props = {}) {
    this.parent = parent;
    this.props = props;
  }

  update(dt, scene) {}

  destroy() {
    console.info("Component.Destroy");
  }
}

export default Component;