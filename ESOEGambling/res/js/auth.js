var firebaseConfig = {
    apiKey: "AIzaSyDqqnX3HSdEyreND5Tyk1gJGaubNb09wG4",
    authDomain: "esoegambling.firebaseapp.com",
    databaseURL: "https://esoegambling.firebaseio.com",
    projectId: "esoegambling",
    storageBucket: "",
    messagingSenderId: "69019310517",
    appId: "1:69019310517:web:18e346bf6c4fe657"
};
firebase.initializeApp(firebaseConfig);
firebase.database.enableLogging(true);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user)

        document.getElementById('username').textContent = user.displayName;
        $('#signout').on('click', function() {
            var answer = confirm("Are you sure you want to sign out?")
            if (answer) {
                firebase.auth().signOut().then(function() {
                    console.log("sign out successfully!")
                }).catch(function(error) {
                    console.log(error)
                });
            }
        })
    } else {
        console.log('dog')
        alert("請先登入")
        window.location.href = '../index.html'
    }
})