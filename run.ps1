yarn install --force
npx update-browserslist-db@latest --force
Copy-Item src\apiConstants_prod.js src\apiConstants.js
yarn start