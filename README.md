#  概要

サイト制作を開始するにあたっての基本的なディレクトリ構成および     
タスク自動化をテンプレート化したリポジトリです。   
pugおよびSass（scss）を用いたHTMLコーディングの効率化、gulpを用いて以下の処理を自動化しています。


+   pugファイルからhrmlファイルの出力
+   スタイルシートのベンダープレフィックスの自動付与、メディアクエリ関連記述の集約、scssファイルの一元化、cssへのコンパイル、ミニファイ化
+   JavaScriptファイルの一元化、ミニファイ化
+   画像ファイルのミニファイ化
+   ファビコンを単一ファイルから用途に応じた複数サイズへのリサイズ、ミニファイ化
+   画像ファイルのミニファイ化
+   dev環境、ステージング環境、本番環境それぞれ必要毎に異なる必要な処理がを選択〜自動処理

# 目次  

+  [gulpプラグイン一覧](#gulpプラグイン一覧)  
+  [必要条件](#必要条件)  
+  [開発環境](#開発環境)  
+  [開発](#開発)  
+  [デプロイ](#デプロイ)  

# gulpプラグイン一覧
+ 
+
+
+
+
+

# 必要条件 

+  **Docker環境以外で開発する場合**  
    - Docker 
  
+  **Docker環境以外で開発する場合**  
    -  node.js  
    -  yarn
    -  node-sass
    -  gulp
    -  pug
    -  graphicsmagick  

# 環境構築  

gulp  
pug  
Sass  

# 開発  
`$ docker-compose exec gulp yarn dev` 
    
# デプロイ  
+ **ステージ環境へのデプロイ**  
    + Docker環境  
    `$ docker-compose exec gulp yarn stg`   
    
    + Docker環境以外  
    `$ yarn stg`
    
+ **ステージ環境へのデプロイ**  
    + Docker環境  
    `$ docker-compose exec gulp yarn prod`    
    
    + Docker環境以外  
    `$ yarn prod`
    
