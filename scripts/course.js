const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];

const courseList = document.getElementById("course-list");
const totalCreditsElement = document.getElementById("total-credits");

function renderCourses(filter = "All") {
    courseList.innerHTML = ""; 
    
    const filteredCourses = filter === "All" 
        ? courses 
        : courses.filter(course => course.subject === filter);

    filteredCourses.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");
        courseCard.classList.add(course.completed ? "completed" : "incomplete");
        
        const completionMark = course.completed ? "✔ " : "";
        courseCard.innerHTML = `<p>${completionMark}${course.subject} ${course.number}</p>`;
        
        courseList.appendChild(courseCard);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = totalCredits;
}

document.getElementById("btn-all").addEventListener("click", () => renderCourses("All"));
document.getElementById("btn-wdd").addEventListener("click", () => renderCourses("WDD"));
document.getElementById("btn-cse").addEventListener("click", () => renderCourses("CSE"));

renderCourses("All");