exports.sendJsonResponse = async (
  req,
  res,
  statusCode,
  data,
  error,
  flagMsg
) => {
  res?.writeHead(statusCode, {
    'Content-Type': 'application/json',
  });
  res?.write(
    JSON.stringify({
      Result: data,
      Status: error,
      Message: flagMsg,
    })
  );
  res?.end();
};
