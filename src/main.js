const { invoke } = window.__TAURI__.tauri;

window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#container");

  invoke("get_commands").then((groups) => {
    groups.forEach(group => {
      const header = document.createElement("h2");
      header.innerHTML = group.name;
      container.appendChild(header);

      group.commands.forEach(command => {
        const p = document.createElement("p");
        container.appendChild(p);

        const button = document.createElement("button");
        button.innerHTML = command.name;
        button.addEventListener("click", () => {
          invoke("run_command", { command: command.action });
        });
        p.appendChild(button);
        
        if (command.description) {
          const label = document.createElement("label");
          label.innerHTML = " - " + command.description;
          p.appendChild(label);
        }
      });
    });
  });
});
