import type { NextApiHandler, NextApiRequest } from 'next';

import { CommissionData, DonationData, RequestData, ShopOrderData, SubscriptionData, Type } from '@ko-fi/types';

const defaultConfig: Config = {
    onData: () => null,
    onCommission: () => null,
    onDonation: () => null,
    onShopOrder: () => null,
    onSubscription: () => null,
};

export const kofi: (config?: Partial<Config>) => NextApiHandler = (config) => async (req, res) => {
    const conf = { ...defaultConfig, ...config };

    const { data } = req.body as { data: string; };

    try {
        const parsed: RequestData = JSON.parse(data);

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

        res.status(200);
        return res.end();
    }

    res.status(200);
    res.end();
}
export interface Config {
    onData: Callback<RequestData>;
    onCommission: Callback<CommissionData>;
    onDonation: Callback<DonationData>;
    onShopOrder: Callback<ShopOrderData>;
    onSubscription: Callback<SubscriptionData>;
}

export type Callback<TData> = (data: TData, req: NextApiRequest) => void | null | undefined | Promise<void>;
