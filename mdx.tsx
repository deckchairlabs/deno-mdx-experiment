import { compile } from "@mdx-js/mdx";

const url = new URL(import.meta.url);
const file = url.searchParams.get("file");

if (!file) {
  throw new Error("No file specified!");
}

const markdownSource = await Deno.readTextFile(file);

export default String(
  await compile(markdownSource, { outputFormat: "function-body" }),
);
