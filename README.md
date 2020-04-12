# SimpleCommerce

exploring some react hooks, react router dom, antd mobile, redux

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Clone this repo, make sure git installed or by using git client installed. Another thing is NodeJS LTS, and yarn.

```
git clone https://github.com/ddonny/simplecommerce.git
```

### Installing

After cloned, you might need to install package dependencies.

```
yarn install
```

and wait until finished then type below to start on local. if no browser popup. then you could browse http://localhost:3000/

```
yarn start
```

## Deployment

For deployment, need to use 'build' directory after run and set .env PUBLIC_URL to your published url, set appId and clientId for google login and facebook login (You need to set developer access for each account).

```
yarn build
```

## Demo

[https://elated-archimedes-0cbc50.netlify.com/](https://elated-archimedes-0cbc50.netlify.com/)

([![https://github.com/ddonny/simplecommerce/raw/master/demo.gif](https://github.com/ddonny/simplecommerce/raw/master)https://github.com/ddonny/simplecommerce/raw/master/demo.gif](https://github.com/ddonny/simplecommerce/blob/master))

## Explanations

useState : could be found at login (src\container\login), search(src\container\search) and tabbar (src\components\tabbar)

useEffect: could be found at focuswindow (src\components\focuswindow) and search (src\container\search)

useRef: at search (src\container\search)

## Built With

* [ReactJS](https://reactjs.org/)- The web framework used
* [Redux](https://react-redux.js.org/) For state management
* [Antd Mobile](https://mobile.ant.design/) - Used to UI Layout, Styling Stuff together with [SASS](https://sass-lang.com/)
* [Yarn](https://yarnpkg.com/) - for tooling and package manager.

## Authors

* **Donny Handoyo** - *Initial work* - <https://github.com/ddonny>

## License

This project is licensed under the MIT License.
