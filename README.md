# node_express_typescript_mongodb_jwt
JSON Web Tokens using NodeJS, Express, Typescript &amp; Mongo DB


npm install express body-parser dotenv bcryptjs jsonwebtoken mongoose

npm install typescript --save-dev

npm install --save-dev @types/express @types/body-parser @types/dotenv @types/bcryptjs @types/jsonwebtoken @types/mongoose

npm install -g prettier

npm install -g ts-node

Package.json 
"main": "source/server.ts",
"scripts" : {
    "build": "del build && prettier --write source/ && tsc",
    "start" : "node build/server.js"
	}
"notes": {
    "linux": {
      "build": "rm -rf build && prettier --write source/ && tsc"
    },
    "windows": {
      "build": "del build && prettier --write source/ && tsc"
    }
  }



  
	
 to run in local
 ts-node-dev source/server.ts
 
 
 // to build 
 npm build
 
 
 //to debug in vscode
 npm start
 run F5 in VSCode to debug