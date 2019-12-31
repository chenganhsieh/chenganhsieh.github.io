# Pigoo833 Final Project

1. 主題: 遊戲及時配對聊天線上程式(Destiny Chat)
2. 簡介: 現代人由於行動裝置的普及，與人相處的模式並非受限於面對面地暢談，而是能用各種應用程式去認識結交朋友。本project命名為Destiny Chat，期望能藉由類似文字RPG的方式，讓人回答一些近似心理測驗的問題，並找到和自己相似的人。
3. 網站使用方式: 連進https://pigoo833.github.io/final/ 點擊登入即可使用
4. Skill:
    * firebase: 利用firestore/storage/google authentication
    * firebase cloud function: 配對系統核心: cloud 去check 房間，如果有空房將現在使用者id填入，並創建聊天 collection。沒有則建立房間。
    * CSS:
        * Bootstrap Card
        * Bootstrap Carousel Slide
        * Bootstrap NavBar
        * Bootstrap Button
    * JS:
        * Main JS: 
            *   Remove/Add attribute
            *   firebase logic
        * Question JS: 
            *   RPG Question system

5. 特點
    * 即時聊天配對
    * 心理測驗
    * 相似度量表
    * 登入系統