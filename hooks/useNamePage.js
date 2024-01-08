import { useRouter } from "next/router";

const useIsHome = () => {
  const router = useRouter();
  return router.pathname === "/";
};

const useIsLabelPage = () => {
  const router = useRouter();
  return router.pathname === "/labels";
};

export { useIsHome, useIsLabelPage };
