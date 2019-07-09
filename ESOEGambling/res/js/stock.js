var db = firebase.firestore();
firebase.database.enableLogging(true);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var currentPoint = 0
        db.collection("Users").doc(user.uid)
            .onSnapshot(function(doc) {

                document.getElementById('current_money').textContent = doc.data().money
            });
        db.collection("stock").doc("stock").onSnapshot(function(doc) {
            updateChart(doc.data().stock)
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