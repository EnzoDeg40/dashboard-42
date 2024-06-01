import { authmdp, API_ENDPOINT } from "$env/static/private";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request, url }) => {
  const auth = request.headers.get("Authorization");

  if (auth != authmdp) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const access_token = url.searchParams.get("token");

  const guilds = await fetch(`${API_ENDPOINT}/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => res.json());

  if (guilds.message === "401: Unauthorized") {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  if (guilds.message) {
    return new Response(JSON.stringify({ message: "Rate Limit" }), {
      status: 404,
    });
  }

  let guilds2: any[] = [];

  guilds.forEach((guild: any) => {
    if ((guild.permissions & (1 << 3)) === 1 << 3) {
      guilds2.push(guild);
    }
  });

  return new Response(JSON.stringify({ guilds: guilds2 }), {
    status: 200,
  });
};
