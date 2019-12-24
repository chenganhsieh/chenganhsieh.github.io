'use strict';


// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyATJcXbIj2S6Zlp-CXHwHtvDUpJGrSHAf0",
    authDomain: "webfinal-c4d48.firebaseapp.com",
    databaseURL: "https://webfinal-c4d48.firebaseio.com",
    projectId: "webfinal-c4d48",
    storageBucket: "webfinal-c4d48.appspot.com",
    messagingSenderId: "998073330583",
    appId: "1:998073330583:web:c4c4aa9ee7ba4f9f5c32d2",
    measurementId: "G-ZZW4DMTQKW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var question = 0;
var newUser = false;
var roomId = "none";
var user1 = "none";
var user2 = "none";
var question1 = new Array("打火機", "手電筒", "火把", "電燈泡");
var question2 = new Array("迷霧之子", "糕點配方", "機器學習實務", "一年200萬不是夢");
var question3 = new Array("毛衣", "夾克", "T-shirt", "襯衫");
var question4 = new Array("貓", "狗", "狼", "豬", "熊", "羊駝");
var question5 = new Array("藍莓派", "紅梅派", "抹茶派", "乳酪派");
// Signs-in Friendly Chat.
function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        if (result.additionalUserInfo.isNewUser == true) {
            newUser = true;
        }
    }).catch(function(error) {
        console.log(error.message);
    });
}

// Signs-out of Friendly Chat.
function signOut() {
    firebase.auth().signOut();
}

// Initiate firebase auth.
function initFirebaseAuth() {
    firebase.auth().onAuthStateChanged(authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
    return firebase.auth().currentUser.displayName;
}

function getUserEmail() {
    return firebase.auth().currentUser.email;
}

function getUserUid() {
    return firebase.auth().currentUser.uid;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

// Saves a new message on the Firebase DB.
function saveMessage(messageText) {
    return firebase.firestore().collection('rooms').doc(roomId).collection('messages').add({
        name: getUserName(),
        text: messageText,
        profilePicUrl: getProfilePicUrl(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(error) {
        console.error('Error writing new message to database', error);
    });
}

// Loads chat messages history and listens for upcoming ones.
function loadMessages() {
    // Create the query to load the last 12 messages and listen for new ones.
    var query = firebase.firestore()
        .collection('rooms').doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .limit(12);

    // Start listening to the query.
    query.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === 'removed') {
                deleteMessage(change.doc.id);
            } else {
                var message = change.doc.data();
                displayMessage(change.doc.id, message.timestamp, message.name,
                    message.text, message.profilePicUrl, message.imageUrl);
            }
        });
    });
}

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
function saveImageMessage(file) {
    // 1 - We add a message with a loading icon that will get updated with the shared image.
    firebase.firestore().collection('rooms').doc(roomId).collection('messages').add({
        name: getUserName(),
        imageUrl: LOADING_IMAGE_URL,
        profilePicUrl: getProfilePicUrl(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function(messageRef) {
        // 2 - Upload the image to Cloud Storage.
        var filePath = firebase.auth().currentUser.uid + '/' + messageRef.id + '/' + file.name;
        return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
            // 3 - Generate a public URL for the file.
            return fileSnapshot.ref.getDownloadURL().then((url) => {
                // 4 - Update the chat message placeholder with the image's URL.
                return messageRef.update({
                    imageUrl: url,
                    storageUri: fileSnapshot.metadata.fullPath
                });
            });
        });
    }).catch(function(error) {
        console.error('There was an error uploading a file to Cloud Storage:', error);
    });
}

// Saves the messaging device token to the datastore.
function saveMessagingDeviceToken() {
    firebase.messaging().getToken().then(function(currentToken) {
        if (currentToken) {
            console.log('Got FCM device token:', currentToken);
            // Saving the Device Token to the datastore.
            firebase.firestore().collection('fcmTokens').doc(currentToken)
                .set({ uid: firebase.auth().currentUser.uid });
        } else {
            // Need to request permissions to show notifications.
            requestNotificationsPermissions();
        }
    }).catch(function(error) {
        console.error('Unable to get messaging token.', error);
    });
}

