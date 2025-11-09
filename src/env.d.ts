/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}
