build-img:
	docker build --platform linux/amd64 -t rust-debian -f Dockerfile . --progress=plain

build:build-img
	docker run --platform linux/amd64 --rm -it -v $$(pwd):/opt/workspace rust-debian bash -c "cd /opt/workspace \
	&& RUSTFLAGS='-C target-feature=+crt-static -C linker=x86_64-unknown-linux-gnu-gcc' \
	cargo build -p http_server --release --target x86_64-unknown-linux-gnu" 
	rm -rf .temp
	mkdir .temp
	cp target/x86_64-unknown-linux-gnu/release/http_server ./target/x86_64-unknown-linux-gnu/release/bootstrap
	cp target/x86_64-unknown-linux-gnu/release/bootstrap .temp