function saveUserInformation() {
    firebase.firestore().collection('users').doc(getUserUid()).set({
        id: getUserUid(),
        name: getUserName(),
        email: getUserEmail(),
        profilePicUrl: getProfilePicUrl(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(error) {
        console.error('Error writing user data to database', error);
    });
}

function startMatch() {
    hintText.removeAttribute("hidden")
    firebase.firestore().collection('players').doc(getUserUid()).set({
        id: getUserUid(),
        name: getUserName(),
        players: 2,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function() {
        loadingDiv.style.width = "50%";
        hintText.innerHTML = "建立房間ing..."
        firebase.firestore().collection('players').doc(getUserUid())
            .onSnapshot(function(doc) {
                if (doc.data().roomId != null) {
                    roomId = doc.data().roomId
                    console.log("room:" + roomId)
                    loadingDiv.style.width = "75%";
                    hintText.innerHTML = "等有緣人中...";

                    firebase.firestore().collection('rooms').doc(roomId)
                        .onSnapshot(function(doc) {
                            if (doc.data().full == true) {
                                loadingDiv.style.width = "100%";
                                hintText.innerHTML = "配對成功~~"
                                user1 = doc.data().players[0];
                                user2 = doc.data().players[1];
                                checkSimilarity();
                                setTimeout(function() {
                                    barDiv.setAttribute('hidden', 'true')
                                    chatDiv.removeAttribute('hidden')
                                    hintText.setAttribute('hidden', 'true');
                                    // We load currently existing chat messages and listen to new ones.
                                    loadMessages();

                                }, 500);

                            }
                        });
                }
            });

    }).catch(function(error) {
        console.error('Error writing user data to database', error);
    });
}

function checkMatchRoom() {
    firebase.firestore().collection('players').doc(getUserUid())
        .get().then(function(doc) {
            if (doc.exists) {
                if (doc.data().roomId != null) {
                    questionDiv.setAttribute('hidden', 'true')
                    chatDiv.removeAttribute('hidden')
                    roomId = doc.data().roomId

                    firebase.firestore().collection('rooms').doc(roomId)
                        .get().then(function(doc) {
                            if (doc.data().full == true) {
                                user1 = doc.data().players[0];
                                user2 = doc.data().players[1];
                                checkSimilarity();
                                loadMessages();

                            }
                        });
                } else {
                    firebase.firestore().collection('players').doc(getUserUid()).delete().then(function() {
                        startGame()
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                }
            } else {
                startGame()
            }
        })
}


// function saveUserMatchData() {
//     firebase.firestore().collection('match').doc(getUserUid()).set({
//         one: 0,
//         two: 0,
//         three: 0,
//         four: 0,
//         five: 0
//     }).catch(function(error) {
//         console.error('Error writing match data to database', error);
//     });
// }
// Requests permissions to show notifications.
function requestNotificationsPermissions() {
    console.log('Requesting notifications permission...');
    firebase.messaging().requestPermission().then(function() {
        // Notification permission granted.
        saveMessagingDeviceToken();
    }).catch(function(error) {
        console.error('Unable to get permission to notify.', error);
    });
}

// Triggered when a file is selected via the media picker.
function onMediaFileSelected(event) {
    event.preventDefault();
    var file = event.target.files[0];

    // Clear the selection in the file picker input.
    imageFormElement.reset();

    // Check if the file is an image.
    if (!file.type.match('image.*')) {
        var data = {
            message: 'You can only share images',
            timeout: 2000
        };
        signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
        return;
    }
    // Check if the user is signed-in
    if (checkSignedInWithMessage()) {
        saveImageMessage(file);
    }
}

// Triggered when the send new message form is submitted.
function onMessageFormSubmit(e) {
    e.preventDefault();
    // Check that the user entered a message and is signed in.
    if (messageInputElement.value && checkSignedInWithMessage()) {
        saveMessage(messageInputElement.value).then(function() {
            // Clear message text field and re-enable the SEND button.
            resetMaterialTextfield(messageInputElement);
            toggleButton();
        });
    }
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
    if (user) { // User is signed in!
        // Get the signed-in user's profile pic and name.
        var profilePicUrl = getProfilePicUrl();
        var userName = getUserName();

        // Set the user's profile pic and name.
        userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
        userNameElement.textContent = userName;

        // Show user's profile and sign-out button.
        userNameElement.removeAttribute('hidden');
        userPicElement.removeAttribute('hidden');
        signOutButtonElement.removeAttribute('hidden');

        // Hide sign-in button.
        signInButtonElement.setAttribute('hidden', 'true');
        question = 0
        if (newUser == true) {
            saveUserInformation();
            //saveUserMatchData();
        }
        // We save the Firebase Messaging Device token and enable notifications.
        saveMessagingDeviceToken();
        checkMatchRoom();
    } else { // User is signed out!
        // Hide user's profile and sign-out button.
        userNameElement.setAttribute('hidden', 'true');
        userPicElement.setAttribute('hidden', 'true');
        signOutButtonElement.setAttribute('hidden', 'true');
        questionElement.setAttribute('hidden', 'true');
        chatDiv.setAttribute('hidden', 'true');
        similarityHeader.setAttribute('hidden', 'true');
        hintText.setAttribute('hidden', 'true');
        question = 0;
        // Show sign-in button.
        signInButtonElement.removeAttribute('hidden');
    }
}

// Returns true if user is signed-in. Otherwise false and displays a message.
function checkSignedInWithMessage() {
    // Return true if the user is signed in Firebase
    if (isUserSignedIn()) {
        return true;
    }

    // Display a message to the user using a Toast.
    var data = {
        message: 'You must sign-in first',
        timeout: 2000
    };
    signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
    return false;
}

// Resets the given MaterialTextField.
function resetMaterialTextfield(element) {
    element.value = '';
    element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
}

// Template for messages.
var MESSAGE_TEMPLATE =
    '<div class="message-container">' +
    '<div class="spacing"><div class="pic"></div></div>' +
    '<div class="message"></div>' +
    '<div class="name"></div>' +
    '</div>';

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
        return url + '?sz=150';
    }
    return url;
}

// A loading image URL.
var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

// Delete a Message from the UI.
function deleteMessage(id) {
    var div = document.getElementById(id);
    // If an element for that message exists we delete it.
    if (div) {
        div.parentNode.removeChild(div);
    }
}

function createAndInsertMessage(id, timestamp) {
    const container = document.createElement('div');
    container.innerHTML = MESSAGE_TEMPLATE;
    const div = container.firstChild;
    div.setAttribute('id', id);

    // If timestamp is null, assume we've gotten a brand new message.
    // https://stackoverflow.com/a/47781432/4816918
    timestamp = timestamp ? timestamp.toMillis() : Date.now();
    div.setAttribute('timestamp', timestamp);

    // figure out where to insert new message
    const existingMessages = messageListElement.children;
    if (existingMessages.length === 0) {
        messageListElement.appendChild(div);
    } else {
        let messageListNode = existingMessages[0];

        while (messageListNode) {
            const messageListNodeTime = messageListNode.getAttribute('timestamp');

            if (!messageListNodeTime) {
                throw new Error(
                    `Child ${messageListNode.id} has no 'timestamp' attribute`
                );
            }

            if (messageListNodeTime > timestamp) {
                break;
            }

            messageListNode = messageListNode.nextSibling;
        }

        messageListElement.insertBefore(div, messageListNode);
    }

    return div;
}

// Displays a Message in the UI.
function displayMessage(id, timestamp, name, text, picUrl, imageUrl) {
    var div = document.getElementById(id) || createAndInsertMessage(id, timestamp);

    // profile picture
    if (picUrl) {
        div.querySelector('.pic').style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(picUrl) + ')';
    }

    div.querySelector('.name').textContent = name;
    var messageElement = div.querySelector('.message');

    if (text) { // If the message is text.
        messageElement.textContent = text;
        // Replace all line breaks by <br>.
        messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
    } else if (imageUrl) { // If the message is an image.
        var image = document.createElement('img');
        image.addEventListener('load', function() {
            messageListElement.scrollTop = messageListElement.scrollHeight;
        });
        image.src = imageUrl + '&' + new Date().getTime();
        messageElement.innerHTML = '';
        messageElement.appendChild(image);
    }
    // Show the card fading-in and scroll to view the new message.
    setTimeout(function() { div.classList.add('visible') }, 1);
    messageListElement.scrollTop = messageListElement.scrollHeight;
    messageInputElement.focus();
}

// Enables or disables the submit button depending on the values of the input
// fields.
function toggleButton() {
    if (messageInputElement.value) {
        submitButtonElement.removeAttribute('disabled');
    } else {
        submitButtonElement.setAttribute('disabled', 'true');
    }
}

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
}

// Checks that Firebase has been imported.
checkSetup();

// Shortcuts to DOM Elements.
var messageListElement = document.getElementById('messages');
var messageFormElement = document.getElementById('message-form');
var messageInputElement = document.getElementById('message');
var submitButtonElement = document.getElementById('submit');
var imageButtonElement = document.getElementById('submitImage');
var imageFormElement = document.getElementById('image-form');
var mediaCaptureElement = document.getElementById('mediaCapture');
var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');
var signInSnackbarElement = document.getElementById('must-signin-snackbar');
var questionElement = document.getElementById('question');

//my element
const questionDiv = document.getElementById('question')
const loadingDiv = document.getElementById('loading')
const barDiv = document.getElementById('bardiv');
const chatDiv = document.getElementById('chatLayout');
const similarity = document.getElementById('similarity');
const myanswer = document.getElementById('myanswer');
const matchanswer = document.getElementById('matchanswer');
const similarityHeader = document.getElementById('similarityHeader');
const hintText = document.getElementById('hintText');

// Saves message on form submit.
messageFormElement.addEventListener('submit', onMessageFormSubmit);
signOutButtonElement.addEventListener('click', signOut);
signInButtonElement.addEventListener('click', signIn);

// Toggle for the button.
messageInputElement.addEventListener('keyup', toggleButton);
messageInputElement.addEventListener('change', toggleButton);

// Events for image upload.
imageButtonElement.addEventListener('click', function(e) {
    e.preventDefault();
    mediaCaptureElement.click();
});
mediaCaptureElement.addEventListener('change', onMediaFileSelected);

// initialize Firebase
initFirebaseAuth();

// Remove the warning about timstamps change. 
var firestore = firebase.firestore();
var settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// TODO: Enable Firebase Performance Monitoring.
firebase.performance();






//game 
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}


function startGame() {
    questionElement.removeAttribute('hidden')
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    if (textNode != null) {
        textElement.innerText = textNode.text
    }
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.id = option.buttonid
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    question += 1
    console.log(question)
    if (question > 1 && question < 7) {
        saveUserOptionData(option)
    }
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        questionDiv.setAttribute('hidden', 'true')
        barDiv.removeAttribute('hidden')
        startMatch()


    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

function checkSimilarity() {
    similarityHeader.removeAttribute('hidden')
    firebase.firestore().collection('match').doc(user1).get().then(function(doc) {
        if (doc.exists) {

            var user1A = doc.data().one
            var user1B = doc.data().two
            var user1C = doc.data().three
            var user1D = doc.data().four
            var user1E = doc.data().five
            firebase.firestore().collection('match').doc(user2).get().then(function(doc) {
                if (doc.exists) {

                    var user2A = doc.data().one
                    var user2B = doc.data().two
                    var user2C = doc.data().three
                    var user2D = doc.data().four
                    var user2E = doc.data().five
                    var score = 0
                    if (user2A == user1A) {

                        score += 20
                    }
                    if (user2B == user1B) {
                        score += 20
                    }
                    if (user2C == user1C) {
                        score += 20
                    }
                    if (user2D == user1D) {
                        score += 20
                    }
                    if (user2E == user1E) {
                        score += 20
                    }
                    similarity.innerHTML = score + " %"
                    if (user1 == getUserUid()) {
                        var mine = question1[user1A - 1] + " " + question2[user1B - 1] + " " + question3[user1C - 1] + " " +
                            question4[user1D - 1] + " " + question5[user1E - 1] + " "

                        var other = question1[user2A - 1] + " " + question2[user2B - 1] + " " + question3[user2C - 1] + " " +
                            question4[user2D - 1] + " " + question5[user2E - 1] + " "
                    } else {
                        var other = question1[user1A - 1] + " " + question2[user1B - 1] + " " + question3[user1C - 1] + " " +
                            question4[user1D - 1] + " " + question5[user1E - 1] + " "

                        var mine = question1[user2A - 1] + " " + question2[user2B - 1] + " " + question3[user2C - 1] + " " +
                            question4[user2D - 1] + " " + question5[user2E - 1] + " "
                    }
                    matchanswer.innerHTML = "對方的回答: " + other
                    myanswer.innerHTML = "您的回答: " + mine


                } else {
                    console.log("Error: User2 answer not found!")
                    matchanswer.innerHTML = "對方的回答: 沒有耶?!出錯了!"
                }
            })
        } else {
            console.log("Error: User1 answer not found!")
            myanswer.innerHTML = "您的回答: 怎麼沒有你的答案@_@"
        }
    })
}


function saveUserOptionData(option) {
    var orderID = parseInt(option.buttonid)
    if (question == 2) {
        firebase.firestore().collection('match').doc(getUserUid()).set({
            one: orderID,
        }, { merge: true }).catch(function(error) {
            console.error('Error writing match data to database', error);
        });

    } else if (question == 3) {
        firebase.firestore().collection('match').doc(getUserUid()).set({
            two: orderID,
        }, { merge: true }).catch(function(error) {
            console.error('Error writing match data to database', error);
        });

    } else if (question == 4) {
        firebase.firestore().collection('match').doc(getUserUid()).set({
            three: orderID,
        }, { merge: true }).catch(function(error) {
            console.error('Error writing match data to database', error);
        });


    } else if (question == 5) {
        firebase.firestore().collection('match').doc(getUserUid()).set({
            four: orderID,
        }, { merge: true }).catch(function(error) {
            console.error('Error writing match data to database', error);
        });

    } else if (question == 6) {
        firebase.firestore().collection('match').doc(getUserUid()).set({
            five: orderID,
        }, { merge: true }).catch(function(error) {
            console.error('Error writing match data to database', error);
        });

    }
}


const textNodes = [{
        id: 1,
        text: '在一股冷風中，你醒了過來，發現自己在一個漆黑的洞穴裡...',
        options: [{
            buttonid: '1',
            text: '繼續',
            //setState: { blueGoo: true },
            nextText: 2
        }, ]
    },
    {
        id: 2,
        text: '摸黑之中，你找到了一個包包，裡頭有打火機、手電筒、火把、電燈泡，你會選擇甚麼?',
        options: [{
                buttonid: '1',
                text: '打火機',
                setState: { flashlight: true },
                nextText: 3
            },
            {
                buttonid: '2',
                text: '火把',
                setState: { battery: false },
                nextText: 3
            },
            {
                buttonid: '3',
                text: '手電筒',
                nextText: 3
            },
            {
                buttonid: '4',
                text: '電燈泡',
                setState: { battery: false },
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: '有了亮光，你發現自己在大約3米的洞穴之中，除了不能用的殘破包包外，還有一本書，書名是',
        options: [{
                buttonid: '1',
                text: '迷霧之子',
                nextText: 4
            },
            {
                buttonid: '2',
                text: '糕點配方',
                nextText: 4
            },
            {
                buttonid: '3',
                text: '機器學習實務',
                nextText: 4
            },
            {
                buttonid: '4',
                text: '一年200萬不是夢',
                nextText: 4
            },
        ]
    },
    {
        id: 4,
        text: '突然一陣風吹來，你感到一絲寒意，往風的方向走，發現了衣服',
        options: [{
                buttonid: '1',
                text: '毛衣',
                nextText: 5
            },
            {
                buttonid: '2',
                text: '夾克',
                nextText: 5
            },
            {
                buttonid: '3',
                text: 'T-shirt',
                nextText: 5
            },
            {
                buttonid: '4',
                text: '襯衫',
                nextText: 5
            },

        ]
    },
    {
        id: 5,
        text: '穿好衣服後，突然背後一個聲響，似乎有動物窺視著你',
        options: [{
                buttonid: '1',
                text: '貓',
                nextText: 6
            },
            {
                buttonid: '2',
                text: '狗',
                nextText: 6
            },
            {
                buttonid: '3',
                text: '狼',
                nextText: 6
            },
            {
                buttonid: '4',
                text: '豬',
                nextText: 6
            },
            {
                buttonid: '5',
                text: '熊',
                nextText: 6
            },
            {
                buttonid: '6',
                text: '羊駝',
                nextText: 6
            },

        ]
    },
    {
        id: 6,
        text: '原來是虛驚一場，是救難隊來救你，還貼心準備了好吃的派給你...(取自博恩夜夜秀)',
        options: [{
                buttonid: '1',
                text: '藍莓派',
                nextText: 7
            },
            {
                buttonid: '2',
                text: '紅梅派',
                nextText: 7
            },
            {
                buttonid: '3',
                text: '抹茶派',
                nextText: 7
            },
            {
                buttonid: '4',
                text: '乳酪派',
                nextText: 7
            },
        ]
    },
    {
        id: 7,
        text: '吃飽後，你總算坐下來，可以好好地，跟人聊天了',
        options: [{
            buttonid: '1',
            text: '開始配對',
            nextText: -1
        }, ]
    }
]