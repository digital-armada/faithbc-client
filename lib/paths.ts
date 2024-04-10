const HOST = process.env.NEXT_PUBLIC_URL;
console.log(HOST);

const paths = {
    serverUrl: () => `${HOST}`,
    baseApi: () => `${HOST}/api`,
    getAllSermons: () => `${HOST}/api/sermons?populate=*`,
    // getAllNbfs: () => `${HOST}/api/nbfs`,
};

export default paths;
