// Item options
var itemOptions = {
  item1: ["Brading", "Installations", "Hair Wash"],
  item2: ["Manicure", "Padicure", "Both"],
  item3: ["Facial", "Make-up", "Other"],
};

// Get HTML elements
var itemSelect = document.getElementById("item");
var optionSelect = document.getElementById("option");
var informationDiv = document.getElementById("information");
var bookingDiv = document.getElementById("booking");
var bookButton = document.getElementById("book");

// Populate options based on item selection
itemSelect.addEventListener("change", function () {
  var options = itemOptions[itemSelect.value];
  optionSelect.innerHTML = "";
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.text = options[i];
    option.value = options[i];
    optionSelect.appendChild(option);
  }
});

// Show information form after option selection
optionSelect.addEventListener("change", function () {
  informationDiv.style.display = "block";
});

// Book button click event
bookButton.addEventListener("click", function () {
  var name = document.getElementById("name").value;
  var surname = document.getElementById("surname").value;
  var email = document.getElementById("email").value;
  var cellphone = document.getElementById("cellphone").value;
  var additional = document.getElementById("additional").value;

  // Notify user of new appointment
  alert("Thank you for booking, see you soon!");

  // Create and append message
  var message = document.createElement("p");
  message.textContent = "Your Appointment has been booked.";
  bookingDiv.appendChild(message);

  // Remove message after 5 seconds
  setTimeout(function () {
    bookingDiv.removeChild(message);
  }, 5000); // Display message for 5 seconds (5000 milliseconds)

  // Notify owner of new appointment
  var ownerEmail = "owner@example.com";
  var subject = "New Appointment Booking";
  var body =
    "A new appointment has been booked.\n\nDetails:\nName: " +
    name +
    " " +
    surname +
    "\nEmail: " +
    email +
    "\nCellphone: " +
    cellphone +
    "\nItem: " +
    itemSelect.value +
    "\nOption: " +
    optionSelect.value;

  var mailtoLink =
    "mailto:" +
    ownerEmail +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);

  var link = document.createElement("a");
  link.href = mailtoLink;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
