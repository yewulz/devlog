// Optional standalone OAuth host, for a frontend deployed to GitHub Pages.
import {beginAuth,finishAuth} from './server/oauth.mjs';
export default {fetch(request,env){const route=new URL(request.url).pathname;if(route==='/api/auth')return beginAuth({request,env});if(route==='/api/callback')return finishAuth({request,env});return new Response('Not found',{status:404})}};
