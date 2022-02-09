var imageFile; //used to save temp image file

//mask image
function getMaskedCanvas(sourceCanvas, sourceImage, cropper) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var maskWidth = cropper.getData().width;
    var maskHeight = cropper.getData().height;
    var maskTop = cropper.getData().y;
    var maskLeft = cropper.getData().x;
    var imageWidth = cropper.getImageData().naturalWidth;
    var imageHeight = cropper.getImageData().naturalHeight;
    var imageLeft = cropper.getImageData().left;
    var imageTop = cropper.getImageData().top;
    var imageAspect = cropper.getImageData().aspectRatio;

    canvas.width = imageWidth;
    canvas.height = imageHeight;

    // Debug
    console.log('Image Width: ' + imageWidth + ' Image Height: ' + imageHeight + ' Image Aspect Ratio: ' + imageAspect);
    console.log('Image Left: ' + imageLeft + ' Image Top: ' + imageTop);
    console.log('Mask Width: ' + maskWidth + ' Mask Height: ' + maskHeight + ' Mask Left: ' + maskLeft + ' Mask Top: ' + maskTop);

    context.imageSmoothingEnabled = true;
    context.drawImage(image, 0, 0, imageWidth, imageHeight);
    context.fillRect(maskLeft, maskTop, maskWidth, maskHeight);
    return canvas;
}

//crop image 
function cropImage() {
    var image = document.getElementById('image');
    var croppable = false;
    var cropper = new Cropper(image, {
        viewMode: 1,
        movable: false,
        rotatable: false,
        scalable: false,
        zoomable: false,
        zoomOnTouch: false,
        zoomOnWheel: false,
        guides: true,
        center: true,
        highlight: true,
        aspectRatio: 16 / 9,
        ready: function() {
            croppable = true;
        },
    });
    var button = document.getElementById('mask_button');
    button.onclick = function() {
        var croppedCanvas;
        var maskedCanvas;
        var maskedImage;

        if (!croppable) {
            return;
        }

        // Crop
        croppedCanvas = cropper.getCroppedCanvas();

        // Mask
        maskedCanvas = getMaskedCanvas(croppedCanvas, image, cropper);

        // Show
        maskedImage = document.createElement('img');
        maskedImage.src = maskedCanvas.toDataURL();
        result.innerHTML = '';
        result.appendChild(maskedImage);
    };


}


//read user upload image
function readURL(input) {
    imageFile = input.files[0];

    const validImageTypes = ['image/jpeg', 'image/png'];

    if (input.files && input.files[0]) {
        const file = input.files[0];
        const fileType = file['type'];

        if (input.files[0]) {}

        if (!validImageTypes.includes(fileType)) {
            alert("請選擇.jpg or png 圖檔");
            return;
        }

        var reader = new FileReader();

        reader.onload = function(e) {
            document.getElementById('image').src = e.target.result
            cropImage()
                // $('#image').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string


    }
}


function initApp() {
    //select image
    $("#file-upload").change(function() {
        readURL(this);
    });

}

window.onload = function() {
    initApp();
};