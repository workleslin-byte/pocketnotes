/* THIS FILE IS REQUIRED BY PAYLOAD — provides the admin panel's root layout.
   Do not delete or rename. */
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import config from "@/payload.config";
import "@payloadcms/next/css";
import "./custom.scss";

import type { ServerFunctionClient } from "payload";
import { importMap } from "./admin/importMap.js";

type Args = { children: React.ReactNode };

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;
