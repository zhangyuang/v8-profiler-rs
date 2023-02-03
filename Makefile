build-img:
	docker build  -t rust-debian -f Dockerfile . --progress=plain

build: build-img
	docker run -it -v $$(pwd):/opt/workspace rust-debian bash -c "cd /opt/workspace \
	&& RUSTFLAGS='-C target-feature=+crt-static -C linker=/usr/bin/x86_64-linux-gnu-gcc -C ar=/usr/bin/x86_64-linux-gnu-gcc-ar' cargo build -p http_server --release --target x86_64-unknown-linux-gnu" 
	rm -rf .temp
	mkdir .temp
	cp target/x86_64-unknown-linux-gnu/release/http_server ./target/x86_64-unknown-linux-gnu/release/bootstrap
	cp target/x86_64-unknown-linux-gnu/release/bootstrap .temp

deploy: build
	s deploy -y
