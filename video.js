// Set constraints for the video stream
var constraints = {
    video: {
        facingMode: "environment"
    },
    audio: false
};
// Define constants
const cameraView = document.querySelector("#camera-video");
const frontView = document.querySelector("#license-front");
const backView = document.querySelector("#license-back");
const frontTrigger = document.querySelector("#trigger-front");
const backTrigger = document.querySelector("#trigger-back");

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

    

    /*let cameraOutputContext = cameraOutput.getContext("2d");
    //cameraOutputContext.drawImage(document.getElementById('test'), 10, 10, 100, 50, 0, 0, 100, 50);

    let xorigin = (cameraSensor.width/videowidth)*100;
    let yorigin = (cameraSensor.height/videoheight)*100;
    let adjwidth = (cameraSensor.width/videowidth)*cameraSensor.width;
    let adjheight = (cameraSensor.height/videoheight)*cameraSensor.height;
    console.log('xorigin:' + xorigin + ' yorigin:' + yorigin + ' adjwidth:' + adjwidth + ' adjheight:' + adjheight);
    cameraOutputContext.drawImage(cameraSensor, xorigin, yorigin, adjwidth, adjheight,
        0, 0, cameraOutput.width, cameraOutput.height);
    cameraOutputContext.moveTo(0, 0);
    cameraOutputContext.lineTo(cameraSensor.width, cameraSensor.height);
    cameraOutputContext.stroke();*/

    //ctx.drawImage(cameraView, 0, 0, cameraSensor.width, cameraSensor.height);
    //ctx.moveTo(0, 0);
    //ctx.lineTo(cameraSensor.width, cameraSensor.height);
    //ctx.stroke();
    //cameraOutput.src = cameraSensor.toDataURL("image/webp");
    //cameraOutput.style.display = 'block';
    /*finalOutput.src = cameraSensor.toDataURL("image/webp");
    finalOutput.classList.add("taken");

    cameraSensor.style.display = 'none';
    cameraOutput.style.display = 'none';
    finalOutput.style.display = 'none';*/

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);