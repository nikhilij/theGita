#!/usr/bin/env python3
import os
import re
from collections import defaultdict
from PIL import Image

def normalize_base_name(filename):
    # Remove file extensions
    base = os.path.splitext(filename)[0]
    base = os.path.splitext(base)[0]  # Remove second extension if present
    
    # Remove dimension patterns like -300x200, -222x300, etc.
    base = re.sub(r'-\d+x\d+$', '', base)
    
    # Remove trailing _1, _2, etc.
    base = re.sub(r'_\d+$', '', base)
    
    return base

def get_image_dimensions(filepath):
    try:
        with Image.open(filepath) as img:
            return img.size  # Returns (width, height)
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return (0, 0)

def remove_duplicates_by_dimension(directory):
    if not os.path.exists(directory):
        print(f"Directory {directory} does not exist.")
        return

    file_groups = defaultdict(list)
    
    # First, let's see what groups are being created
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        if os.path.isfile(filepath) and filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
            base_name = normalize_base_name(filename)
            file_groups[base_name].append(filename)

    # Debug: print the groups
    print("File groups found:")
    for base_name, files in file_groups.items():
        if len(files) > 1:
            print(f"  {base_name}: {files}")

    total_removed = 0
    for base_name, files in file_groups.items():
        if len(files) > 1:
            print(f"\nProcessing duplicates for '{base_name}':")
            
            # Get dimensions for each file and sort by area (width * height)
            files_with_dims = []
            for filename in files:
                filepath = os.path.join(directory, filename)
                width, height = get_image_dimensions(filepath)
                area = width * height
                files_with_dims.append((filename, width, height, area))
                print(f"  {filename}: {width}x{height} (area: {area})")
            
            # Sort by area in descending order (largest first)
            files_with_dims.sort(key=lambda x: x[3], reverse=True)
            
            # Keep the file with largest dimensions
            keep_file = files_with_dims[0][0]
            print(f"  Keeping: {keep_file}")
            
            # Remove the others
            for filename, width, height, area in files_with_dims[1:]:
                filepath = os.path.join(directory, filename)
                try:
                    os.remove(filepath)
                    print(f"  Removed: {filename}")
                    total_removed += 1
                except OSError as e:
                    print(f"  Error removing {filename}: {e}")

    print(f"\nTotal files removed: {total_removed}")

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    print(f"Scanning directory: {current_dir}")
    remove_duplicates_by_dimension(current_dir)