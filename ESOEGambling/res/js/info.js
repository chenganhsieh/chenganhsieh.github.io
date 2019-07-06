var db = firebase.firestore();
firebase.database.enableLogging(true);

var selectGroup = [];
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        db.collection("info").orderBy("date", "desc")
            .onSnapshot(function(querySnapshot) {
                var list = document.getElementById("text_group");
                while (list.hasChildNodes()) {
                    list.removeChild(list.firstChild);
                }
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    var group = $('<div class="container "><div class="row "> <div class="col-md-8 mx-auto"><div class="card mb-4 box-shadow " id="activity_num1"><div class="card-body "><p class="card-text ">' + doc.data().text + '</p></div></div></div></div></div>')
                    group.appendTo('#text_group');
                })
            })


    }
})