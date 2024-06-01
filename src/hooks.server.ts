import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  let token = event.cookies.get("token");
  let user = event.cookies.get("user");
  let userintra = event.cookies.get("userintra");

  if (event.url.pathname.startsWith("/dashboard")) {
    if (!token || !user) return redirect(302, "/login");
    if (!userintra) return redirect(302, "/login_intra");
  }

  if (token) {
    if (user) {
      const user2 = JSON.parse(user);
      event.locals.user = {
        id: user2.id,
        username: user2.username,
        avatar: user2.avatar,
      };
    } else {
      event.cookies.set("token", "", {
        path: "/",
        expires: new Date(0),
      });
    }
  }

  if (userintra) {
    const user2 = JSON.parse(userintra);
    event.locals.userintra = {
      id: user2.id,
      username: user2.username,
      avatar: user2.avatar,
    };
  }

  let response = await resolve(event);
  return response;
};
