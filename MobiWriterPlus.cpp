#include <iostream>
#include <fstream>
#include <string>
#include "src/MobiWriter.cpp"
#include "src/MobiBook.cpp"
#include "src/MobiHeader.cpp"
#include "src/ExthHeader.cpp"
#include "src/PalmDocHeader.cpp"
#include "src/PalmDatabaseHeader.cpp"
#include "src/EofRecord.cpp"

bool endsWith(std::string mainStr, std::string toMatch)
{
    return mainStr.size() >= toMatch.size() && mainStr.compare(mainStr.size() - toMatch.size(), toMatch.size(), toMatch) == 0;
}

std::string getValueForArg(std::string mainStr, std::string argKey) 
{
    int pos = mainStr.find(argKey);

    if(pos == 0) {
        return mainStr.substr(pos + argKey.size());
    } else {
        return "";
    }
}

int main(int argc, const char * argv[]) {
    std::string outputFile;
    std::string recognizedArg;
    std::cout << "Compiling MOBI file..." << std::endl;
    
    MobiBook *mobi_book = new MobiBook("TestBook", "MobiWriterPlus");

    for(int i = 0; i < argc; i++) {
        if(endsWith(argv[i], ".gif")) {
            mobi_book->addGifFile(argv[i]);

        } else if(endsWith(argv[i], ".html")) {
            mobi_book->addHtmlFile(argv[i]);
         
        } else if(endsWith(argv[i], ".mobi")) {
            outputFile = argv[i];
            
        } else {
            recognizedArg = getValueForArg(argv[i], "--title=");
            if(recognizedArg != "") {
                mobi_book->setTitle(recognizedArg);
            }

            recognizedArg = getValueForArg(argv[i], "--author=");
            if(recognizedArg != "") {
                mobi_book->setAuthor(recognizedArg);
            }
        }
    }
    
    // You will need to cross reference each image record in the HTML as
    // <img recindex="00001"/>
    // <img recindex="00002"/>
    // etc. in order of appearance in the image record set.
    // mobi_book->addGifFile("test.gif");
    // mobi_book->addGifFile("test2.gif");
    
    MobiWriter *mobi_writer = new MobiWriter();
    mobi_writer->write(mobi_book, outputFile);
}
