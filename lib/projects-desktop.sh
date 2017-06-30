#!/bin/sh

mkdir -p ~/.config/Raspberry\ Pi\ Projects/Pepper\ Data/Shockwave\ Flash/WritableRoot/\#Security/FlashPlayerTrust
cat << EOF > ~/.config/Raspberry\ Pi\ Projects/Pepper\ Data/Shockwave\ Flash/WritableRoot/\#Security/FlashPlayerTrust/trust/trust.cfg
/usr/lib/projects-desktop/
EOF

/usr/lib/electron/electron /usr/lib/projects-desktop/ $1
