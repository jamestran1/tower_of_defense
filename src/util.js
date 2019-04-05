function validTowerArea(x, y) {
    let distance = 25;
    let distance1 = Math.distance(296, 396, x, y);
    let distance2 = Math.distance(466, 292, x, y);
    let distance3 = Math.distance(644, 329, x, y);
    let distance4 = Math.distance(680, 462, x, y);
    if (distance1 > distance && 
        distance2 > distance && 
        distance3 > distance && 
        distance4 > distance) {
        return false;
    }
    else {
        return true;
    }
}

Math = Object.assign(Math, {
    distance: (x1, y1, x2, y2) => {
        return Math.floor(Math.sqrt(Math.pow(Math.floor(x1 - x2), 2) + Math.pow(Math.floor(y1 - y2), 2)));
    }    
});

export { validTowerArea }; 