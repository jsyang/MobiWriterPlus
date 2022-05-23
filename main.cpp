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
    MobiBook *mobi_book = new MobiBook("Test with Images", "Test with Images");
    mobi_book->addHtmlFile("test.html");
    mobi_book->addGifFile("test.gif");
    mobi_book->addGifFile("test2.gif");
    
    
    MobiWriter *mobi_writer = new MobiWriter();
    mobi_writer->write(mobi_book, "test.mobi");
}
