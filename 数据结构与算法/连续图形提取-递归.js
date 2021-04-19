window.onload = function () {
  function init() {
    var canvas = document.querySelector('#myCanvas');
    var caImg = document.querySelector('#caImg');
    var div = document.querySelector('#pathBox');

    // var 

    console.log(canvas)
    console.log(caImg)
    getImageColor(canvas, caImg);
  }
  init();

  // 获取像素点
  function getImageColor(canvas, img) {
    var imgWidth = img.width;
    var imgHeight = img.height;
    console.log(imgHeight, imgWidth)

    canvas.width = imgWidth;
    canvas.height = imgHeight;

    var context = canvas.getContext('2d');

    // 获取像素数据
    var data = context.getImageData(0, 0, imgWidth, imgHeight).data;
    console.log(data)
  }
}

