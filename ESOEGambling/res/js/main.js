var db = firebase.firestore();
firebase.database.enableLogging(true);


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        db.collection("Users").doc(user.uid)
            .onSnapshot(function(doc) {
                console.log("Current data: ", doc.data());
                document.getElementById('current_money').textContent = doc.data().money
            });

        db.collection("Users").orderBy("money", "desc").limit(5).onSnapshot(function(querySnapshot) {
            var list = document.getElementById("fight_group");
            while (list.hasChildNodes()) {
                list.removeChild(list.firstChild);
            }
            querySnapshot.forEach(function(doc) {
                var group = $('<li class="list-group-item">' + doc.data().name + ':' + doc.data().money + '</li>');
                group.appendTo('#fight_group');
            });

        })
        db.collection("activity").doc("activity").onSnapshot(function(doc) {
            var x = 1
            console.log(doc.data().x)
            for (var i = 1; i < 16; i++) {
                if (doc.data().i == true) {

                    document.getElementById('activity_' + i).innerHTML = "忙碌"
                    document.getElementById('activity_' + i).style.color = "red"
                } else {
                    document.getElementById('current_' + i).innerHTML = "空閒"
                    document.getElementById('current_' + i).style.color = "green"
                }

            }
        })
        for (var i = 1; i < 16; i++) {
            console.log('activity_' + i)
        }

    }
})