document.addEventListener("DOMContentLoaded", () => {
    const addProjectBtn = document.getElementById("add-project");
    const projectModal = document.getElementById("project-modal");
    const closeBtn = document.querySelector(".close-btn");
    const submitProjectBtn = document.getElementById("submit-project");
    const taskList = document.getElementById("task-list");
    const completedTasks = document.getElementById("completed-tasks");
    const completionAudio = document.getElementById("completion-audio");

    
    function startTimer(task, durationInMinutes) {
        console.log("Starting timer for task:", task);

        let timeLeft = durationInMinutes * 60; // convert mins to secs
        const totalDuration = timeLeft; //total duration for progress calculation

        const timerInterval = setInterval(() => {
            const timerDisplay = task.querySelector(".timer");
            const progressBar = task.querySelector(".progress-bar");

            if (timeLeft <= 0) {
                completionAudio.play();
                clearInterval(timerInterval); 
                alert(`Task "${task.projectName}" has reached its deadline!`);
           
            } else {
                const minutes = Math.floor(timeLeft / 60); // calculate minutes
                const seconds = timeLeft % 60; // calculate seconds

                timerDisplay.textContent = `Time remaining: ${minutes}m ${seconds}s`; //ipdate the timer display

                // calculate the progress percentage
                const progressPercentage = (1 - timeLeft / totalDuration) * 100; //progress as percentage
                progressBar.style.width = `${progressPercentage}%`; // update progress bar

                timeLeft--; // decrement the timer by one ssecond
            }
        }, 1000); // interval in ms (1 second)
    }

    // event listener to open the modal when "Add Project" is clicked
    addProjectBtn.addEventListener("click", () => {
        projectModal.style.display = "flex"; // show the modal
        document.getElementById("project-name").value = ""; 
        document.getElementById("project-details").value = ""; 
        document.getElementById("project-date").value = ""; 
        document.getElementById("project-duration").value = ""; 
    });

    // close the modal when clicking the close button
    closeBtn.addEventListener("click", () => {
        projectModal.style.display = "none"; // hide the modal
    });

    window.addEventListener("click", (event) => {
        if (event.target === projectModal) {
            projectModal.style.display = "none"; 
        }
    });

   
    submitProjectBtn.addEventListener("click", () => {
        const projectName = document.getElementById("project-name").value;
        const projectDetails = document.getElementById("project-details").value;
        const projectDate = document.getElementById("project-date").value;
        const projectTimer = document.getElementById("project-duration").value; // gt timer duration in minutes

        if (projectName && projectDate && projectTimer) {
            const task = document.createElement("div");
            task.className = "task"; 

            task.innerHTML = `
                <div class="task-content">
                    <strong>Project Name:</strong> ${projectName}<br>
                    <strong>Details:</strong> ${projectDetails}<br>
                    <strong>Due Date:</strong> ${projectDate}<br>
                    <span class="timer">Time remaining: ${projectTimer}m 0s</span>
                    <div class="progress-container">
                        <div class="progress-bar"></div> <!-- Progress bar -->
                    </div>
                </div>
                <button class="mark-done-btn">Mark as Done</button>
            `;

            const markDoneBtn = task.querySelector(".mark-done-btn");
            markDoneBtn.addEventListener("click", () => {
                const taskContent = task.querySelector(".task-content");
                taskContent.style.textDecoration = "line-through"; 
                taskContent.style.color = "#aaa"; 
                markDoneBtn.style.display = "none"; 

                const progressBar = task.querySelector(".progress-bar");
                progressBar.classList.add("done"); 

                taskList.removeChild(task); 
                completedTasks.appendChild(task); 
          
            });

            taskList.appendChild(task); 

           
            startTimer(task, projectTimer); // start the timer

            projectModal.style.display = "none";
        } else {
            alert("Please enter project name, date, and timer duration.");
        }
    });
});
