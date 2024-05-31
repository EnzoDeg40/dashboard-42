import { redirect } from "@sveltejs/kit";
import axios from "axios";
import { API_ENDPOINT, CLIENT_ID, CLIENT_SECRET } from "$env/static/private";
import { PUBLIC_BASE_URL, PUBLIC_DEV_URL } from "$env/static/public";

export async function load({ cookies, url }) {
  let code = url.searchParams.get("code");

  let user = cookies.get("user");
  let token = cookies.get("token");
  if (user && token) {
    return {
      user: JSON.parse(user),
      connexion: true,
    };
  }

  if (code) {
    let token = await getToken(code);

    if (token) {
      const access_token = token.access_token;

      const user = await axios.get(`${API_ENDPOINT}/users/@me`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // console.log("user", user.data);
      cookies.set("user", JSON.stringify(user.data), {
        path: "/",
        expires : new Date(Date.now() + token.expires_in * 1000),
      });

      cookies.set("token", JSON.stringify(token), {
        path: "/",
        expires : new Date(Date.now() + token.expires_in * 1000),
      });

      return redirect(302, "/login");
    }
  }
  return { connexion: false };
}

async function getToken(code: string) {
  const data = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: `${PUBLIC_BASE_URL}/login`,
  });

  const response = await axios
    .post(`${API_ENDPOINT}/oauth2/token`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: CLIENT_ID || "",
        password: CLIENT_SECRET || "",
      },
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return response ? response.data : null;
}
