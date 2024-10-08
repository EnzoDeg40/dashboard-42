import { authmdp } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch, parent }) => {
  const dataparent = await parent();
  const { id } = params;

  let indb =false;
  dataparent.guilds.forEach((guild:any) => guild.guildid === id ? indb = true : null);

  if (!indb) return redirect(302, `/dashboard/${id}`);

  const fetchResponse = async () => {
    const res = await fetch(`/api/${id}/user`, {
      method: "GET",
      headers: {
        Authorization: authmdp || "",
      },
    }).catch((err:any) => {
      console.error(err);
      return null;
    });

    const data = await res?.json();

    let newusers: any[] = [];
    data.users.forEach((user: any) => {
      const objectWithId = dataparent.discordusers.find(
        (item: any) => item.id === user.discord_id
      );
      newusers.push({
        username: objectWithId?.username || "NONE",
        id: user._id,
        intra: user.intra,
        projectname: user.projectname,
      });
    });

    return newusers;
  };

  return {
    users: await fetchResponse(),
  };
};

export const actions = {
  default: async ({ request, fetch, params }: { params: any, fetch:any, request:any }) => {
    const formData = await request.formData();
    const user_id = formData.get("user-id")?.toString() || "";

    const result = {
      success: true,
      message: "User successfully deleted!",
    };

    const res = await fetch(`/api/${params.id}/user`, {
      method: "DELETE",
      headers: {
        Authorization: authmdp || "",
      },
      body: JSON.stringify({
        id: user_id,
      }),
    });

    if (res.status !== 200) {
      result.success = false;
      result.message = "Error while deleting user!";
    }

    return result;
  },
};
