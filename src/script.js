document.getElementById("create").onclick = () => {
  const textBox = document.getElementById("count");
  const count = parseInt(textBox.value, 10);
  parent.postMessage(
    { pluginMessage: { type: "create-rectangles", count } },
    "*"
  );
};

document.getElementById("cancel").onclick = () => {
  parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
};