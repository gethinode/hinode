#!/bin/bash

# https://stackoverflow.com/questions/59669455/shell-script-to-check-if-images-in-a-folder-are-being-used-by-a-set-of-html-file
#for name in assets/img/*; { grep -ril $name ~/temp/hinode/content/post* || echo "$name not used"; }

ls -1 assets/img/ | while read file
do
    grep -wnr "$file*" /content/posts ||  
            echo "no matching for file $file"
            # you can set any extra action here 

done