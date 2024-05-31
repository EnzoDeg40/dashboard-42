import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { authmdp } from "$env/static/private";

export const load: LayoutServerLoad = async ({ locals, cookies, fetch }) => {
  let token = cookies.get("token");
  token = token ? JSON.parse(token).access_token : null;

  const fetchGuilds = async () => {
    const guilds = await fetch(`/api/discord/guilds?token=${token}`, {
      headers: {
        Authorization: authmdp || "",
      },
    }).catch((err) => {
      console.error(err);
      return redirect(302, "/dashboard");
    });

    if (guilds.status === 401) {
      return redirect(302, "/dashboard");
    }

    const servers = await guilds.json();

    if (!servers.guilds) return redirect(302, "/dashboard");

    return servers;
  };

  const fetchResponse = async () => {
    const res = await fetch(`/api/guilds`, {
      headers: {
        Authorization: authmdp || "",
      },
    });

    if (res.status === 401) return redirect(302, "/");

    const data = await res?.json();

    return data.guilds;
  };

  let servers = null;

  if (token) servers = (await fetchGuilds()).guilds;

  // console.log(servers);

  return {
    guilds: await fetchResponse(),
    servers: servers,
    user: locals.user,
    userintra: locals.userintra,
  };
};
