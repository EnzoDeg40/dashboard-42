import { redirect } from "@sveltejs/kit";
import { authmdp, bottoken } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch, parent }) => {
  const { id } = params;
  const { guilds } = await parent();

  let indb =false;
  guilds.forEach((guild:any) => guild.guildid === id ? indb = true : null);

  if (!indb) return redirect(302, `/dashboard/${id}`);

  const fetchResponse = async () => {
    const res = await fetch(`/api/${id}/params`, {
      headers: {
        Authorization: authmdp || "",
      },
    }).catch((err:any) => {
      console.error(err);
      return null;
    });

    const data = await res?.json();

    return data.guild;
  };

  const fetchChannels = async () => {
    const res = await fetch(`/api/${id}/channels?token=${bottoken}`, {
      headers: {
        Authorization: authmdp || "",
      },
    }).catch((err:any) => {
      console.error(err);
      return redirect(302, "/dashboard");
    });

    const data = await res?.json();

    return data.channels;
  };

  return {
    guild: await fetchResponse(),
    channels: await fetchChannels(),
  };
};

export const actions = {
  default: async ({ request, fetch, params }: { params: any, fetch:any, request:any }) => {
    const formData = await request.formData();
    let check = formData.get("check")?.toString() || "false";
    let channel = formData.get("channel")?.toString() || "";
    let success_message = formData.get("success_message")?.toString() || "";
    let failure = formData.get("failure")?.toString() || "false";
    let failure_message = formData.get("failure_message")?.toString() || "";

    const result = {
      success: true,
      message: "Settings successfully modified!",
    };

    const res = await fetch(`/api/${params.id}/params`, {
      method: "POST",
      headers: {
        Authorization: authmdp || "",
      },
      body: JSON.stringify({
        check: check === "on",
        channel: channel,
        success_message: success_message,
        failure: failure === "on",
        failure_message: failure_message,
      }),
    });

    if (res.status !== 200) {
      result.success = false;
      result.message = "Error while changing Settings!";
    }

    return result;
  }
};
