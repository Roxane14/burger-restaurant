const modules = import.meta.glob("../assets/**/*.png", {
  eager: true,
  as: "url",
});

export const assets = Object.entries(modules).map(([path, url]) => ({
  key: path.split("/").pop()?.replace(".png", "")!,
  path: url as string,
}));
