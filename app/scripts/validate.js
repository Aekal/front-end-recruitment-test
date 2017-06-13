(function() {
  var form, check, btnSubmit;
  // Cache test results
  check = {};
  form = document.getElementById("checkout-form");
  btnSubmit = document.querySelector("button.btn-purchase");

  function bindEvents() {
    // Cache all inputs to test
    var formElements, firstName, lastName, email, postCode, phone, creditCard, pass, expDate, fieldsReady;
    formElements = [firstName, lastName, email, postCode, phone, creditCard, pass, expDate];
    firstName = document.getElementById("first-name");
    lastName = document.getElementById("last-name");
    email = document.getElementById("email");
    postCode = document.getElementById("postal-code");
    phone = document.getElementById("phone");
    creditCard = document.getElementById("card");
    pass = document.getElementById("pass");
    expDate = document.getElementById("exp-date");

    form.addEventListener("submit", function(e) {
      // Prevent from sending form
      e.preventDefault();
      fieldsReady = 0;
      for (var val in check) {
        if (check[val] === true) {
          fieldsReady++;
        }
      }
      if (fieldsReady === formElements.length) {
        // Display success message
        btnSubmit.classList.add("btn-purchase--success");
        setTimeout(function() {
          btnSubmit.classList.remove("btn-purchase--success");
        }, 3000);
        form.reset();
        // Send form
        // form.submit();
      } else {
        testName(firstName);
        testName(lastName);
        testEmail(email);
        testPostalCode(postCode);
        testPhone(phone);
        testCreditCard(creditCard);
        testPassword(pass);
        testExpDate(expDate);
      }
    });

    firstName.addEventListener("blur", function() {
      testName(this);
    });

    lastName.addEventListener("blur", function() {
      testName(this);
    });

    email.addEventListener("blur", function() {
      testEmail(this);
    });

    postCode.addEventListener("blur", function() {
      testPostalCode(this);
    });

    phone.addEventListener("blur", function() {
      testPhone(this);
    });

    creditCard.addEventListener("blur", function() {
      testCreditCard(this);
    });

    pass.addEventListener("blur", function() {
      testPassword(this);
    });

    expDate.addEventListener("blur", function(e) {
      testExpDate(this);
    });

    expDate.addEventListener("keyup", function(e) {
      fillExpDate(this, e);
    });

  }

  function testName(el) {
    var msg, userReg;
    msg = "Enter at least 2 characters, e.g 'Elon'";
    userReg = /^[A-ZŻŹĆŃÓŁĘĄŚ]{1}[a-zżźćńółęąś]{1,}$/;
    useReg(el, userReg, msg);
  }

  function testEmail(el) {
    var msg, mailReg;
    msg = "Invalid email address, try 'elon@spacex.com'";
    mailReg = /^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,6}$/;
    useReg(el, mailReg, msg);
  }

  function testPostalCode(el) {
    var msg, codeReg;
    msg = "Invalid postal code, try '10001'";
    codeReg = /^[0-9]{5}$/;
    useReg(el, codeReg, msg);
  }

  function testPhone(el) {
    var msg, phoneReg;
    msg = "Invalid phone number, try '600-700-800'";
    phoneReg = /^\(?([0-9]{3})\)?([ .-]?)[0-9]{3}\-?[0-9]{2}\-?[0-9]{0,2}$/;
    useReg(el, phoneReg, msg);
  }

  function testCreditCard(el) {
    var msg, cardReg;
    msg = "Invalid credit card number, try '0000-0000-0000-0000'";
    cardReg = /^[0-9]{4}\ ?\-?\ ?[0-9]{4}\ ?\-?\ ?[0-9]{4}\ ?\-?\ ?[0-9]{4}$/;
    useReg(el, cardReg, msg);
  }

  function testPassword(el) {
    var msg, passReg;
    msg = "Enter at least 3 characters";
    passReg = /^.{3,}$/;
    useReg(el, passReg, msg);
  }

  function testExpDate(el) {
    var msg, dateReg;
    msg = "Invalid date format, try '05/20'";
    dateReg = /^[0-9]{2}\ ?\/?\ ?[0-9]{2}$/;
    useReg(el, dateReg, msg);
  }

  function fillExpDate(el, e) {
    if (e.key !== "Backspace") {
      if (el.value.length === 2) {
        el.value += " / ";
      }  
    }
  }

  function showTooltip(el, msg) {
    var oldTooltip = el.parentNode.querySelector("span.field__tooltip");
    if (!oldTooltip) {
      var tooltip = document.createElement("span");
      tooltip.setAttribute("class", "field__tooltip");
      tooltip.textContent = msg;
      el.parentNode.appendChild(tooltip);
    }
  }

  function hideTooltip(el) {
    var oldTooltip = el.parentNode.querySelector("span.field__tooltip");
    if (oldTooltip) {
      oldTooltip.remove();
    }
  }

  function useReg(el, reg, msg) {
    var parentClass = el.parentNode.classList;
    if (reg.test(el.value.trim())) {
      parentClass.remove("field__content--error");
      parentClass.add("field__content--success");
      check[el.id] = true;
      hideTooltip(el);
    } else {
      parentClass.remove("field__content--success");
      parentClass.add("field__content--error");
      check[el.id] = false;
      showTooltip(el, msg);
    }
  }

  bindEvents();
})();