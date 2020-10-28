#  概要

サイト制作を開始するにあたっての基本的なディレクトリ構成および     
タスク自動化をテンプレート化したリポジトリです。   
pugおよびSass（scss）を用いたHTMLコーディングの効率化、     
gulpを用いて以下の処理を自動化しています。


+   pugファイルからhtmlファイルの出力
+   scssファイルの一元化、ベンダープレフィックスの自動付与、メディアクエリ記述の集約、cssへのコンパイル、ミニファイ化
+   JavaScriptファイルの一元化、ミニファイ化
+   画像ファイルのミニファイ化
+   ファビコンを単一ファイルから用途に応じた複数サイズへのリサイズ、ミニファイ化
+   画像ファイルのミニファイ化
+   dev環境、ステージング環境、本番環境それぞれ必要毎に異なる必要な処理がを選択〜自動処理



# 目次  

+  [gulpプラグイン一覧](#gulpプラグイン一覧)  
+  [必要条件](#必要条件)  
+  [環境構築](#環境構築)  
+  [開発](#開発)  
+  [デプロイ](#デプロイ)  



# 必要条件 

+  **Docker環境で開発する場合**  
    - Docker 
  
+  **Docker環境以外で開発する場合**  
    -  node.js  
    -  yarn
    -  node-sass
    -  gulp
    -  pug
    -  graphicsmagick  



# 環境構築  

+  **Docker環境以外で開発する場合**   

    -  Homebrewのインストール  
https://brew.sh/index_ja.html  
  
    -  nodebrewのインストール  
       `$ brew install nodebrew`  

    -  node.jsのインストール~有効化  
       `$ nodebrew install-binary stable`  
       `$ nodebrew ls`  
       `$ nodebrew use v●.●.●`  
       `$ echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.bash_profile`
       `$ node -v`

    -  yarnのインストール  
       `$ brew install yarn`  

    -  graphicsmagickのインストール  
       `$ brew install graphicsmagick`  

    -  node-sassのインストール  
       `$ yarn global add node-sass`  

    -  pugのインストール  
       `$ yarn global add pug`  

    -  gulp-cliのインストール  
       `$ yarn global add gulp-cli`  

    -  package.jsonの内容からパッケージをインストール  
       `$ yarn install`  


+  **Docker環境で開発する場合**  

    -  Dockerのインストール  
https://hub.docker.com/editions/community/docker-ce-desktop-mac  



# 開発  
+  **Docker環境**  
      `$ docker-compose exec gulp yarn dev`   
    
+  **Docker環境以外**  
      `$ yarn stg`

 
 
# 書き出し  
+ **ステージ環境への書き出し**  
    + Docker環境  
    `$ docker-compose exec gulp yarn stg`   
    
    + Docker環境以外  
    `$ yarn stg`
    
+ **本番環境への書き出し**  
    + Docker環境  
    `$ docker-compose exec gulp yarn prod`    
    
    + Docker環境以外  
    `$ yarn prod`       



# デプロイ  
+   CircleCIにてデプロイ予定
+   
+   
+   
