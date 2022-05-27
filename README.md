MobiWriter _Plus!_
==========

Minimal writer for the mobipocket format.
Forked from [MobiWriter](https://github.com/cafaxo/MobiWriter). An enhancement 7 years later... great code is timeless; thank you 
Lukas Mayrhofer.

## Enhancements

- You can add `.gif` images as arguments to the executable on the CLI
    - They will be added to the image record section of the MOBI file
- You can add specify a single `.mobi` filename as an argument to the executable on the CLI
    - The resultant MOBI file will be saved under the specified filename
- You can add specify a single `.html` filename as an argument to the executable on the CLI
    - The contents of this HTML file will be used as the textual region of the MOBI file
- Document metadata can be specified in 2 ways:
    - Through MobiWriterPlus CLI
        - You can specify a document title using the `--title='...'` CLI argument
        - You can specify a document author using the `--author='...'` CLI argument
    - From the HTML source file using `<meta>` tags
        - `<meta name="title" content="Document Title"/>`
        - `<meta name="author" content="Author Name"/>`
        - Use this option when running the pipeline via `yarn pub`
- Image tags are preprocessed by the pipeline: mapping between HTML and image record indices in the MOBI file
    - See `gifFiles` references in `index.js`
- Hash links are preprocessed by the pipeline: mapping between `<a href="#....">` and "file positions" in the HTML content

#### Note: This much of the expanded code specifically targets Mobipocket Reader 5.x (non-Java version) and the Franklin NID-260 device.

#### Usage 

```
$ make

$ ./MobiWriterPlus input.html output.mobi --title='The Hello World 3rd. Ed' --author='jsyang.ca@gmail.com' 1.gif 2.gif 3.gif
```

## Pipeline

1. Create HTML content with references to image files in the same directory ex: `<img src="figure13.gif">`
2. Compile the executable with `make`
3. Run `yarn make __HTML_FILE__`
4. Resulting MOBI file should be located in the `out/` directory (along with an intermediate HTML file).