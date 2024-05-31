import { redirect } from "@sveltejs/kit";
import { authmdp } from "$env/static/private";

export const load = async ({ cookies, fetch }) => {
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

  return {
    servers: (await fetchGuilds()).guilds,
  };
};
