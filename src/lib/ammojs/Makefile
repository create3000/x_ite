
#https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html#installation-instructions


# edit make.py and add -s ALLOW_MEMORY_GROWTH=1 to make.py args

all: download compile

download:
   git clone https://github.com/juj/emsdk.git
   git clone https://github.com/kripken/ammo.js.git
   cd emsdk/
   ./emsdk install latest
   ./emsdk activate latest
   cd ..

compile:
   cd emsdk/
   source ./emsdk_env.sh
   cd ..
   cd ammo.js/
   cd bullet/
   ./autogen.sh
   cd ..
   python make.py
