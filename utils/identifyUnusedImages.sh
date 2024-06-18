#!/bin/bash

# https://stackoverflow.com/questions/59669455/shell-script-to-check-if-images-in-a-folder-are-being-used-by-a-set-of-html-file
#for name in assets/img/*; { grep -ril $name ~/temp/hinode/content/post* || echo "$name not used"; }
ARRAY=()

ls -1 assets/img/ | while read file
do
    grep -wnr "$file*" ~/mkp/cremedelacrm-www/content/post ||  
            ARRAY+=($file)
            # you can set any extra action here 

done

echo ${ARRAY[@]}


// write a linux terminal command to find all files in a directory that end with .jpeg and update them to end with .jpg instead
find . -type f -name "*.jpeg" -exec bash -c 'mv "$1" "${1%.jpeg}.jpg"' _ {} \;
