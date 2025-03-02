const makeApiCall = async (api, body) => {
  const data = await fetch(api, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });
  const response = await data.json();
  return response;
};
const multiApiCalls = async (ApiCalls) => {
  try {
    const apiResponses = await makeApiCall(ApiCalls[0]);
    console.log(apiResponses);
    if (apiResponses?.messageType == "S") {
      const data = apiResponses?.data?.map(async (feedInfo) => {
        const feedapi = await makeApiCall(`${ApiCalls[1]}/${feedInfo?._id}`);
        return { ...feedInfo, feedapi };
      });
      const result = await Promise.all(data);
      return { messageType: "S", data: result };
    }
  } catch (err) {
    return { messageType: "E", message: err.message };
  }
};

export default multiApiCalls;
