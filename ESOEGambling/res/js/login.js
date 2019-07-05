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


$("#login").on('click', function(e) {
    e.preventDefault();
    var email = $("#inputEmail").val()
    var password = $("#inputPassword").val()

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode == 'auth/user-not-found') {
            alert("記得註冊喔")
        } else if (errorCode == 'auth/invalid-email') {
            alert("Email有輸入嗎? 格式怪怪?")
        } else if (errorCode == 'auth/wrong-password') {
            alert('密碼錯誤!!!!')
        } else {
            alert(errorMessage)
        }
        // ...
    });
});


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user)
        if (user.uid == "sAQDjCgaSFcAyDIZIgo2cMT4U6y2") {
            window.location.href = './res/vip.html'
        } else {
            window.location.href = './res/main.html'
        }
    } else {
        console.log('No one signed in!')
        $("#signup").on('click', function(e) {
            window.location.href = './res/signup.html'
        });

    }
})