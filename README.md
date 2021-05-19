# koa-verifier

## Description

The koa-parameter refactored by Typescript, and some changes have been made in the way it is used.

> Original warehouse: [https://github.com/koajs/parameter](https://github.com/koajs/parameter)

## Usage

```shell
npm install koa-verifier --save
```

If you need perfect syntax hints, you can choose to install these two dependencies:

```shell
npm i @types/koa @types/parameter --save-dev
```

In the entry file of your application:

```typescript
import Koa from 'koa'
import Verifier from 'koa-verifier'

const app = new Koa()
app.use(Verifier.register())
```

In a controller:

```typescript
import Verifier from 'koa-verifier'
import { Context } from 'koa'

class ExampleCtrl {
  test(ctx: Context): void {
    Verifier.validate(ctx, {
      name: { type: 'string', required: true },
      age: { type: 'number', required: false }
    })
    // do something...
  }
}
```

## About the translate and rules

You can checkout [koa-parameter](https://github.com/koajs/parameter) to see how to use translate.

You can checkout [parameter](https://github.com/node-modules/parameter) to get all the rules.

## License
MIT