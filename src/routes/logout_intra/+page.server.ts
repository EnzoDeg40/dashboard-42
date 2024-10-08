import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load:PageServerLoad = async ({ cookies }) => {

  cookies.set("userintra", "", {
    path: "/",
    expires: new Date(0),
  });

  throw redirect(302, "/login_intra");
}
