// Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyAoATxJMeXi6cD0OSloVXlX2r4PVj6a3b0",
    authDomain: "fir-787ed.firebaseapp.com",
    projectId: "fir-787ed",
    storageBucket: "fir-787ed.firebasestorage.app",
    messagingSenderId: "171970246174",
    appId: "1:171970246174:web:1197e33c1b0efaa94f200f",
    measurementId: "G-FLSP55TWBH"
};

// Initialize Firebase (you'll need to include Firebase SDK in your HTML)
// const app = firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function() {
    // Login form handler
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Handle login logic here
            console.log('Login attempt:', { email, password });
            
            // Simulate successful login - redirect to dashboard
            // window.location.href = '/Dashboard/home';
        });
    }

    // Signup form handler
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = this.querySelectorAll('input');
            const email = inputs[0].value;
            const password = inputs[1].value;
            const confirmPassword = inputs[2].value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Handle signup logic here
            console.log('Signup attempt:', { email, password });
            
            // Simulate successful signup - redirect to avatar selection
            // window.location.href = '/Dashboard/avartarSelection';
        });
    }

    // Google authentication handlers
    const googleLoginBtn = document.getElementById('google-login');
    const googleSignupBtn = document.getElementById('google-signup');
    
    function handleGoogleAuth() {
        // Google authentication logic would go here
        console.log('Google auth initiated');
        
        // Example Firebase Google auth (uncomment when Firebase is included)
        /*
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                return firebase.auth().signInWithPopup(provider);
            })
            .then((result) => {
                console.log('Google auth successful');
                // Redirect based on current page
                if (window.location.pathname.includes('signup')) {
                    window.location.href = '/Dashboard/avartarSelection';
                } else {
                    window.location.href = '/Dashboard/home';
                }
            })
            .catch((error) => {
                console.error('Google auth error:', error);
            });
        */
    }

    if (googleLoginBtn) googleLoginBtn.addEventListener('click', handleGoogleAuth);
    if (googleSignupBtn) googleSignupBtn.addEventListener('click', handleGoogleAuth);
});