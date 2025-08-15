VERSION="1.0.1"
docker buildx build --platform linux/amd64,linux/arm64 --build-arg VERSION=${VERSION} -t zengchao0215/gpu-calculator:${VERSION} --push .
docker buildx build --platform linux/amd64,linux/arm64 -t zengchao0215/gpu-calculator:latest --push .
docker buildx build --platform linux/amd64,linux/arm64 --build-arg VERSION=${VERSION} -t registry.riilservice.cn/zengchao0215/gpu-calculator:${VERSION} --push .
docker buildx build --platform linux/amd64,linux/arm64 -t registry.riilservice.cn/zengchao0215/gpu-calculator:latest --push .