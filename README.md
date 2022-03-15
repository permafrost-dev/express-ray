<p align="center">    
    <img src="https://user-images.githubusercontent.com/5508707/158072103-6b329884-c4fa-42f6-8e55-c753bc73374c.png" alt="logo" height="110" />
</p>

# express-ray

<p align="center">
    <img src="https://shields.io/npm/v/express-ray" alt="npm version">
    <img src="https://shields.io/github/license/permafrost-dev/express-ray?logo=opensourceinitiative&logoColor=white" alt="license">
    <img src="https://github.com/permafrost-dev/express-ray/workflows/Run%20Tests/badge.svg" alt="test status">
    <img src="https://codecov.io/gh/permafrost-dev/express-ray/branch/main/graph/badge.svg?token=1tgFqjGUPF"/>
    <!--<br>-->
    <!--<img src="https://img.shields.io/npm/dt/express-ray.svg?logo=npm" alt="npm downloads">-->
</p>

Install this package in any Express.js project to provide an exceptional debugging experience using the [Ray app](https://myray.app) by [Spatie](https://spatie.be).

---

## Installation

Install this package with `npm`:

```bash
npm install express-ray
```

## Usage

### Plugin Installation

To install the `express-ray` plugin, call the `install` method provided by the `plugin` import:

```js
import { plugin as expressRayPlugin } from 'express-ray';

const app = express();

expressRayPlugin.install(app);
```

Once installed, access ray via the `app.$ray()` method. See the documentation for the [node-ray](https://github.com/permafrost-dev/node-ray) package for a list of available methods.

```js
app.get('/', (req, res) => {
    app.$ray('sending "hello world" response');
    res.send('hello world');
});
```

### Methods

The `app.$ray()` method provides additional helper methods specifically for express applications.

| Method                  | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| `$ray().request(req)`   | Sends information about the request object to Ray              |

```js
app.get('/api/test', (req, res) => {
    app.$ray().request(req);
    res.send({ message: 'hello world' });
});
```

### Middleware

#### SendRequestToRay

Send details about each request to Ray with the `SendRequestToRay` middleware, optionally specifying configuration settings.

```ts
interface SendRequestToRayOptions {
    paths?: {
        include?: string[];
        ignore?: string[];
    }
}
```

By default, all paths match and get sent to Ray. Both the `paths.include` and `paths.ignore` configuration settings support wildcards.

```js
import { middleware } from 'express-ray';

app.use(
    middleware.SendRequestToRay({ paths: { include: ['*'], ignore: ['*.css'] } })
);
```

All configuration settings for this middleware are optional:

```js
app.use(middleware.SendRequestToRay());
```

![image](https://user-images.githubusercontent.com/5508707/158073710-37209980-63b0-4812-9687-f3c1b7c721ab.png)

#### SendErrorToRay

To send errors directly to Ray, use the `SendErrorToRay` middleware.

```js
import { middleware } from 'express-ray';

// <express setup code here>

// register the middleware just before listen()
app.use(middleware.SendErrorToRay);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
```

## Development Setup

```bash
npm install
npm run build:dev
```

## Testing

`express-ray` uses Jest for unit tests. To run the test suite:

```bash
npm run test
```

---

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Patrick Organ](https://github.com/patinthehat)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
