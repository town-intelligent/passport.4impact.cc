/* File upload handler
 * http://jsfiddle.net/DerekL/3wRpA/
 * https://stackoverflow.com/questions/53651409/writing-a-base64-string-to-file-in-python-not-working
 * https://stackoverflow.com/questions/34116682/save-base64-image-python
 */

/*The FileModal Class*/
function FileModal(accept) {
  var callback = function(){};
  return {
    show: function(){
      $("<input>").attr({
        type: "file",
        accept: accept
      }).appendTo("body").hide().change(function(e){
        var file = e.target.files[0],
        reader = new FileReader();
        reader.onload = function(progress){
          callback(progress.target.result);
        };
        reader.readAsDataURL(file);
      }).click();
    },
    set onload(c){ callback = c; }
  }
}

function DataURIToBlob(dataURI) {
  try {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  } catch (e) { return null; }
}

function upload_image_file(width = null, height = null, id_preview = null, background = false) {
  return new Promise((resolve, reject) => {

    var file = new FileModal("image/*");
    var image = null;
    var scaledBase64Img = null;
    file.onload = function(base64Img) {
      // 執行頁面載入特效
      startLoadingAnimation();

      image = new Image();
      image.src = base64Img;
      image.onload = function() {
        // Create canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");

        // Resize
        var scale_x = 1;
        var scale_y = 1;
        if (width != null) {
          scale_x = Math.min(width / image.width)
        }

        if (height != null) {
          scale_y = Math.min(height / image.height)
        }

        var scale = Math.min(scale_x, scale_y);

        // 设置画布尺寸
        canvas.width = image.width * scale;
        canvas.height = image.height * scale;

        // 在画布上绘制缩放后的图像
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // 将缩放后的图像转为 base64 格式
        scaledBase64Img = canvas.toDataURL();

        // Preview
        if (id_preview != null) {
          if (background == true) {
            document.getElementById(id_preview).style.backgroundImage =  "url(" + scaledBase64Img  + ")";
          } else {
            document.getElementById(id_preview).src = scaledBase64Img;
          }
          document.getElementById(id_preview).style.width = canvas.width + "px";
          document.getElementById(id_preview).style.height = canvas.height + "px";
        }

        // 解除頁面載入特效
        stopLoadingAnimation();
        
        // Resolve the promise with the image
        resolve(scaledBase64Img);
      };
    };
    file.show();
  });
}

// 開始頁面載入特效
function startLoadingAnimation() {
  $('#loading-text').show();
  $('#loading-spinner').show();
  showOverlay();
}

// 停止頁面載入特效
function stopLoadingAnimation() {
  $('#loading-text').hide();
  $('#loading-spinner').hide();
  hideOverlay();
}

function showOverlay() {
  var overlay = document.getElementById('loading');
  overlay.style.display = 'block';
}

function hideOverlay() {
  var overlay = document.getElementById('loading');
  overlay.style.display = 'none';
}

async function show_loading() {
  return new Promise((resolve, reject) => {
    startLoadingAnimation();
    resolve(true);
  });
}

async function stop_loading() {
  return new Promise((resolve, reject) => {
    stopLoadingAnimation();
    resolve(true);
  });
}
