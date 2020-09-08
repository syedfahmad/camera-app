// Set constraints for the video stream
var constraints = {
    video: {
        facingMode: "environment"
    },
    audio: false
};
// Define constants
const cameraView = document.querySelector("#camera-video");
const sensorView = document.querySelector("#sensor");

const frontView = document.querySelector("#license-front");
const backView = document.querySelector("#license-back");
const frontTrigger = document.querySelector("#trigger-front");
const backTrigger = document.querySelector("#trigger-back");
const submitTrigger = document.querySelector("#trigger-submit");

let videowidth = "";
let videoheight = "";
let aspectratio = "";

// Access the device camera and stream to cameraView
function cameraStart() {

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {

            track = stream.getTracks()[0];
            cameraView.srcObject = stream;

        })
        .catch(function (error) {
            console.error("Oops. Something is broken.", error);
        });
}

cameraView.onplay = () => {
    sensorView.width = cameraView.offsetWidth;
    sensorView.height = cameraView.offsetHeight;
}

frontTrigger.onclick = () => {
    frontView.width = cameraView.offsetWidth;
    frontView.height = cameraView.offsetHeight;

    let licenseFrontCtx = frontView.getContext("2d");
    licenseFrontCtx.fillRect(0,0, frontView.width, frontView.height);
    licenseFrontCtx.drawImage(cameraView, 0, 0, frontView.width, frontView.height);
}


backTrigger.onclick = () => {

    backView.width = cameraView.offsetWidth;
    backView.height = cameraView.offsetHeight;

    let licenseBackCtx = backView.getContext("2d");
    licenseBackCtx.fillRect(0,0, backView.width, backView.height);
    licenseBackCtx.drawImage(cameraView, 0, 0, backView.width, backView.height);
}

submitTrigger.onclick = function () {
    
    var b64ImageFront = frontView.toDataURL('image/jpeg');
    var u8ImageFront  = b64ToUint8Array(b64ImageFront);

    let blobImageFront = new Blob([u8ImageFront], {
        type: 'image/jpg'
    });

    var b64ImageBack = backView.toDataURL('image/jpeg');
    var u8ImageBack  = b64ToUint8Array(b64ImageBack);

    let blobImageBack = new Blob([u8ImageBack], {
        type: 'image/jpg'
    });

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://ff94b00a0b60.ngrok.io/product/ln/consumer/savepicture/', true);

    // define new form
    let formData = new FormData();
    formData.append('lnfile', blobImageFront, '1.jpg');
    formData.append('lnfile', blobImageBack, '2.jpg');

    // action after uploading happens
    xhr.onload = function (e) {
        console.log("File uploading completed!");
    };

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

            console.log('Got response from server that the document was submitted...');
        }
    }

    // do the uploading
    console.log("File uploading started!");
    xhr.send(formData);
};


// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);