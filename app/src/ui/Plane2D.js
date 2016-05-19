import _ from 'lodash';
import Plane from '../Plane';

class Plane2D extends Plane {
	constructor(props = {}) {
		let newProps = _.cloneDeep(props);
		newProps.rotation = {x: 0, y: 0, z: -Math.PI / 2};
		if (props.rotation) {
			newProps.rotation.x = props.rotation.x;
			newProps.rotation.y = props.rotation.y;
			newProps.rotation.z = props.rotation.z;
		}
		newProps.position.x += newProps.size.w/2;
		newProps.position.y -= newProps.size.h/2;
		super(newProps);
	}

	setPosition(x, y, z) {
		x += this.props.size.w/2;
		y -= this.props.size.h/2;
    this.mesh.position.set(x, y, z);
	}
}

export default Plane2D;