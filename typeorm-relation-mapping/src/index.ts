import { AppDataSource } from "./data-source";
import { IdCard } from "./entity/IdCard";
import { User } from "./entity/User";

AppDataSource.initialize().then(async () => {
  //   const user = new User();
  //   user.firstName = "saint";
  //   user.lastName = "saint";
  //   user.age = 20;

  //   const idCard = new IdCard();
  //   idCard.cardName = "111";
  //   idCard.user = user;

  // ! 插入
  //   OneToOne中设置cascade: true, 就不用在保存user了;
  //   await AppDataSource.manager.save(user);
  //   await AppDataSource.manager.save(idCard);

  //   const ics = await AppDataSource.manager.find(IdCard, {
  //     relations: {
  //       user: true,
  //     },
  //   });

  // querybuilder写法
  //   const ics = await AppDataSource.manager
  //     .getRepository(IdCard)
  //     .createQueryBuilder("ic")
  //     .leftJoinAndSelect("ic.user", "u")
  //     .getMany();

  // querybuilder另一种写法
  //   const ics = await AppDataSource.manager
  //     .createQueryBuilder(IdCard, "ic")
  //     .leftJoinAndSelect("ic.user", "u")
  //     .getMany();

  //   console.log("🚀 ~ AppDataSource.initialize ~ ics:", ics);

  // !修改
  const user = new User();
  user.id = 1;
  user.firstName = "caizhihao";
  user.lastName = "caizhihao";
  user.age = 27;

  const idCard = new IdCard();
  idCard.id = 1;
  idCard.cardName = "广大";
  idCard.user = user;

  //   await AppDataSource.manager.save(idCard);

  // !删除
  await AppDataSource.manager.delete(User, 1);

  //   const user = await AppDataSource.manager.find(User, {
  //     relations: {
  //       idCard: true,
  //     },
  //   });
  //   console.log(user);
});
