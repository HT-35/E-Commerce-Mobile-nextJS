export const env = {
  PORT_NEST_SERVER: async () => {
    return await process.env.PORT_NEST_SERVER;
  },
};
