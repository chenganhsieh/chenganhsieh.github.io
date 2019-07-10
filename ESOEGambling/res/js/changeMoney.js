var db = firebase.firestore();
firebase.database.enableLogging(true);
var activityID = localStorage.getItem("activityID");
var actID = parseInt(activityID)
var groupID = []
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (user.uid != "sAQDjCgaSFcAyDIZIgo2cMT4U6y2") {
            alert("你不是關主!");
            window.location.href = './main.html'
        } else {
            closeChange.innerHTML = "結束"
            db.collection("Users").where("activityID", "==", actID)
                .onSnapshot(function(querySnapshot) {
                    var list = document.getElementById("page-1");
                    while (list.hasChildNodes()) {
                        list.removeChild(list.firstChild);
                    }
                    querySnapshot.forEach(function(doc) {
                        if (groupID.indexOf(doc.id) == -1) {
                            groupID.push(doc.id)
                        }
                        console.log(doc.data())
                        var group = $('<div class="album py-5 bg-light"><div class="container"> <div class="row text-center"><div class="col-md-5 center2"> <h3>' + doc.data().name + '</h3><p style="color: red">' + doc.data().money + '</h3> </div></div> <div class="row text-center mt-3"> <div class="col-md-5 center2"><button type="button" class="btn btn-primary btn-md center2" id="' + doc.id + '1">+1倍賭金</button><button type="button" class="btn btn-primary btn-md center2" id="' + doc.id + '2">+2倍賭金</button><button type="button" class="btn btn-primary btn-md center2" id="' + doc.id + '3">+3倍賭金</button></div></div><div class="row text-center mt-3"><div class="col-md-5 center2"><button type="button" class="btn btn-primary btn-md center2" id="' + doc.id + '4">+4倍賭金</button><button type="button" class="btn btn-primary btn-md center2" id="' + doc.id + '5">+5倍賭金</button></div></div><div class="row text-center mt-3"><div class="col-md-5 center2"><button type="button" class="btn btn-danger btn-md center2" id="' + doc.id + '6">-1倍賭金</button><button type="button" class="btn btn-danger btn-md center2" id="' + doc.id + '7">-2倍賭金</button><button type="button" class="btn btn-danger btn-md center2" id="' + doc.id + '8">-3倍賭金</button></div></div></div></div>');
                        group.appendTo('#page-1');

                        for (var i = 1; i < 9; i++) {
                            var temp = doc.id + i;
                            document.getElementById(temp).onclick = (function(t) {
                                return function(e) {
                                    var cost = document.getElementById("gamblingMoney").value;
                                    if (cost != null && cost != "" && cost != 0) {
                                        var current = doc.data().money
                                        if (t < 6) {
                                            var result = parseInt(current + cost * t)
                                            db.collection("Users").doc(doc.id).update({
                                                money: result
                                            })

                                        } else {
                                            if (current < cost * (t - 5)) {
                                                alert(doc.data().name + "破產!")
                                            } else {
                                                var result = current - cost * (t - 5)
                                                db.collection("Users").doc(doc.id).update({
                                                    money: result
                                                })
                                            }
                                        }
                                    } else {
                                        alert("記得輸入賭金喔")
                                    }

                                };
                            })(i)

                        }
                    })

                })
        }
    }

})

$('#closeChange').on('click', function() {
    closeChange.innerHTML = "請稍後"
    $("#check").attr("disabled", true);
    var itemsProcessed = 0
    console.log(groupID)
    var usersUpdate = {};
    usersUpdate["num" + actID] = false;
    db.collection("activity").doc("activity").update(usersUpdate).then(function() {
        groupID.forEach(function(id) {
            itemsProcessed++;
            db.collection("Users").doc(id).update({
                activityID: 0
            }).then(function() {
                console.log(itemsProcessed)
                console.log(groupID.length)
                if (itemsProcessed == groupID.length) {
                    closeChange.innerHTML = "結束"
                    $("#check").attr("disabled", false);
                    window.location.href = './vip.html'
                }
            })
        })
    })
})

history.pushState(null, null, document.URL);
window.addEventListener('popstate', function() {
    this.alert("記得按結束紐")
    history.pushState(null, null, document.URL);
});