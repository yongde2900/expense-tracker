# expense-tracker

* 可以查看支出清單
* 可以查看總花費
* 可以查看各類別清單與總金額
* 可以編輯支出資料
* 可以刪除支出資料
* 可以新增支出
* 可同時針對類別日期搜尋資料

# 環境建置與需求
* Node.js v10.15.0
* Nodemon v2.0.4
* Express v4.17.1
* Express-handlebars v5.1.0
* Bootstrap 
* Jquery v3.5.1
* Popper
* body-parse v0.1.0
* method-overridev3.0.0
* bcryptjs v2.4.4
* connect-flash v0.1.1
* dotenv v8.2.0
* express-session v1.17.1
* passport v0.4.1
* assport-facebook v3.0.0
* assport0local v1.0.0

# 安裝與執行步驟

  * 資料庫相關 
  
  安裝mongoDB  
  安裝Robo 3T  
  開啟mongoDB伺服器  
  連線到mongoDB伺服器  
  創建名為 Record 的資料庫 

開啟終端機(Terminal)cd 到存放專案本機位置並執行:  

    $ git clone https://github.com/yongde2900/expense-tracker.git
至專案資料夾使用npm安裝套件

    $ cd expende-tracker
    $ npm install

建立種子資料 

    $ npm run seed
使用nodemos開啟app.js

    $ npm run dev
成功開啟會出現以下訊息

    Express is running on http://localhost:3000

  
測試帳號

  email: example1@test.test  
  password: 12345678
    
進入http://localhost:3000 即可使用本專案
