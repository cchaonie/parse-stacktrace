import { Request, Response, Router } from 'express';

const files = [];

export const userFilesRoute = Router();

userFilesRoute.get('/files', function (req, res) {
  const userId = req.query['userId'] as string;
  const userFiles = getByUserId(userId) || [];

  res.status(200).json({
    message: 'OK',
    data: userFiles,
  });
});

userFilesRoute.put('/files', (req: Request, res: Response) => {
  const fileName = req.body['name'];
  const createTime = req.body['createTime'];
  const userId = req.body['userId'];

  const currentUserFiles = getByUserIdAndFileName(userId, fileName);

  if (currentUserFiles.length) {
    return res.status(400).json({
      message: 'fileName exists.',
    });
  }

  files.push({
    name: fileName,
    creator: userId,
    createTime,
  });

  return res.status(200).json({
    message: 'OK',
  });
});

function getByUserIdAndFileName(userId: string, fileName: string) {
  return files.filter(f => f.name === fileName && f.creator === userId);
}

function getByUserId(userId: string) {
  return files.filter(f => f.creator === userId);
}
