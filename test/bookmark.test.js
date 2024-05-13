const { handleBookmarkPosting } = require('../Controller/bookmarkPosting.controller');
const BookmarkPosting = require("../Models/bookmarkPostingData.model");

const mockRequest = (body) => ({
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock("../Models/bookmarkPostingData.model", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
}));

describe('handleBookmarkPosting', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should add a new bookmark post to collection when no existing bookmark', async () => {
    const req = mockRequest({ postId: 1, bookmark_coll_id: 1 });
    const res = mockResponse();

    BookmarkPosting.findOne.mockResolvedValue(null);
    BookmarkPosting.create.mockResolvedValue({ postId: 1, bookmark_coll_id: 1 });

    await handleBookmarkPosting(req, res);

    expect(BookmarkPosting.findOne).toHaveBeenCalledTimes(1);
    expect(BookmarkPosting.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      msg: "Bookmark post added to collection successfully",
      bookmark_data: { bookmark_posting: { postId: 1, bookmark_coll_id: 1 } },
    });
  });

  test('should remove existing bookmark post from collection', async () => {
    const req = mockRequest({ postId: 1, bookmark_coll_id: 1 });
    const res = mockResponse();

    BookmarkPosting.findOne.mockResolvedValue({ postId: 1, bookmark_coll_id: 1 });

    await handleBookmarkPosting(req, res);

    expect(BookmarkPosting.findOne).toHaveBeenCalledTimes(1);
    expect(BookmarkPosting.destroy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      msg: "Bookmark post removed from collection successfully",
    });
  });
});
