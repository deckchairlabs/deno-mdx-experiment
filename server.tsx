import React from "react";
import { run } from "@mdx-js/mdx";
import ReactDOMServer from "react-dom/server";
import { serve } from "https://deno.land/std@0.134.0/http/server.ts";
import * as runtime from "react/jsx-runtime";
import Content from "./mdx.tsx?file=./content/docs.mdx";

const port = 8080;

const handler = async (request: Request): Promise<Response> => {
  const controller = new AbortController();
  const { default: Component } = await run(Content, runtime);

  //@ts-ignore whatever
  const stream = await ReactDOMServer.renderToReadableStream(
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        />
      </head>
      <body>
        <Component />
      </body>
    </html>,
    {
      signal: controller.signal,
    },
  );

  return new Response(stream, {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(handler, { port });
