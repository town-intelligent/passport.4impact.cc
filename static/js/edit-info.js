export async function uploadAvatarImg(base64Img) {
  return new Promise((resolve, reject) => {
    var dataJSON = {};
    var resultJSON = {};
    dataJSON.email = getLocalStorage("email");
    dataJSON.img = base64Img;

    var settings = {
      url: HOST_URL_EID_DAEMON + "/accounts/modify",
      type: "POST",
      async: true,
      crossDomain: true,
      data:  dataJSON,
    };
    $.ajax(settings).done(function (response) {
      resultJSON = JSON.parse(response);
      resolve(resultJSON); // 在响应解析后解析 Promise
    }).fail(function (error) {
      reject(error); // 在发生错误时拒绝 Promise
    });
  });
}

function prepare_upload_avatar_image() {
  return new Promise(async (resolve, reject) => {
    await show_loading();
    resolve(true);
  });
}

export async function upload_avatar_image() {
  // Preview
  await upload_image_file(427, null, "avatar_img", true);

  prepare_upload_avatar_image().then(async function () {
    var coverImg = document.getElementById("avatar_img").style.backgroundImage.replace('url("', '');
    coverImg = coverImg.replace('")', '');

    var resultJSON = await uploadAvatarImg(coverImg);

    return resultJSON;
  }).then(async function (resultJSON) {
    if (resultJSON.result == true) {
      alert("更新成功");
      window.location.replace("/eid.html");
    } else {
      alert("更新失敗，請洽系統管理員。");
    }
    stop_loading();
  });
}