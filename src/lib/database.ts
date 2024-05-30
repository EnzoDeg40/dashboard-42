import { MongoClient, ServerApiVersion } from "mongodb";
import { mdbuser, mdbmdp } from "$env/static/private";

const uri = `mongodb+srv://${mdbuser}:${mdbmdp}@bot-42.qxgaebq.mongodb.net/?retryWrites=true&w=majority`;

export const clientdb = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
