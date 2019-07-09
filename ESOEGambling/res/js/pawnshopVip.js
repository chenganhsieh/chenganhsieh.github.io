var db = firebase.firestore();
firebase.database.enableLogging(true);


var groupID = []
var idCount = [1, 2, 3, 4]
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (user.uid != "sAQDjCgaSFcAyDIZIgo2cMT4U6y2") {
            alert("你不是關主!");
            window.location.href = '../index.html'
        } else {
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
                                var list = document.getElementById("getback");
                                while (list.hasChildNodes()) {
                                    list.removeChild(list.firstChild);
                                }
                                db.collection("pawnshop").where("name", "==", doc.data().name).onSnapshot(

                                    function(querySnapshot) {
                                        while (list.hasChildNodes()) {
                                            list.removeChild(list.firstChild);
                                        }
                                        querySnapshot.forEach(function(doc) {
                                            var group = $('<li class="list-group-item"><p>' + doc.data().object + '</p><input id="' + doc.id + 'number" class="form-control mb-3" placeholder="贖回金額"><button class="btn btn-lg btn-info btn-block" id="' + doc.id + 'check">確認</button> </li>');
                                            group.appendTo('#getback');
                                            $("#" + doc.id + "check").on('click', function() {
                                                var pawnshopID = doc.id
                                                var cost = document.getElementById(doc.id + "number").value;
                                                if (cost != null && cost != "" && cost != 0) {
                                                    var current = 0;
                                                    db.collection("Users").doc(doc.data().fierbaseID).get().then(function(doc) {
                                                        current = doc.data().money
                                                        if (current - parseInt(cost) >= 0) {
                                                            var result = current - parseInt(cost)
                                                            db.collection("Users").doc(doc.id).update({
                                                                money: result
                                                            })
                                                            db.collection("pawnshop").doc(pawnshopID).delete()
                                                            while (list.hasChildNodes()) {
                                                                list.removeChild(list.firstChild);
                                                            }
                                                        } else {
                                                            alert("你贖不回來的($不夠)")
                                                        }
                                                    })
                                                } else {
                                                    alert("記得輸入金額喔")
                                                }
                                            })
                                        })
                                    })

                                db.collection("Users").doc(doc.id)
                                    .onSnapshot(function(doc) {
                                        var list = document.getElementById("page-1");
                                        while (list.hasChildNodes()) {
                                            list.removeChild(list.firstChild);
                                        }
                                        var group = $('<div class="col-md-3 center2 mt-3"> <h3 id="group_num">' + "第" + doc.data().groupID + "小隊" + '</h3><h3 id="group_name">' + doc.data().name + '</h3><h4 style="color:red" id="group_money">' + doc.data().money + '</h4><input type="text" placeholder="物品" id="objects"><h3>獲得金額</h3><input type="number" placeholder="元" id="money"> <button class="btn btn-lg btn-info btn-block mt-3 ml-2 mr-2" type="submit" id="ensure">登記物品</button> </div>');

                                        group.appendTo('#page-1');
                                        $("#ensure").on('click', function() {
                                            var object = document.getElementById("objects").value;
                                            var cost = document.getElementById("money").value;
                                            if (cost != null && cost != "" && cost != 0) {
                                                var current = doc.data().money
                                                var result = current + parseInt(cost)
                                                db.collection("Users").doc(doc.id).update({
                                                    money: result
                                                })
                                                db.collection("pawnshop").doc().set({
                                                    money: cost,
                                                    name: doc.data().name,
                                                    groupID: doc.data().groupID,
                                                    object: object,
                                                    fierbaseID: doc.id
                                                })
                                            } else {
                                                alert("記得輸入金額喔")
                                            }
                                        })


                                    })
                            })
                        })
                    })
            })

        }
    }
})