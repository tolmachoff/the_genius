use std::fs;
use std::process;

use serde::Serialize; 
use serde::Deserialize;


#[derive(Serialize, Deserialize)]
struct Command {
    name: String,
    #[serde(default)]
    description: String,
    action: String,
}

#[derive(Serialize, Deserialize)]
struct CommandGroup {
    name: String,
    commands: Vec<Command>,
}

#[tauri::command]
fn get_commands() -> Vec<CommandGroup> {
    let commands_text = fs::read_to_string("commands.yaml").unwrap();
    serde_yaml::from_str(&commands_text).unwrap()
}

#[tauri::command]
fn run_command(command: String) {
    println!("Run: {}", command);
    process::Command::new("sh")
        .arg("-c")
        .arg(command)
        .spawn()
        .expect("Failed to execute process");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_commands, run_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
