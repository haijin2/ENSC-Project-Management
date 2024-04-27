document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.getElementById("sign-in-form");

    signInForm.addEventListener("submit", (event) => {
        event.preventDefault(); // para pag sinubmit hindi nag rereload 

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        let user = 'ENSCuser1';
        let pw = "enSC1";
        if (username === user && password === pw) {
            console.log("Sign-in successful");

           
            window.location.href = "project.html"; 
        } else {
            alert("Please enter a valid username and password.");
        }
    });
});
