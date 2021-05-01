import { Router } from "express";
import path from "path";

export const getBookPage = (router: Router): void => {
  router.get("/page/:name/:page", (req, res) => {
    const name = req.params.name;
    const page = req.params.page;

    res.sendFile(path.join("C:/projects/mreaderdcp/server/books", name, page));

    return;
  });
};
