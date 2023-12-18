import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'https://content.tinajs.io/1.4/content/a9256af6-6d31-4980-b587-b26875592684/github/main', token: '7e0ddd4c3a938eda40d6910798b4c1bda4e2d72d', queries,  });
export default client;
  