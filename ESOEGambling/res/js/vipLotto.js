var db = firebase.firestore();
firebase.database.enableLogging(true);

var selectNum = [-1, -1, -1];
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (user.uid != "sAQDjCgaSFcAyDIZIgo2cMT4U6y2") {
            alert("你不是關主!");
            window.location.href = '../index.html'
        } else {
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
                check.innerHTML = "已送出!"
                $("#check").attr("disabled", true);
                db.collection('lotto').doc('lotto').update({
                    num: selectNum

                })
            })
            $("#firstData").on('click', function() {
                var time = document.getElementById("lottoTime").value;
                var money = document.getElementById("lottoMoney").value;
                if (time != null && time != "" && money != null && money != "") {
                    db.collection('lotto').doc('lotto').update({
                        money: money,
                        time: time
                    })
                } else {
                    alert("有填獎金或時間嗎?")
                }
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
            $("#reset").on('click', function() {
                reset.innerHTML = "重設中..."
                $("#reset").attr("disabled", true);
                db.collection('lotto').doc('lotto').update({
                    money: 0,
                    time: "",
                    num: [-1, -1, -1]
                })
                db.collection("Users").get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        var lottoRef = db.collection("Users").doc(doc.id);
                        lottoRef.update({
                            lottonumdetail: [],
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
                        }).then(function() {
                            reset.innerHTML = "重設"
                            $("#reset").attr("disabled", false);
                        });
                    })
                })
                check.innerHTML = "送出"
                $("#check").attr("disabled", false);
            })

        }
    }
})