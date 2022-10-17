import { Config, mergeConfig, RequestData, Type } from '@ko-fi/types';

import type { NextApiHandler, NextApiRequest } from 'next';

export const kofi: (config?: Partial<Config<NextApiRequest>>) => NextApiHandler = (config) => async (req, res) => {
    const conf = mergeConfig(config);

    const { data } = req.body as { data: string; };

    try {
        const parsed: RequestData = JSON.parse(data);

        if (config.verificationToken && parsed.verification_token !== config.verificationToken) {
            console.error('Ko-fi invalid verification token');
            res.status(401);

            return res.end();
        }

        await conf.onData?.(parsed, req);

        switch (parsed.type) {
            case Type.Commission:
                await conf.onCommission?.(parsed, req);
                break;
            case Type.Donation:
                await conf.onDonation?.(parsed, req);
                break;
            case Type.ShopOrder:
                await conf.onShopOrder?.(parsed, req);
                break;
            case Type.Subscription:
                await conf.onSubscription?.(parsed, req);
                break;
        }
    } catch (err) {
        console.error('Ko-fi request error: ', err);
        config.onError?.(err, req);

        res.status(200);
        return res.end();
    }

    res.status(200);
    res.end();
}
