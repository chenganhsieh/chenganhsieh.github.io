var db = firebase.firestore();
firebase.database.enableLogging(true);

var selectNum = [0, 0, 0];
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        var childs = document.getElementById('button_group').children;
        for (var i = 0; i < childs.length; i++) {
            childs[i].onclick = (function(t) {
                return function(e) {

                    selectNum.shift()
                    selectNum.push(t + 1)
                    console.log(selectNum)
                    for (var i = 2; i > -1; i--) {
                        if (selectNum[i] < 10) {
                            document.getElementById("lotto" + i).innerHTML = "0" + selectNum[i];
                        } else {
                            document.getElementById("lotto" + i).innerHTML = selectNum[i];
                        }
                    }
                }

            })(i)
        }

        $("#check").on('click', function() {
            check.innerHTML = "送出中..."
            $("#check").attr("disabled", true);
            var usersUpdate = {};
            usersUpdate['lottonum.' + selectNum[0]] = true;
            usersUpdate['lottonum.' + selectNum[1]] = true;
            usersUpdate['lottonum.' + selectNum[2]] = true;
            db.collection('Users').doc(user.uid).update(usersUpdate).then(function() {
                check.innerHTML = "已送出!"
            })
        })

        db.collection("lotto").doc("lotto").onSnapshot(function(doc) {
            time.innerHTML = "開獎時間" + doc.data().time
            money.innerHTML = doc.data().money
            var list = doc.data().num
            one.innerHTML = list[0]
            two.innerHTML = list[1]
            three.innerHTML = list[2]
            db.collection("Users").where("lottonum." + list[0], "==", true)
                .where("lottonum." + list[1], "==", true)
                .where("lottonum." + list[2], "==", true)
                .onSnapshot(function(querySnapshot) {
                    var list = document.getElementById("fight_group");
                    while (list.hasChildNodes()) {
                        list.removeChild(list.firstChild);
                    }
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        var group = $('<li class="list-group-item" id="' + doc.id + '">' + doc.data().name + '</li>');
                        group.appendTo('#fight_group');
                    })
                })
        })

    }
})