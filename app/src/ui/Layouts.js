
export default {
  flex: (props) => {
    /*
      centerHorizontal: true,
      alignBottom: true,
      width: 600,
      height: 200
    */
    //window.innerWidth, window.innerHeight
    //console.info("props: ", props);
    let x, y, w = props.width, h = props.height;
    if (props.centerHorizontal) {
      x = (window.innerWidth - props.width) / 2;
    } else if (props.alignLeft) {
      x = 0;
    } else if (props.alignRight) {
      x = window.innerWidth - props.width;
    }
    if (props.centerVertical) {
      y = (window.innerHeight - props.height) / 2;
    } else if (props.alignBottom) {
      y = window.innerHeight - props.height;
    }
    //console.info("x,y: ", x, y, " w,h: ", w, h);
    x -= window.innerWidth/2;
//    x += w/2;
    y -= window.innerHeight/2;
//    y += h/2;
    return {size: {w: w, h: h}, position: {x: x, y: -y}};
  }
};