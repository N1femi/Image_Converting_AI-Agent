import tkinter as tk
from tkinter import filedialog
import os
from ic_agent_core import convert_image

# Create the main window
root = tk.Tk()
root.title("IC_ Agent — Image Converter")
root.geometry("450x200")
root.resizable(False, False)

# Create a Label for the file path input
tk.Label(root, text="Select Image:").grid(row=0, column=0, padx=10, pady=10, sticky="e")

# Create the Entry widget where file path will appear
file_entry = tk.Entry(root, width=20)
file_entry.grid(row=0, column=1, padx=10, pady=10)

tk.Label(root, text="Test", bg="red").grid(row=0, column=2)

# Create the Brose button
browse_button = tk.Button(root, text="Browse")
browse_button.grid(row=0, column=2, padx=5)


def browse_file():
    file_path = filedialog.askopenfilename(filetypes=[("Image Files", "*.png *.jpg *.jpeg *.webp *.bmp")])

    if file_path:
        file_entry.delete(0, tk.END)
        file_entry.insert(0, file_path)


def convert_image_gui():
    original_path = file_entry.get()
    target_format = format_var.get()

    if not original_path:
        print("Please select an image")
        return
    
    try:
        output_folder= "converted"
        os.makedirs(output_folder, exist_ok=True)
        
        base_name = os.path.splitext(os.path.basename(original_path))[0]

        convert_image(original_path, target_format)
    except Exception as e:
        print(f"❌ Failed to convert image: {e}")

browse_button.config(command=browse_file)

tk.Label(root, text="Convert To:").grid(row=1, column=0, padx=10, pady=10, sticky="e")

format_var = tk.StringVar(value="jpg")

format_menu = tk.OptionMenu(root, format_var, "jpg", "png", "jpeg", "webp", "bmp")
format_menu.grid(row=1, column=1, padx=10, pady=10, sticky="w")

convert_button = tk.Button(root, text="Convert", command=convert_image_gui)
convert_button.grid(row=2, column=1, padx=10, pady=10, sticky="w")



# Start the window's event loop
root.mainloop()