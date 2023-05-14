function updateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById("clock").textContent = time;
}

setInterval(updateTime, 1000);

function updateCalendar() {
  const now = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();
  const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();

  let html = `
      <div class="calendar-header">
        <div class="month">${month} ${year}</div>
        <div class="weekday">Sun</div>
        <div class="weekday">Mon</div>
        <div class="weekday">Tue</div>
        <div class="weekday">Wed</div>
        <div class="weekday">Thu</div>
        <div class="weekday">Fri</div>
        <div class="weekday">Sat</div>
      </div>
      <div class="calendar-days">
    `;

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, now.getMonth(), i);
    const dayOfWeek = date.getDay();
    if (i === 1) {
      for (let j = 0; j < dayOfWeek; j++) {
        html += `<div class="day"></div>`;
      }
    }
    html += `<div class="day">${i}</div>`;
    if (dayOfWeek === 6 && i !== daysInMonth) {
      html += `</div><div class="calendar-days">`;
    }
  }

  html += `</div>`;
  document.getElementById("calendar").innerHTML = html;
}

updateTime();
updateCalendar();

document.addEventListener("DOMContentLoaded", function () {
  // your code here
});
