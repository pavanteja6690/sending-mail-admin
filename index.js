var editor;
const seteditor = (e) => {
  editor = e;
};
var previoustemplates = [];
const getprevious = async () => {
  $(".getpreviousbtn").hide();
  await $.ajax({
    // url: "http://localhost:5000/previoustemplates",
    url: "https://nodemailerbackendstopstalk.herokuapp.com/previoustemplates",
    type: "get",
    success: function (a) {
      previoustemplates = a;
      console.log(a);
      console.log("success");
    },
  });
  var i = 0;
  $(".previoustemplates").show();
  previoustemplates.forEach((f) => {
    $(".previoustemplates").append(
      `<option onfocus="demo2(this)">${i}</option>`
    );
    i++;
  });
};
demo2 = (tm) => {
  console.log(tm);
  console.log(tm.value);
  // if (flag == 0) {
  //   codetoggle();
  // }
  document.querySelector(".htmlcodearea").value = previoustemplates[tm.value];
  editor.data.set(previoustemplates[tm.value]);
};
var flag = 0;
codetoggle = () => {
  flag = !flag;
  console.log("entred");
  $(".editorwrapper").toggle();
  $(".codeeditor").toggle();
};
const demo = async () => {
  var a = "";
  if (flag == 0) a = document.querySelector(".ck-content").innerHTML;
  else a = document.querySelector(".htmlcodearea").value;
  // document.querySelector("#demo").innerHTML = a;
  console.log(a);
  var to = document.querySelector(".to").value;
  data = { msg: a, to: to };
  $("#demo").slideDown();
  setInterval(() => {
    $("#demo").slideUp();
  }, 2000);
  // console.log(to);
  // console.log(data);
  await $.ajax({
    // url: "http://localhost:5000/admin/sendmail",
    url: "https://nodemailerbackendstopstalk.herokuapp.com/admin/sendmail",
    type: "post",
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json", //for object property name, use quoted notation shown in second
    },
    dataType: "json",
    success: function (data) {
      console.log("message was sent");
    },
  });
};
