import {finishAuth} from '../../server/oauth.mjs';
export const onRequest=context=>finishAuth(context);
