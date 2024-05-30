import { redirect } from "@sveltejs/kit";
import axios from "axios";

export const prerender = false;

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

      const user = await axios.get(`${process.env.API_ENDPOINT}/users/@me`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // console.log("user", user.data);
      cookies.set("user", JSON.stringify(user.data), {
        path: "/",
      });

      cookies.set("token", JSON.stringify(token), {
        path: "/",
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
    redirect_uri: `${process.env.BASE_URL}/login`,
  });

  const response = await axios
    .post(`${process.env.API_ENDPOINT}/oauth2/token`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.CLIENT_ID || "",
        password: process.env.CLIENT_SECRET || "",
      },
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  // console.log("response", response ? response.data : null);
  return response ? response.data : null;
}
