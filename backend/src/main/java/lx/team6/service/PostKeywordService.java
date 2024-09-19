package lx.team6.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lx.team6.dao.PostDAO;
import lx.team6.dao.PostKeywordDAO;
import lx.team6.vo.PostKeywordVO;
import lx.team6.vo.PostVO;

@Service
public class PostKeywordService {

    @Autowired
    PostKeywordDAO dao;

    /*
    // 게시글 한개 불러오기
    public PostVO getPostByNo(Integer postNo) {
        PostVO post = dao.getPostByNo(postNo);
        return post;
    }*/

    // 키워드 추가
	public void insertPostKeyword(PostKeywordVO postkeyword) {
		dao.insertPostKeyword(postkeyword);
	}

    
    
}

   


