const menus = document.querySelector("nav ul");
const header = document.querySelector("header");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");

const monthYearElement = document.getElementById('monthYear');
const datesElement = document.querySelector(".dates");
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

menuBtn.addEventListener("click", () => {
    menus.classList.add("display"); 
});

closeBtn.addEventListener("click", () => {
    menus.classList.remove("display"); 
})

//scroll sticky navbar
window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 20) {
        header.classList.add('sticky');

    } else {
        header.classList.remove('sticky');
    }
});

let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 0);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    const monthYearString = currentDate.toLocaleString('default', {month: 'long', year:'numeric'});

    monthYearElement.textContent = monthYearString;

    let datesHTML = '';

    for(let i = firstDayIndex; i > 0; i--) {
        const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
        datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;

    }

    for(let i = 1; i <= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : "";
        datesHTML += `<div class="date ${activeClass}">${i}</div>`;
    }

    for(let i = 1; i <= 7 - lastDayIndex; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`
    }

    datesElement.innerHTML = datesHTML;

    // Add click event to all .date elements
    const dateElements = datesElement.querySelectorAll('.date');

    dateElements.forEach((el, index) => {
        el.addEventListener('click', () => {
            const selectedDay = parseInt(el.textContent);

            // Ignore clicks on "inactive" dates
            if (el.classList.contains('inactive')) return;

            const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
            const formattedDate = selectedDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });

            const weekDay = selectedDate.toLocaleDateString('en-GB', { weekday: 'long'});

            const titleEl = document.getElementById('carbonTitle');
            titleEl.innerHTML = `${weekDay}, <span>${formattedDate}</span>`;

            console.log(`Selected date: ${weekDay}, ${formattedDate}`);

            // Send selected date to backend
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/log-selected-date';

            const dateInput = document.createElement('input');
            dateInput.type = 'hidden';
            dateInput.name = 'date';
            dateInput.value = formattedDate;

            const weekdayInput = document.createElement('input');
            weekdayInput.type = 'hidden';
            weekdayInput.name = 'weekDay';
            weekdayInput.value = weekDay;

            form.appendChild(dateInput);
            form.appendChild(weekdayInput);
            document.body.appendChild(form);
            form.submit();
            
        });
    });
}

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

updateCalendar();

