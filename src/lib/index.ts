// place files you want to import through the `$lib` alias in this folder.

import { INTRA_ID, INTRA_SECRET } from "$env/static/private";
import ClientOAuth2 from "client-oauth2";

export const client42 = new ClientOAuth2({
	clientId: INTRA_ID,
	clientSecret: INTRA_SECRET,
	accessTokenUri: "https://api.intra.42.fr/oauth/token",
  });
