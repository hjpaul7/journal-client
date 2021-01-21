// **** User Signup ****
function userSignUp() {
  // console.log('userSignUp function called')
  let userEmail = document.getElementById("emailSignup").value;
  let userPass = document.getElementById("pwdSignup").value;
  let newUserData = {
    email: userEmail,
    password: userPass,
  };
  console.log(`NEWUSERDATA ==> ${newUserData.email} ${newUserData.password}`);

  fetch("http://localhost:3000/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserData),
  })
    .then((response) => response.json())
    .then(function (response) {
      console.log(response.sessionToken);
      let token = response.sessionToken;
      localStorage.setItem("SessionToken", token);
      tokenChecker();
    })
    .catch((err) => {
      console.log(err);
    });
}

// **** User Login ****
function userLogin() {
  // console.log('userLogin function called')
  let userEmail = document.getElementById("emailLogin").value;
  let userPass = document.getElementById("pwdLogin").value;
  console.log(userEmail, userPass);

  let userData = {
    email: userEmail,
    password: userPass,
  };
  console.log(`USERDATA ==> ${userData.email} ${userData.password}`);

  fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then(function (response) {
      console.log(response.sessionToken);
      let token = response.sessionToken;
      localStorage.setItem("SessionToken", token);
      tokenChecker();
    })
    .catch((err) => {
      console.log(err);
    });
}

// **** User Logout ****
function userLogout() {
  // console.log('userLogout function called')
  localStorage.setItem("SessionToken", undefined);
  console.log(`sessionToken ==> ${localStorage.sessionToken}`);
  tokenChecker();
}

// **** Token Checker Function ****
function tokenChecker() {
  // console.log('tokenChecker function called')

  let display = document.getElementById("journals");
  let header = document.createElement("h5");
  let accessToken = localStorage.getItem("sessionToken");
  let text = "Login or signup to get started";

  for (i = 0; (i = display.childNodes.length); i++) {
    display.removeChild(display.firstChild);
  }

  if ((accessToken = "undefined")) {
    display.appendChild(header);
    header.textContent = text;
    header.setAttribute("id", "defaultLogin");
  } else {
    null;
  }
}
tokenChecker();
