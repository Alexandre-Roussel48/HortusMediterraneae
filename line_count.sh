#!/bin/bash

folder_lines () {
	total=0;

	for FILE in $(pwd)/*; do
		var=$(wc -l < $FILE 2>/dev/null);
		if [ "$var" = "0" ]
		then
			if [ -z "$(cat /home/roussalex/Desktop/HortusMediterraneae/blacklist | grep ${FILE//*\/})" ]
			then
				cd $FILE 2>/dev/null;
				var=$(folder_lines)
				cd ..;
			fi
		fi
		total=$((total+var));
	done 2> /dev/null

	echo $total;
}

folder_lines