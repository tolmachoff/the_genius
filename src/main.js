const { invoke } = window.__TAURI__.tauri;

window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#container");

  invoke("get_commands").then((groups) => {
    groups.forEach(group => {
      const header = document.createElement("h2");
      header.innerHTML = group.name;
      container.appendChild(header);

      const p = document.createElement("p");
      container.appendChild(p);

      group.commands.forEach(command => {
        const button = document.createElement("button");
        button.innerHTML = command.name;
        button.addEventListener("click", () => {
          invoke("run_command", { command: command.action });
        });
        if (command.description) {
          button.title = command.description;
        }
        p.appendChild(button);        
      });
    });
  });
});
