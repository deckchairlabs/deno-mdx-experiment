import { compile } from "@mdx-js/mdx";

console.log(import.meta);

const markdownSource = await Deno.readTextFile("./content/docs.mdx");

export default String(
  await compile(markdownSource, { outputFormat: "function-body" }),
);
