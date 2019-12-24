const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const questionDiv = document.getElementById('question')
const loadingDiv = document.getElementById('loading')

let state = {}
var question = 0;


function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
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
        loadingDiv.removeAttribute('hidden')

    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}


function saveUserOptionData(option) {
    var orderID = parseInt(option.buttonid)
    if (question == 1) {
        firebase.firestore().collection('match').doc(getUserUid()).add({
            one: orderID,
        }).catch(function(error) {
            console.error('Error writing match data to database', error);
        });

    } else if (question == 2) {
        firebase.firestore().collection('match').doc(getUserUid()).add({
            two: orderID,
        }).catch(function(error) {
            console.error('Error writing match data to database', error);
        });

    } else if (question == 3) {
        firebase.firestore().collection('match').doc(getUserUid()).add({
            three: orderID,
        }).catch(function(error) {
            console.error('Error writing match data to database', error);
        });


    } else if (question == 4) {
        firebase.firestore().collection('match').doc(getUserUid()).add({
            four: orderID,
        }).catch(function(error) {
            console.error('Error writing match data to database', error);
        });

    } else if (question == 5) {
        firebase.firestore().collection('match').doc(getUserUid()).add({
            five: orderID,
        }).catch(function(error) {
            console.error('Error writing match data to database', error);
        });

    }
}

function getUserUid() {
    return firebase.auth().currentUser.uid;
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
        text: '摸黑之中，你找到了一個包包，裡頭有打火機、手電筒、',
        options: [{
                buttonid: '1',
                text: '撿起手電筒',
                setState: { flashlight: true },
                nextText: 3
            },
            {
                buttonid: '2',
                text: '撿起打火機',
                setState: { battery: false },
                nextText: 3
            },
            {
                buttonid: '3',
                text: '忽視手電筒',
                nextText: 3
            },
            {
                buttonid: '4',
                text: '拿出電池',
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
                text: '世界甜點冠軍的原創糕點配方',
                nextText: 4
            },
            {
                buttonid: '3',
                text: '機器學習實務：資料科學工作流程與應用程式開發及最佳化',
                nextText: 4
            },
            {
                buttonid: '4',
                text: '如何一年賺200萬',
                nextText: 4
            },
        ]
    },
    {
        id: 4,
        text: '突然一陣風吹來，你往風的方向走，',
        options: [{
                buttonid: '1',
                text: '繼續',
                nextText: 5
            },
            {
                buttonid: '2',
                text: '繼續',
                nextText: 5
            },
            {
                buttonid: '3',
                text: '繼續',
                nextText: 5
            },
            {
                buttonid: '4',
                text: '繼續',
                nextText: 5
            },

        ]
    },
    {
        id: 5,
        text: '你走進符合自己身形的洞口，卻發現洞越來越小，越來越無法呼吸...',
        options: [{
                buttonid: '1',
                text: '折返',
                nextText: 6
            },
            {
                buttonid: '2',
                text: '折返',
                nextText: 6
            },
            {
                buttonid: '3',
                text: '折返',
                nextText: 6
            },
            {
                buttonid: '4',
                text: '折返',
                nextText: 6
            },

        ]
    },
    {
        id: 6,
        text: '撲通一聲，你掉入了水中，幸好水不深，你游到旁邊的岸上，但身上東西都不見了...',
        options: [{
                buttonid: '1',
                text: '折返',
                nextText: 7
            },
            {
                buttonid: '2',
                text: '折返',
                nextText: 7
            },
            {
                buttonid: '3',
                text: '折返',
                nextText: 7
            },
            {
                buttonid: '4',
                text: '折返',
                nextText: 7
            },
        ]
    },
    {
        id: 7,
        text: '你卡在了符合你身型的洞裡，逐漸壓縮，逐漸扭曲，直到你不成人形的...死亡',
        options: [{
            buttonid: '1',
            text: '開始配對',
            nextText: -1
        }, ]
    }
]

startGame()