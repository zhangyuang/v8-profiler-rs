npm run build:x86  \
&& rm -rf .temp \
&& mkdir .temp \
&& cp ./target/x86_64-unknown-linux-gnu/release/http_server ./.temp/bootstrap \
&& s deploy -y