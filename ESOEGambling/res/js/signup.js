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
var db = firebase.firestore();
firebase.database.enableLogging(true);
signup.innerHTML = "註冊"
$("#signup").attr("disabled", false);
$("#signup").on('click', function(e) {
    signup.innerHTML = "請稍後..."
    $("#signup").attr("disabled", true);
    e.preventDefault();

    var email = $("#inputEmail").val()
    var password = $("#inputPassword").val()
    var name = $("#inputName").val()
    if (email == null) {
        alert("記得email")
    } else if (password == null) {
        alert("記得password")
    } else if (name == null || name == "") {
        alert("一定要有小隊名喔")
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code
            if (errorCode == 'auth/weak-password') {
                alert('密碼至少六位喔><');
                signup.innerHTML = "註冊"
                $("#signup").attr("disabled", false);
            } else if (errorCode == 'auth/email-already-in-use') {
                alert('註冊過了')
                signup.innerHTML = "註冊"
                $("#signup").attr("disabled", false);
            } else if (errorCode == 'auth/invalid-email') {
                alert('email有填嗎?格式怪怪的')
                signup.innerHTML = "註冊"
                $("#signup").attr("disabled", false);
            } else {
                alert(error.message)
                signup.innerHTML = "註冊"
                $("#signup").attr("disabled", false);
            }

            // if (password.length < 6) {
            //     alert("password too short!!")
            //     return
            // } else {
            //     alert("You already have an account!! Please change to another email or choose to login.")
            // }
            // ...
        });
    }
    // firebase.auth().createUserWithEmailAndPassword($("input[name='email']").val(),
    //     $("input[name='password']").val()).then(function(firebaseUser) {
    //     console.log("User " + firebaseUser.uid + " created successfully!");
    //     return firebaseUser;
});
// });

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user)
        var user = firebase.auth().currentUser;
        var name = $("#inputName").val()
        user.updateProfile({
            displayName: name,
        }).then(function() {
            var userRef = db.collection("Users").doc(user.uid);
            userRef.get().then(function(doc) {
                if (doc.exists) {
                    alert("已經登入!");
                    window.location.href = './main.html'
                } else {
                    db.collection("Users").doc(user.uid).set({

                            activityID: 0,
                            free: 0,
                            lottonum: {
                                0: false,
                                1: false,
                                2: false,
                                3: false,
                                4: false,
                                5: false,
                                6: false,
                                7: false,
                                8: false,
                                9: false,
                                10: false,
                                11: false,
                                12: false,
                                13: false,
                                14: false,
                                15: false,
                                16: false,
                                17: false,
                                18: false,
                                19: false,
                                20: false,
                                21: false,
                                22: false,
                                23: false,
                                24: false,
                                25: false,
                                26: false,
                                27: false,
                                28: false,
                                29: false,
                                30: false,
                                31: false,
                                32: false,
                                33: false,
                                34: false,
                                35: false,
                                36: false,
                                37: false,
                                38: false,
                                39: false,
                                40: false,
                                41: false,
                                42: false,
                                43: false,
                                44: false,
                                45: false,
                                46: false,
                                47: false,
                                48: false,
                                49: false,
                                50: false
                            },
                            name: name,
                            money: 99999,
                            mortgage: []

                        })
                        .then(function() {
                            signup.innerHTML = "註冊"
                            $("#signup").attr("disabled", false);
                            alert("帳戶建立成功!");
                            window.location.href = './main.html'
                        })
                        .catch(function(error) {
                            alert("Error writing document: ", error);
                        });
                }
            })
        })
    } else {
        console.log('No one signed in!')
    }
})