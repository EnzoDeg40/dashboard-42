import { clientdb } from "$lib/database";
import { authmdp } from "$lib/env";
import { ObjectId } from "mongodb";

export const GET = async ({ request, params }) => {
  const auth = request.headers.get("Authorization");

  if (auth != authmdp) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const usercollec = clientdb.db("guild").collection("user");

  const users = await usercollec.find({ guildid: params.guildid }).toArray();

  return new Response(JSON.stringify({ users: users }), {
    status: 200,
  });
};

export const POST = async ({ request, params }) => {
  const auth = request.headers.get("Authorization");
  const body = await request.json();

  if (auth != authmdp) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const usercollec = clientdb.db("guild").collection("user");

  const user = await usercollec.updateOne(
    { guildid: params.guildid, intra: body.intra },
    {
      $set: {
        guildid: params.guildid,
        intra: body.intra,
        discord_id: body.discord_id,
        projectdate: new Date("2020-03-03T01:56:15.856+00:00"),
        projectname: "none",
      },
    },
    { upsert: true }
  );

  if (user.matchedCount >= 1) {
    return new Response(JSON.stringify({ message: "ERROR" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ user: user }), {
    status: 200,
  });
};

export const DELETE = async ({ request, params }) => {
  const auth = request.headers.get("Authorization");
  const body = await request.json();

  if (auth != authmdp) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const usercollec = clientdb.db("guild").collection("user");

  const user = await usercollec.deleteOne({
    _id: new ObjectId(body.id),
  });

  if (user.deletedCount === 0) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ user: user }), {
    status: 200,
  });
}
