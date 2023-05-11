import runApifyActor from "./runApifyActor";

export default {
  async fetch(request, env, ctx) {
    runApifyActor();
  },
};
