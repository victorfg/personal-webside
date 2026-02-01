import { TinaCMS } from "tinacms";

// Importing the TinaProvider directly into your page will cause Tina to be added to the production bundle.
// Instead, import the tina/provider/index default export to have it dynamially imported in edit-mode
/**
 *
 * @private Do not import this directly, please import the dynamic provider instead
 */
const TinaProvider = ({ children }) => {
  return (
    <TinaCMS 
      isLocalClient={true}
      cmsCallback={(cms) => {
        import("../../.tina/config").then(({ default: schema }) => {
          cms.registerApi("tina", {
            schema,
          });
        });
        return cms;
      }}
    >
      {children}
    </TinaCMS>
  );
};

export default TinaProvider;
