const userInputError = (message: string) => ({
  message,
  errorType: "UserInputError",
});

const createDataResponse = ({
  docName,
  doc,
  message,
}: {
  docName: string;
  doc: any;
  message: string;
}) => ({
  [docName]: doc,
  statusCode: 200,
  message,
});

const deleteDataResponse = (message: string) => ({
  statusCode: 200,
  message,
});

export { userInputError, createDataResponse, deleteDataResponse };
