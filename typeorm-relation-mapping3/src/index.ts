import { AppDataSource } from "./data-source";
import { Article } from "./entity/Article";
import { Tag } from "./entity/Tag";

AppDataSource.initialize()
  .then(async () => {
    const a1 = new Article();
    a1.title = "aaa";
    a1.content = "aaaaaaaaaaaa";

    const a2 = new Article();
    a2.title = "bbb";
    a2.content = "bbbbbbbbbbbbbb";

    const t1 = new Tag();
    t1.name = "t1";

    const t2 = new Tag();
    t2.name = "t2";

    const t3 = new Tag();
    t3.name = "t3";

    a1.tags = [t1, t2];
    a2.tags = [t1, t2, t3];

    const entityManager = AppDataSource.manager;
    // await entityManager.save(t1);
    // await entityManager.save(t2);
    // await entityManager.save(t3);
    // await entityManager.save(a1);
    // await entityManager.save(a2);

    // const article = await entityManager.find(Article, {
    //   relations: {
    //     tags: true,
    //   },
    // });
    // console.log("🚀 ~ .then ~ article:", article);

    // const article = await entityManager
    //   .createQueryBuilder(Article, "a")
    //   .leftJoinAndSelect("a.tags", "t")
    //   .getMany();
    // console.log("🚀 ~ .then ~ article:", article);

    const tags = await entityManager.find(Tag, {
      relations: {
        articles: true,
      },
    });
    console.log("🚀 ~ .then ~ tags:", tags);

    // todo 修改id为2的数据
    // const article = await entityManager.findOne(Article, {
    //   where: {
    //     id: 2,
    //   },
    //   relations: {
    //     tags: true,
    //   },
    // });

    // article.title = "ccc";
    // article.tags = article.tags.filter((item) => item.name.includes("t1"));
    // await entityManager.save(article);

    // await entityManager.delete(Article, 1);
    // await entityManager.delete(Tag, 1);
  })
  .catch((error) => console.log(error));
