var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var box = document.getElementById("tableContent");
var submitBtn = document.getElementById("submitBtn");
// *******************************************************************
// Array setting up
var links = [];
if (localStorage.getItem("links") != null) {
  links = JSON.parse(localStorage.getItem("links"));
  display();
}

// *******************************************************************
// Name Validation
function validateName(text) {
  siteName.classList.remove("is-valid", "is-not-valid");
  if (text.length >= 3) {
    siteName.classList.add("is-valid");
    return true; // Validation successful
  } else {
    siteName.classList.add("is-not-valid");
    return false; // Validation failed
  }
}

// *******************************************************************
// Validate URL
function validateURL(url) {
  var validated = /^((ftp|http|https):\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*$/;
  return validated.test(url);
}

function validateInputURL(url) {
  siteURL.classList.remove("is-valid", "is-not-valid");
  if (validateURL(url)) {
    siteURL.classList.add("is-valid");
  } else {
    siteURL.classList.add("is-not-valid");
  }
}

// *******************************************************************
// Adding Link

function addLink() {
  var linkName = siteName.value;
  var linkURL = siteURL.value;

  // Check if inputs are valid
  if (!validateName(linkName) || !validateURL(linkURL)) {
    // If not valid show the popup modal
    var modal = document.getElementById("exampleModal");
    var modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    return;
  }

  var link = {
    linkName: linkName,
    linkURL: linkURL,
  };
  links.push(link);
  localStorage.setItem("links", JSON.stringify(links));
  display();
}


// *******************************************************************
// Display

function display() {
  var container = "";
  for (var i = 0; i < links.length; i++) {
    container += `
    <tr>
    <td class="text-capitalize align-middle">${i + 1}</td>
    <td class="text-capitalize align-middle">${links[i].linkName}</td>
    <td class="text-capitalize align-middle"><a href="//${
      links[i].linkURL
    }" target="_blank"><button class="btn bg-success text-white visit"> <i class="fa-regular fa-eye"></i> Visit</button></a></td>
    <td class="text-capitalize align-middle"><button class="btn bg-danger text-white delete" onclick="deleteLink(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
  </tr>
    `;
  }
  box.innerHTML = container;
}

// *******************************************************************
// Delete
function deleteLink(i) {
  links.splice(i, 1);
  localStorage.setItem("links", JSON.stringify(links));
  display();
}

// *******************************************************************
// Clear Form
function clear() {
  siteName.value = "";
  siteURL.value = "";
}

// *******************************************************************
// Remove valid and invalid classes
function removeClasses(){
  siteName.classList.remove("is-valid", "is-not-valid");
  siteURL.classList.remove("is-valid", "is-not-valid");
}

// *******************************************************************
// Clicking the submit
submitBtn.onclick = function () {
  addLink();
  var linkName = siteName.value;
  var linkURL = siteURL.value;

  // Check if inputs are valid
  if (!validateName(linkName) || !validateURL(linkURL)) {
    console.log("Not Valid")
  }else{
    removeClasses();
    clear();
    console.log("Valid")
  }
};
