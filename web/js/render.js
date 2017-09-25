var clock = new THREE.Clock();
var delta = clock.getDelta(); // seconds.
var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
var container, stats;

var camera, scene, renderer, projector;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


var xSpeed = 1;
var ySpeed = 1;


init();
animate();


function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = -50;

    // scene

    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight(0x101030);
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight(0xffeedd, 0.5);
    directionalLight.position.set(0, 0, -10);
    scene.add(directionalLight);

    // texture

    var manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {

        console.log(item, loaded, total);

    };

    // model
    var loader = new THREE.OBJLoader(manager);
    loader.load('obj/PT09E.obj', function (object) {

        object.traverse(function (child) {

            if (child instanceof THREE.Mesh) {
                // console.log("instancee of three.mesh");
                // child.material.side = THREE.Material.DoubleSide;

            }

        });

        object.children[0].material.side = THREE.DoubleSide;

        object.position.x = 0;
        object.rotation.y = 0;
        object.rotation.z = Math.PI;
        object.scale.x = 30;
        object.scale.y = 30;
        object.scale.z = 30;
        obj = object;
        scene.add(obj);

    });

    projector = new THREE.Projector();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // document.addEventListener('mousemove', onDocumentMouseMove, false);

    window.addEventListener('resize', onWindowResize, false);

    document.addEventListener("keydown", onDocumentKeyDown, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
}

function onDocumentMouseDown(event) {

    event.preventDefault();

    var vector = new THREE.Vector3(
        ( event.clientX / window.innerWidth ) * 2 - 1,
        -( event.clientY / window.innerHeight ) * 2 + 1,
        0.5
    );
    // projector.unprojectVector( vector, camera );

    var ray = new THREE.Raycaster();

    ray.setFromCamera(vector, camera);

    var intersects = ray.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        console.log("touched the obj!");
        // intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );

        // var particle = new THREE.Particle( particleMaterial );
        // particle.position = intersects[ 0 ].point;
        // particle.scale.x = particle.scale.y = 8;
        // scene.add( particle );
        console.log(intersects[0].point);

    }

    /*
     // Parse all the faces
     for ( var i in intersects ) {
     intersects[ i ].face.material[ 0 ].color
     .setHex( Math.random() * 0xffffff | 0x80000000 );
     }
     */
}


// function onDocumentMouseDown( e ) {
//   e.preventDefault();
//   var mouseVector = new THREE.Vector3();
//   mouseVector.x = 2 * (e.clientX / windowHalfX) - 1;
//   mouseVector.y = 1 - 2 * ( e.clientY / windowHalfY );
//   var raycaster = projector.pickingRay( mouseVector.clone(), camera );
//   var intersects = raycaster.intersectObject( obj );
//   for( var i = 0; i < intersects.length; i++ ) {
//     var intersection = intersects[ i ],
//     obj = intersection.object;
//     console.log("Intersected object", obj);
//   }
// }


function onDocumentKeyDown(event) {
    var keyCode = event.which;
    // console.log(keyCode);
    if (keyCode == 38) {
        obj.position.y += ySpeed;
    } else if (keyCode == 40) {
        obj.position.y -= ySpeed;
    } else if (keyCode == 39) {
        obj.position.x -= xSpeed;
    } else if (keyCode == 37) {
        obj.position.x += xSpeed;
    } else if (keyCode == 32) {
        obj.position.set(0, 0, 0);
    }
};

function onWindowResize() {
    console.log("resized window");
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}


var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};
$(renderer.domElement).on('mousedown', function (e) {
    isDragging = true;
}).on('mousemove', function (e) {
    //console.log(e);
    var deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
    };

    if (isDragging) {

        var deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));

        obj.quaternion.multiplyQuaternions(deltaRotationQuaternion, obj.quaternion);
    }

    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});


$(document).on('mouseup', function (e) {
    isDragging = false;
});

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function render() {
    // obj.rotation.x += (0.2 * (Math.PI / 180));
    // obj.rotation.x %= 360;
    //
    // camera.position.x += ( mouseX - camera.position.x ) * .05;
    // camera.position.y += ( -mouseY - camera.position.y ) * .05;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
