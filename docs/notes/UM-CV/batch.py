import os
import re

# Define the directory to search
directory = __file__.replace('batch.py', '')

# Define the old and new permalink
old_permalink = 'permalink: /computer-vision/UMichigan-CV/'
new_permalink = 'permalink: /notes/computer-vision/UMichigan-CV/'

# Iterate over all files in the directory
for filename in os.listdir(directory):
    if filename.endswith('.md'):
        filepath = os.path.join(directory, filename)
        
        # Read the file content
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Replace the old permalink with the new one
        updated_content = re.sub(re.escape(old_permalink), new_permalink, content)
        
        # Write the updated content back to the file
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(updated_content)

print("Permalink update completed.")