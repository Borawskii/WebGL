var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true
controls.enablePan = true;

// var light = new THREE.PointLight(0xff0000, 0, 1);
// light.position.set(50,50,50);
// scene.add(light);
//
// var ambientLight = new THREE.AmbientLight(0xffffff, 1);
//
// var spotLight = new THREE.PointLight(0xffffff, 1);
// camera.add(spotLight);

var aLight = new THREE.DirectionalLight(0xffffff, 1.0);
aLight.position.set(-5, 5, 5);
scene.add(aLight);

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('/examples/object-loader/assets/');
mtlLoader.setPath('/examples/object-loader/assets/');
mtlLoader.load('shoetest2.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/examples/object-loader/assets/');
    objLoader.load('shoetest2.obj', function (object) {
        scene.add(object);
        // object.position.y -= 60;
    });

});

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();
