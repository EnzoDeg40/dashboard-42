import { authmdp } from "$env/static/private";

export const load = async ({ params, fetch }) => {
  const { id } = params;

  const fetchResponse = async () => {
    const res = await fetch(`/api/${id}/users`, {
      headers: {
        Authorization: authmdp,
      },
    }).catch((err) => {
      console.error(err);
      return null;
    });

    const data = await res?.json();

    return data.users;
  };

  return {
    users: await fetchResponse(),
  };
};
