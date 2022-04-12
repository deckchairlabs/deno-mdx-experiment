import React from "react";
import { run } from "@mdx-js/mdx";
import { renderToString } from "react-dom/server";
import { serve } from "https://deno.land/std@0.134.0/http/server.ts";
import * as runtime from "react/jsx-runtime";
import Content from "./mdx.tsx?foo=bar";

const port = 8080;

const handler = async (request: Request): Promise<Response> => {
  const { default: Component } = await run(Content, runtime);

  const body = renderToString(<Component />);

  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(handler, { port });
