const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

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
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [{
        id: 1,
        text: '在一股冷風中，你醒了過來，發現自己在一個漆黑的洞穴裡...',
        options: [{
            text: '繼續',
            //setState: { blueGoo: true },
            nextText: 2
        }, ]
    },
    {
        id: 2,
        text: '摸黑之中，你找到了手電筒',
        options: [{
                text: '撿起手電筒',
                setState: { flashlight: true },
                nextText: 3
            },
            {
                text: '拿出電池',
                setState: { battery: false },
                nextText: 4
            },
            {
                text: '忽視手電筒',
                nextText: 4
            }
        ]
    },
    {
        id: 3,
        text: '有了亮光，你發現自己在大約3米的洞穴之中，除了不能用的殘破包包外，還有一個人型的洞口跟懸崖',
        options: [{
                text: '走進人型洞口',
                nextText: 5
            },
            {
                text: '跳入懸崖',
                nextText: 6
            },
        ]
    },
    {
        id: 4,
        text: '沒有光線的情況下，你腳滑的跌落到一旁的懸崖之中，發出淒慘的叫聲......',
        options: [{
            text: '繼續',
            setState: {},
            nextText: 6
        }]
    },
    {
        id: 5,
        text: '你走進符合自己身形的洞口，卻發現洞越來越小，越來越無法呼吸...',
        options: [{
                text: '折返',
                nextText: 3
            },
            {
                text: '繼續進入',
                nextText: 7
            },
        ]
    },
    {
        id: 6,
        text: '撲通一聲，你掉入了水中，幸好水不深，你游到旁邊的岸上，但身上東西都不見了...',
        options: [{
            text: '繼續',
            nextText: 8
        }]
    },
    {
        id: 7,
        text: '你卡在了符合你身型的洞裡，逐漸壓縮，逐漸扭曲，直到你不成人形的...死亡',
        options: [{
            text: '重新開始',
            nextText: -1
        }, ]
    },
    {
        id: 8,
        text: '你發現在岸邊有一把鏽蝕的刀子、破舊神燈跟地圖',
        options: [{
                text: '撿起刀子',
                setState: { knife: true },
                nextText: 9
            },
            {
                text: '撿起破舊神燈',
                setState: { light: true },
                nextText: 9
            },
            {
                text: '撿起地圖',
                setState: { map: true },
                nextText: 9
            },
            {
                text: '直接走掉',
                nextText: 10
            },

        ]
    },
    {
        id: 9,
        text: '你驚動了一旁的一隻像鹿又像狼的生物，他朝你撲了過來',
        options: [{
                text: '用刀攻擊',
                requiredState: (currentState) => currentState.knife,
                nextText: 11
            },
            {
                text: '用神燈丟他',
                requiredState: (currentState) => currentState.light,
                nextText: 12
            },
            {
                text: '喂他吃紙',
                requiredState: (currentState) => currentState.map,
                nextText: 13
            }
        ]
    },
    {
        id: 10,
        text: '你發現其實順著風，就走到了洞穴出口，並成功逃出',
        options: [{
            text: '完成任務',
            nextText: -1
        }]
    },
    {
        id: 11,
        text: '你的刀太舊了，斷掉了，你也被咬死',
        options: [{
            text: '重新開始',
            nextText: -1
        }]
    }, {
        id: 12,
        text: '匡噹一聲，神燈破了，你也被咬死',
        options: [{
            text: '重新開始',
            nextText: -1
        }]
    }, {
        id: 13,
        text: '怪獸比較愛吃肉，你被咬死',
        options: [{
            text: '重新開始',
            nextText: -1
        }]
    }
]

startGame()