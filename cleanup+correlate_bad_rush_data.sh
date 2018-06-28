#! /bin/bash

i=1
while IFS='' read -r line || [[ -n "$line" ]]; do
    # Get the lines which have a remote serial
    A=$(echo "$line" | cut -d, -f29 | grep RX)
    if [ "${A}" != "" ]; then
      # Remote serial -- trim the '"RX' then the final '"'
      B=$(echo ${A} | cut -c 4- | tr -d '\"') 
      # Get the line matching that remote from the mfg data
      C=$(grep "${B};" ../2016-18_mfg_data.csv | cut -d';' -f2)
      for E in ${C}; do
        # Get the last field of the original entry
        lf=$(echo "$line" | cut -d, -f30)
        # Get the first part of the og entry
        fp=$(echo "$line" | rev | cut -d',' -f3- | rev | cut -d':' -f2-)
        if [ "$E" != "$B" ]; then
          # Construct the entry with the deck serial
          echo "${fp},\"${E}\",${lf}" 
        fi
      done
    fi
    # Get the lines which have a battery serial
    X=$(echo "$line" | cut -d, -f29 | grep B11)
    if [ "${X}" != "" ]; then
      # Get the line matching that remote from the mfg data
      C=$(grep "${X};" ../2016-18_mfg_data.csv | cut -d';' -f2)
      if [ "${C}" != "" ]; then
        for E in ${C}; do
          # Get the last field of the original entry
          lf=$(echo "$line" | cut -d, -f30)
          # Get the first part of the og entry
          fp=$(echo "$line" | rev | cut -d',' -f3- | rev | cut -d':' -f2-)
          echo "${fp},\"${E}\",${lf}" 
        done
      fi
    fi
    # Get the lines which have a stupid anon serial
    Y=$(echo "$line" | cut -d, -f29 | grep 90101001)
    if [ "${Y}" != "" ]; then
          E=$(printf "%08d\n" $i)
          lf=$(echo "$line" | cut -d, -f30)
          # Get the first part of the og entry
          fp=$(echo "$line" | rev | cut -d',' -f3- | rev | cut -d':' -f2-)
          echo "${fp},\"${E}\",${lf}"
          i=$(expr $i + 1)
    fi
done < "$1"

