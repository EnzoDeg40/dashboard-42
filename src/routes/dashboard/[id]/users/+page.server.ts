import { authmdp, INTRA_ENDPOINT, INTRA_SECRET } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { client42 } from "$lib";

export const load: PageServerLoad = async ({ params, parent }) => {
  const { guilds } = await parent();
  const { id } = params;

  let indb =false;
  guilds.forEach((guild:any) => guild.guildid === id ? indb = true : null);

  if (!indb) return redirect(302, `/dashboard/${id}`);
}

export const actions = {
  default: async ({ request, fetch, params }: { params: any, fetch:any, request:any }) => {
    const formData = await request.formData();
    const discord_user = formData.get("discord-user")?.toString() || "";
    const intra_user = formData.get("intra-user")?.toString() || "";

    const discordusers = JSON.parse(formData.get("users")?.toString() || "[]");

    const result = {
      success: true,
      message: "User successfully add!",
      intraerror: false,
      intrauser: "",
      intramessage: "",
      discorderror: false,
      discorduser: "",
      discordmessage: "",
    };

    let user = { status: 404 };

    const resusers = await fetch(`/api/${params.id}/user`, {
      method: "GET",
      headers: {
        Authorization: authmdp || "",
      },
    });

    const users = (await resusers.json())?.users || [];
    let user_in = users.find((item: any) => item.intra === intra_user);

    if (user_in) {
      result.success = false;
      result.intramessage = `Intra user already added!`;
      result.intraerror = true;
      result.intrauser = intra_user;
      result.discorduser = discord_user;
      user.status = 200;
    }

    const token = await client42.credentials.getToken();

    if (intra_user.length !== 0 && !user_in && token.data.access_token) {
      user = await fetch(`${INTRA_ENDPOINT}/users/${intra_user}`, {
        headers: {
          Authorization: `Bearer ${token.data.access_token}`,
        },
      });
    }

    if (user.status !== 200) {
      result.success = false;
      result.intramessage = intra_user.length
        ? `Intra user ${intra_user} not found!`
        : "Intra user is empty!";
      result.intraerror = true;
      result.intrauser = intra_user;
      result.discorduser = discord_user;
    }

    let user_id = "none";
    if (discord_user.length !== 0) {
      user_id = discordusers.find(
        (item: any) => item.username === discord_user
      )?.id;
    }

    if (!user_id) {
      result.success = false;
      result.discordmessage = `Discord user ${discord_user} not found!`;
      result.discorderror = true;
      result.intrauser = intra_user;
      result.discorduser = discord_user;
    }

    if (result.discorderror || result.intraerror) return result;

    const res = await fetch(`/api/${params.id}/user`, {
      method: "POST",
      headers: {
        Authorization: authmdp || "",
      },
      body: JSON.stringify({
        discord_id: user_id,
        intra: intra_user,
      }),
    });

    if (res.status === 501) {
      result.success = false;
      result.message = "Too many users!";
      result.intrauser = intra_user;
      result.discorduser = discord_user;
    }

    if (res.status !== 200) {
      result.success = false;
      result.message = "Error while adding user!";
      result.intrauser = intra_user;
      result.discorduser = discord_user;
    }

    return result;
  },
};
