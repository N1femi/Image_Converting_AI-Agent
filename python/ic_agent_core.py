from PIL import Image
import os

# Make sure the output folder exists
os.makedirs("converted", exist_ok=True)

def convert_image(original_path, target_format):

    file_name = original_path.split("/")[-1].replace(" ", "_").rsplit(".", 1)[0]
    output_filepath = os.path.join("converted", f"{file_name}.{target_format.lower()}")

    try:
        image = Image.open(original_path)
        target_format = "JPEG" if target_format.lower() == "jpg" else target_format.upper()
        image.convert("RGB").save(output_filepath)
        print(f"[✓] Image converted and saved as: {os.path.abspath(output_filepath)}")

        image = Image.open(output_filepath)
        image.show()
    except Exception as e:
        print(f"[!] Failed to convert image: {e}")

