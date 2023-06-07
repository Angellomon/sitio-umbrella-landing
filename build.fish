function envsource
  for line in (/usr/bin/cat $argv | grep -v '^#')
    set item (string split -m 1 '=' $line)
    set -gx $item[1] $item[2]
    echo "Exported key $item[1]"
  end
end

envsource .env

yarn build

BUILD_PATH=$BUILD_PATH node index-builder.js
