const { invoke } = window.__TAURI__.tauri;

window.addEventListener("DOMContentLoaded", () => {
  const accordion = document.querySelector(".accordion");

  invoke("get_commands").then((groups) => {
    groups.forEach(group => {
      const name = group.name;
      const nameCorrected = name.split(' ').join('-');

      const item = document.createElement("div");
      item.classList.add("accordion-item");
      accordion.appendChild(item);

      const header = document.createElement("h2");
      header.classList.add("accordion-header");
      header.id = "flush-heading" + nameCorrected;
      item.appendChild(header);

      const button = document.createElement("button");
      button.classList.add("accordion-button", "collapsed");
      button.type = "button";
      button.setAttribute("data-bs-toggle", "collapse");
      button.setAttribute("data-bs-target", "#flush-collapse" + nameCorrected);
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", "flush-collapse" + nameCorrected);
      button.innerHTML = name;
      header.appendChild(button);

      const div = document.createElement("div");
      div.classList.add("accordion-collapse", "collapse");
      div.id = "flush-collapse" + nameCorrected;
      div.setAttribute("aria-labelledby", "#flush-heading" + nameCorrected);
      div.setAttribute("data-bs-parent", "#accordionFlushExample");
      item.appendChild(div);

      const body = document.createElement("div");
      body.classList.add("accordion-body");
      div.appendChild(body);

      group.commands.forEach(command => {
        const p = document.createElement("p");
        body.appendChild(p);

        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("btn", "btn-outline-primary");
        button.innerHTML = command.name;
        button.addEventListener("click", () => {
          invoke("run_command", { command: command.action });
        });
        p.appendChild(button);
      });

    });
    
  });
});
