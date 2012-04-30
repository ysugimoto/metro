SRC = ./*.js
OUT = src/metro.js
COMPRESSED = src/metro.min.js

all: $(COMPRESSED)
$(OUT): $(SRC)
	cat $(SRC) > $(OUT)
$(COMPRESSED): $(OUT)
	java -jar compiler.jar --js $(OUT) --js_output_file $(COMPRESSED)
clean:
	rm $(OUT)
	rm $(COMPRESSED)
