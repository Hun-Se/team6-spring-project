package lx.team6.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lx.team6.dao.CommentDAO;
import lx.team6.vo.CommentVo;

@Service
public class CommentService {
	
	@Autowired
	CommentDAO dao;
	
	public int createComment(Object reqData) {
		return dao.createComment(reqData);
	}
	
	public List<CommentVo> getCommentListByPostNo(Integer postNo) {
		return dao.getCommentListByPostNo(postNo);
	}
	
	public int deleteComment(Integer commentNo) {
		return dao.deleteComment(commentNo);
	}

}
