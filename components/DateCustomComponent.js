export const DateCustomComponent = ({ data }) => {
  const date1 = new Date(data);
  const test = date1.toString().split(" ");
  return (
    <span className="text-xs">{test[1] + " " + test[2] + " " + test[3]}</span>
  );
};
