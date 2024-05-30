import { redirect } from "@sveltejs/kit";

export const load = async ({ params, fetch, url, cookies, parent }) => {
  const { id } = params;

  const fetchGuild = async () => {
    const res = await fetch(`/api/${id}/guild?token=${process.env.bottoken}`, {
      headers: {
        Authorization: process.env.authmdp || "",
      },
    }).catch((err) => {
      console.error(err);
      return redirect(302, "/");
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
          Authorization: process.env.authmdp || "",
        },
      }
    ).catch((err) => {
      console.error(err);
      return redirect(302, "/");
    });

    const data = await res?.json();

    return data.users;
  };

  const fetchResponse = async () => {
    const res = await fetch(`/api/guilds`, {
      headers: {
        Authorization: process.env.authmdp || "",
      },
    });

    const data = await res?.json();

    let check = false;
    data.guilds.forEach((guild: any) => {
      if (guild.guildid === id) {
        check = true;
      }
    });

    return check;
  };

  let indb = (await fetchResponse()) || false;

  return {
    indb: indb,
    server: await fetchGuild(),
    discordusers: await fetchUsers(),
  };
};
