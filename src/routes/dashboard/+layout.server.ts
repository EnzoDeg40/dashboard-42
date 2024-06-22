import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({cookies}) => {
	let token = cookies.get("token");
	let user = cookies.get("user");
	let userintra = cookies.get("userintra");

	if (!token || !user) return redirect(302, "/login");
	if (!userintra) return redirect(302, "/login_intra");
}
