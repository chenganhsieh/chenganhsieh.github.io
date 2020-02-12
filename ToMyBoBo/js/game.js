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
        text: '你要回答問題來獲得最終獎勵喔<3 (除非你太聰聰)',
        options: [{
            text: '繼續',
            //setState: { blueGoo: true },
            nextText: 2
        }, ]
    },
    {
        id: 2,
        text: '請問第一次見面，妳問了我啥?',
        options: [{
                text: '你是不是很老?',
                setState: { flashlight: true },
                nextText: 3
            },
            {
                text: '垃圾筒在哪?',
                setState: { battery: false },
                nextText: 4
            },
            {
                text: '肥宅走開!',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: '錯了喔!要處罰',
        options: [{
                text: '抱抱X10',
                nextText: 2
            },
            {
                text: '親親X1',
                nextText: 2
            },
        ]
    },
    {
        id: 4,
        text: '背景圖在哪拍的?',
        options: [{
                text: '數圖',
                nextText: 5
            },
            {
                text: '總圖',
                nextText: 6
            },
            {
                text: '莉莉',
                nextText: 6
            },
            {
                text: '驛驛',
                nextText: 6
            },
        ]
    },
    {
        id: 5,
        text: '小波哪邊大xddddd(拜託不要生氣)',
        options: [{
                text: '左邊',
                nextText: 7
            },
            {
                text: '右邊',
                nextText: 8
            },
            {
                text: '前面',
                nextText: 8
            },
            {
                text: '後面',
                nextText: 8
            },
        ]
    },
    {
        id: 6,
        text: '小波...這個處罰大一點',
        options: [{
            text: '啪啪',
            nextText: 4
        }, ]
    },
    {
        id: 7,
        text: '剩下兩個解鎖謎底了! 駝駝幾月生? 要照顧好駝駝~ ',
        options: [{
                text: '9月底',
                nextText: 10
            },
            {
                text: '10月初',
                nextText: 10
            },
            {
                text: '10月底',
                nextText: 9
            },
            {
                text: '11月初',
                nextText: 10
            },
        ]
    },
    {
        id: 8,
        text: '拉拉，處罰是我們要進入大大關係!!小波>///<',
        options: [{
                text: '肚子的大大關係(吃太飽的)',
                setState: { knife: true },
                nextText: 5
            },
            {
                text: '便便的大大關係',
                setState: { light: true },
                nextText: 5
            },
        ]
    },
    {
        id: 9,
        text: '最後一題~妳覺得小安現在最想跟妳說甚麼?',
        options: [{
                text: '妳好可愛~',

                nextText: 11
            },
            {
                text: '妳好棒!',

                nextText: 12
            },
            {
                text: '妳好大!!',

                nextText: 13
            }
        ]
    },
    {
        id: 10,
        text: '罰你抱駝駝~~小波快去<3 你好久沒給我看她了欸',
        options: [{
            text: '完成抱駝駝',
            nextText: 7
        }]
    },
    {
        id: 11,
        text: '妳很可愛是真的~但我更想說: 我愛妳!',
        options: [{
            text: ' 給妳最後鑰匙:看袋子底下!',
            nextText: 9
        }]
    }, {
        id: 12,
        text: '小波除了臉，也比我聰聰<3 我愛妳!',
        options: [{
            text: '給妳最後鑰匙:看袋子底下!',
            nextText: 9
        }]
    }, {
        id: 13,
        text: '小波比我大隻，妳其實真的很性感，我愛妳!',
        options: [{
            text: '給妳最後鑰匙:看袋子底下!',
            nextText: 9
        }]
    }
]

startGame()