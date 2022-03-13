# express-ray

---

Debug express.js server code with Ray to fix problems faster

---

Install this package in any project using Express.js v4+.

## Usage

### Middleware

`express-ray` provides an error handler middleware named `SendErrorToRay` that sends the request and error details directly to the Ray app:

```js
// other imports
import expressRay from 'express-ray';

const app = express();

// <express setup code here>

app.use(expressRay.middleware.SendErrorToRay);

// <more express setup code>

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
```

## Setup

```bash
npm install

npm run dev
```

## Testing

`express-ray` uses Jest for unit tests.  To run the test suite:

`npm run test`

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
