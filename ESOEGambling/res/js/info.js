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
                    var temp = doc.data().date.seconds
                    var time = temp.toString().toHHMMSS()

                    var group = $('<div class="container "><div class="row "> <div class="col-md-8 mx-auto"><div class="card mb-4 box-shadow " id="activity_num1"><div class="card-body "><p class="card-text ">' + doc.data().text + "   " + time + '</p></div></div></div></div></div>')
                    group.appendTo('#text_group');
                })
            })


    }
})
String.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return minutes + ':' + seconds;
}