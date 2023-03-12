function nextSlider() {
    currentSlider++;
    if (currentSlider >= sliderCount)
        currentSlider = 0;
    showSlide();
}

function previewSlider() {
    currentSlider--;
    if (currentSlider < 0)
        currentSlider = sliderCount - 1;
    showSlide();
}

function setCurrentSlide(index) {
    currentSlider = index;
    showSlide();
}
function showSlide() {
    document.getElementById('slider_img').style.opacity = "0";
    document.getElementById('slider_img').style.transform = "scale(0,0)";
    document.getElementById('slider_img').style.transform = "rotateZ(180deg)";
    setTimeout(function () {
        document.getElementById('slider_img').style.opacity = "1";
        document.getElementById('slider_img').style.transform = "scale(1,1)";
        document.getElementById('slider_img').style.transform = "rotateZ(0deg)";
    }, 400);

    document.getElementById('slider_img').src = sliderImage[currentSlider];
    document.getElementById('slider_img').alt = sliderTitle[currentSlider];
    document.getElementById('slider_title').innerHTML = sliderTitle[currentSlider];
    document.getElementById('slider_text').innerHTML = sliderText[currentSlider];
    document.getElementById('slider_link').href = sliderLink[currentSlider];

    for (i = 0; i < sliderCount; i++) {
        document.getElementById('slider_dot_' + i).className = '';
    }
    document.getElementById('slider_dot_' + currentSlider).className = ' selected';
}

var sliderTimer = null;

function startSlider() {
    sliderTimer = setInterval(nextSlider, sliderDelay);
}

function stopSlider() {
    clearInterval(sliderTimer);
}
