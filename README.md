# async-render [![NPM Version](https://img.shields.io/npm/v/@rogal/async-render.svg)](https://www.npmjs.com/package/@rogal/async-render) [![NPM Downloads](https://img.shields.io/npm/dm/@rogal/async-render.svg)](https://www.npmjs.com/package/async-render)  [![Actions Status](https://github.com/gabrielseco/async-render/workflows/build/badge.svg)](https://github.com/gabrielseco/async-render/actions) [![Actions Status](https://github.com/gabrielseco/async-render/workflows/ci/badge.svg)](https://github.com/gabrielseco/async-render/actions) [![Coverage Status](https://coveralls.io/repos/github/gabrielseco/async-render/badge.svg?branch=master)](https://coveralls.io/github/gabrielseco/async-render?branch=master)

**async-render** gives you a component to show spinners after a timeout until suspense is ready

## Install

```sh
npm install @rogal/async-render --save
```

### Getting Started

In this example the h1 element will be shown after 2s

```js
import React from 'react'
import {
  AsyncRender
} from '@rogal/async-render';

const App = () => {
  return (
    <AsyncRender loading>
      <h1>hello</h1>
    </TranslateProvider>
  )
}

```

### How to increase the timeout

The timeout by default is 2000, so you can increase giving the prop timeout

```js
import React from 'react'
import {
  AsyncRender
} from '@rogal/async-render';

const App = () => {
  return (
    <AsyncRender loading timeout={4000}>
      <h1>hello</h1>
    </TranslateProvider>
  )
}
```

## Props

|            Name           |       Type        |      Default       |                                                          
| :-----------------------: | :---------------: | :----------------: | 
|       **`loading`**       |   `Boolean`       |   `none`    |
|       **`children`**      |   `React.Node`    |   `none`    |
|       **`timeout`**       |   `number`      |   `2000`    |







## How to contribute

You can install and have an enviroment ready for use with Storybook

```sh
  npm i
  npm start
```

## License

MIT