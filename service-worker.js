const fixPage = () => {
  const setStyles = (e, declarations) => {
    if (declarations.length === 0) return;
    if (typeof declarations === "string") declarations = [declarations];

    declarations = declarations.map((decl) => `${decl} !important`);

    const nextStyle = [e.getAttribute("style"), ...declarations]
      .filter(Boolean)
      .join("; ");

    e.setAttribute("style", nextStyle);
  };

  // Remove fixed / sticky elements inside body
  document.querySelectorAll("body *").forEach((e) => {
    if (["fixed", "sticky"].includes(getComputedStyle(e).position)) {
      e.parentNode.removeChild(e);
    }
  });

  setStyles(document.querySelector("html"), [
    "overflow: visible",
    "height: min-content",
  ]);

  setStyles(document.querySelector("body"), [
    "overflow: visible",
    "position: static",
  ]);
};

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: fixPage,
  });
});
