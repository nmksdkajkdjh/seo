/**
 * 最小 Worker：将所有请求转发到静态资源
 */
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
