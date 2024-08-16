const HOST = process.env.NEXT_PUBLIC_STRAPI_URL;

const paths = {
  serverUrl: () => `${HOST}`,
  baseApi: () => `${HOST}/api`,
  getAllSermons: () => `${HOST}/api/sermons?populate=*`,
  // getAllNbfs: () => `${HOST}/api/nbfs`,
};

export default paths;
