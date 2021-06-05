# ========== install gh-page module to deploy the project to github page =======
npm install gh-pages --save-dev

# ============== add to package.json ===============
{
    "homepage": "https://Androidest.github.io/react-tensor-app"
    "name": "react-tensor-app",
    "version": "0.1.0",

    //..............

    "scripts": {
        //..........
        "predeploy": "npm run build",
        "deploy": "gh-pages -d build",
    }

    //..............
}

# ================ git settings =============
# create a new repository
# initialize the existing project

git init

# add remote origin with https github link
git remote add origin https://github.com/Androidest/react-tensor-app.git

# make changes to the project & commit & push
git add .
git commit -m "Your awesome message"
git push origin master

# git add proxy & remove proxy to remote origin 
git config --global --add remote.origin.proxy "localhost:1080"
git config --global --add remote.origin.proxy ""

# update git when unable to login
git update-git-for-windows

# deploy the project
npm run deploy

# ================= Recap ============
# Created React App using create-react-app
# Then install gh-pages as a dev-dependency
# and in package.json file add some properties homepage also in existing scripts property add predeploy and deploy
# and created a remote repository and initialize it
# and run npm run deploy to generate a production build and deploy it to GitHub Pages.
