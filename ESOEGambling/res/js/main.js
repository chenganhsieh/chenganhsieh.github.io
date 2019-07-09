var db = firebase.firestore();
firebase.database.enableLogging(true);
var loadRank = [1, 2, 3, 4]


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        db.collection("Users").doc(user.uid)
            .onSnapshot(function(doc) {
                console.log("Current data: ", doc.data());
                document.getElementById('current_money').textContent = doc.data().money
            });

        db.collection("Users").orderBy("money", "desc").limit(5).onSnapshot(function(querySnapshot) {
            var list = document.getElementById("fight_sole");
            while (list.hasChildNodes()) {
                list.removeChild(list.firstChild);
            }
            querySnapshot.forEach(function(doc) {
                var group = $('<li class="list-group-item">' + doc.data().name + ':' + doc.data().money + '</li>');
                group.appendTo('#fight_sole');
            });

        })
        db.collection("Users").orderBy("money", "desc").onSnapshot(function(querySnapshot) {
            var groupMoney = [
                { name: '第一小隊', value: 0 },
                { name: '第二小隊', value: 0 },
                { name: '第三小隊', value: 0 },
                { name: '第四小隊', value: 0 },
            ];
            var list = document.getElementById("fight_group");
            while (list.hasChildNodes()) {
                list.removeChild(list.firstChild);
            }
            var count = 0
            querySnapshot.forEach(function(doc) {
                if (doc.id != "sAQDjCgaSFcAyDIZIgo2cMT4U6y2") {

                    count++
                    groupMoney[doc.data().groupID - 1].value = groupMoney[doc.data().groupID - 1].value + doc.data().money
                    if (count == querySnapshot.size - 1) {
                        groupMoney.sort(function(a, b) {
                            return a.value - b.value;
                        });
                        for (var i = 3; i > -1; i--) {
                            var group = $('<li class="list-group-item">' + groupMoney[i].name + ':' + groupMoney[i].value + '</li>');
                            group.appendTo('#fight_group');
                        }
                        document.getElementById('status').innerHTML = "您的帳戶餘額:"

                    }
                }
            })

        })

        db.collection("activity").doc("activity").onSnapshot(function(doc) {
            if (doc.data().num1 == true) {
                document.getElementById('activity_' + 1).innerHTML = "忙碌"
                document.getElementById('activity_' + 1).style.color = "red"
            } else {
                document.getElementById('activity_' + 1).innerHTML = "空閒"
                document.getElementById('activity_' + 1).style.color = "green"
            }
            if (doc.data().num2 == true) {
                document.getElementById('activity_' + 2).innerHTML = "忙碌"
                document.getElementById('activity_' + 2).style.color = "red"
            } else {
                document.getElementById('activity_' + 2).innerHTML = "空閒"
                document.getElementById('activity_' + 2).style.color = "green"
            }
            if (doc.data().num3 == true) {
                document.getElementById('activity_' + 3).innerHTML = "忙碌"
                document.getElementById('activity_' + 3).style.color = "red"
            } else {
                document.getElementById('activity_' + 3).innerHTML = "空閒"
                document.getElementById('activity_' + 3).style.color = "green"
            }
            if (doc.data().num4 == true) {
                document.getElementById('activity_' + 4).innerHTML = "忙碌"
                document.getElementById('activity_' + 4).style.color = "red"
            } else {
                document.getElementById('activity_' + 4).innerHTML = "空閒"
                document.getElementById('activity_' + 4).style.color = "green"
            }
            if (doc.data().num5 == true) {
                document.getElementById('activity_' + 5).innerHTML = "忙碌"
                document.getElementById('activity_' + 5).style.color = "red"
            } else {
                document.getElementById('activity_' + 5).innerHTML = "空閒"
                document.getElementById('activity_' + 5).style.color = "green"
            }
            if (doc.data().num6 == true) {
                document.getElementById('activity_' + 6).innerHTML = "忙碌"
                document.getElementById('activity_' + 6).style.color = "red"
            } else {
                document.getElementById('activity_' + 6).innerHTML = "空閒"
                document.getElementById('activity_' + 6).style.color = "green"
            }
            if (doc.data().num7 == true) {
                document.getElementById('activity_' + 7).innerHTML = "忙碌"
                document.getElementById('activity_' + 7).style.color = "red"
            } else {
                document.getElementById('activity_' + 7).innerHTML = "空閒"
                document.getElementById('activity_' + 7).style.color = "green"
            }
            if (doc.data().num8 == true) {
                document.getElementById('activity_' + 8).innerHTML = "忙碌"
                document.getElementById('activity_' + 8).style.color = "red"
            } else {
                document.getElementById('activity_' + 8).innerHTML = "空閒"
                document.getElementById('activity_' + 8).style.color = "green"
            }
            if (doc.data().num9 == true) {
                document.getElementById('activity_' + 9).innerHTML = "忙碌"
                document.getElementById('activity_' + 9).style.color = "red"
            } else {
                document.getElementById('activity_' + 9).innerHTML = "空閒"
                document.getElementById('activity_' + 9).style.color = "green"
            }
            if (doc.data().num10 == true) {
                document.getElementById('activity_' + 10).innerHTML = "忙碌"
                document.getElementById('activity_' + 10).style.color = "red"
            } else {
                document.getElementById('activity_' + 10).innerHTML = "空閒"
                document.getElementById('activity_' + 10).style.color = "green"
            }
            if (doc.data().num11 == true) {
                document.getElementById('activity_' + 11).innerHTML = "忙碌"
                document.getElementById('activity_' + 11).style.color = "red"
            } else {
                document.getElementById('activity_' + 11).innerHTML = "空閒"
                document.getElementById('activity_' + 11).style.color = "green"
            }
            if (doc.data().num12 == true) {
                document.getElementById('activity_' + 12).innerHTML = "忙碌"
                document.getElementById('activity_' + 12).style.color = "red"
            } else {
                document.getElementById('activity_' + 12).innerHTML = "空閒"
                document.getElementById('activity_' + 12).style.color = "green"
            }
            if (doc.data().num14 == true) {
                document.getElementById('activity_' + 14).innerHTML = "忙碌"
                document.getElementById('activity_' + 14).style.color = "red"
            } else {
                document.getElementById('activity_' + 14).innerHTML = "空閒"
                document.getElementById('activity_' + 14).style.color = "green"
            }
            if (doc.data().num15 == true) {
                document.getElementById('activity_' + 15).innerHTML = "忙碌"
                document.getElementById('activity_' + 15).style.color = "red"
            } else {
                document.getElementById('activity_' + 15).innerHTML = "空閒"
                document.getElementById('activity_' + 15).style.color = "green"
            }
            if (doc.data().num13 == true) {
                document.getElementById('activity_' + 13).innerHTML = "忙碌"
                document.getElementById('activity_' + 13).style.color = "red"
            } else {
                document.getElementById('activity_' + 13).innerHTML = "空閒"
                document.getElementById('activity_' + 13).style.color = "green"
            }

        })
    }
})