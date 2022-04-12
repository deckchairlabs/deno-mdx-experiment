import { Fragment, useEffect, useState } from "react";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

const markdownSource = await Deno.readTextFile("./content/docs.mdx");

const compiled = String(
  await compile(markdownSource),
);

export default function Component() {
  const [mdxModule, setMdxModule] = useState();
  const Content = mdxModule ? mdxModule.default : Fragment;

  useEffect(() => {
    (async () => {
      setMdxModule(await run(compiled, runtime));
    })();
  }, [compiled]);

  return Content();
}
