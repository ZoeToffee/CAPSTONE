
let currentStreak = 0;
let startDate = null;
// let latestDateProcessed = null;

// assume data is an array of objects, each object represents a day
const data = [
    { date: "2022-03-01", status: "present" },
    { date: "2022-03-02", status: "absent" },
    { date: "2022-03-03", status: "present" },
    { date: "2022-03-04", status: "present" },
    { date: "2022-03-05", status: "present" },
    { date: "2022-03-06", status: "present" },
    { date: "2022-03-07", status: "present" },
    { date: "2022-03-08", status: "present" },
];
for (let i = 0; i < data.length; i++) {
    const day = data[i];
    if (day.status === "present") {
        currentStreak++;
        if (startDate === null) {
            startDate = day.date;
        }
    } else {
        currentStreak = 0;
        startDate = null;
    }
    // latestDateProcessed = day.date;
}
let streak;
if (data[data.length - 1].status === "present") {
    streak = currentStreak >= 1 ? currentStreak : 0;
} else {
    streak = 0;
}
console.log(`Streak: ${streak}`)
// console.log("Streak up to " + latestDateProcessed + ": " + streak);