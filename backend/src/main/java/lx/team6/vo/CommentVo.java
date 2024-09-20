package lx.team6.vo;

public class CommentVo {
	
	public Integer commentNo;
	public String content;
	public Integer postNo;
	public String createdAt;
	public String updatedAt;
	
	public String userNo;
	public String userName;
	public String userId;
	public String img;
	
	
	public Integer getCommentNo() {
		return commentNo;
	}
	public void setCommentNo(Integer commentNo) {
		this.commentNo = commentNo;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Integer getPostNo() {
		return postNo;
	}
	public void setPostNo(Integer postNo) {
		this.postNo = postNo;
	}
	public String getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	public String getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(String updatedAt) {
		this.updatedAt = updatedAt;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	
	
	@Override
	public String toString() {
		return "CommentVo [commentNo=" + commentNo + ", content=" + content + ", postNo=" + postNo + ", createdAt="
				+ createdAt + ", updatedAt=" + updatedAt + ", userName=" + userName + ", userId=" + userId + ", img="
				+ img + "]";
	}
	
	
	



}
