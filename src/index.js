import Template from "@templates/Template.js";
import "@styles/main.css";

(async function App() {
  console.log("hello");
  const main = null || document.getElementById("main");
  main.innerHTML = await Template();
})();
