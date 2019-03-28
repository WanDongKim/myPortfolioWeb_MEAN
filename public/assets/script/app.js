/*
    FIle name: app.js
    Name: Dongwan Kim
    Student id: 300932262
    Date: Feb 11th, 2019
*/
(function(){
  function Start() {
      console.log(`App Started...`)
  }

  window.addEventListener("load", Start);
})();

function alertMessage() {
  fname = document.forms[0].fname.value;
  lname = document.forms[0].lname.value;
  email = document.forms[0].email.value;
  message = document.forms[0].message.value;

  total = "Hello, " + fname + " " + lname + "(" + email + ")"+ "\nYour email is sent with contents:\n" + message;
  alert(total);
}
