export const successResponse = (data, message = "Success", status = 200) => {
  return Response.json(
    {
      success: true,
      message,
      data,
    },
    { status },
  );
};

export const errorResponse = (message = "Error", status = 500) => {
  return Response.json(
    {
      success: false,
      message,
    },
    { status },
  );
};
