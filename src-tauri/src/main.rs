use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Cmd {
    name: String,
    #[serde(default)]
    description: String,
    action: String,
}

#[derive(Serialize, Deserialize)]
struct CmdGroup {
    name: String,
    commands: Vec<Cmd>,
}

#[tauri::command]
fn get_commands() -> Vec<CmdGroup> {
    let file = std::fs::File::open("commands.yaml").unwrap();
    let reader = std::io::BufReader::new(file);
    serde_yaml::from_reader(reader).unwrap()
}

#[tauri::command]
fn run_command(command: String) {
    println!("Run: {}", command);
    std::process::Command::new("gnome-terminal")
        .args(&[
            "--tab",
            "--",
            "bash",
            "-c",
            &format!("{}; exec bash", command.trim_end().replace("\n", "; ")),
        ])
        .spawn()
        .expect("Failed to execute process");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_commands, run_command])
        .run(tauri::generate_context!())
        .expect("Error while running tauri application");
}
