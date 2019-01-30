# Table Vue Component

> A project with Firebase, Vuejs and NOW

> https://britecore-bcfohxfkzx.now.sh/

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run server with nodejs
npm run build && npm start
```

## Process for build this component


I started with the template creation and I used the simplest form of vue-cli, only with webpack to be able to generate the build and then I started creating the firebase config file I did a little test to see if any information coming from it already was visible and created the methods and I was building the visual, then I implemented the list, the sort and filter, and made a small change to be able to filter according to the column, I changed the tab to create the pagination and I was organizing the responsibilities between computed property and methods, and in the end I was adding small details related to usability, I left everything as minimal as possible, but a very readable scsss


#### How long did you spend on the test? Would you do anything differently if you had more time?

```R: I took about 15 hours, until I got to do a little CRUD I can make the code available later, I saw that I was doing more things and I left everything simpler and I decided to deliver what I needed```

#### In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?

```R:  I would change some parts for receiving props and separating the responsibilities regarding connection 	services with the firebase or any other backend service```

#### What is your favorite CSS property? Why?

```R: Display flex, which is something easy to guide and modify the elements the way I want and facilitates a lot in relation to mobile```

#### What is your favorite modern Javascript feature? Why?

```R: I have two favorite features, destructuring and template strings, since I can use destructuring on several levels and rename them and template string which makes it much easier to send messages by passing some variable or function with some return```

#### Quiz solution:

`It's in the root path of this project`
