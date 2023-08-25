# BULMA:

```
npm init
```
(Creer une sorte de repo git, a questionner, le nom du repo original peut etre utilise)
(entry point : sass/mystyles.scss)

```
npm install node-sass --save-dev
npm install bulma --save-dev
```
(--save-dev a verifier)

```
{
  "name": "mybulma",
  "version": "1.0.0",
  "main": "sass/mystyles.scss",
  "license": "MIT",
  "devDependencies": {
    "bulma": "^0.7.2",
    "node-sass": "^4.9.2"
  }
}
```
(Gueule de package.json)



Create a ```sass``` folder in which you add a file called ```mystyles.scss``` :
```
@charset "utf-8";
@import "../node_modules/bulma/bulma.sass";
```

Create an HTML template (```mypage.html```) which uses several Bulma components.
In head :
```
<link rel="stylesheet" href="css/mystyles.css">
```

Add scripts in package.json :
```
"scripts": {
  "css-build": "node-sass --omit-source-map-url sass/mystyles.scss css/mystyles.css",
  "css-watch": "npm run css-build -- --watch",
  "start": "npm run css-watch"
}
```

css-build takes ```sass/mystyles.scss``` as an input, and outputs ```css/mystyles.css```, while omitting the source map
css-watch builds the CSS and watches for changes
start is simply a shortcut for css-watch

```
npm run css-build
```

Reload page

To watch for changes :
```
npm start
```

Replace the content of the mystyles.scss file with the following:
```
@charset "utf-8";

// Import a Google Font
@import url('https://fonts.googleapis.com/css?family=Nunito:400,700');

// Set your brand colors
$purple: #8A4D76;
$pink: #FA7C91;
$brown: #757763;
$beige-light: #D0D1CD;
$beige-lighter: #EFF0EB;

// Update Bulma's global variables
$family-sans-serif: "Nunito", sans-serif;
$grey-dark: $brown;
$grey-light: $beige-light;
$primary: $purple;
$link: $pink;
$widescreen-enabled: false;
$fullhd-enabled: false;

// Update some of Bulma's component variables
$body-background-color: $beige-lighter;
$control-border-width: 2px;
$input-border-color: transparent;
$input-shadow: none;

// Import only what you need from Bulma
@import "../node_modules/bulma/sass/utilities/_all.sass";
@import "../node_modules/bulma/sass/base/_all.sass";
@import "../node_modules/bulma/sass/elements/button.sass";
@import "../node_modules/bulma/sass/elements/container.sass";
@import "../node_modules/bulma/sass/elements/title.sass";
@import "../node_modules/bulma/sass/form/_all.sass";
@import "../node_modules/bulma/sass/components/navbar.sass";
@import "../node_modules/bulma/sass/layout/hero.sass";
@import "../node_modules/bulma/sass/layout/section.sass";
```

Save and reload page

# DB:

Create ```database``` folder

Create ```docker-compose.yml``` file :

```
services:
  mysql_db:
    image: mysql:latest
    restart: always
    volumes:
      - ./db.sql:/docker-entrypoint-initbd.d/db.sql #if data has to be added
    environment:
      MYSQL_ROOT_PASSWORD: 'db_root_password'
      MYSQL_DATABASE: 'db_name'
      MYSQL_USER: 'db_username'
      MYSQL_PASSWORD: 'db_password'
    ports:
      - db_port:db_port #3306 in general
```

Create ```db.sql``` file with the wanted data

Create the docker container with ```docker-compose up --build```

Then add database infos to ```config.py``` file

Update ```rundev.sh``` with :

```
cd database
docker-compose up --build &
cd ..
```

# VUEJS:

Create ```front_vuejs``` folder

Use ```npm init vue@latest``` and answer the questions (generally no to all)

In created folder :

Use ```npm install``` to install Vite packages

Use ```npm install -D sass-loader sass``` for CSS preprocessor that works with Bulma

In ```src/main.js``` add ```import "path/to/scss/style.scss"``` (check if the path doesn't break on build)

Use Bulma components in VueJS

```npm i --save @fortawesome/fontawesome-svg-core```

```
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/free-brands-svg-icons
```

```npm i --save @fortawesome/vue-fontawesome@latest-3```

```npm install marked```