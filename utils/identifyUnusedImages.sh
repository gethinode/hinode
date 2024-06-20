#!/bin/bash


for filename in assets/img/*.jpg
do
  file ${filename}
done


# ARRAY=()
#
# ls -1 assets/img/ | while read file
# do
#     grep -wnr "$file*" ~/mkp/cremedelacrm-www/content/post ||  
#             ARRAY+=($file)
#             # you can set any extra action here 
# 
# done

# echo ${ARRAY[@]}
