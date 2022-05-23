#include <iostream>
#include <fstream>
#include "src/MobiWriter.cpp"
#include "src/MobiBook.cpp"
#include "src/MobiHeader.cpp"
#include "src/ExthHeader.cpp"
#include "src/PalmDocHeader.cpp"
#include "src/PalmDatabaseHeader.cpp"
#include "src/EofRecord.cpp"

int main(int argc, const char * argv[]) {
    MobiBook *mobi_book = new MobiBook("TestBook", "MobiWriterPlus Author");
    mobi_book->addHtmlFile("test.html");

    // You will need to cross reference each image record in the HTML as
    // <img recindex="00001"/>
    // <img recindex="00002"/>
    // etc. in order of appearance in the image record set.
    mobi_book->addGifFile("test.gif");
    mobi_book->addGifFile("test2.gif");
    

    MobiWriter *mobi_writer = new MobiWriter();
    mobi_writer->write(mobi_book, "test.mobi");
}
