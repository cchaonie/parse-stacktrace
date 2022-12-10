import { Router } from "express";
import { UserInfo } from "./type";

export const loginRoute = Router();

const loginUsers: UserInfo[] = [];

loginRoute.post("/login", (req, res) => {
  const fingerprint = req.body["fingerprint"];
  let user = getByFingerprint(fingerprint)?.[0];

  if (user) {
    user.loginCount += 1;
  } else {
    user = {
      fingerprint,
      loginCount: 1,
    };
  }

  res.status(200).json({
    message: "OK",
  });
});

function getByFingerprint(fingerprint: string): UserInfo[] {
  return loginUsers.filter((u) => u.fingerprint === fingerprint);
}
