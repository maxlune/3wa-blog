import {Post} from "@prisma/client";

const findManyMock = jest.fn();
const findUniqueMock = jest.fn();
const deleteMock = jest.fn();
const createMock = jest.fn();
const updateMock = jest.fn();

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      post: {
        findMany: findManyMock,
        findUnique: findUniqueMock,
        delete: deleteMock,
        create: createMock,
        update: updateMock,
      },
    })),
  };
});

import {PostRepository} from "../Repositories/PostRepository";

const mockedPosts: Post[] = [
  {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Post title",
    content: "Hello World",
    userId: 1
  },
  {
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Post title 2",
    content: "Hello World 2",
    userId: 2
  },
]

describe("PostRepository", () => {
  let postRepository: PostRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    postRepository = new PostRepository();
  });

  describe('getAllPosts', () => {
    test ('return a list of posts', async () => {
      findManyMock.mockResolvedValue(mockedPosts);
      const posts = await postRepository.getAllPosts();

      expect(findManyMock).toHaveBeenCalledTimes(1);
      expect(posts).toEqual(mockedPosts);
    })
  })

  describe('getPostById', () => {
    test('return a post', async () => {
      findUniqueMock.mockResolvedValue(mockedPosts[0]);
      const post = await postRepository.getPostById(1);

      expect(findUniqueMock).toHaveBeenCalledTimes(1);
      expect(post).toBe(mockedPosts[0]);
    })
  })

  describe("deletePost", () => {
    test("supprime un post", async () => {
      deleteMock.mockResolvedValue(undefined);

      await postRepository.deletePost(1);

      expect(deleteMock).toHaveBeenCalledTimes(1);
      expect(deleteMock).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe("createPost", () => {
    test("create and return a post", async () => {
      const newPostData = {
        title: "New Post",
        content: "New Content",
        userId: 3,
      };
      const createdPost: Post = {
        id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...newPostData,
      };

      createMock.mockResolvedValue(createdPost);

      const result = await postRepository.createPost(newPostData);

      expect(createMock).toHaveBeenCalledTimes(1);
      expect(createMock).toHaveBeenCalledWith({ data: newPostData });
      expect(result).toEqual(createdPost);
    })
  })

  describe("postExists", () => {
    test("return if post exists", async () => {
      findUniqueMock.mockResolvedValue(mockedPosts[0]);

      const result = await postRepository.postExists(1);

      expect(findUniqueMock).toHaveBeenCalledTimes(1);
      expect(findUniqueMock).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockedPosts[0]);
    });
  });
  describe('updatePost', () => {
    test('update a post (titre et content)', async () => {
      const mockUpdatedPost: Post = {
        id: 1,
        title: "Updated title",
        content: "Updated content",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      };
      updateMock.mockResolvedValue(mockUpdatedPost);

      const updatedPost = await postRepository.updatePost(1, { title: "titre updated", content: "content updated" });

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(updateMock).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { title: "titre updated", content: "content updated" },
      });
      expect(updatedPost).toEqual(mockUpdatedPost);
    });

    test("update a post: error when postId invalid", async () => {

      updateMock.mockRejectedValue(new Error("Post not found"));
      await expect(postRepository.updatePost(999, { title: "test title" })).rejects.toThrow("Post not found");

      expect(updateMock).toHaveBeenCalledTimes(1);
    });
  })
})

