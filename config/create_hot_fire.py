import json
import os

# Replace these with the actual top 25 quoted Wu-Tang Clan lyrics you found
lyrics = [
    "Cash rules everything around me, C.R.E.A.M., get the money, dollar dollar bill, y'all",
    "I bomb atomically, Socrates' philosophies and hypotheses can't define how I be droppin' these",
    # Add more lyrics here until you have 25
]

# Ensure each lyric is within the character limit
short_lyrics = [lyric[:125] for lyric in lyrics]

# Create a dictionary to store the lyrics
data = {"lyrics": short_lyrics}

# Specify the directory and filename
directory = '../bin'
filename = 'hot_fire_like_dylan.json'
filepath = os.path.join(directory, filename)

# Create the directory if it doesn't exist
os.makedirs(directory, exist_ok=True)

# Write the dictionary to a JSON file
with open(filepath, 'w') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

# Print the JSON to console (optional)
print(json.dumps(data, ensure_ascii=False, indent=4))
