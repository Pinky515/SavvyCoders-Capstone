import html from "html-literal";

export default state => html`
  <div id="discussionForumPage">
    <input
      type="search"
      id="postSearch"
      name="postSearch"
      placeholder="What's on your mind?"
    />
    <div id="magnifyingGlass">
      <button class="postSearch">
        <i class="fa-solid fa-magnifying-glass" style="color: #d76a03ff;"></i>
      </button>
    </div>
    <div id="createPost">
      <!-- new post button opens create new post -->
      <h1>Create New Post</h1>
      <form action="" method="post">
        <label for="creator">Creator</label>
        <input
          type="text"
          name="creator"
          id="creator"
          minlength="3"
          maxlength="25"
          placeholder="Who are you?"
          required
        />

        <label for="postTitle">Title</label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          size="40"
          minlength="4"
          maxlength="150"
          placeholder="Give your post a title."
          required
        />

        <label for="post">Start a Discussion</label>
        <input
          type="text"
          name="post"
          id="post"
          rows="15"
          cols="40"
          minlength="25"
          maxlength="50000"
          placeholder="What would you like to say?"
          required
        />

        <button name="createPost" value="createPost">
          <i
            class="fa-regular fa-paper-plane fa-xl createPost"
            style="color: #279af1ff;"
          ></i>
        </button>
      </form>
    </div>
    <div id="postList">
      <!-- list of selectable topics to read/comment on. should scroll for overflow -->
      <table id="allPosts">
        <thead>
          <tr>
            <th id="title">Title</th>
            <th id="content">Content</th>
            <th id="creator">Creator</th>
          </tr>
        </thead>
        <tbody>
          ${state.discussionForumPage.allPosts
    .map(post => {
      return `<tr>
          <td>${post.title}</td>
          <td>${post.content}</td>
          <td>${post.creator}</td>
          `;
    })
    .join("")}
        </tbody>
      </table>
    </div>
  </div>
`;
