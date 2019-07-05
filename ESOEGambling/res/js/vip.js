var db = firebase.firestore();
firebase.database.enableLogging(true);

var selectGroup = [];
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (user.uid != "sAQDjCgaSFcAyDIZIgo2cMT4U6y2") {
            alert("你不是關主!");
            window.location.href = '../index.html'
        } else {
            db.collection("Users").where("activityID", "==", 0)
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
                        $('#' + doc.id).on('click', function() {
                            var element = document.getElementById(doc.id);
                            element.classList.toggle("active");
                            if (selectGroup.indexOf(doc.id) == -1) {
                                selectGroup.push(doc.id)
                            } else {
                                var index = selectGroup.indexOf(doc.id)
                                selectGroup.splice(index, 1)
                            }
                            console.log(selectGroup)
                        })
                    })
                })

        }
    }
})
$('#activity_num1').on('click', function() {
    if (selectGroup.length == 0) {
        alert("記得至少選一個組別喔");
    } else {
        var itemsProcessed = 0;
        db.collection("activity").doc("activity").update({
            num1: true
        }).then(function() {
            selectGroup.forEach(function(id) {
                itemsProcessed++;
                db.collection("Users").doc(id).update({
                    activityID: 1
                }).then(function() {
                    if (itemsProcessed == selectGroup.length) {
                        localStorage.setItem("activityID", 1);
                        window.location.href = './changeMoney.html'
                    }
                })

            })
        })
    }
})
$('#activity_num2').on('click', function() {
    if (selectGroup.length == 0) {
        alert("記得至少選一個組別喔");
    } else {
        var itemsProcessed = 0;
        db.collection("activity").doc("activity").update({
            num2: true
        }).then(function() {
            selectGroup.forEach(function(id) {

                itemsProcessed++;
                db.collection("Users").doc(id).update({
                    activityID: 2
                }).then(function() {
                    if (itemsProcessed == selectGroup.length) {
                        localStorage.setItem("activityID", 2);
                        window.location.href = './changeMoney.html'
                    }
                })
            })
        })
    }
})
$('#activity_num3').on('click', function() {
    if (selectGroup.length == 0) {
        alert("記得至少選一個組別喔");
    } else {
        var itemsProcessed = 0;
        db.collection("activity").doc("activity").update({
            num3: true
        }).then(function() {
            selectGroup.forEach(function(id) {

                itemsProcessed++;
                db.collection("Users").doc(id).update({
                    activityID: 3
                }).then(function() {
                    if (itemsProcessed == selectGroup.length) {
                        localStorage.setItem("activityID", 3);
                        window.location.href = './changeMoney.html'
                    }
                })
            })
        })
    }
})
$('#activity_num4').on('click', function() {
    if (selectGroup.length == 0) {
        alert("記得至少選一個組別喔");
    } else {
        var itemsProcessed = 0;
        db.collection("activity").doc("activity").update({
            num4: true
        }).then(function() {
            selectGroup.forEach(function(id) {

                itemsProcessed++;
                db.collection("Users").doc(id).update({
                    activityID: 4
                }).then(function() {
                    if (itemsProcessed == selectGroup.length) {
                        localStorage.setItem("activityID", 4);
                        window.location.href = './changeMoney.html'
                    }
                })
            })
        })
    }
})
$('#activity_num5').on('click', function() {
    if (selectGroup.length == 0) {
        alert("記得至少選一個組別喔");
    } else {
        var itemsProcessed = 0;
        db.collection("activity").doc("activity").update({
            num5: true
        }).then(function() {
            selectGroup.forEach(function(id) {

                itemsProcessed++;
                db.collection("Users").doc(id).update({
                    activityID: 5
                }).then(function() {
                    if (itemsProcessed == selectGroup.length) {
                        localStorage.setItem("activityID", 5);
                        window.location.href = './changeMoney.html'
                    }
                })
            })
        })
    }
})
$('#activity_num6').on('click', function() {
    if (selectGroup.length == 0) {
        alert("記得至少選一個組別喔");
    } else {
        var itemsProcessed = 0;
        db.collection("activity").doc("activity").update({
            num6: true
        }).then(function() {
            selectGroup.forEach(function(id) {

                itemsProcessed++;
                db.collection("Users").doc(id).update({
                    activityID: 6
                }).then(function() {
                    if (itemsProcessed == selectGroup.length) {
                        localStorage.setItem("activityID", 6);
                        window.location.href = './changeMoney.html'
                    }
                })
            })
        })
    }
})
$('#activity_num7').on('click', function() {
    if (selectGroup.length == 0) {
        alert("記得至少選一個組別喔");
    } else {
        var itemsProcessed = 0;
        db.collection("activity").doc("activity").update({
            num7: true
        }).then(function() {
            selectGroup.forEach(function(id) {

                itemsProcessed++;
                db.collection("Users").doc(id).update({
                    activityID: 7
                }).then(function() {
                    if (itemsProcessed == selectGroup.length) {
                        localStorage.setItem("activityID", 7);
                        window.location.href = './changeMoney.html'
                    }
                })
            })
        })
    }
})
$('#activity_num8').on('click', function() {
    if (selectGroup.length == 0) {
        alert("記得至少選一個組別喔");
    } else {
        var itemsProcessed = 0;
        db.collection("activity").doc("activity").update({
            num8: true
        }).then(function() {
            selectGroup.forEach(function(id) {

                itemsProcessed++;
                db.collection("Users").doc(id).update({
                    activityID: 8
                }).then(function() {
                    if (itemsProcessed == selectGroup.length) {
                        localStorage.setItem("activityID", 8);
                        window.location.href = './changeMoney.html'
                    }
                })
            })
        })
    }
})
$('#activity_num9').on('click', function() {
    if (selectGroup.length == 0) {
        alert("記得至少選一個組別喔");
    } else {
        var itemsProcessed = 0;
        db.collection("activity").doc("activity").update({
            num9: true
        }).then(function() {
            selectGroup.forEach(function(id) {

                itemsProcessed++;
                db.collection("Users").doc(id).update({
                    activityID: 9
                }).then(function() {
                    if (itemsProcessed == selectGroup.length) {
                        localStorage.setItem("activityID", 9);
                        window.location.href = './changeMoney.html'
                    }
                })
            })
        })
    }
})
$('#activity_num10').on('click', function() {
    if (selectGroup.length == 0) {
        alert("記得至少選一個組別喔");
    } else {
        var itemsProcessed = 0;
        db.collection("activity").doc("activity").update({
            num10: true
        }).then(function() {
            selectGroup.forEach(function(id) {

                itemsProcessed++;
                db.collection("Users").doc(id).update({
                    activityID: 10
                }).then(function() {
                    if (itemsProcessed == selectGroup.length) {
                        localStorage.setItem("activityID", 10);
                        window.location.href = './changeMoney.html'
                    }
                })
            })
        })
    }
})
$('#activity_num11').on('click', function() {
    if (selectGroup.length == 0) {
        alert("記得至少選一個組別喔");
    } else {
        var itemsProcessed = 0;
        db.collection("activity").doc("activity").update({
            num11: true
        }).then(function() {
            selectGroup.forEach(function(id) {

                itemsProcessed++;
                db.collection("Users").doc(id).update({
                    activityID: 11
                }).then(function() {
                    if (itemsProcessed == selectGroup.length) {
                        localStorage.setItem("activityID", 11);
                        window.location.href = './changeMoney.html'
                    }
                })
            })
        })
    }
})
$('#activity_num12').on('click', function() {
    if (selectGroup.length == 0) {
        alert("記得至少選一個組別喔");
    } else {
        var itemsProcessed = 0;
        db.collection("activity").doc("activity").update({
            num12: true
        }).then(function() {
            selectGroup.forEach(function(id) {

                itemsProcessed++;
                db.collection("Users").doc(id).update({
                    activityID: 12
                }).then(function() {
                    if (itemsProcessed == selectGroup.length) {
                        localStorage.setItem("activityID", 12);
                        window.location.href = './changeMoney.html'
                    }
                })
            })
        })
    }
})
$('#activity_num13').on('click', function() {
    if (selectGroup.length == 0) {
        alert("記得至少選一個組別喔");
    } else {
        var itemsProcessed = 0;
        db.collection("activity").doc("activity").update({
            num13: true
        }).then(function() {
            selectGroup.forEach(function(id) {

                itemsProcessed++;
                db.collection("Users").doc(id).update({
                    activityID: 13
                }).then(function() {
                    if (itemsProcessed == selectGroup.length) {
                        localStorage.setItem("activityID", 13);
                        window.location.href = './changeMoney.html'
                    }
                })
            })
        })
    }
})
$('#activity_num14').on('click', function() {
    if (selectGroup.length == 0) {
        alert("記得至少選一個組別喔");
    } else {
        var itemsProcessed = 0;
        db.collection("activity").doc("activity").update({
            num14: true
        }).then(function() {
            selectGroup.forEach(function(id) {

                itemsProcessed++;
                db.collection("Users").doc(id).update({
                    activityID: 14
                }).then(function() {
                    if (itemsProcessed == selectGroup.length) {
                        localStorage.setItem("activityID", 14);
                        window.location.href = './changeMoney.html'
                    }
                })
            })
        })
    }
})
$('#activity_num15').on('click', function() {
    if (selectGroup.length == 0) {
        alert("記得至少選一個組別喔");
    } else {
        var itemsProcessed = 0;
        db.collection("activity").doc("activity").update({
            num15: true
        }).then(function() {
            selectGroup.forEach(function(id) {

                itemsProcessed++;

                db.collection("Users").doc(id).update({
                    activityID: 15
                }).then(function() {
                    if (itemsProcessed == selectGroup.length) {
                        localStorage.setItem("activityID", 15);
                        window.location.href = './changeMoney.html'
                    }
                })
            })
        })
    }
})