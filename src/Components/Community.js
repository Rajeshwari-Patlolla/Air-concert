import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";
import { ThemeContext } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const CommunitySharingPage = ({ toggleTheme }) => {
  const { palette } = useContext(ThemeContext); // Access current theme mode (light or dark)
  const navigate = useNavigate(); // Initialize navigate to be used for navigation

  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "Excited to share my symphonic concert progress with everyone! It's been an amazing journey so far.",
      user: "User1",
      likes: 5,
      comments: [
        { user: "User2", text: "Looking forward to seeing it live! Keep up the great work! 🎶😊" },
        { user: "User3", text: "Amazing progress, can’t wait to hear the full performance! 🎼🎉" },
        { user: "User4", text: "This is fantastic! Do you have any behind-the-scenes footage? 📸🎬" },
        { user: "User5", text: "I love the energy in this project, keep pushing forward! 💪🎵" }
      ]
    },
    {
      id: 2,
      content: "Working on a new symphonic composition, here's a sneak peek of my progress. 🎹🎶",
      user: "User2",
      likes: 3,
      comments: [
        { user: "User1", text: "This sounds great! I love the melody. 🎶🎧" },
        { user: "User4", text: "The arrangement is really coming together! 🎻🎵" },
        { user: "User3", text: "Can you share the sheet music for this part? 📜🎶" }
      ]
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [comments, setComments] = useState({});

  const handleNewPostChange = (e) => setNewPost(e.target.value);

  const handleNewPostSubmit = () => {
    if (newPost.trim()) {
      setPosts([
        ...posts,
        { id: Date.now(), content: newPost, likes: 0, user: "User" + (posts.length + 1), comments: [] },
      ]);
      setNewPost('');
    }
  };

  const handleLike = (postId) => {
    const updatedLikes = new Set(likedPosts);
    if (likedPosts.has(postId)) {
      updatedLikes.delete(postId);
    } else {
      updatedLikes.add(postId);
    }
    setLikedPosts(updatedLikes);
  };

  const handleCommentChange = (postId, comment) => {
    setComments({ ...comments, [postId]: comment });
  };

  const handleCommentSubmit = (postId) => {
    const newComment = comments[postId];
    if (newComment.trim()) {
      const updatedPosts = posts.map(post =>
        post.id === postId ? {
          ...post,
          comments: [...post.comments, { user: "NewUser", text: newComment }]
        } : post
      );
      setPosts(updatedPosts);
      setComments({ ...comments, [postId]: '' });
    }
  };

  const handleJoinChallenge = () => {
    navigate('/collaboration');
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: palette.background.default, // Background color based on theme
        minHeight: "100vh",
        color: palette.text.primary, // Text color based on theme
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={toggleTheme}
        sx={{ position: 'absolute', top: 20, right: 20 }}
      >
        Toggle Theme
      </Button>

      {/* Post Form */}
      <Box sx={{ marginTop: 4 }}>
        <TextField
          label="Share your symphonic concert project or progress..."
          multiline
          rows={4}
          fullWidth
          value={newPost}
          onChange={handleNewPostChange}
          variant="outlined"
          sx={{
            backgroundColor: palette.background.paper,
            color: palette.text.primary,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleNewPostSubmit}
        >
          Post
        </Button>
      </Box>

      {/* Community Feed */}
      <Box sx={{ marginTop: 4 }}>
        {posts.map((post) => (
          <Card key={post.id} sx={{ marginBottom: 2, backgroundColor: palette.background.paper }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Avatar sx={{ marginRight: 2 }} />
                <Typography variant="body1" sx={{ fontWeight: "bold", color: palette.text.primary }}>
                  {post.user}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: palette.text.primary }}>
                {post.content}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => handleLike(post.id)}
                  sx={{ marginRight: 2, color: palette.text.primary }}
                >
                  {likedPosts.has(post.id) ? '❤️' : '🤍'} {post.likes} Likes
                </Button>
              </Box>

              {/* Comments Section */}
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6" sx={{ color: palette.text.primary }}>
                  Comments
                </Typography>

                {/* Two-Column Layout for Comments */}
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginTop: 2 }}>
                  {post.comments.map((comment, index) => (
                    <Card key={index} sx={{ backgroundColor: palette.background.paper }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                          <Avatar sx={{ marginRight: 2 }} />
                          <Typography variant="body1" sx={{ fontWeight: "bold", color: palette.text.primary }}>
                            {comment.user}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: palette.text.secondary }}>
                          {comment.text}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>

                {/* Add New Comment */}
                <TextField
                  label="Add a comment"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={comments[post.id] || ''}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  sx={{ marginTop: 2 }}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleCommentSubmit(post.id)}
                  sx={{ marginTop: 1 }}
                >
                  Comment
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Collaborative Challenges */}
      <Box sx={{ marginTop: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: palette.text.primary }}>
          Collaborative Challenges
        </Typography>
        <Typography variant="body1" sx={{ color: palette.text.secondary }}>
          Join challenges, compete, or collaborate with other musicians on exciting music projects!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: 2 }}
          onClick={handleJoinChallenge}
        >
          Join Challenge
        </Button>
      </Box>
    </Box>
  );
};

export default CommunitySharingPage;
