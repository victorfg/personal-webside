// In TinaCMS 2.x, for local-only mode, we don't need to wrap the app
// The TinaCMS context is provided automatically via useTina hook
const DynamicTina = ({ children }) => {
  return <>{children}</>;
};

export default DynamicTina;
