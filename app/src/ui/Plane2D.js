import _ from 'lodash';
import Plane from '../Plane';

class Plane2D extends Plane {
	constructor(props = {}) {
		let newProps = _.cloneDeep(props);
		newProps.rotation = {x: 0, y: 0, z: -Math.PI / 2};
		newProps.position.x += newProps.size.w/2;
		newProps.position.y -= newProps.size.h/2;
		super(newProps);
	}
}

export default Plane2D;