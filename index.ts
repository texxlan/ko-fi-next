import { kofiHandler } from '@ko-fi/handler';
import { Config, mergeConfig } from '@ko-fi/types';

import type { NextApiHandler, NextApiRequest } from 'next';

export const kofi: (config?: Partial<Config<NextApiRequest>>) => NextApiHandler = (config) => async (req, res) => {
    const conf = mergeConfig(config);
    const { data } = req.body as { data: string; };

    const status = await kofiHandler(data, conf, req);

    res.status(status);
    res.end();
}
