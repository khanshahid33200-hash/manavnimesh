from PIL import Image
import os

def generate_favicons():
    img_path = "profile.jpg"
    if not os.path.exists(img_path):
        print("profile.jpg not found!")
        return

    with Image.open(img_path) as img:
        # Square crop (centered top)
        width, height = img.size
        crop_size = min(width, height)
        
        # Center horizontally, align near top for face focus
        left = (width - crop_size) // 2
        top = int(height * 0.05)
        right = left + crop_size
        bottom = top + crop_size

        if bottom > height:
            bottom = height
            top = height - crop_size

        cropped_img = img.crop((left, top, right, bottom))

        # Save favicon.png (64x64)
        fav_png = cropped_img.resize((64, 64), Image.Resampling.LANCZOS)
        fav_png.save("favicon.png", "PNG")
        print("Saved favicon.png")

        # Save apple-touch-icon.png (180x180)
        apple_icon = cropped_img.resize((180, 180), Image.Resampling.LANCZOS)
        apple_icon.save("apple-touch-icon.png", "PNG")
        print("Saved apple-touch-icon.png")

        # Save favicon.ico (containing 16, 32, 48 sizes)
        fav_ico_sizes = [(16, 16), (32, 32), (48, 48)]
        cropped_img.save("favicon.ico", sizes=fav_ico_sizes)
        print("Saved favicon.ico")

if __name__ == "__main__":
    generate_favicons()
