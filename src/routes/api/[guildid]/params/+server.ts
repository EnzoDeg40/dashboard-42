import { clientdb } from "$lib/database";
import type { UpdateResult } from "mongodb";
import { authmdp } from "$env/static/private";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request, params }) => {
  const auth = request.headers.get("Authorization");

  if (auth != authmdp) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const guildcollec = clientdb.db("guild").collection("guild");

  const guild = await guildcollec.findOne({ guildid: params.guildid });

  if (!guild) {
    return new Response(JSON.stringify({ message: "No guild found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ guild: guild }), {
    status: 200,
  });
};

export const POST: RequestHandler = async ({ request, params }) => {
  const auth = request.headers.get("Authorization");

  if (auth != authmdp) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const body = await request.json();

  const guildcollec = clientdb.db("guild").collection("guild");

  let res: UpdateResult<Document>;

  if (body.check === false) {
    res = await guildcollec.updateOne({
      guildid: params.guildid
    }, {
      $set: {
        check: false
      }
    });
  }
  else if (body.check === true && body.failure === false) {
    res = await guildcollec.updateOne({
      guildid: params.guildid
    }, {
      $set: {
        check: true,
        message_success: body.success_message,
        chanid: body.channel,
        check_failure: false
      }
    });
  }
  else {
    res = await guildcollec.updateOne({
      guildid: params.guildid
    }, {
      $set: {
        check: true,
        message_success: body.success_message,
        chanid: body.channel,
        check_failure: true,
        message_failure: body.failure_message
      }
    });
  }

  if (res.matchedCount >= 1) {
    return new Response(JSON.stringify({ message: "SUCCESS" }), {
      status: 200,
    });
  }

  return new Response(JSON.stringify({ message: "ERROR" }), {
    status: 500,
  });
};
