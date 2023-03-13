const outputContEl = document.querySelector('#output-container');
const formContEl = document.querySelector('#form-container');
const addHabitBtn = document.querySelector('#add-habit');
const closeFormBtn = document.querySelector('#close-form');
const addHabitForm = document.querySelector('#add-habit-form');

addHabitBtn.addEventListener('click', () => {
    formContEl.classList.toggle('hidden-form');
});

closeFormBtn.addEventListener('click', () => {
    formContEl.classList.add('hidden-form');
});

// Handle form submission
addHabitForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let habitName = '';
    let habitDays = '';

    // Get the user input
    habitName = document.getElementById('habit-name').value;
    habitDays = document.getElementById('habit-days').value;

    createNewHabit(habitName, habitDays)
    addHabitForm.reset();
    formContEl.classList.add('hidden-form');
});


// create container div element
function createContainer(divParent, divClass, ...divChilds) {
    const divEl = document.createElement('div');
    divEl.classList.add(divClass);
    divParent.appendChild(divEl);

    for (let i = 0; i < divChilds.length; i++) {
        divEl.appendChild(divChilds[i]);
    }
}

// create span element
function createSpan(spanClass, spanContent) {
    const spanEl = document.createElement('span');
    spanEl.classList.add(spanClass);
    spanEl.textContent = spanContent;
    return spanEl;
}

// get Real current date, if error -> get Local Date
async function getCurrentDate() {
    try {
        const response = await fetch('http://worldtimeapi.org/api/ip');
        const data = await response.json();
        const date = new Date(data.datetime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error('Error in getCurrentDate:', error);
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}


// create attendance box
function createAttendanceTab(attendanceParent, daysToComplete) {
    // creating parent container
    const attendanceContEl = document.createElement('div');
    attendanceParent.appendChild(attendanceContEl);
    attendanceContEl.classList.add('attendance-tab');

    let data = [];

    // creating an attendance checkbox base on user input
    for (let i = 0; i < daysToComplete; i++) {
        const checkBox = document.createElement('div');
        attendanceContEl.appendChild(checkBox);
        checkBox.classList.add('attendance-box');
        checkBox.addEventListener('click', () => {
            checkBox.classList.add('present');
            const currentDate = new Date();
            const attendanceData = { dateNow: currentDate, status: 'present' };
            data.push(attendanceData);
        })
    }
    return data
}

console.log(createAttendanceTab());

// create statistics tab
function createStatsStab(statsParent) {
    const statsContainerEl = document.createElement('div');
    statsParent.appendChild(statsContainerEl);
    statsContainerEl.classList.add('stats-tab')
    statsContainerEl.textContent = "STATISTICS GOES HERE"
}

// CREATE NEW HABIT
function createNewHabit(newhabitName, completionDay) {
    // creating parent container
    const habitSectionEl = document.createElement('section');
    outputContEl.appendChild(habitSectionEl);
    habitSectionEl.classList.add('habit-section')

    // creating a span for content
    const habitNameEl = createSpan('habit-names', `Habit Name: ${newhabitName}`);
    const completionEl = createSpan('completion-day', `Completion days: ${completionDay}`);
    createContainer(habitSectionEl, 'habit-info', habitNameEl, completionEl);

    let streakCount = 0;
    let absentCount = 0;
    const streakDaysEl = createSpan('streak-days', `Streak: ${streakCount}`);
    const absentDaysEl = createSpan('absent-day', `Absent: ${absentCount}`);
    createContainer(habitSectionEl, 'habit-info', streakDaysEl, absentDaysEl);

    // creating an attendancebox
    createAttendanceTab(habitSectionEl, completionDay)
    // creating statistics tab
    createStatsStab(habitSectionEl);
    return { streakCount, absentCount };
}