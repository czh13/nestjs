import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

// !增加和修改
AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));

AppDataSource.initialize()
  .then(async () => {
    const user = new User();
    user.id = 1;
    user.firstName = "aaa111";
    user.lastName = "bbb";
    user.age = 25;
    await AppDataSource.manager.save(user);
  })
  .catch((error) => console.log(error));

// !批量插入和修改
// todo 其实 EntityManager 还有 update 和 insert 方法，分别是修改和插入的，但是它们不会先 select 查询一次。而 save 方法会先查询一次数据库来确定是插入还是修改。
AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.manager.save(User, [
      { firstName: "ccc", lastName: "ccc", age: 21 },
      { firstName: "ddd", lastName: "ddd", age: 22 },
      { firstName: "eee", lastName: "eee", age: 23 },
    ]);
  })
  .catch((error) => console.log(error));

AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.manager.save(User, [
      { id: 2, firstName: "ccc111", lastName: "ccc", age: 21 },
      { id: 3, firstName: "ddd222", lastName: "ddd", age: 22 },
      { id: 4, firstName: "eee333", lastName: "eee", age: 23 },
    ]);
  })
  .catch((error) => console.log(error));

// !删除
// todo delete 和 remove 的区别是，delete 直接传 id、而 remove 则是传入 entity 对象。
AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.manager.delete(User, 1);
    await AppDataSource.manager.delete(User, [2, 3]);
  })
  .catch((error) => console.log(error));

AppDataSource.initialize()
  .then(async () => {
    const user = new User();
    user.id = 1;
    await AppDataSource.manager.remove(User, user);
  })
  .catch((error) => console.log(error));

// todo查询list
AppDataSource.initialize()
  .then(async () => {
    const users = await AppDataSource.manager.find(User);
    console.log(users);
  })
  .catch((error) => console.log(error));

// todo查询:条件
AppDataSource.initialize()
  .then(async () => {
    const users = await AppDataSource.manager.findBy(User, {
      age: 23,
    });
    console.log(users);
  })
  .catch((error) => console.log(error));

// todo查询数量
AppDataSource.initialize()
  .then(async () => {
    // const [users, count] = await AppDataSource.manager.findAndCount(User);
    const [users, count] = await AppDataSource.manager.findAndCountBy(User, {
      age: 23,
    });
    console.log(users, count);
  })
  .catch((error) => console.log(error));

// todo查询单个
AppDataSource.initialize()
  .then(async () => {
    const user = await AppDataSource.manager.findOne(User, {
      select: {
        firstName: true,
        age: true,
      },
      where: {
        id: 4,
      },
      order: {
        age: "ASC",
      },
    });
    console.log(user);
  })
  .catch((error) => console.log(error));

// todo 查询单个:条件
AppDataSource.initialize()
  .then(async () => {
    const user = await AppDataSource.manager.findOneBy(User, {
      age: 23,
    });
    console.log(user);
  })
  .catch((error) => console.log(error));

// todo 查询:sql
AppDataSource.initialize()
  .then(async () => {
    const users = await AppDataSource.manager.query(
      "select * from user where age in(?, ?)",
      [21, 22]
    );
    console.log(users);
  })
  .catch((error) => console.log(error));

// todo 查询:queryBuilder,复杂情况用queryBuilder
AppDataSource.initialize()
  .then(async () => {
    const queryBuilder = await AppDataSource.manager.createQueryBuilder();
    const user = await queryBuilder
      .select("user")
      .from(User, "user")
      .where("user.age = :age", { age: 21 })
      .getOne();
    console.log(user);

    //todo 事务
    await AppDataSource.manager.transaction(async (manager) => {
      await manager.save(User, {
        id: 4,
        firstName: "eee",
        lastName: "eee",
        age: 20,
      });
    });
  })
  .catch((error) => console.log(error));

// todo 获取Repository实体类
// AppDataSource.manager.getRepository(User).find();
