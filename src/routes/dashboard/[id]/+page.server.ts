import { authmdp } from "$lib/env";
import { redirect } from "@sveltejs/kit";

export const load = async ({ params, fetch, parent }) => {
  const { servers } = await parent();
  const { id } = params;

  const fetchResponse = async () => {
    const res = await fetch(`/api/guilds`, {
      headers: {
        Authorization: authmdp,
      },
    }).catch((err) => {
      console.error(err);
      return redirect(302, "/");
    });

    const data = await res?.json();

    let check = false;
    data.guilds.forEach((guild: any) => {
      servers.find((server: any) => {
        if (server.id === guild.guildid) {
          check = true;
        }
      });
    });

    return check;
  };

  return {
    inguild: await fetchResponse(),
  };
};
