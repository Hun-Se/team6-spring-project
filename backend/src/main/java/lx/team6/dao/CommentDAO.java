package lx.team6.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lx.team6.vo.CommentVo;

@Component
public class CommentDAO {
	
	@Autowired
	SqlSession session;
	
	public int createComment(Object reqData) {
		return session.insert("createComment",reqData);
	}
	
	public List<CommentVo> getCommentListByPostNo(Integer postNo) {
		return session.selectList("getCommentListByPostNo", postNo);
	}
	
	public int deleteComment(Integer commentNo) {
		return session.delete("deleteComment", commentNo);
	}

}
