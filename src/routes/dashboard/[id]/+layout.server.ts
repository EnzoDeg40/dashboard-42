import { redirect } from "@sveltejs/kit";
import { authmdp, bottoken } from "$env/static/private";

export const load = async ({ params, fetch, url, cookies, parent }) => {
  const { id } = params;

  const fetchGuild = async () => {
    const res = await fetch(`/api/${id}/guild?token=${bottoken}`, {
      headers: {
        Authorization: authmdp || "",
      },
    }).catch((err) => {
      console.error(err);
      return redirect(302, `/dashboard${id}`);
    });

    const data = await res?.json();

    return data.guild;
  };

  const fetchUsers = async () => {
    const tokenstring = cookies.get("token");
    if (!tokenstring) return redirect(302, "/login");
    const token = JSON.parse(tokenstring);
    const res = await fetch(
      `/api/${id}/discordusers?token=${token.access_token}`,
      {
        headers: {
          Authorization: authmdp || "",
        },
      }
    ).catch((err) => {
      console.error(err);
      return redirect(302, `/dashboard${id}`);
    });

    const data = await res?.json();

    return data.users;
  };

  return {
    server: await fetchGuild(),
    discordusers: await fetchUsers(),
  };
};
