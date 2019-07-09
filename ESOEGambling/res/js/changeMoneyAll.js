var db = firebase.firestore();
firebase.database.enableLogging(true);

var selectGroup = [];
var groupID = []
var idCount = [1, 2, 3, 4]
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (user.uid != "sAQDjCgaSFcAyDIZIgo2cMT4U6y2") {
            alert("你不是關主!");
            window.location.href = '../index.html'
        } else {
            idCount.forEach(function(i) {
                db.collection("Users").where("activityID", "==", 0).where("groupID", "==", i)
                    .onSnapshot(function(querySnapshot) {
                        var list = document.getElementById("fight_group" + i);
                        while (list.hasChildNodes()) {
                            list.removeChild(list.firstChild);
                        }
                        if (i == 4) {
                            $("#status").text("請選擇隊名");
                        }
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, " => ", doc.data());
                            var group = $('<li class="list-group-item" id="' + doc.id + '">' + doc.data().name + '</li>');
                            group.appendTo('#fight_group' + i);

                            $('#' + doc.id).on('click', function() {

                                if (selectGroup.indexOf(doc.id) == -1) {
                                    selectGroup.push(doc.id)
                                } else {
                                    var index = selectGroup.indexOf(doc.id)
                                    selectGroup.splice(index, 1)
                                }
                                console.log(selectGroup)


                                db.collection("Users").doc(doc.id)
                                    .onSnapshot(function(doc) {
                                        var list = document.getElementById("page-1");
                                        while (list.hasChildNodes()) {
                                            list.removeChild(list.firstChild);
                                        }
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
                                                            if (current < cost * t) {
                                                                alert(doc.data().name + "破產!")
                                                            } else {
                                                                var result = current - cost * t
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
                        })
                    })
            })

        }
    }
})