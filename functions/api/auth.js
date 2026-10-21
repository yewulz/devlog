import {beginAuth} from '../../server/oauth.mjs';
export const onRequest=context=>beginAuth(context);
