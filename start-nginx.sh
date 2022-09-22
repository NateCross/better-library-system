http_location="/srv/http/simple-library-system"

if [ ! -d "$http_location" ]; then
    echo "Symlinking backend to '/srv/http/'..."
    sudo ln -s "${pwd}/backend" "${http_location}"
fi

echo "Starting nginx..."
sudo systemctl start nginx
