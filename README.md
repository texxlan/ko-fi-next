Ko-fi webhook handler for Next.js.

For more information visit https://ko-fi.com/manage/webhooks

---

## Installation

### npm

`npm install @ko-fi/next`

### yarn

`yarn add @ko-fi/next`

## Example

View example implementation [here](https://github.com/oneso/ko-fi-next-example);

#### Create API Route, e.g `pages/api/webhook.js`

    import { kofi } from '@ko-fi/next';

    export default kofi(app, {
        onData: (data, req) => {
            console.log('onData called');
        },
        onCommission: (data, req) => {
            console.log('onCommission called');
        },
        onDonation: (data, req) => {
            console.log('onDonation called');
        },
        onShopOrder: (data, req) => {
            console.log('onShopOrder called');
        },
        onSubscription: (data, req) => {
            console.log('onSubscription called');
        },
        onError: (err, req) => {
            console.error('onError called');
        },
        verificationToken: 'token',
    });
