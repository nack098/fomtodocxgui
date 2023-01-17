#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::fs;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![save_settings])
    .run(tauri::generate_context![])
    .expect("error while running tauri application");
}

#[tauri::command]
fn save_settings(path: String, value: String) {
    fs::write(path, value).unwrap();
}
