function prepare_upload_task_comment() {
  return new Promise(async (resolve, reject) => {
    await show_loading();
    resolve(true);
  });
}

export async function get_task_description2(uuid) {
  return new Promise((resolve, reject) => {

  var resultJSON = {};
    var settings = {
      "url": HOST_URL_TPLANET_DAEMON + "/tasks/get/" + uuid,
      "method": "GET",
      "async": true,
      "crossDomain": true
    };

    $.ajax(settings).done(function (response) {
      resultJSON = JSON.parse(response);
      resolve(resultJSON); // 在响应解析后解析 Promise
    }).fail(function (error) {
      reject(error); // 在发生错误时拒绝 Promise
    });

  });
}

export async function prepare_submit_project_comment() {

  prepare_upload_task_comment().then(async function () {

    var resultBool = true;
    
    // Get task
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var uuid = urlParams.get("uuid");
  
    var obj_target = await get_task_description2(uuid);
    var content = obj_target.content.replace(/'/g, '"')
    var obj_target_content = JSON.parse(content);
  
    // Weight
    obj_target.ticket = {"s1":"0", "s2":"0", "s3":"0", "s4":"0", "s5":"0", "s6":"0", "s7":"0", 
      "s8":"0", "s9":"0", "s10":"0", "s11":"0", "s12":"0", "s13":"0", "s14":"0", "s15":"0", "s16":"0", "s17":"0",
      "s18":"0", "s19":"0", "s20":"0", "s21":"0", "s22":"0", "s23":"0", "s24":"0", "s25":"0", "s26":"0", "s27":"0"};
  
    for (let index = 1; index <= 27; index++) {
      obj_target.ticket["s" + index] = obj_target_content["sdgs-" + index];
    }
  
    // Set ticket to localStorage
    setLocalStorage(uuid, JSON.stringify(obj_target));

    return uuid;
    
  }).then(async function (uuid) {

    var resultBool = await submitTaskTickets(uuid);
    
    return true;
  }).then(async function (resultBool) {
    var resultBool = await submitTaskComment();
    return resultBool;
  }).then(async function (resultBool) {
    if (resultBool == true) {
      alert("更新成功");
      // Redirect
      window.location.href = "/foot_print.html";
    } else {
      alert("更新失敗，請洽系統管理員。");
      stop_loading();
    }
  });
}

export async function upload_foot_print_img() {
  // Preview
  await upload_image_file(window.innerWidth/2, null, "id_upload_foot_print_img", true);
}
