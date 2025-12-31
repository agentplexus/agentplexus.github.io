.PHONY: build clean test install

BINARY_NAME=svg
BUILD_DIR=.

build:
	go build -o $(BUILD_DIR)/$(BINARY_NAME) ./cmd/svg

clean:
	rm -f $(BUILD_DIR)/$(BINARY_NAME)

test:
	go test -v ./...

install:
	go install ./cmd/svg

# Download dependencies
deps:
	go mod download
	go mod tidy

# Run linter
lint:
	go vet ./...

# Build for all platforms
build-all:
	GOOS=darwin GOARCH=amd64 go build -o $(BUILD_DIR)/$(BINARY_NAME)-darwin-amd64 ./cmd/svg
	GOOS=darwin GOARCH=arm64 go build -o $(BUILD_DIR)/$(BINARY_NAME)-darwin-arm64 ./cmd/svg
	GOOS=linux GOARCH=amd64 go build -o $(BUILD_DIR)/$(BINARY_NAME)-linux-amd64 ./cmd/svg
	GOOS=windows GOARCH=amd64 go build -o $(BUILD_DIR)/$(BINARY_NAME)-windows-amd64.exe ./cmd/svg
