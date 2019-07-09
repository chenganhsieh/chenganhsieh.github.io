var db = firebase.firestore();
firebase.database.enableLogging(true);


var groupID = []
var idCount = [1, 2, 3, 4]
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        db.collection("pawnshop").orderBy("groupID").onSnapshot(function(querySnapshot) {
            var list = document.getElementById("pawnshopstatus");
            while (list.hasChildNodes()) {
                list.removeChild(list.firstChild);
            }
            querySnapshot.forEach(function(doc) {
                var group = $('<li class="list-group-item">' + doc.data().groupID + " 小隊|" + doc.data().name + ':當掉' + doc.data().object + "獲得" + doc.data().money + '</li>');
                group.appendTo('#pawnshopstatus');
            });

        })
    }
})