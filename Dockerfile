FROM rust
RUN apt-get update \
&& apt-get install -y gcc-x86-64-linux-gnu
ENV RUSTUP_DIST_SERVER https://mirrors.ustc.edu.cn/rust-static
ENV RUSTUP_UPDATE_ROOT https://mirrors.ustc.edu.cn/rust-static/rustup
COPY Cargo.toml .
COPY packages ./packages
RUN --mount=type=cache,target=/root/.cargo \
    ["cargo", "build", "--release", "-p", "http_server"]
RUN rustup target add x86_64-unknown-linux-gnu
CMD ["bash"]