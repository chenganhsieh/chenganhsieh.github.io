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

window.addEventListener('DOMContentLoaded', function() {
    var image = document.getElementById('image');
    var button = document.getElementById('button');
    var result = document.getElementById('result');
    var croppable = false;
    var cropper = new Cropper(image, {
        viewMode: 0,
        guides: true,
        center: true,
        highlight: true,
        cropBoxMovable: true,
        cropBoxResizable: true,
        ready: function() {
            croppable = true;
        },
    });

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
});