const ErrorMessage = ({ message }: { message?: string }) => (
  <div className="text-red-500 text-sm mt-1 min-h-[20px] h-fit">{message || ""}</div>
);

export default ErrorMessage;
