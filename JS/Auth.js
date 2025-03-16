// Logout functionality for both desktop and mobile
document.getElementById('logOut').addEventListener('click', () => {
    showAlertLogOut();
});

function showAlertLogOut() {
    Swal.fire({
        title: "লগআউট করতে চান?",
        text: "আপনি কি নিশ্চিত যে আপনি লগআউট করতে চান?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "হ্যাঁ",
        cancelButtonText: "না",
    }).then((result) => {
        if (result.isConfirmed) {
            // Hide main section and show login section
            document.getElementById('main').style.display = 'none';
            document.getElementById('logInHero').style.display = 'block';

            // Close mobile menu if it's open
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav.classList.contains('show')) {
                mobileNav.classList.remove('show');
                mobileNav.classList.add('hidden');
            }

            // Show success message
            Swal.fire({
                title: "লগআউট সফল!",
                text: "আপনি সফলভাবে লগআউট করেছেন। আবার দেখা হবে!",
                icon: "info",
                confirmButtonText: "OK",
            });
        }
    });
}

// Login functionality
document.getElementById('submit').addEventListener('click', () => {
    let userName = document.getElementById('userName').value;
    let userPass = document.getElementById('userPass').value;

    if (!userName || !userPass) {
        Swal.fire({
            title: "Error!",
            text: "Please Provide Your Name and Password",
            icon: "error",
            confirmButtonText: "OK",
        });
    }
    if (userName && userPass) {
        if (userPass !== '123456') {
            Swal.fire({
                title: "Incorrect Password!",
                text: "Contact admin to get your Login Code.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } else {
            document.getElementById('logInHero').style.display = 'none';
            document.getElementById('main').style.display = 'block';
            showAlert(userName);
        }
    }
});

// Show success alert after login
function showAlert(userName) {
    Swal.fire({
        title: "অভিনন্দন!",
        text: `Hey ${userName}, চল আজকে নতুন কিছু শেখা যাক`,
        icon: "success",
        confirmButtonText: "OK",
    });
}

// Mobile menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileNav = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
    mobileNav.classList.remove('hidden');
    mobileNav.classList.add('show');
    menuToggle.classList.add('hidden');
    closeMenu.classList.remove('hidden');
});

closeMenu.addEventListener('click', () => {
    mobileNav.classList.remove('show');
    mobileNav.classList.add('hidden');
    closeMenu.classList.add('hidden');
    menuToggle.classList.remove('hidden');
});

// Close mobile menu when a link is clicked
const mobileLinks = document.querySelectorAll('#mobileNav button');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('show');
        mobileNav.classList.add('hidden');
        closeMenu.classList.add('hidden');
        menuToggle.classList.remove('hidden');
    });
});