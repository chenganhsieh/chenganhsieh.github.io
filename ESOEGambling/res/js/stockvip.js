var db = firebase.firestore();
firebase.database.enableLogging(true);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (user.uid != "sAQDjCgaSFcAyDIZIgo2cMT4U6y2") {
            alert("你不是關主!");
            window.location.href = '../index.html'
        } else {
            var currentArray = []
            var currentPoint = 0
            db.collection("Users").doc(user.uid)
                .onSnapshot(function(doc) {

                    document.getElementById('current_money').textContent = doc.data().money
                });
            db.collection("stock").doc("stock").onSnapshot(function(doc) {
                updateChart(doc.data().stock)
                currentArray = doc.data().stock
                currentPoint = doc.data().stock[doc.data().stock.length - 1]
                db.collection("stock").where("userID", "==", user.uid).onSnapshot(function(querySnapshot) {
                    var list = document.getElementById("getback");
                    while (list.hasChildNodes()) {
                        list.removeChild(list.firstChild);
                    }
                    document.getElementById('status').innerHTML = "您的帳戶餘額:"
                    querySnapshot.forEach(function(doc) {
                        var group = $(' <li class="list-group-item"><p>購買時點數:' + doc.data().currentPoint + '</p><p>張數' + doc.data().amount + '張</p><p>購買價值:' + Math.round(doc.data().amount * 100 * doc.data().currentPoint) + '</p><p>現在價值:' + Math.round(doc.data().amount * 100 * currentPoint) + '</p><button class="btn btn-lg btn-info btn-block mt-3" type="submit" id="' + doc.id + 'sold">賣出</button></li>');
                        group.appendTo('#getback');
                        $("#" + doc.id + "sold").on('click', function() {
                            var num = doc.data().amount
                            var stockID = doc.id
                            db.collection("Users").doc(doc.data().userID).get().then(function(doc) {
                                current = doc.data().money
                                result = current + Math.round(currentPoint * 100 * num)
                                db.collection("Users").doc(doc.id).update({
                                    money: result
                                })
                                db.collection("stock").doc(stockID).delete().then(function() {
                                    alert("已賣出!")
                                })
                                while (list.hasChildNodes()) {
                                    list.removeChild(list.firstChild);
                                }
                            })
                        })
                    })
                })
            })


            $('#ensure').on('click', function() {
                var newPoint = parseFloat(document.getElementById("inputPoint").value);
                currentArray.shift();
                currentArray.push(newPoint)
                db.collection("stock").doc("stock").update({
                    stock: currentArray
                })
            })
            var amount = 0
            $('#num1').on('click', function() {
                var element = document.getElementById("dropdownMenuButton");
                element.innerHTML = "1張"
                var element2 = document.getElementById("price");
                var cost = Math.round(currentPoint * 100 * 1)
                element2.innerHTML = "價格:" + cost + "元"
                amount = 1

            })
            $('#num2').on('click', function() {
                var element = document.getElementById("dropdownMenuButton");
                element.innerHTML = "2張"
                var element2 = document.getElementById("price");
                var cost = Math.round(currentPoint * 100 * 2)
                element2.innerHTML = "價格:" + cost + "元"
                amount = 2

            })
            $('#num3').on('click', function() {
                var element = document.getElementById("dropdownMenuButton");
                element.innerHTML = "3張"
                var element2 = document.getElementById("price");
                var cost = Math.round(currentPoint * 100 * 3)
                element2.innerHTML = "價格:" + cost + "元"
                amount = 3

            })
            $('#buy').on('click', function() {
                if (amount == 0) {
                    alert("您的購買張數?")
                } else {
                    buy.innerHTML = "購買中..."
                    $("#buy").attr("disabled", true);
                    db.collection("stock").doc().set({
                        userID: user.uid,
                        currentPoint: currentPoint,
                        amount: amount
                    }).then(function() {
                        db.collection("Users").doc(user.uid).get().then(function(doc) {
                            current = doc.data().money
                            result = current - Math.round(currentPoint * 100 * amount)
                            db.collection("Users").doc(doc.id).update({
                                money: result
                            }).then(function() {
                                alert("購買成功!")
                                buy.innerHTML = "確認"
                                $("#buy").attr("disabled", false);
                            })
                        })
                    })
                }
            })


            /*
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
            })*/

        }
    }
})




function updateChart(list) {
    var title = {
        text: 'ESOE賭場股份有限公司'
    };

    var xAxis = {
        categories: ['1', '2', '3', '4', '5', '6',
            '7', '8', '9', '10', '11', 'current'
        ]
    };
    var yAxis = {
        title: {
            text: '點'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#CC0000'
        }]
    };


    var legend = {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0,

    };

    var series = [{
        data: list,
        showInLegend: false
    }];

    var json = {};

    json.title = title;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.legend = legend;
    json.series = series;

    $('#container').highcharts(json);
}