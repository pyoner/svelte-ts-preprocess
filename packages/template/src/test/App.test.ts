import App from "../App.svelte";

describe("App Component", () => {
  it("should render", () => {
    const el = document.createElement("div");
    new App({
      target: el,
      props: {
        name: "World"
      }
    });
    expect(el.textContent).not.toBeNull();
  });
});
