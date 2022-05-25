//
//  MobiBook.h
//  MobiWriter
//

#ifndef MobiWriter_MobiBook_h
#define MobiWriter_MobiBook_h

#include <iostream>
#include <fstream>
#include <vector>

class MobiBook {
public:
    MobiBook(std::string title, std::string author);
    void setTitle(std::string title);
    void setAuthor(std::string author);
    bool addHtmlFile(std::string filename);
    bool addGifFile(std::string filename);
    
    std::string title() const { return title_; }
    std::string author() const { return author_; }
    std::string &html_content() { return html_content_; }
    std::vector<unsigned char> &gif_contents(int i) { return gif_contents_[i]; }
    unsigned long gif_contents_size() const { return gif_contents_.size(); }
    
private:
    std::string title_, author_, html_content_;
    std::vector<std::vector<unsigned char> > gif_contents_;
};

#endif
