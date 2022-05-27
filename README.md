MobiWriter _Plus!_
==========

Minimal writer for the mobipocket format; images ARE supported (but must be cross-referenced manually). Nothing else is supported.
Forked from [MobiWriter](https://github.com/cafaxo/MobiWriter). An enhancement 7 years later... great code is timeless; thank you 
Lukas Mayrhofer!

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