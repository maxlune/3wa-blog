import {Post} from "@prisma/client";

const findManyMock = jest.fn();
const findUniqueMock = jest.fn();

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      post: {
        findMany: findManyMock,
        findUnique: findUniqueMock,
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

describe('getAllPosts', () => {
  let postRepository: PostRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    postRepository = new PostRepository();
  });

  test ('return a list of posts', async () => {
    findManyMock.mockResolvedValue(mockedPosts);
    const posts = await postRepository.getAllPosts();

    expect(findManyMock).toHaveBeenCalledTimes(1);
    expect(posts).toEqual(mockedPosts);
  })
})

describe('getPostById', () => {
  let postRepository: PostRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    postRepository = new PostRepository();
  });

  test('return a post', async () => {
    findUniqueMock.mockResolvedValue(mockedPosts);
    const post = await postRepository.getPostById(1);

    expect(findUniqueMock).toHaveBeenCalledTimes(1);
    expect(post).toBe(mockedPosts[0]);
  })
})