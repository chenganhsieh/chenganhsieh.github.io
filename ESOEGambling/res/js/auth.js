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
window.onload = function() {
    //遮蔽鍵盤事件
    document.onkeydown = function() {
        var e = window.event || arguments[0];
        //F12
        if (e.keyCode == 123) {
            return false;
            //Ctrl+Shift+I
        } else if ((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)) {
            return false;
            //Shift+F10
        } else if ((e.shiftKey) && (e.keyCode == 121)) {
            return false;
            //Ctrl+U
        } else if ((e.ctrlKey) && (e.keyCode == 85)) {
            return false;
        }
    };
    //遮蔽滑鼠右鍵
    document.oncontextmenu = function() {
        return false;
    }


}